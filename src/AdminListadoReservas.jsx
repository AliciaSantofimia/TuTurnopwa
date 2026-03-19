import React, { useEffect, useState } from "react";
import { ref, get, child, update } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminListadoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const snapshot = await get(child(ref(dbRealtime), "reservas"));
        const datos = [];

        if (!snapshot.exists()) {
          setReservas([]);
          setCargando(false);
          return;
        }

        snapshot.forEach((claseSnap) => {
          const clase = claseSnap.key;

          claseSnap.forEach((fechaSnap) => {
            const fecha = fechaSnap.key;

            fechaSnap.forEach((turnoSnap) => {
              const turno = turnoSnap.key;

              turnoSnap.forEach((nivelSnap) => {
                const nivelKey = nivelSnap.key;
                const nivelVal = nivelSnap.val();

                if (!nivelVal || typeof nivelVal !== "object") return;

                // CASO A:
                // reservas/clase/fecha/turno/metodo/idReserva
                const esNivelMetodo =
                  Object.values(nivelVal).length > 0 &&
                  Object.values(nivelVal).every(
                    (item) => item && typeof item === "object"
                  ) &&
                  !("estado" in nivelVal) &&
                  !("uid" in nivelVal);

                if (esNivelMetodo) {
                  const metodo = nivelKey;

                  nivelSnap.forEach((reservaSnap) => {
                    const reserva = reservaSnap.val();
                    if (!reserva || typeof reserva !== "object") return;

                    datos.push({
                      id: reservaSnap.key,
                      clase: reserva.clase || clase,
                      fecha: reserva.fecha || reserva.fechaInicio || fecha,
                      turno: reserva.turno || turno,
                      tipo: reserva.metodo || reserva.modalidad || metodo || "—",
                      estado: reserva.estado || "Pendiente de pago",
                      estadoPago: reserva.estadoPago || "—",
                      usuario: reserva.nombre || reserva.email || "Sin nombre",
                      uid: reserva.uid || null,
                      ruta: `reservas/${clase}/${fecha}/${turno}/${metodo}/${reservaSnap.key}`,
                    });
                  });
                } else {
                  // CASO B:
                  // reservas/clase/fecha/turno/idReserva
                  const reserva = nivelVal;

                  datos.push({
                    id: nivelKey,
                    clase: reserva.clase || clase,
                    fecha: reserva.fecha || reserva.fechaInicio || fecha,
                    turno: reserva.turno || turno,
                    tipo: reserva.metodo || reserva.modalidad || "—",
                    estado: reserva.estado || "Pendiente de pago",
                    estadoPago: reserva.estadoPago || "—",
                    usuario: reserva.nombre || reserva.email || "Sin nombre",
                    uid: reserva.uid || null,
                    ruta: `reservas/${clase}/${fecha}/${turno}/${nivelKey}`,
                  });
                }
              });
            });
          });
        });

        datos.sort((a, b) => {
          const fechaA = new Date(`${a.fecha}T00:00:00`);
          const fechaB = new Date(`${b.fecha}T00:00:00`);
          return fechaA - fechaB;
        });

        setReservas(datos);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerReservas();
  }, []);

  const cancelarReserva = async (reserva) => {
    const confirmar = window.confirm("¿Seguro que quieres cancelar esta reserva?");
    if (!confirmar) return;

    try {
      const reservaRef = ref(dbRealtime, reserva.ruta);

      await update(reservaRef, { estado: "Cancelada" });

      if (reserva.uid) {
        const avisoRef = ref(dbRealtime, `usuarios/${reserva.uid}/avisos/${Date.now()}`);
        await update(avisoRef, {
          mensaje: `Tu reserva del ${reserva.fecha} a las ${reserva.turno} ha sido cancelada por el administrador.`,
          fecha: new Date().toISOString(),
        });
      }

      setReservas((prev) =>
        prev.map((r) =>
          r.ruta === reserva.ruta ? { ...r, estado: "Cancelada" } : r
        )
      );
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
    }
  };

  return (
    <div style={styles.body}>
      <BotonVolver />
      <h2 style={styles.titulo}>📋 Listado de Reservas</h2>

      {cargando ? (
        <p style={styles.mensaje}>Cargando reservas...</p>
      ) : reservas.length === 0 ? (
        <p style={styles.mensaje}>No hay reservas registradas.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Clase</th>
              <th style={styles.th}>Usuario</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Turno</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Estado reserva</th>
              <th style={styles.th}>Estado pago</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.ruta}>
                <td style={styles.td}>{reserva.clase}</td>
                <td style={styles.td}>{reserva.usuario}</td>
                <td style={styles.td}>{reserva.fecha}</td>
                <td style={styles.td}>{reserva.turno}</td>
                <td style={styles.td}>{reserva.tipo}</td>

                <td
                  style={{
                    ...styles.td,
                    backgroundColor:
                      reserva.estado === "Confirmada"
                        ? "#d4edda"
                        : reserva.estado === "Cancelada"
                        ? "#f8d7da"
                        : "#e2e3e5",
                    color:
                      reserva.estado === "Confirmada"
                        ? "#155724"
                        : reserva.estado === "Cancelada"
                        ? "#721c24"
                        : "#383d41",
                    fontWeight: "bold",
                  }}
                >
                  {reserva.estado}
                </td>

                <td style={styles.td}>{reserva.estadoPago}</td>

                <td style={styles.td}>
                  {reserva.estado !== "Cancelada" && (
                    <button
                      onClick={() => cancelarReserva(reserva)}
                      style={styles.botonCancelar}
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f1ec",
    padding: 30,
    minHeight: "100vh",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  mensaje: {
    textAlign: "center",
    color: "#666",
    marginTop: 30,
  },
  table: {
    width: "100%",
    maxWidth: 1200,
    margin: "auto",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  th: {
    padding: 12,
    borderBottom: "1px solid #eee",
    backgroundColor: "#d0f0e8",
    textAlign: "left",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
  botonCancelar: {
    padding: "6px 10px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminListadoReservas;