import crypto from "crypto";

const SECRET_B64 = process.env.REDSYS_SECRET_B64;
const FUC = process.env.REDSYS_FUC;
const TERMINAL = process.env.REDSYS_TERMINAL || "001";
const CURRENCY = "978";

const b64 = (s) => Buffer.from(s, "utf8").toString("base64");
const b64json = (o) => b64(JSON.stringify(o));
const b64url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

function deriveKey(order) {
  const key = Buffer.from(SECRET_B64, "base64");
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(order, "utf8"), cipher.final()]);
}
function sign(mpB64, order) {
  const key = deriveKey(order);
  const h = crypto.createHmac("sha256", key).update(mpB64).digest();
  return b64url(h);
}

// --- CORS helper ---
function setCors(req, res) {
  const allowed = new Set([
    "https://app.lapurisimaconchi.com", // prod
    "http://localhost:5173",             // Vite típico
    "http://localhost:5174",
    "http://localhost:5179",             // <-- mi caso
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5179",
  ]);
  const origin = req.headers.origin;
  if (allowed.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400"); // cachea el preflight
}


export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end(); // 204 OK preflight
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { orderId, amountCents, okUrl, koUrl, notifyUrl, payMethod } = req.body || {};

    if (!SECRET_B64 || !FUC) {
      return res.status(500).json({ error: "Faltan variables REDSYS_SECRET_B64 o REDSYS_FUC" });
    }
    if (!orderId || !amountCents || !okUrl || !koUrl) {
      return res.status(400).json({ error: "Faltan campos obligatorios (orderId, amountCents, okUrl, koUrl)" });
    }

    const params = {
      DS_MERCHANT_AMOUNT: String(amountCents),
      DS_MERCHANT_ORDER: String(orderId),
      DS_MERCHANT_MERCHANTCODE: String(FUC),
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: "0",
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_URLOK: okUrl,
      DS_MERCHANT_URLKO: koUrl,
      DS_MERCHANT_MERCHANTURL: notifyUrl,
    };
    if (payMethod === "bizum") params.DS_MERCHANT_PAYMETHODS = "z";

    const mpB64 = b64json(params);
    const signature = sign(mpB64, String(orderId));

    const payload = {
      endpoint: "https://sis-t.redsys.es/sis/realizarPago",
      Ds_SignatureVersion: "HMAC_SHA256_V1",
      Ds_MerchantParameters: mpB64,
      Ds_Signature: signature,
    };

    return res.status(200).json(payload);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error creando sesión TPV" });
  }
}
