// api/crear-sesion.js
import crypto from "crypto";
// OJO: NO usamos CORS aquí. Este endpoint devuelve HTML con formulario (no XHR).
export const config = { runtime: "nodejs" };

/**
 * ENVs necesarias en Vercel:
 * - REDSYS_FUC             (p.ej. "999008881" en TEST)
 * - REDSYS_TERMINAL        (p.ej. "001")
 * - (una de estas) REDSYS_SECRET  (texto)  ||  REDSYS_SECRET_B64  (base64)
 * - (opcional) REDSYS_CURRENCY    (por defecto "978")
 * - (opcional) REDSYS_URL         (si la pones, debe ser el endpoint completo)
 * - VERCEL_ENV: "production" para PROD, otro valor para TEST
 */
const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";
const SECRET_TXT = process.env.REDSYS_SECRET || null;
const SECRET_B64 = process.env.REDSYS_SECRET_B64 || null;

const URL_TEST = "https://sis-t.redsys.es:25443/sis/realizarPago";
const URL_PROD = "https://sis.redsys.es/sis/realizarPago";
const isProd = process.env.VERCEL_ENV === "production";

function normalizeEndpoint(u) {
  if (!u) return null;
  if (u.includes("sis-t.redsys.es") && !u.includes(":25443")) {
    return u.replace("sis-t.redsys.es", "sis-t.redsys.es:25443");
  }
  return u;
}
const REDSYS_URL =
  normalizeEndpoint(process.env.REDSYS_URL) || (isProd ? URL_PROD : URL_TEST);

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

// Clave base para AES-128-CBC: de REDSYS_SECRET (texto) o REDSYS_SECRET_B64 (decodificada)
function getAesKey16() {
  if (SECRET_TXT) return Buffer.from(SECRET_TXT, "utf8").slice(0, 16);
  if (SECRET_B64) return Buffer.from(SECRET_B64, "base64").slice(0, 16);
  throw new Error("Falta REDSYS_SECRET o REDSYS_SECRET_B64");
}

// Derivación (V2): AES-128-CBC con IV=0x00 sobre el ORDER → clave por operación
function deriveKeyV2(order) {
  const key16 = getAesKey16();
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv("aes-128-cbc", key16, iv);
  const enc = Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
  return enc; // bytes
}

// Firma V2: HMAC-SHA512 sobre Ds_MerchantParameters (Base64URL), con clave derivada
function signV2(Ds_MerchantParameters, order) {
  const k = deriveKeyV2(order);
  const mac = crypto.createHmac("sha512", k).update(Ds_MerchantParameters, "utf8").digest();
  return toB64Url(mac);
}

// ---------- Handler ----------
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  try {
    if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
    if (!SECRET_TXT && !SECRET_B64) return res.status(500).send("Falta REDSYS_SECRET o REDSYS_SECRET_B64");

    // Recogemos parámetros (aceptamos GET o POST)
    const src = isGet ? (req.query || {}) : (req.body || {});
    // Si ya vienes con "céntimos" (amountCents), lo respetamos; si vinieras con "amount" en euros, conviértelo.
    const {
      orderId,           // recomendado: que te llegue una referencia interna; si no, genera abajo
      amountCents,       // string/int de céntimos (p.ej. "249" para 2,49 €)
      amount,            // opcional: euros con punto/coma (p.ej. "2.49")
      okUrl, koUrl, notifyUrl,
      payMethod          // opcional: "bizum"
    } = src;

    // ORDER: 4–12 alfanumérico, único (si no te pasan, lo generamos)
    const baseOrder = orderId
      ? String(orderId).replace(/[^A-Z0-9]/gi, "").toUpperCase()
      : (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase();
    const ORDER = baseOrder.replace(/[^A-Z0-9]/g, "").slice(-12);
    if (ORDER.length < 4) return res.status(400).send("orderId debe tener 4–12 alfanuméricos");

    // Cantidad en céntimos (string)
    let cents = amountCents != null ? String(parseInt(amountCents, 10)) : null;
    if (!cents && amount != null) {
      const euros = String(amount).replace(",", "."); // "2,49" -> "2.49"
      cents = String(Math.round(Number(euros) * 100));
    }
    if (!cents || !/^\d+$/.test(cents) || Number(cents) < 1) {
      return res.status(400).send("amountCents/amount inválido");
    }

    if (!okUrl || !koUrl) return res.status(400).send("Faltan okUrl o koUrl");
    // notifyUrl (MerchantURL) recomendado pero no obligatorio para probar redirección
    const params = {
      DS_MERCHANT_AMOUNT: cents,
      DS_MERCHANT_ORDER: ORDER,
      DS_MERCHANT_MERCHANTCODE: String(FUC),
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: "0",
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_URLOK: okUrl,
      DS_MERCHANT_URLKO: koUrl,
      ...(notifyUrl ? { DS_MERCHANT_MERCHANTURL: notifyUrl } : {}),
    };
    if (payMethod === "bizum") params.DS_MERCHANT_PAYMETHODS = "z";

    // 1) Codificar parámetros a Base64URL
    const Ds_MerchantParameters = encodeMerchantParams(params);
    // 2) Firmar con V2 (AES + HMAC-SHA512)
    const Ds_Signature = signV2(Ds_MerchantParameters, ORDER);

    // 3) Devolver HTML con formulario auto-POST a Redsys (evita CORS)
    const html = `
<!doctype html><html lang="es"><meta charset="utf-8">
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
