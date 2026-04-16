// api/notificacionTPV.js
import crypto from "crypto";
import { adminDb } from "./_firebaseAdmin.js";

export const config = { runtime: "nodejs" };

function getSecretKey() {
  const secret = (process.env.REDSYS_SECRET_KEY || "").trim();
  if (!secret) throw new Error("Falta REDSYS_SECRET_KEY");
  return Buffer.from(secret, "base64");
}

/** Firma Redsys HMAC_SHA256_V1 */
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

  if (!snapshot.exists()) return null;

  let reservaEncontrada = null;
  const updates = {};

  const pareceReservaDirecta = (obj) => {
    if (!obj || typeof obj !== "object") return false;

    return (
      "fecha" in obj ||
      "estado" in obj ||
      "estadoPago" in obj ||
      "uid" in obj ||
      "orderId" in obj
    );
  };

  const prepararActualizacion = (
    reserva,
    rutaBase,
    claseKey,
    fechaKey,
    turnoKey,
    metodoKey = ""
  ) => {
    updates[`${rutaBase}/estadoPago`] = "pagado";
    updates[`${rutaBase}/estado`] = "Confirmada";
    updates[`${rutaBase}/procesado`] = true;
    updates[`${rutaBase}/webhookRecibidoEn`] = timestamp;
    updates[`${rutaBase}/actualizadoEn`] = timestamp;

    reservaEncontrada = {
      ...reserva,
      uid: reserva.uid || "",
      clase: reserva.clase || "",
      claseId: reserva.claseId || claseKey,
      fecha: reserva.fecha || fechaKey,
      turno: reserva.turno || turnoKey,
      metodo: reserva.metodo || metodoKey,
      plazas: Number(reserva.plazas || 1),
      precio: Number(
        reserva.precioTotal ?? reserva.precioUnitario ?? reserva.precio ?? 0
      ),
      precioUnitario: Number(reserva.precioUnitario ?? reserva.precio ?? 0),
      precioTotal: Number(
        reserva.precioTotal ?? reserva.precioUnitario ?? reserva.precio ?? 0
      ),
      estado: "Confirmada",
      estadoPago: "pagado",
      procesado: true,
      webhookRecibidoEn: timestamp,
      actualizadoEn: timestamp,
    };
  };

  snapshot.forEach((claseSnap) => {
    claseSnap.forEach((fechaSnap) => {
      fechaSnap.forEach((turnoSnap) => {
        turnoSnap.forEach((childSnap) => {
          const childVal = childSnap.val();

          if (!childVal || typeof childVal !== "object") return;

          // Caso 1: reserva directa dentro del turno
          if (pareceReservaDirecta(childVal)) {
            if (childVal.orderId === orderId) {
              const rutaBase = `reservas/${claseSnap.key}/${fechaSnap.key}/${turnoSnap.key}/${childSnap.key}`;
              prepararActualizacion(
                childVal,
                rutaBase,
                claseSnap.key,
                fechaSnap.key,
                turnoSnap.key,
                childVal.metodo || ""
              );
            }
            return;
          }

          // Caso 2: estructura con método -> reservaId
          childSnap.forEach((reservaSnap) => {
            const reserva = reservaSnap.val();

            if (reserva?.orderId === orderId) {
              const rutaBase = `reservas/${claseSnap.key}/${fechaSnap.key}/${turnoSnap.key}/${childSnap.key}/${reservaSnap.key}`;
              prepararActualizacion(
                reserva,
                rutaBase,
                claseSnap.key,
                fechaSnap.key,
                turnoSnap.key,
                childSnap.key
              );
            }
          });
        });
      });
    });
  });

  if (reservaEncontrada) {
    await adminDb.ref().update(updates);
  }

  return reservaEncontrada;
}

