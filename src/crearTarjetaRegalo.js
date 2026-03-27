import { ref, set, get } from "firebase/database";
import { dbRealtime } from "./firebase";

const generarCodigoAleatorio = (longitud = 8) => {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let resultado = "";

  for (let i = 0; i < longitud; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }

  return `TTC-${resultado}`;
};

const generarCodigoUnico = async () => {
  let codigo = "";
  let existe = true;

  while (existe) {
    codigo = generarCodigoAleatorio();
    const snapshot = await get(ref(dbRealtime, `tarjetas_regalo/${codigo}`));
    existe = snapshot.exists();
  }

  return codigo;
};

export const crearTarjetaRegalo = async ({
  clase,
  claseId,
  subtipo = "",
  tipoPieza = "",
  tipoTaller = "",
  rutaReserva = "",
  requiereMetodo = false,
  requiereTipoPieza = false,
  precio,
  precioBase,
  precioTotal,
  plazas = 1,
  compradorUID,
  nombreDestinatario = "",
  nombreComprador = "",
  mensajePersonalizado = "",
  orderId = "",
}) => {
  const codigo = await generarCodigoUnico();
  const ahora = new Date().toISOString();

  const tarjeta = {
    codigo,
    tipo: "tarjeta_regalo",

    clase: clase || "",
    claseId: claseId || "",
    subtipo,
    tipoPieza,
    tipoTaller,
    rutaReserva,
    requiereMetodo,
    requiereTipoPieza,

    precioOriginal: Number(precioBase || precio || 0),
    precioTotal: Number(precioTotal || precio || 0),
    precio: Number(precio || 0),
    plazas: Number(plazas || 1),

    nombreDestinatario,
    nombreComprador,
    mensajePersonalizado,

    uidComprador: compradorUID || "",
    estadoPago: "pagado",
    estadoCanje: "pendiente",

    usado: false,
    canjeado: false,
    canjeadoPorUID: "",
    usadoPorUID: "",

    orderId: orderId || "",
    procesado: true,
    creadoEn: ahora,
    actualizadoEn: ahora,
    fechaCompra: ahora,
    fechaCanje: null,
    fechaUso: null,
  };

  await set(ref(dbRealtime, `tarjetas_regalo/${codigo}`), tarjeta);

  return codigo;
};