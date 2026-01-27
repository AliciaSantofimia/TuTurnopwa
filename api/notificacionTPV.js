// api/notificacionTPV.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };

function getSecretBytes() {
  const k = (process.env.REDSYS_SECRET_KEY || "").trim();
  if (!k) throw new Error("Falta REDSYS_SECRET_KEY");

  // intenta Base64, si no, usa UTF-8
  try {
    const b = Buffer.from(k, "base64");
    if (b.length >= 16) return b;
  } catch {}
  return Buffer.from(k, "utf8");
}

function normalize3DESKey24(raw) {
  let key = Buffer.from(raw);
  if (key.length === 16) key = Buffer.concat([key, key.slice(0, 8)]);
  if (key.length > 24) key = key.slice(0, 24);
  if (key.length < 24) key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
  return key;
}

function deriveKeyV1(order) {
  const key24 = normalize3DESKey24(getSecretBytes());
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv("des-ede3-cbc", key24, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}

function signSHA256V1(paramsB64, order) {
  const k = deriveKeyV1(order);
  return crypto.createHmac("sha256", k).update(paramsB64, "utf8").digest("base64");
}

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = req.body || {};
    if (!Ds_MerchantParameters || !Ds_Signature) return res.status(200).send("BAD");

    // Decode merchant parameters
    const jsonStr = Buffer.from(Ds_MerchantParameters, "base64").toString("utf8");
    const data = JSON.parse(jsonStr);

    // Order suele venir como Ds_Order
    const order =
      data.Ds_Order ||
      data.DS_ORDER ||
      data.Ds_Merchant_Order ||
      data.DS_MERCHANT_ORDER ||
      "";

    const ver = String(Ds_SignatureVersion || "").toUpperCase();

    // Para tu caso: SHA256 V1
    let expected = signSHA256V1(Ds_MerchantParameters, order);

    const ok = expected === String(Ds_Signature).trim();

    console.log("TPV notify:", { ok, order, Ds_SignatureVersion: ver, raw: data });

    return res.status(200).send(ok ? "OK" : "BAD SIGN");
  } catch (e) {
    console.error(e);
    return res.status(200).send("BAD");
  }
}
