// src/crearTarjetaRegalo.js
import { ref, set } from "firebase/database";
import { dbRealtime } from "./firebase";

// Generador de código aleatorio con formato XXXX-XXXX
function generarCodigo() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";
  for (let i = 0; i < 4; i++) {
    codigo += chars[Math.floor(Math.random() * chars.length)];
  }
  codigo += "-";
  for (let i = 0; i < 4; i++) {
    codigo += chars[Math.floor(Math.random() * chars.length)];
  }
  return codigo;
}

// Crea una tarjeta regalo con todos los datos necesarios
export async function crearTarjetaRegalo(tipo, compradorUID) {
  const codigo = generarCodigo();

  const nuevaTarjeta = {
    tipo,
    codigo,
    compradorUID,
    fechaCompra: new Date().toISOString(),
    usado: false,
    desdeTarjeta: true // ✅ Campo clave para distinguir de reservas normales
  };

  try {
    await set(ref(dbRealtime, `tarjetas_regalo/${codigo}`), nuevaTarjeta);
    return codigo;
  } catch (error) {
    console.error("❌ Error al crear tarjeta regalo:", error);
    return null;
  }
}
