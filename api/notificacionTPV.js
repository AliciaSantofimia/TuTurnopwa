// api/notificacionTPV.js
import crypto from "crypto";
import { adminDb } from "./_firebaseAdmin.js";

export const config = { runtime: "nodejs" };

function getSecretKey() {
  const secret = (process.env.REDSYS_SECRET_KEY || "").trim();
  if (!secret) throw new Error("Falta REDSYS_SECRET_KEY");
  return Buffer.from(secret, "base64");
}

function normalize3DESKey24(key) {
  if (key.length === 16) return Buffer.concat([key, key.slice(0, 8)]);
  if (key.length === 24) return key;
  if (key.length > 24) return key.slice(0, 24);
  return Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
}

function deriveKey(order) {
  const key = normalize3DESKey24(getSecretKey());
  const iv = Buffer.alloc(8, 0);

  const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
  cipher.setAutoPadding(true);

  return Buffer.concat([
    cipher.update(order, "utf8"),
    cipher.final(),
  ]);
}

function isPaidResponse(data) {
  const code = Number(data.Ds_Response || data.DS_RESPONSE || -1);
  return code >= 0 && code <= 99;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { Ds_MerchantParameters, Ds_Signature } = req.body || {};

    const decoded = JSON.parse(
      Buffer.from(Ds_MerchantParameters, "base64").toString("utf8")
    );

    const order =
      decoded.Ds_Order ||
      decoded.DS_ORDER ||
      decoded.DS_MERCHANT_ORDER;

    const key = deriveKey(order);

    const expected = crypto
      .createHmac("sha256", key)
      .update(Ds_MerchantParameters, "utf8")
      .digest("base64");

    const signOk = expected === Ds_Signature;

    const paidOk = isPaidResponse(decoded);

    console.log("TPV notify:", {
      signOk,
      paidOk,
      order,
      responseCode: decoded.Ds_Response,
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