// src/utils/contarPlazasDia.js
import { ref, get, child } from "firebase/database";
import { dbRealtime } from "../firebase";

/**
 * Cuenta las plazas ocupadas por tipo de método: torno o modelado.
 * @param {string} fechaStr - Fecha en formato YYYY-MM-DD.
 * @returns {Promise<{torno: number, modelado: number}>}
 */
export async function contarPlazasPorMetodo(fechaStr) {
  try {
    const snapshot = await get(child(ref(dbRealtime), "reservas"));
    let torno = 0;
    let modelado = 0;

    snapshot.forEach((claseSnap) => {
      const fechaSnap = claseSnap.child(fechaStr);
      if (!fechaSnap.exists()) return;

      fechaSnap.forEach((turnoSnap) => {
        turnoSnap.forEach((tipoSnap) => {
          tipoSnap.forEach((reservaSnap) => {
            const data = reservaSnap.val();
            const metodo = data?.tipo?.toLowerCase();

            if (metodo === "torno") {
              torno += data.plazas || 0;
            } else if (metodo === "modelado") {
              modelado += data.plazas || 0;
            }
          });
        });
      });
    });

    return { torno, modelado };
  } catch (error) {
    console.error("❌ Error al contar plazas por método:", error);
    return { torno: 0, modelado: 0 };
  }
}

/**
 * Cuenta el total de plazas ocupadas en todas las clases en un día.
 * @param {string} fechaStr - Fecha en formato YYYY-MM-DD.
 * @returns {Promise<number>}
 */
export async function contarPlazasTotalesPorDia(fechaStr) {
  try {
    const snapshot = await get(child(ref(dbRealtime), "reservas"));
    let total = 0;

    snapshot.forEach((claseSnap) => {
      const fechaSnap = claseSnap.child(fechaStr);
      if (!fechaSnap.exists()) return;

      fechaSnap.forEach((turnoSnap) => {
        turnoSnap.forEach((tipoSnap) => {
          tipoSnap.forEach((reservaSnap) => {
            const data = reservaSnap.val();
            total += data.plazas || 0;
          });
        });
      });
    });

    return total;
  } catch (error) {
    console.error("❌ Error al contar plazas totales:", error);
    return 0;
  }
}

/**
 * Cuenta plazas reservadas para una clase específica, en una fecha y turno concretos.
 * @param {string} clase - Nombre de la clase.
 * @param {string} fecha - Fecha en formato YYYY-MM-DD.
 * @param {string} turno - Turno exacto, como "12:00-15:00".
 * @returns {Promise<number>}
 */
export async function contarPlazasPorFechaYTurno(clase, fecha, turno) {
  try {
    const snapshot = await get(
      child(ref(dbRealtime), `reservas/${clase}/${fecha}/${turno}`)
    );
    let total = 0;

    if (snapshot.exists()) {
      snapshot.forEach((tipoSnap) => {
        tipoSnap.forEach((reservaSnap) => {
          const data = reservaSnap.val();
          total += Number(data.plazas || 1);
        });
      });
    }

    return total;
  } catch (error) {
    console.error("❌ Error al contar plazas por clase/fecha/turno:", error);
    return 0;
  }
}

