// api/crear-sesion.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };

/**
 * ENVs necesarias (Vercel):
 * - REDSYS_FUC                 (FUC)
 * - REDSYS_TERMINAL            (p.ej. "001")
 * - REDSYS_SECRET_B64          (clave COMPLETA en Base64, p.ej. sq7Hjr...)
 * - (opc) REDSYS_CURRENCY      (por defecto "978")
 * - REDSYS_URL_TEST            (https://sis-t.redsys.es:25443/sis/realizarPago)
 * - REDSYS_URL_PROD            (https://sis.redsys.es/sis/realizarPago)
 * - REDSYS_URL_OK              (https://.../pago/exito)
 * - REDSYS_URL_KO              (https://.../pago/error)
 * - REDSYS_NOTIFY_URL          (https://.../api/notificacionTPV)
 * - (opc) REDSYS_FORCE_TEST    ("1" para forzar sandbox aunque Vercel esté en production)
 */

const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";

// Selección del endpoint (permite forzar TEST)
const forceTest = process.env.REDSYS_FORCE_TEST === "1";
const isProdEnv = process.env.VERCEL_ENV === "production" && !forceTest;

const TPV_URL = isProdEnv
  ? (process.env.REDSYS_URL_PROD || "https://sis.redsys.es/sis/realizarPago")
  : (process.env.REDSYS_URL_TEST || "https://sis-t.redsys.es:25443/sis/realizarPago");

// ---------- utils ----------
const toBase64Url = (buf) =>
  Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const jsonToStdB64 = (obj) =>
  Buffer.from(JSON.stringify(obj), "utf8").toString("base64");

const isHttps = (u) => typeof u === "string" && /^https:\/\//i.test(u);

// === Clave y firma v1 (HMAC_SHA256_V1) ===
function getSecretBytesV1() {
  const b64 = (process.env.REDSYS_SECRET_B64 || "").trim();
  if (!b64) throw new Error("Falta REDSYS_SECRET_B64");
  const raw = Buffer.from(b64, "base64"); // debería dar 24 bytes en test
  if (raw.length === 0) throw new Error("REDSYS_SECRET_B64 inválida");
  return raw;
}

function normalize3DESKey24(raw) {
  // 3DES admite 16 o 24; estandarizamos a 24 (K1||K2||K1 si viene 16)
  let key = Buffer.from(raw);
  if (key.length === 16) key = Buffer.concat([key, key.slice(0, 8)]);
  if (key.length > 24) key = key.slice(0, 24);
  if (key.length < 24) key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
  if (key.length !== 24) throw new Error("Clave 3DES no válida (esperado 24 bytes)");
  return key;
}

// Derivar clave con 3DES-CBC(IV=0) usando Ds_Order
function deriveKeyV1(order) {
  const secretRaw = getSecretBytesV1();
  const key24 = normalize3DESKey24(secretRaw);
  const iv = Buffer.alloc(8, 0x00);
  const cipher = crypto.createCipheriv("des-ede3-cbc", key24, iv);
  cipher.setAutoPadding(true);
  const enc = Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
  return enc; // bytes derivados -> clave HMAC
}

// HMAC-SHA256 sobre el Base64 de Ds_MerchantParameters -> Base64 URL-safe
function signV1(paramsB64, order) {
  const hmacKey = deriveKeyV1(order);
  const h = crypto.createHmac("sha256", hmacKey).update(paramsB64, "utf8").digest();
  return toBase64Url(h);
}

// ---------- handler ----------
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  // Fuente de parámetros
  const src = isGet ? (req.query || {}) : (req.body || {});

  // Validaciones mínimas
  if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
  if (!process.env.REDSYS_SECRET_B64) return res.status(500).send("Falta REDSYS_SECRET_B64");

  try {
    const { orderId, amountCents, amount, okUrl, koUrl, notifyUrl, payMethod, mode } = src;

    // ORDER: numérico, 4–12 chars. Si no llega uno válido, generamos.
    let oid = String(orderId ?? Date.now()).replace(/\D/g, "");
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
    oid = oid.padStart(12, "0").slice(-12);

    // Importe en céntimos (string)
    let cents = amountCents != null ? String(parseInt(amountCents, 10)) : null;
    if (!cents && amount != null) {
      const euros = String(amount).replace(",", ".");
      cents = String(Math.round(Number(euros) * 100));
    }
    if (!cents || !/^\d+$/.test(cents) || Number(cents) < 1) {
      return res.status(400).send("amountCents/amount inválido");
    }

    // URLs (o fallback de ENV)
    const URL_OK = isHttps(okUrl) ? okUrl : process.env.REDSYS_URL_OK;
    const URL_KO = isHttps(koUrl) ? koUrl : process.env.REDSYS_URL_KO;
    const URL_NOTIFY = isHttps(notifyUrl) ? notifyUrl : process.env.REDSYS_NOTIFY_URL;
    if (!isHttps(URL_OK) || !isHttps(URL_KO)) {
      return res.status(400).send("Faltan okUrl/koUrl https (o define REDSYS_URL_OK/KO)");
    }

    // Parámetros Redsys
    const dsJson = {
      DS_MERCHANT_AMOUNT: cents,
      DS_MERCHANT_ORDER: oid,
      DS_MERCHANT_MERCHANTCODE: String(FUC),
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: "0",
      DS_MERCHANT_URLOK: URL_OK,
      DS_MERCHANT_URLKO: URL_KO,
      ...(URL_NOTIFY ? { DS_MERCHANT_MERCHANTURL: URL_NOTIFY } : {}),
      ...(payMethod === "bizum" ? { DS_MERCHANT_PAYMETHODS: "z" } : {}),
    };

    // 1) Base64 estándar del JSON
    const Ds_MerchantParameters = jsonToStdB64(dsJson);

    // 2) Firma V1 (3DES → HMAC-SHA256 → Base64 URL-safe)
    const Ds_Signature = signV1(Ds_MerchantParameters, dsJson.DS_MERCHANT_ORDER);

    // 3) Versión
    const Ds_SignatureVersion = "HMAC_SHA256_V1";

    // --- Salida modo JSON (diagnóstico/front que monta su propio <form>) ---
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

    // --- HTML con <form> auto-submit (recomendado) ---
    const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Conectando con el banco…</title>
<body onload="document.forms[0].submit()" style="font-family:sans-serif">
  <p>Redirigiendo al TPV…</p>
  <form method="post" action="${TPV_URL}">
    <input type="hidden" name="Ds_SignatureVersion" value="${Ds_SignatureVersion}">
    <input type="hidden" name="Ds_MerchantParameters" value='${Ds_MerchantParameters}'>
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
