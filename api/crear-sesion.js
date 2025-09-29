// api/crear-sesion.js
import crypto from "crypto";
// Este endpoint devuelve HTML con formulario (no hace XHR).
export const config = { runtime: "nodejs" };

/**
 * ENVs necesarias en Vercel:
 * - REDSYS_FUC
 * - REDSYS_TERMINAL             (por defecto "001")
 * - (una de estas) REDSYS_SECRET  (texto)  ||  REDSYS_SECRET_B64  (base64)
 * - (opcional) REDSYS_CURRENCY  (por defecto "978")
 * - (opcional) REDSYS_URL       (override total del endpoint)
 * - (opcional) REDSYS_URL_OK / REDSYS_URL_KO / REDSYS_NOTIFY_URL (fallback de URLs)
 * - VERCEL_ENV: "production" -> usa PROD, cualquier otro -> TEST
 */
const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";
const SECRET_TXT = process.env.REDSYS_SECRET || null;
const SECRET_B64 = process.env.REDSYS_SECRET_B64 || null;

const URL_TEST = "https://sis-t.redsys.es/sis/realizarPago";   // ⚠️ SIN :25443
const URL_PROD = "https://sis.redsys.es/sis/realizarPago";
const isProd = process.env.VERCEL_ENV === "production";

const REDSYS_URL = process.env.REDSYS_URL || (isProd ? URL_PROD : URL_TEST);

// ---------- Helpers ----------
const toB64Url = (buf) =>
  Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

function encodeMerchantParams(obj) {
  const json = JSON.stringify(obj);
  return toB64Url(Buffer.from(json, "utf8")); // Base64URL
}

function getAesKey16() {
  if (SECRET_TXT) return Buffer.from(SECRET_TXT, "utf8").slice(0, 16);
  if (SECRET_B64) return Buffer.from(SECRET_B64, "base64").slice(0, 16);
  throw new Error("Falta REDSYS_SECRET o REDSYS_SECRET_B64");
}

function deriveKeyV2(order) {
  const key16 = getAesKey16();
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv("aes-128-cbc", key16, iv);
  const enc = Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
  return enc; // bytes
}

function signV2(Ds_MerchantParameters, order) {
  const k = deriveKeyV2(order);
  const mac = crypto.createHmac("sha512", k).update(Ds_MerchantParameters, "utf8").digest();
  return toB64Url(mac);
}

function isHttpsAbsolute(u) {
  return typeof u === "string" && /^https:\/\//i.test(u);
}

// ---------- Handler ----------
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  try {
    if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
    if (!SECRET_TXT && !SECRET_B64) return res.status(500).send("Falta REDSYS_SECRET o REDSYS_SECRET_B64");

    const src = isGet ? (req.query || {}) : (req.body || {});
    const {
      orderId,
      amountCents,   // "5500"
      amount,        // "55.00" o "55,00" (opcional; se convierte)
      okUrl,
      koUrl,
      notifyUrl,
      payMethod      // "bizum" opcional
    } = src;

    // ORDER 4-12 alfanumérico; si no llega, generamos uno
    const baseOrder = orderId
      ? String(orderId).replace(/[^A-Z0-9]/gi, "").toUpperCase()
      : (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase();
    const ORDER = baseOrder.replace(/[^A-Z0-9]/g, "").slice(-12);
    if (ORDER.length < 4) return res.status(400).send("orderId debe tener 4–12 alfanuméricos");

    // Cantidad en céntimos (string)
    let cents = amountCents != null ? String(parseInt(amountCents, 10)) : null;
    if (!cents && amount != null) {
      const euros = String(amount).replace(",", ".");
      cents = String(Math.round(Number(euros) * 100));
    }
    if (!cents || !/^\d+$/.test(cents) || Number(cents) < 1) {
      return res.status(400).send("amountCents/amount inválido");
    }

    // URLs absolutas https (acepta por parámetros o por ENV fallback)
    const URL_OK = isHttpsAbsolute(okUrl) ? okUrl : process.env.REDSYS_URL_OK;
    const URL_KO = isHttpsAbsolute(koUrl) ? koUrl : process.env.REDSYS_URL_KO;
    const URL_NOTIFY = isHttpsAbsolute(notifyUrl) ? notifyUrl : process.env.REDSYS_NOTIFY_URL;

    if (!isHttpsAbsolute(URL_OK) || !isHttpsAbsolute(URL_KO)) {
      return res.status(400).send("Faltan okUrl/koUrl https absolutas (o define REDSYS_URL_OK/REDSYS_URL_KO)");
    }

    const params = {
      DS_MERCHANT_AMOUNT: cents,
      DS_MERCHANT_ORDER: ORDER,
      DS_MERCHANT_MERCHANTCODE: String(FUC),
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: "0",
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_URLOK: URL_OK,
      DS_MERCHANT_URLKO: URL_KO,
      ...(URL_NOTIFY ? { DS_MERCHANT_MERCHANTURL: URL_NOTIFY } : {}),
    };
    if (payMethod === "bizum") params.DS_MERCHANT_PAYMETHODS = "z";

    const Ds_MerchantParameters = encodeMerchantParams(params);
    const Ds_Signature = signV2(Ds_MerchantParameters, ORDER);

    const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Conectando con el banco…</title>
<body onload="document.forms[0].submit()" style="font-family:sans-serif">
  <p>Redirigiendo al TPV…</p>
  <form method="post" action="${REDSYS_URL}">
    <input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA512_V2">
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