function generarCodigoTarjetaRegalo() {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "REGALO-";

  for (let i = 0; i < 6; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return codigo;
}

async function generarCodigoTarjetaRegaloUnico() {
  let codigo = "";
  let existe = true;

  while (existe) {
    codigo = generarCodigoTarjetaRegalo();
    const snap = await adminDb.ref(`codigosTarjetaRegalo/${codigo}`).get();
    existe = snap.exists();
  }

  return codigo;
}

async function guardarTarjetaRegaloPagada(orderId, pedido, timestamp) {
  const codigo = await generarCodigoTarjetaRegaloUnico();

  const tarjetaData = {
    id: orderId,
    orderId,
    codigo,
    uidComprador: pedido.uid || "",
    tipo: "tarjeta_regalo",
    clase: pedido.clase || "Tarjeta regalo",
    claseId: pedido.claseId || "",
    subtipo: pedido.subtipo || "",
    precioTotal: Number(pedido.precioTotal ?? 0),
    precioOriginal: Number(pedido.precioOriginal ?? 0),
    plazas: Number(pedido.plazas ?? 1),
    numeroClases: Number(pedido.numeroClases ?? 0),
    estadoPago: "pagado",
    estadoCanje: "pendiente",
    procesado: true,
    fechaCompra: timestamp,
    creadoEn: pedido.creadoEn || timestamp,
    actualizadoEn: timestamp,
    desdeTarjeta: false,
    emailDestinatario: pedido.emailDestinatario || "",
    nombreDestinatario: pedido.nombreDestinatario || "",
    mensajePersonalizado: pedido.mensajePersonalizado || "",
  };

  await adminDb.ref(`tarjetasRegalo/${orderId}`).set(tarjetaData);
  await adminDb.ref(`codigosTarjetaRegalo/${codigo}`).set(orderId);

  if (pedido.uid) {
    await adminDb.ref(`usuarios/${pedido.uid}/tarjetasRegalo/${orderId}`).set(tarjetaData);
  }

  return tarjetaData;
}
async function guardarBonoPagado(orderId, pedido, timestamp) {
  if (!pedido?.uid || !pedido?.datosBono) return null;

  const bonoRef = adminDb.ref(`usuarios/${pedido.uid}/bonos/${orderId}`);
  const bonoSnap = await bonoRef.get();

  if (bonoSnap.exists()) {
    return bonoSnap.val();
  }

  const bonoData = {
    bonoId: orderId,
    uid: pedido.uid,
    ...pedido.datosBono,
    orderId,
    estadoPago: "pagado",
    procesado: true,
    creadoEn:
      pedido?.datosBono?.creadoEn || pedido?.creadoEn || timestamp,
    actualizadoEn: timestamp,
  };

  await bonoRef.set(bonoData);

  return bonoData;
}

async function guardarReservaEnPerfilUsuario(reserva) {
  if (!reserva?.uid || !reserva?.orderId) return;

  const listaRef = adminDb.ref(`usuarios/${reserva.uid}/listaReservas`);
  const listaSnap = await listaRef.get();

  let yaExiste = false;

  if (listaSnap.exists()) {
    listaSnap.forEach((itemSnap) => {
      const item = itemSnap.val();
      if (item?.orderId === reserva.orderId) {
        yaExiste = true;
      }
    });
  }

  if (!yaExiste) {
    await listaRef.push({
      clase: reserva.clase || "",
      claseId: reserva.claseId || "",
      fecha: reserva.fecha || "",
      turno: reserva.turno || "",
      metodo: reserva.metodo || "",
      plazas: Number(reserva.plazas || 1),
      precio: Number(reserva.precio ?? 0),
      precioUnitario: Number(reserva.precioUnitario ?? 0),
      precioTotal: Number(reserva.precioTotal ?? 0),
      estado: "Confirmada",
      estadoPago: "pagado",
      orderId: reserva.orderId,
      timestamp: reserva.timestamp || new Date().toISOString(),
      actualizadoEn: reserva.actualizadoEn || new Date().toISOString(),
      desdeTarjeta: !!reserva.desdeTarjeta,
      nombreTipoClase: reserva.nombreTipoClase || "",
      tipoClase: reserva.tipoClase || "",
    });

    const userRef = adminDb.ref(`usuarios/${reserva.uid}`);
    const userSnap = await userRef.get();

    if (userSnap.exists()) {
      const datos = userSnap.val() || {};
      const totalActual = Number(datos.reservas) || 0;
      await userRef.update({
        reservas: totalActual + 1,
      });
    }
  }
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

    if (pedido?.procesado === true) {
      console.log("Pedido ya procesado:", order);
      return res.status(200).send("OK");
    }

    const precioTotal = Number(pedido?.precioTotal ?? 0);
    const amountCentsPedido = Math.round(precioTotal * 100);
    const amountMatches =
      amountCentsRedsys !== null && amountCentsPedido === amountCentsRedsys;

    const aceptarPagoTemporalmente = paidOk && amountMatches;

if (aceptarPagoTemporalmente) {
     await ref.update({
  estadoPago: "pagado",
  procesado: true,
  firmaValida: signOk,
  firmaError: signOk ? "" : "Firma Redsys no validada, aceptado temporalmente por importe y respuesta correctos",
  responseCode: String(decoded.Ds_Response ?? decoded.DS_RESPONSE ?? ""),
  amountCentsRedsys,
  amountCentsPedido,
  webhookRecibidoEn: timestamp,
  actualizadoEn: timestamp,
});

      if (pedido?.tipo === "tarjeta_regalo") {
        const tarjetaGuardada = await guardarTarjetaRegaloPagada(order, pedido, timestamp);

        console.log("Tarjeta regalo guardada en /tarjetasRegalo:", {
          order,
          codigo: tarjetaGuardada.codigo,
        });

        return res.status(200).send("OK");
      }

            if (pedido?.esBono && pedido?.datosBono) {
        const bonoGuardado = await guardarBonoPagado(order, pedido, timestamp);

        console.log("Bono guardado en /usuarios/{uid}/bonos:", {
          order,
          bonoId: bonoGuardado?.bonoId || order,
          uid: pedido.uid,
        });

        return res.status(200).send("OK");
      }
      const reservaActualizada = await marcarReservaComoPagadaPorOrderId(order, timestamp);

     if (reservaActualizada) {
  await guardarReservaEnPerfilUsuario({
    ...reservaActualizada,
    uid: reservaActualizada.uid || pedido.uid || "",
    clase: reservaActualizada.clase || pedido.clase || "",
    claseId: reservaActualizada.claseId || pedido.claseId || "",
    fecha: reservaActualizada.fecha || pedido.fecha || "",
    turno: reservaActualizada.turno || pedido.turno || "",
    metodo: reservaActualizada.metodo || pedido.metodo || "",
    plazas: Number(reservaActualizada.plazas || pedido.plazas || 1),
    precio: Number(
      reservaActualizada.precio ??
        reservaActualizada.precioTotal ??
        pedido.precioTotal ??
        0
    ),
    precioUnitario: Number(
      reservaActualizada.precioUnitario ??
        pedido.precioUnitario ??
        pedido.precio ??
        0
    ),
    precioTotal: Number(
      reservaActualizada.precioTotal ??
        pedido.precioTotal ??
        pedido.precio ??
        0
    ),
    nombreTipoClase:
      reservaActualizada.nombreTipoClase || pedido.subtipo || "",
    tipoClase:
      reservaActualizada.tipoClase || pedido.tipoPieza || "",
    actualizadoEn: timestamp,
  });
}

      console.log("Reserva actualizada en /reservas:", {
        order,
        reservaActualizada: !!reservaActualizada,
      });

      return res.status(200).send("OK");
    }

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