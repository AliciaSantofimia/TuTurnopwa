// api/crear-sesion.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };

/**
 * ENVs (Vercel):
 * - REDSYS_FUC
 * - REDSYS_TERMINAL=001
 * - REDSYS_CURRENCY=978
 * - REDSYS_URL_TEST=https://sis-t.redsys.es:25443/sis/realizarPago
 * - REDSYS_URL_PROD=https://sis.redsys.es/sis/realizarPago
 * - REDSYS_URL_OK, REDSYS_URL_KO, REDSYS_NOTIFY_URL
 * - REDSYS_FORCE_TEST="1" (para forzar sandbox)
 * - REDSYS_SECRET_TXT   ← V2 (SHA512 + AES). 16 chars, ej: sq7HjrUOBfKmC576
 */

const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";

const forceTest = process.env.REDSYS_FORCE_TEST === "1";
const isProdEnv = process.env.VERCEL_ENV === "production" && !forceTest;

// --- URL del TPV con puerto 25443 en sandbox ---
function ensureTestPort(urlStr) {
  try {
    const u = new URL(urlStr);
    if (u.hostname === "sis-t.redsys.es" && !u.port) u.port = "25443";
    return u.toString();
  } catch {
    return urlStr;
  }
}

const RAW_TPV_URL = isProdEnv
  ? (process.env.REDSYS_URL_PROD || "https://sis.redsys.es/sis/realizarPago")
  : (process.env.REDSYS_URL_TEST || "https://sis-t.redsys.es:25443/sis/realizarPago");

const TPV_URL = isProdEnv ? RAW_TPV_URL : ensureTestPort(RAW_TPV_URL);

// ---------- utils ----------
const isHttps = (u) => typeof u === "string" && /^https:\/\//i.test(u);

// Base64 estándar (NO URL) para Ds_MerchantParameters
const jsonToStdB64 = (obj) => Buffer.from(JSON.stringify(obj), "utf8").toString("base64");

// Base64URL para la firma (sin '=')
const toBase64Url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

// ---------- V2: AES-128 + HMAC-SHA512 ----------
function key16FromSecretTxt() {
  const txt = (process.env.REDSYS_SECRET_TXT || "").trim();
  if (!txt) throw new Error("Falta REDSYS_SECRET_TXT (V2)");
  const sixteen = txt.slice(0, 16);
  let k = Buffer.from(sixteen, "utf8");
  if (k.length < 16) k = Buffer.concat([k, Buffer.alloc(16 - k.length, 0x00)]);
  if (k.length > 16) k = k.subarray(0, 16);
  return k;
}

function deriveKeyV2(order) {
  const k16 = key16FromSecretTxt();
  const iv = Buffer.alloc(16, 0x00); // IV = 0
  const cipher = crypto.createCipheriv("aes-128-cbc", k16, iv);
  cipher.setAutoPadding(true);       // PKCS#7
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}

function signV2(paramsB64, order) {
  const k = deriveKeyV2(order);
  const digest = crypto.createHmac("sha512", k).update(paramsB64, "utf8").digest();
  return toBase64Url(digest); // base64url sin '='
}

// ---------- handler ----------
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  const src = isGet ? (req.query || {}) : (req.body || {});

  if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
  if (!process.env.REDSYS_SECRET_TXT) return res.status(500).send("Falta REDSYS_SECRET_TXT (V2)");

  try {
    const { orderId, amountCents, amount, okUrl, koUrl, notifyUrl, payMethod, mode } = src;

    // ORDER: numérico 4–12 dígitos → dejamos 12 dígitos
    let oid = String(orderId ?? Date.now()).replace(/\D/g, "");
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
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
      return res.status(400).send("Faltan okUrl/koUrl https (o define REDSYS_URL_OK/KO)");
    }

    // Parámetros Redsys (usar camel-case EXACTO)
    const dsJson = {
      Ds_Merchant_Amount: cents,
      Ds_Merchant_Order: oid,
      Ds_Merchant_MerchantCode: String(FUC),
      Ds_Merchant_Terminal: TERMINAL,
      Ds_Merchant_Currency: CURRENCY,
      Ds_Merchant_TransactionType: "0",
      Ds_Merchant_UrlOK: URL_OK,
      Ds_Merchant_UrlKO: URL_KO,
      ...(URL_NOTIFY ? { Ds_Merchant_MerchantURL: URL_NOTIFY } : {}),
      ...(payMethod === "bizum" ? { Ds_Merchant_PayMethods: "z" } : {}),
    };

    // MerchantParameters → Base64 estándar
    const Ds_MerchantParameters = jsonToStdB64(dsJson);

    // Firma (V2)
    const Ds_SignatureVersion = "HMAC_SHA512_V2";
    const Ds_Signature = signV2(Ds_MerchantParameters, dsJson.Ds_Merchant_Order);

    // --- Respuesta JSON para depurar ---
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

    // --- Modo INSPECT: formulario visible para depurar ---
    if ((mode || "").toLowerCase() === "inspect") {
      const short = (s) => (s ? `${s.slice(0, 24)}…${s.slice(-12)} (len ${s.length})` : "");
      const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Debug Redsys</title>
<body style="font-family:sans-serif; max-width:900px; margin:2rem auto">
  <h1>Debug Redsys</h1>
  <p><strong>Action:</strong> ${TPV_URL}</p>

  <h3>Previsualización (solo lectura)</h3>
  <ul>
    <li><b>Ds_SignatureVersion:</b> ${Ds_SignatureVersion}</li>
    <li><b>Ds_MerchantParameters:</b> ${short(Ds_MerchantParameters)}</li>
    <li><b>Ds_Signature:</b> ${short(Ds_Signature)}</li>
  </ul>

  <h3>Formulario que se enviará (POST)</h3>
  <form method="post" action="${TPV_URL}" target="_self" style="display:grid; gap:1rem">
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
  <p><strong>MerchantParameters (JSON legible):</strong></p>
  <pre>${JSON.stringify(dsJson, null, 2)}</pre>
</body></html>`;
      res.setHeader("Content-Type","text/html; charset=utf-8");
      return res.status(200).send(html);
    }

    // --- HTML auto-submit por defecto ---
    const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Conectando con el banco…</title>
<body onload="document.forms[0].submit()" style="font-family:sans-serif">
  <p>Redirigiendo al TPV…</p>
  <form method="post" action="${TPV_URL}">
    <input type="hidden" name="Ds_SignatureVersion" value="${Ds_SignatureVersion}" autocomplete="off">
    <input type="hidden" name="Ds_MerchantParameters" value="${Ds_MerchantParameters}" autocomplete="off">
    <input type="hidden" name="Ds_Signature" value="${Ds_Signature}" autocomplete="off">
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
