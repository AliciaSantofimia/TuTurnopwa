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

function getAmountCents(data) {
  const raw = data.Ds_Amount ?? data.DS_AMOUNT ?? data.ds_amount;
  const cents = Number(raw);
  return Number.isFinite(cents) ? cents : null;
}

async function marcarReservaComoPagadaPorOrderId(orderId, timestamp) {
  const reservasRef = adminDb.ref("reservas");
  const snapshot = await reservasRef.get();

  if (!snapshot.exists()) return false;

  let actualizada = false;
  const updates = {};

  snapshot.forEach((claseSnap) => {
    const clase = claseSnap.key;

    claseSnap.forEach((fechaSnap) => {
      const fecha = fechaSnap.key;

      fechaSnap.forEach((turnoSnap) => {
        const turno = turnoSnap.key;

        turnoSnap.forEach((tipoSnap) => {
          const tipo = tipoSnap.key;

          tipoSnap.forEach((reservaSnap) => {
            const reserva = reservaSnap.val();

            if (reserva?.orderId === orderId) {
              const rutaBase = `reservas/${clase}/${fecha}/${turno}/${tipo}/${reservaSnap.key}`;

              updates[`${rutaBase}/estadoPago`] = "pagado";
              updates[`${rutaBase}/estado`] = "Confirmada";
              updates[`${rutaBase}/procesado`] = true;
              updates[`${rutaBase}/webhookRecibidoEn`] = timestamp;
              updates[`${rutaBase}/actualizadoEn`] = timestamp;

              actualizada = true;
            }
          });
        });
      });
    });
  });

  if (actualizada) {
    await adminDb.ref().update(updates);
  }

  return actualizada;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { Ds_MerchantParameters, Ds_Signature } = req.body || {};

    if (!Ds_MerchantParameters || !Ds_Signature) {
      console.warn("TPV notify: faltan parámetros");
      return res.status(200).send("BAD");
    }

    const timestamp = new Date().toISOString();

    const decoded = JSON.parse(
      Buffer.from(Ds_MerchantParameters, "base64").toString("utf8")
    );

    const order =
      decoded.Ds_Order ||
      decoded.DS_ORDER ||
      decoded.DS_MERCHANT_ORDER;

    if (!order) {
      console.warn("TPV notify: falta order");
      return res.status(200).send("BAD");
    }

    const expected = computeSignatureHmacSha256V1(Ds_MerchantParameters);
    const signOk = signaturesEqual(expected, Ds_Signature);

    const paidOk = isPaidResponse(decoded);
    const amountCentsRedsys = getAmountCents(decoded);

    console.log("TPV notify:", {
      signOk,
      paidOk,
      order,
      responseCode: decoded.Ds_Response ?? decoded.DS_RESPONSE,
      amountCentsRedsys,
    });

    const ref = adminDb.ref(`pedidosPendientes/${order}`);
    const snap = await ref.get();

    if (!snap.exists()) {
      console.warn("Pedido no encontrado:", order);
      return res.status(200).send("OK");
    }

    const pedido = snap.val();

    // Idempotencia: si ya estaba procesado, no hacemos nada más
    if (pedido?.procesado === true) {
      console.log("Pedido ya procesado:", order);
      return res.status(200).send("OK");
    }

    const precioTotal = Number(pedido?.precioTotal ?? 0);
    const amountCentsPedido = Math.round(precioTotal * 100);
    const amountMatches =
      amountCentsRedsys !== null && amountCentsPedido === amountCentsRedsys;

    // Solo aceptamos como pagado si:
    // 1) Redsys dice pago OK
    // 2) El pedido existe
    // 3) El importe coincide
    if (paidOk && amountMatches) {
      await ref.update({
        estadoPago: "pagado",
        procesado: true,
        firmaValida: signOk,
        firmaError: signOk ? "" : "Firma Redsys no validada",
        responseCode: String(decoded.Ds_Response ?? decoded.DS_RESPONSE ?? ""),
        amountCentsRedsys,
        amountCentsPedido,
        webhookRecibidoEn: timestamp,
        actualizadoEn: timestamp,
      });

      const reservaActualizada = await marcarReservaComoPagadaPorOrderId(order, timestamp);

      console.log("Reserva actualizada en /reservas:", {
        order,
        reservaActualizada,
      });

      return res.status(200).send("OK");
    }

    // Si no cuadra el pago o el importe, lo dejamos rechazado
    await ref.update({
      estadoPago: "rechazado",
      procesado: false,
      firmaValida: signOk,
      firmaError: signOk ? "" : "Firma Redsys no validada",
      responseCode: String(decoded.Ds_Response ?? decoded.DS_RESPONSE ?? ""),
      amountCentsRedsys,
      amountCentsPedido,
      webhookRecibidoEn: timestamp,
      actualizadoEn: timestamp,
    });

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Error en notificacionTPV:", err);
    return res.status(200).send("BAD");
  }
}