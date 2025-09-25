// /api/notificacionTPV.js
import crypto from "crypto";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { applyCors } from "./_cors.js";

export const config = { runtime: "nodejs" };

// --- Firebase ---
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- Redsys ---
const SECRET_B64 = process.env.REDSYS_SECRET_B64;

// Deriva clave 3DES-CBC(order) como pide Redsys (HMAC-SHA256)
function deriveKey(order) {
  const key = Buffer.from(SECRET_B64, "base64");
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}

// Firma binaria (Buffer) del MerchantParameters Base64
function signBinary(mpB64, order) {
  const key = deriveKey(order);
  return crypto.createHmac("sha256", key).update(mpB64).digest(); // Buffer
}

// Normaliza y parsea el body de Redsys (x-www-form-urlencoded)
function parseIncoming(req) {
  if (req.method === "POST") {
    if (typeof req.body === "string") {
      // Vercel puede entregar el body como string si es urlencoded
      const m = Object.fromEntries(new URLSearchParams(req.body));
      return m;
    }
    if (req.body && typeof req.body === "object") {
      return req.body;
    }
  }
  // fallback para pruebas con GET
  return req.query || {};
}

export default async function handler(req, res) {
  // Opcional: CORS para tests desde navegador
  if (applyCors(req, res)) return;

  try {
    const incoming = parseIncoming(req);
    const Ds_MerchantParameters = incoming?.Ds_MerchantParameters;
    const Ds_Signature = incoming?.Ds_Signature;

    if (!Ds_MerchantParameters || !Ds_Signature) {
      return res.status(400).send("KO");
    }

    // Decodifica MerchantParameters
    const decoded = JSON.parse(
      Buffer.from(Ds_MerchantParameters, "base64").toString("utf8")
    );

    // Extrae ORDER del mensaje
    const order =
      decoded.Ds_Order ||
      decoded.DS_ORDER ||
      decoded.DS_MERCHANT_ORDER ||
      decoded.Ds_Merchant_Order;

    if (!order) {
      // Sin order no podemos derivar clave → KO
      return res.status(400).send("KO");
    }

    // Firma local (Buffer)
    const localSigBuf = signBinary(Ds_MerchantParameters, order);

    // Firma remota → Buffer (acepta Base64 o Base64URL)
    const remoteB64 = String(Ds_Signature).replace(/-/g, "+").replace(/_/g, "/");
    const remoteSigBuf = Buffer.from(remoteB64, "base64");

    // Comparación segura
    const firmaOk =
      remoteSigBuf.length === localSigBuf.length &&
      crypto.timingSafeEqual(remoteSigBuf, localSigBuf);

    // Autorizada si Ds_Response < 100 (numérico)
    const respNum = parseInt(decoded.Ds_Response, 10);
    const autorizada = Number.isFinite(respNum) && respNum < 100;

    if (firmaOk && autorizada) {
      // Guarda mínimo necesario; si quieres todo, guarda decoded tal cual
      await push(ref(db, `reservas_confirmadas/${order}`), decoded);
      return res.status(200).send("OK");
    }

    // (Opcional) Log mínimo de fallos de firma/resp en otra rama
    // await push(ref(db, `reservas_fallidas/${order || "sin_order"}`), { decoded, firmaOk, respNum });

    return res.status(400).send("KO");
  } catch (e) {
    console.error("notify error:", e);
    return res.status(500).send("KO");
  }
}
