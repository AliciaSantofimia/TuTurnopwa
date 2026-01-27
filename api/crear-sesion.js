// api/crear-sesion.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };

/**
 * ENVs (Vercel):
 * - REDSYS_FUC=368564464
 * - REDSYS_TERMINAL=001
 * - REDSYS_CURRENCY=978
 * - REDSYS_URL_TEST=https://sis-t.redsys.es:25443/sis/realizarPago
 * - REDSYS_URL_PROD=https://sis.redsys.es/sis/realizarPago
 * - REDSYS_URL_OK, REDSYS_URL_KO, REDSYS_NOTIFY_URL
 * - REDSYS_FORCE_TEST="1" (opcional)
 *
 * CLAVE BBVA TEST:
 * - REDSYS_SECRET_KEY = sq7HjrUOBfKmC576ILgskD5srU870gJ7   (COMPLETA)
 */

const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";

const forceTest = process.env.REDSYS_FORCE_TEST === "1";
const isProdEnv = process.env.VERCEL_ENV === "production" && !forceTest;

const RAW_TPV_URL = isProdEnv
  ? (process.env.REDSYS_URL_PROD || "https://sis.redsys.es/sis/realizarPago")
  : (process.env.REDSYS_URL_TEST || "https://sis-t.redsys.es:25443/sis/realizarPago");

const TPV_URL = RAW_TPV_URL;

// -------- utils --------
const isHttps = (u) => typeof u === "string" && /^https:\/\//i.test(u);

// Base64 estándar para Ds_MerchantParameters (NO base64url)
const jsonToStdB64 = (obj) =>
  Buffer.from(JSON.stringify(obj), "utf8").toString("base64");

// -------- SHA256 V1 (3DES + HMAC-SHA256) --------

// BBVA a veces envía la “clave secreta” como texto tipo sq7...,
// pero muchas librerías la tratan como Base64.
// Esta función intenta ambas para evitar SIS0042.
function getSecretBytes() {
  const k = (process.env.REDSYS_SECRET_KEY || "").trim();
  if (!k) throw new Error("Falta REDSYS_SECRET_KEY");
  return Buffer.from(k, "utf8"); // FORZAR TEXTO
}


// Redsys usa 3DES con clave de 24 bytes:
// - si tenemos 16 bytes → duplicamos 8 (K1K2K1)
// - si tenemos 24 → ok
// - si tenemos más → recortamos a 24
// - si tenemos menos → rellenamos con 0
function normalize3DESKey24(raw) {
  let key = Buffer.from(raw);

  if (key.length === 16) key = Buffer.concat([key, key.slice(0, 8)]);
  if (key.length > 24) key = key.slice(0, 24);
  if (key.length < 24) key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);

  return key;
}

