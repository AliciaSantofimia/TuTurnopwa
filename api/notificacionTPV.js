// api/notificacionTPV.js
import crypto from "crypto";
import { adminDb } from "./_firebaseAdmin.js";

export const config = { runtime: "nodejs" };

function getSecretKey() {
  const secret = (process.env.REDSYS_SECRET_KEY || "").trim();
  if (!secret) throw new Error("Falta REDSYS_SECRET_KEY");
  return Buffer.from(secret, "base64");
}

/** Firma Redsys HMAC_SHA256_V1: HMAC-SHA256(clave Base64 decodificada, Ds_MerchantParameters literal) */
function computeSignatureHmacSha256V1(dsMerchantParameters) {
  const key = getSecretKey();
  return crypto
    .createHmac("sha256", key)
    .update(dsMerchantParameters, "utf8")
    .digest("base64");
}

function signaturesEqual(a, b) {
  if (a == null || b == null || a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
  } catch {
    return false;
  }
}

function isPaidResponse(data) {
  const raw = data.Ds_Response ?? data.DS_RESPONSE;
  const code = Number(raw);
  return Number.isFinite(code) && code >= 0 && code <= 99;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { Ds_MerchantParameters, Ds_Signature } = req.body || {};

    if (!Ds_MerchantParameters || !Ds_Signature) {
      console.warn("TPV notify: faltan parámetros");
      return res.status(200).send("BAD");
    }

    const decoded = JSON.parse(
      Buffer.from(Ds_MerchantParameters, "base64").toString("utf8")
    );

    const order =
      decoded.Ds_Order ||
      decoded.DS_ORDER ||
      decoded.DS_MERCHANT_ORDER;

    const expected = computeSignatureHmacSha256V1(Ds_MerchantParameters);
    const signOk = signaturesEqual(expected, Ds_Signature);

    const paidOk = isPaidResponse(decoded);

    console.log("TPV notify:", {
      signOk,
      paidOk,
      order,
      responseCode: decoded.Ds_Response ?? decoded.DS_RESPONSE,
    });

    if (!signOk) return res.status(200).send("BAD SIGN");

    const ref = adminDb.ref(`pedidosPendientes/${order}`);
    const snap = await ref.get();

    if (!snap.exists()) {
      console.warn("Pedido no encontrado:", order);
      return res.status(200).send("OK");
    }

    await ref.update({
      estadoPago: paidOk ? "pagado" : "rechazado",
      procesado: paidOk,
      firmaValida: true,
      actualizadoEn: new Date().toISOString(),
    });

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    return res.status(200).send("BAD");
  }
}