// api/crear-sesion.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };

/**
 * ENVs (Vercel, Production):
 * - REDSYS_FUC, REDSYS_TERMINAL, REDSYS_CURRENCY(=978)
 * - REDSYS_URL_TEST (https://sis-t.redsys.es:25443/sis/realizarPago)
 * - REDSYS_URL_PROD (https://sis.redsys.es/sis/realizarPago)
 * - REDSYS_URL_OK, REDSYS_URL_KO, REDSYS_NOTIFY_URL  (https://...)
 * - REDSYS_FORCE_TEST="1"  (para forzar sandbox en prod)
 * - REDSYS_SIG_VERSION="V2" | "V1"   (por defecto V2)
 *   * V1: REDSYS_SECRET_B64  (clave completa en Base64)
 *   * V2: REDSYS_SECRET_TXT  (clave en TEXTO; se usan los 16 PRIMEROS caracteres)
 */

const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";
const SIG_VERSION = (process.env.REDSYS_SIG_VERSION || "V2").toUpperCase();

const forceTest = process.env.REDSYS_FORCE_TEST === "1";
const isProdEnv = process.env.VERCEL_ENV === "production" && !forceTest;

const TPV_URL = isProdEnv
  ? (process.env.REDSYS_URL_PROD || "https://sis.redsys.es/sis/realizarPago")
  : (process.env.REDSYS_URL_TEST || "https://sis-t.redsys.es:25443/sis/realizarPago");

// ---------- utils ----------
const toBase64Url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

const jsonToStdB64 = (obj) => Buffer.from(JSON.stringify(obj), "utf8").toString("base64");
const isHttps = (u) => typeof u === "string" && /^https:\/\//i.test(u);

// ---------- V1: 3DES + HMAC-SHA256 ----------
function getSecretBytesV1() {
  const b64 = (process.env.REDSYS_SECRET_B64 || "").trim();
  if (!b64) throw new Error("Falta REDSYS_SECRET_B64 (V1)");
  const raw = Buffer.from(b64, "base64");
  if (!raw.length) throw new Error("REDSYS_SECRET_B64 inválida (V1)");
  return raw;
}
function normalize3DESKey24(raw) {
  let key = Buffer.from(raw);
  if (key.length === 16) key = Buffer.concat([key, key.slice(0, 8)]);
  if (key.length > 24) key = key.slice(0, 24);
  if (key.length < 24) key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
  if (key.length !== 24) throw new Error("Clave 3DES no válida (V1)");
  return key;
}
function deriveKeyV1(order) {
  const key24 = normalize3DESKey24(getSecretBytesV1());
  const iv = Buffer.alloc(8, 0x00);
  const cipher = crypto.createCipheriv("des-ede3-cbc", key24, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}
function signV1(paramsB64, order) {
  const k = deriveKeyV1(order);
  // Base64 ESTÁNDAR
  return crypto.createHmac("sha256", k).update(paramsB64, "utf8").digest("base64");
}

// ---------- V2: AES-128 + HMAC-SHA512 ----------
function key16FromSecretTxt() {
  const txt = (process.env.REDSYS_SECRET_TXT || "").trim();
  if (!txt) throw new Error("Falta REDSYS_SECRET_TXT (V2)");
  const sixteen = txt.slice(0, 16);       // 16 primeros CARACTERES
  let k = Buffer.from(sixteen, "utf8");   // a bytes (UTF-8)
  if (k.length < 16) k = Buffer.concat([k, Buffer.alloc(16 - k.length, 0x00)]);
  if (k.length > 16) k = k.subarray(0, 16);
  return k; // 16 bytes
}
function deriveKeyV2(order) {
  const k16 = key16FromSecretTxt();
  const iv = Buffer.alloc(16, 0x00);
  const cipher = crypto.createCipheriv("aes-128-cbc", k16, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}
function signV2(paramsB64, order) {
  const k = deriveKeyV2(order);
  const digest = crypto.createHmac("sha512", k).update(paramsB64, "utf8").digest();
  return toBase64Url(digest); // Base64URL (sin "=")
}

// ---------- handler ----------
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  const src = isGet ? (req.query || {}) : (req.body || {});

  if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
  // Validación de clave según versión
  if (SIG_VERSION === "V2") {
    if (!process.env.REDSYS_SECRET_TXT) return res.status(500).send("Falta REDSYS_SECRET_TXT (V2)");
  } else {
    if (!process.env.REDSYS_SECRET_B64) return res.status(500).send("Falta REDSYS_SECRET_B64 (V1)");
  }

  try {
    const { orderId, amountCents, amount, okUrl, koUrl, notifyUrl, payMethod, mode } = src;

    // ORDER: numérico 4–12
    let oid = String(orderId ?? Date.now()).replace(/\D/g, "");
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
    oid = oid.padStart(12, "0").slice(-12);

    // Importe céntimos
    let cents = amountCents != null ? String(parseInt(amountCents, 10)) : null;
    if (!cents && amount != null) {
      const euros = String(amount).replace(",", ".");
      cents = String(Math.round(Number(euros) * 100));
    }
    if (!cents || !/^\d+$/.test(cents) || Number(cents) < 1) {
      return res.status(400).send("amountCents/amount inválido");
    }

    const URL_OK = isHttps(okUrl) ? okUrl : process.env.REDSYS_URL_OK;
    const URL_KO = isHttps(koUrl) ? koUrl : process.env.REDSYS_URL_KO;
    const URL_NOTIFY = isHttps(notifyUrl) ? notifyUrl : process.env.REDSYS_NOTIFY_URL;
    if (!isHttps(URL_OK) || !isHttps(URL_KO)) {
      return res.status(400).send("Faltan okUrl/koUrl https (o define REDSYS_URL_OK/KO)");
    }

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

    const Ds_MerchantParameters = jsonToStdB64(dsJson);

    let Ds_SignatureVersion, Ds_Signature;
    if (SIG_VERSION === "V2") {
      Ds_SignatureVersion = "HMAC_SHA512_V2";
      Ds_Signature = signV2(Ds_MerchantParameters, dsJson.DS_MERCHANT_ORDER);
    } else {
      Ds_SignatureVersion = "HMAC_SHA256_V1";
      Ds_Signature = signV1(Ds_MerchantParameters, dsJson.DS_MERCHANT_ORDER);
    }

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
