// api/notificacionTPV.js
import crypto from "crypto";
import { adminDb } from "./_firebaseAdmin.js";

export const config = { runtime: "nodejs" };

const SIG_VERSION = "V2";

function key16FromSecretTxt() {
  const txt = (process.env.REDSYS_SECRET_TXT || "").trim();
  if (!txt) throw new Error("Falta REDSYS_SECRET_TXT");
  let k = Buffer.from(txt.slice(0, 16), "utf8");
  if (k.length < 16) k = Buffer.concat([k, Buffer.alloc(16 - k.length, 0)]);
  if (k.length > 16) k = k.subarray(0, 16);
  return k;
}

function deriveKeyV2(order) {
  const k16 = key16FromSecretTxt();
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv("aes-128-cbc", k16, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(String(order), "utf8"), cipher.final()]);
}

function isPaidResponse(data) {
  const raw = data.Ds_Response || data.DS_RESPONSE || data.ds_response;
  const code = Number(raw);
  return Number.isFinite(code) && code >= 0 && code <= 99;
}

function normalizeSignature(sig = "") {
  return String(sig)
    .trim()
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = req.body || {};

    if (!Ds_MerchantParameters || !Ds_Signature) {
      return res.status(200).send("BAD");
    }

    const jsonStr = Buffer.from(Ds_MerchantParameters, "base64").toString("utf8");
    const data = JSON.parse(jsonStr);
    const order = data.Ds_Order || data.DS_ORDER || data.DS_MERCHANT_ORDER;

    if (!order) {
      console.error("TPV notify sin order:", data);
      return res.status(200).send("BAD");
    }

    const k = deriveKeyV2(order);
    const digest = crypto
      .createHmac("sha512", k)
      .update(Ds_MerchantParameters, "utf8")
      .digest();

    const expected = digest
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

    const signOk =
      normalizeSignature(expected) === normalizeSignature(Ds_Signature || "");

    const responseCode = Number(data.Ds_Response || data.DS_RESPONSE || -1);
    const paidOk = isPaidResponse(data);

    console.log("TPV notify:", {
      signOk,
      paidOk,
      order,
      responseCode,
      signatureVersion: Ds_SignatureVersion || null,
    });

    if (!signOk) {
      return res.status(200).send("BAD SIGN");
    }

    try {
      const pedidoRef = adminDb.ref(`pedidosPendientes/${order}`);
      const snap = await pedidoRef.get();

      if (!snap.exists()) {
        console.warn("Pedido no encontrado:", order);
        return res.status(200).send("OK");
      }

      const updates = {
        webhookRecibidoEn: new Date().toISOString(),
        dsResponse: String(responseCode),
        firmaValida: true,
      };

      if (paidOk) {
        updates.estadoPago = "pagado";
        updates.procesado = true;
      } else {
        updates.estadoPago = "rechazado";
        updates.procesado = false;
      }

      await pedidoRef.update(updates);
    } catch (err) {
      console.error("Error actualizando pedido:", err);
    }

    return res.status(200).send("OK");
  } catch (e) {
    console.error("Error en notificacionTPV:", e);
    return res.status(200).send("BAD");
  }
}