// Derivación: 3DES-CBC(order, key, iv=0)
function deriveKey(order) {
  const key24 = normalize3DESKey24(getSecretBytes());
  const iv = Buffer.alloc(8, 0x00);
  const cipher = crypto.createCipheriv("des-ede3-cbc", key24, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}

// Firma: HMAC-SHA256(Ds_MerchantParameters, derivedKey) en Base64 normal
function signSHA256V1(paramsB64, order) {
  const derived = deriveKey(order);
  return crypto.createHmac("sha256", derived).update(paramsB64, "utf8").digest("base64");
}

// -------- handler --------
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  const src = isGet ? (req.query || {}) : (req.body || {});

  if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
  if (!process.env.REDSYS_SECRET_KEY) return res.status(500).send("Falta REDSYS_SECRET_KEY");

  try {
    const { orderId, amountCents, amount, okUrl, koUrl, notifyUrl, payMethod, mode } = src;

    // ORDER: numérico 4–12 dígitos (BBVA suele ir bien con 12)
    let oid = String(orderId ?? Date.now()).replace(/\D/g, "");
    if (oid.length < 4) oid = String(Date.now() % 1e12);
    oid = oid.padStart(12, "0").slice(-12);

    // Importe en céntimos (>=1)
    let cents = amountCents != null ? String(parseInt(amountCents, 10)) : null;
    if (!cents && amount != null) {
      const euros = String(amount).replace(",", ".");
      cents = String(Math.round(Number(euros) * 100));
    }
    if (!cents || !/^\d+$/.test(cents) || Number(cents) < 1) {
      return res.status(400).send("amountCents/amount inválido");
    }

    // URLs
    const URL_OK = isHttps(okUrl) ? okUrl : process.env.REDSYS_URL_OK;
    const URL_KO = isHttps(koUrl) ? koUrl : process.env.REDSYS_URL_KO;
    const URL_NOTIFY = isHttps(notifyUrl) ? notifyUrl : process.env.REDSYS_NOTIFY_URL;

    if (!isHttps(URL_OK) || !isHttps(URL_KO)) {
      return res.status(400).send("Faltan REDSYS_URL_OK/REDSYS_URL_KO (https) o pásalas por query");
    }

    // Parámetros Redsys (ojo a los nombres EXACTOS)
    const dsJson = {
  DS_MERCHANT_AMOUNT: cents,
  DS_MERCHANT_ORDER: oid,
  DS_MERCHANT_MERCHANTCODE: String(FUC),
  DS_MERCHANT_TERMINAL: String(TERMINAL),
  DS_MERCHANT_CURRENCY: String(CURRENCY),
  DS_MERCHANT_TRANSACTIONTYPE: "0",
  DS_MERCHANT_URLOK: URL_OK,
  DS_MERCHANT_URLKO: URL_KO,
  ...(URL_NOTIFY ? { DS_MERCHANT_MERCHANTURL: URL_NOTIFY } : {}),
  ...(payMethod === "bizum" ? { DS_MERCHANT_PAYMETHODS: "z" } : {}),
};


    const Ds_MerchantParameters = jsonToStdB64(dsJson);

    // SHA256 V1
    const Ds_SignatureVersion = "HMAC_SHA256_V1";
    const Ds_Signature = signSHA256V1(Ds_MerchantParameters, dsJson.DS_MERCHANT_ORDER);


    // JSON debug
    if ((mode || "").toString().toLowerCase() === "json") {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      return res.status(200).json({
        action: TPV_URL,
        Ds_SignatureVersion,
        Ds_MerchantParameters,
        Ds_Signature,
        parsed: dsJson,
      });
    }

    // INSPECT debug
    if ((mode || "").toString().toLowerCase() === "inspect") {
      const short = (s) => (s ? `${s.slice(0, 24)}…${s.slice(-12)} (len ${s.length})` : "");
      const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Debug Redsys</title>
<body style="font-family:sans-serif; max-width:900px; margin:2rem auto">
  <h1>Debug Redsys</h1>
  <p><strong>Action:</strong> ${TPV_URL}</p>
  <ul>
    <li><b>Ds_SignatureVersion:</b> ${Ds_SignatureVersion}</li>
    <li><b>Ds_MerchantParameters:</b> ${short(Ds_MerchantParameters)}</li>
    <li><b>Ds_Signature:</b> ${short(Ds_Signature)}</li>
  </ul>

  <form method="post" action="${TPV_URL}" style="display:grid; gap:1rem">
    <label>Ds_SignatureVersion<br>
      <input name="Ds_SignatureVersion" value="${Ds_SignatureVersion}" style="width:100%">
    </label>
    <label>Ds_MerchantParameters<br>
      <textarea name="Ds_MerchantParameters" rows="8" style="width:100%">${Ds_MerchantParameters}</textarea>
    </label>
    <label>Ds_Signature<br>
      <input name="Ds_Signature" value="${Ds_Signature}" style="width:100%">
    </label>
    <button type="submit" style="padding:.6rem 1rem">Enviar al TPV</button>
  </form>

  <hr>
  <pre>${JSON.stringify(dsJson, null, 2)}</pre>
</body></html>`;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    }

    // Auto-submit
    const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Conectando con el banco…</title>
<body onload="document.forms[0].submit()" style="font-family:sans-serif">
  <p>Redirigiendo al TPV…</p>
  <form method="post" action="${TPV_URL}">
    <input type="hidden" name="Ds_SignatureVersion" value="${Ds_SignatureVersion}">
    <input type="hidden" name="Ds_MerchantParameters" value="${Ds_MerchantParameters}">
    <input type="hidden" name="Ds_Signature" value="${Ds_Signature}">
    <noscript><button type="submit">Continuar al pago</button></noscript>
  </form>
</body></html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(html);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error creando sesión TPV");
  }
}
