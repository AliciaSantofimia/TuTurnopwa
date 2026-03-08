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

export const crearTarjetaRegalo = async ({ importe, compradorUID }) => {
  const codigo = await generarCodigoUnico();

  const tarjeta = {
    codigo,
    importe,
    tipo: "tarjeta_regalo_universal",
    usado: false,
    canjeado: false,
    canjeadoPorUID: "",
    compradorUID,
    fechaCompra: new Date().toISOString(),
    fechaCanje: null,
    fechaUso: null,
  };

  await set(ref(dbRealtime, `tarjetas_regalo/${codigo}`), tarjeta);

  return codigo;
};