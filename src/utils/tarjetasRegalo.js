import { ref, update } from "firebase/database";
import { dbRealtime } from "../firebase";

export const marcarTarjetaRegaloComoUsada = async ({ codigo, uid }) => {
  if (!codigo) return;

  await update(ref(dbRealtime, `tarjetas_regalo/${codigo}`), {
    usado: true,
    fechaUso: new Date().toISOString(),
    usadoPorUID: uid,
  });
};