// api/notificacionTPV.js
import crypto from "crypto";
export const config = { runtime: "nodejs" };

const SIG_VERSION = (process.env.REDSYS_SIG_VERSION || "V2").toUpperCase();

const b64urlToStd = (s) => s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4);

function key16FromSecretTxt() {
  const txt = (process.env.REDSYS_SECRET_TXT || "").trim();
  if (!txt) throw new Error("Falta REDSYS_SECRET_TXT");
  let k = Buffer.from(txt.slice(0, 16), "utf8");
  if (k.length < 16) k = Buffer.concat([k, Buffer.alloc(16 - k.length, 0)]);
  return k;
}
function deriveKeyV2(order) {
  const k16 = key16FromSecretTxt();
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv("aes-128-cbc", k16, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}
function getSecretV1Bytes() {
  const b64 = (process.env.REDSYS_SECRET_B64 || "").trim();
  if (!b64) throw new Error("Falta REDSYS_SECRET_B64");
  return Buffer.from(b64, "base64");
}
function normalize3DESKey24(raw) {
  let key = Buffer.from(raw);
  if (key.length === 16) key = Buffer.concat([key, key.slice(0, 8)]);
  if (key.length > 24) key = key.slice(0, 24);
  if (key.length < 24) key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
  return key;
}
function deriveKeyV1(order) {
  const key24 = normalize3DESKey24(getSecretV1Bytes());
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv("des-ede3-cbc", key24, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}

export default function handler(req, res) {
  const isPost = req.method === "POST";
  if (!isPost) return res.status(405).end();

  try {
    const { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = req.body || {};

    // Decodifica parámetros (Base64 estándar)
    const jsonStr = Buffer.from(Ds_MerchantParameters, "base64").toString("utf8");
    const data = JSON.parse(jsonStr);
    const order = data.Ds_Order || data.DS_ORDER || data.DS_MERCHANT_ORDER;

    // Recalcula firma
    let expected;
    if ((Ds_SignatureVersion || "").includes("512") || SIG_VERSION === "V2") {
      const k = deriveKeyV2(order);
      const digest = crypto.createHmac("sha512", k).update(Ds_MerchantParameters, "utf8").digest();
      expected = digest.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    } else {
      const k = deriveKeyV1(order);
      expected = crypto.createHmac("sha256", k).update(Ds_MerchantParameters, "utf8").digest("base64");
    }

    const ok = expected === (Ds_Signature || "").trim();

    // *** Aquí ya puedes actualizar tu reserva/pedido ***
    console.log("TPV notify:", { ok, order, raw: data });

    res.status(200).send(ok ? "OK" : "BAD SIGN");
  } catch (e) {
    console.error(e);
    res.status(200).send("BAD");
  }
}
