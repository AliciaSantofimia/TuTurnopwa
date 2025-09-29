// api/crear-sesion.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };

/**
 * ENVs necesarias:
 * - REDSYS_FUC                (p.ej. 368564464)
 * - REDSYS_TERMINAL           (p.ej. "001")
 * - (una de) REDSYS_SECRET_B64 (clave v1 en base64, ej: sq7HjrU... ) || REDSYS_SECRET (texto)
 * - (opc) REDSYS_CURRENCY     (por defecto "978")
 * - (opc) REDSYS_URL          (override del endpoint)
 * - (opc) REDSYS_URL_OK / REDSYS_URL_KO / REDSYS_NOTIFY_URL
 * - VERCEL_ENV: "production" => producción, otro => sandbox
 */
const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";
const SECRET_TXT = process.env.REDSYS_SECRET || null;
const SECRET_B64 = process.env.REDSYS_SECRET_B64 || null;

const URL_TEST = "https://sis-t.redsys.es/sis/realizarPago"; // sin :25443
const URL_PROD = "https://sis.redsys.es/sis/realizarPago";
const isProd = process.env.VERCEL_ENV === "production";
const REDSYS_URL = process.env.REDSYS_URL || (isProd ? URL_PROD : URL_TEST);

// ----- utils -----
function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function b64stdFromJson(obj) {
  const json = JSON.stringify(obj);
  return Buffer.from(json, "utf8").toString("base64"); // estándar (NO url-safe)
}
function httpsAbs(u) { return typeof u === "string" && /^https:\/\//i.test(u); }

// === Firma V1 (HMAC_SHA256_V1) ===
// - Clave proporcionada por el banco en BASE64 (la típica sq7Hjr... lo es). Si te la dan en texto, usa REDSYS_SECRET.
function getSecretBytes() {
  if (SECRET_B64) return Buffer.from(SECRET_B64, "base64");  // lo más habitual
  if (SECRET_TXT) return Buffer.from(SECRET_TXT, "utf8");
  throw new Error("Falta REDSYS_SECRET_B64 o REDSYS_SECRET");
}
// Deriva clave por operación: 3DES-CBC (des-ede-cbc) con IV=0 sobre el ORDER
function deriveKeyV1(order) {
  let key = getSecretBytes();                 // suele ser 24 bytes si viene de base64
  if (key.length === 16) key = Buffer.concat([key, key.slice(0, 8)]); // a 24
  if (key.length < 24) key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv("des-ede-cbc", key, iv);
  cipher.setAutoPadding(true);
  const enc = Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
  return enc; // bytes
}
function signV1(Ds_MerchantParameters_b64, order) {
  const k = deriveKeyV1(order);
  const mac = crypto.createHmac("sha256", k).update(Ds_MerchantParameters_b64, "utf8").digest();
  return b64url(mac); // Redsys acepta URL-safe para la firma
}

// ----- handler -----
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  try {
    if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
    if (!SECRET_B64 && !SECRET_TXT) return res.status(500).send("Falta clave REDSYS_SECRET_B64 o REDSYS_SECRET");

    const src = isGet ? (req.query || {}) : (req.body || {});
    const {
      orderId, amountCents, amount, okUrl, koUrl, notifyUrl, payMethod
    } = src;

    // ORDER 4–12 (empieza por dígito)
    let oid = String(orderId ?? Date.now()).replace(/\D/g, "");
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
    oid = oid.padStart(12, "0").slice(-12);
    if (!/^\d/.test(oid)) oid = "9" + oid.slice(1);

    // Céntimos (string)
    let cents = amountCents != null ? String(parseInt(amountCents, 10)) : null;
    if (!cents && amount != null) {
      const euros = String(amount).replace(",", ".");
      cents = String(Math.round(Number(euros) * 100));
    }
    if (!cents || !/^\d+$/.test(cents) || Number(cents) < 1) {
      return res.status(400).send("amountCents/amount inválido");
    }

    // URLs (o fallback de ENV)
    const URL_OK = httpsAbs(okUrl) ? okUrl : process.env.REDSYS_URL_OK;
    const URL_KO = httpsAbs(koUrl) ? koUrl : process.env.REDSYS_URL_KO;
    const URL_NOTIFY = httpsAbs(notifyUrl) ? notifyUrl : process.env.REDSYS_NOTIFY_URL;
    if (!httpsAbs(URL_OK) || !httpsAbs(URL_KO)) {
      return res.status(400).send("Faltan okUrl/koUrl https (o define REDSYS_URL_OK/KO)");
    }

    const params = {
      DS_MERCHANT_AMOUNT: cents,
      DS_MERCHANT_ORDER: oid,
      DS_MERCHANT_MERCHANTCODE: String(FUC),
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: "0",
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_URLOK: URL_OK,
      DS_MERCHANT_URLKO: URL_KO,
      ...(URL_NOTIFY ? { DS_MERCHANT_MERCHANTURL: URL_NOTIFY } : {}),
      ...(payMethod === "bizum" ? { DS_MERCHANT_PAYMETHODS: "z" } : {}),
    };

    // DEBUG opcional (ver en Logs de Vercel):
    // console.log("TPV params:", params);

    const Ds_MerchantParameters = b64stdFromJson(params); // Base64 estándar
    const Ds_Signature = signV1(Ds_MerchantParameters, oid);
    const Ds_SignatureVersion = "HMAC_SHA256_V1";

    const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Conectando con el banco…</title>
<body onload="document.forms[0].submit()" style="font-family:sans-serif">
  <p>Redirigiendo al TPV…</p>
  <form method="post" action="${REDSYS_URL}">
    <input type="hidden" name="Ds_SignatureVersion" value="${Ds_SignatureVersion}">
    <input type="hidden" name="Ds_MerchantParameters" value="${Ds_MerchantParameters}">
    <input type="hidden" name="Ds_Signature" value="${Ds_Signature}">
    <noscript><button type="submit">Continuar al pago</button></noscript>
  </form>
</body></html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creando sesión TPV");
  }
}

