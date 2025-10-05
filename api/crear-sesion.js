// api/crear-sesion.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };


/**
 * ENVs necesarias (Vercel):
 * - REDSYS_FUC                 (test o prod, según entorno)
 * - REDSYS_TERMINAL            (p.ej. "001")
 * - REDSYS_SECRET              (recomendado; si tu banco te dijo 16 primeros, pon EXACTAMENTE esos 16)
 * - (opc) REDSYS_SECRET_B64    (si algún día te dan la clave en base64; si existe, se prioriza)
 * - (opc) REDSYS_CURRENCY      (por defecto "978")
 * - (opc) REDSYS_URL           (si no, usa sandbox/prod por defecto)
 * - (opc) REDSYS_URL_OK / REDSYS_URL_KO / REDSYS_NOTIFY_URL
 * - VERCEL_ENV: "production" => prod, otro => sandbox
 */
const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = process.env.REDSYS_CURRENCY || "978";

const URL_TEST = "https://sis-t.redsys.es/sis/realizarPago"; // sin :25443
const URL_PROD = "https://sis.redsys.es/sis/realizarPago";
const isProd = process.env.VERCEL_ENV === "production";

// Normaliza un endpoint si viene con :25443 en sandbox (por si acaso)
function normalizeEndpoint(u) {
  if (!u) return null;
  return u.replace("sis-t.redsys.es:25443", "sis-t.redsys.es");
}
const REDSYS_URL =
  normalizeEndpoint(process.env.REDSYS_URL) || (isProd ? URL_PROD : URL_TEST);

// ---------- utils ----------
function b64stdFromJson(obj) {
  const json = JSON.stringify(obj);
  return Buffer.from(json, "utf8").toString("base64"); // Base64 estándar
}
function httpsAbs(u) {
  return typeof u === "string" && /^https:\/\//i.test(u);
}

// === Clave y firma v1 (HMAC_SHA256_V1) ===
function getSecretRawBytes() {
  // 1) Si hay base64 explícito, úsalo
  const b64 = (process.env.REDSYS_SECRET_B64 || "").trim();
  if (b64) {
    const raw = Buffer.from(b64, "base64"); // puede dar 16, 24, 32...
    if (raw.length > 0) return raw;
  }
  // 2) Si hay "texto" (tu caso actual), úsalo tal cual.
  const txt = (process.env.REDSYS_SECRET || "").trim();
  if (txt) {
    // Si accidentalmente alguien pega base64 aquí, también lo soportamos:
    try {
      const asB64 = Buffer.from(txt, "base64");
      if (asB64.length > 0) return asB64;
    } catch {}
    // Si es hex:
    if (/^[0-9a-fA-F]+$/.test(txt) && txt.length % 2 === 0) {
      const asHex = Buffer.from(txt, "hex");
      if (asHex.length > 0) return asHex;
    }
    // Por defecto: UTF-8 (lo normal si te dijeron "usa los 16 primeros caracteres")
    return Buffer.from(txt, "utf8");
  }
  throw new Error("Falta o no es válida la clave del TPV (REDSYS_SECRET*_).");
}

function normalize3DESKey(raw) {
  // 3DES admite 16 o 24 bytes. Arreglamos casos típicos.
  let key = Buffer.from(raw);
  if (key.length === 16) {
    // 2-key 3DES -> expandimos a 24 (K1||K2||K1)
    key = Buffer.concat([key, key.slice(0, 8)]);
  } else if (key.length > 24) {
    key = key.slice(0, 24);
  } else if (key.length < 16) {
    const k16 = Buffer.concat([key, Buffer.alloc(16 - key.length, 0)]);
    key = Buffer.concat([k16, k16.slice(0, 8)]);
  } else if (key.length > 16 && key.length < 24) {
    key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
  }
  // Ahora debería ser 24
  if (!(key.length === 24 || key.length === 16)) {
    throw new Error("Clave TPV no normalizable a 3DES (esperado 16/24 bytes).");
  }
  return key.length === 16 ? Buffer.concat([key, key.slice(0, 8)]) : key; // 24
}

function deriveKeyV1(order) {
  const raw = getSecretRawBytes();
  const key = normalize3DESKey(raw);  // 24 bytes finales
  const algo = key.length === 24 ? "des-ede3-cbc" : "des-ede-cbc";
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv(algo, key, iv);
  cipher.setAutoPadding(true);
  const enc = Buffer.concat([
    cipher.update(String(order), "utf8"),
    cipher.final(),
  ]);
  return enc; // bytes derivados
}

function signV1(Ds_MerchantParameters_b64, order) {
  const k = deriveKeyV1(order);
  // Base64 ESTÁNDAR (no url-safe)
  return crypto.createHmac("sha256", k)
    .update(Ds_MerchantParameters_b64, "utf8")
    .digest("base64");
}

// ---------- handler ----------
export default function handler(req, res) {
  const isGet = req.method === "GET";
  const isPost = req.method === "POST";
  if (!isGet && !isPost) return res.status(405).end();

  // Lee query/body
  const src = isGet ? (req.query || {}) : (req.body || {});

  // --- MODO DIAGNÓSTICO: salir antes de cualquier otra validación ---
  if ((src.mode || "").toString().toLowerCase() === "diag") {
    try {
      const raw = getSecretRawBytes();
      const key24 = normalize3DESKey(raw);
      return res.status(200).json({
        ok: true,
        rawLen: raw.length,   // longitud leída desde tu ENV (esperado 16 si te dijeron "16 primeros")
        keyLen: key24.length, // debe ser 24
        note: "Si keyLen=24, la clave es válida para 3DES",
      });
    } catch (e) {
      return res.status(500).json({ ok: false, error: e.message });
    }
  }

  // Validaciones mínimas (después del modo diag)
  if (!FUC) return res.status(500).send("Falta REDSYS_FUC");
  if (!process.env.REDSYS_SECRET_B64 && !process.env.REDSYS_SECRET)
    return res.status(500).send("Falta clave REDSYS_SECRET_B64 o REDSYS_SECRET");

  try {
    const { orderId, amountCents, amount, okUrl, koUrl, notifyUrl, payMethod } = src;

    // ORDER 4–12 (empieza por dígito)
    let oid = String(orderId ?? Date.now()).replace(/\D/g, "");
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
    oid = oid.padStart(12, "0").slice(-12);
    if (!/^\d/.test(oid)) oid = "9" + oid.slice(1);

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

    const Ds_MerchantParameters = b64stdFromJson(params); // Base64 estándar
    const Ds_Signature = signV1(Ds_MerchantParameters, oid);
    const Ds_SignatureVersion = "HMAC_SHA256_V1";

    // ---- Modo diagnóstico de salida ----
    if ((src.mode || "").toString().toLowerCase() === "json") {
      return res.status(200).json({
        action: REDSYS_URL,
        Ds_SignatureVersion,
        Ds_MerchantParameters,
        Ds_Signature,
        parsed: params,
      });
    }

    // ---- HTML con <form> auto-submit ----  (names en minúsculas)
    const html = `<!doctype html><html lang="es"><meta charset="utf-8">
<title>Conectando con el banco…</title>
<body onload="document.forms[0].submit()" style="font-family:sans-serif">
  <p>Redirigiendo al TPV…</p>
  <form method="post" action="${REDSYS_URL}">
    <input type="hidden" name="ds_signatureversion" value="${Ds_SignatureVersion}">
    <input type="hidden" name="ds_merchantparameters" value="${Ds_MerchantParameters}">
    <input type="hidden" name="ds_signature" value="${Ds_Signature}">
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
