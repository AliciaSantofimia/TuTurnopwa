import React, { useEffect, useState } from "react";
import { ref, get, child, update } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminListadoReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const snapshot = await get(child(ref(dbRealtime), "reservas"));
        const datos = [];

        snapshot.forEach((claseSnap) => {
          const clase = claseSnap.key;

          claseSnap.forEach((fechaSnap) => {
            const fecha = fechaSnap.key;

            fechaSnap.forEach((turnoSnap) => {
              const turno = turnoSnap.key;

              turnoSnap.forEach((tipoSnap) => {
                tipoSnap.forEach((reservaSnap) => {
                  const reserva = reservaSnap.val();
                  datos.push({
                    id: reservaSnap.key,
                    clase,
                    fecha,
                    turno,
                    estado: reserva.estado || "Activa",
                    usuario: reserva.nombre || "Sin nombre",
                    uid: reserva.uid || null,
                  });
                });
              });
            });
          });
        });

        setReservas(datos);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    obtenerReservas();
  }, []);

  const cancelarReserva = async (reserva) => {
    const confirmar = window.confirm("¿Seguro que quieres cancelar esta reserva?");
    if (!confirmar) return;

    try {
      const reservaRef = ref(
        dbRealtime,
        `reservas/${reserva.clase}/${reserva.fecha}/${reserva.turno}`
      );

      const snapshot = await get(reservaRef);
      snapshot.forEach((tipoSnap) => {
        tipoSnap.forEach((reservaSnap) => {
          if (reservaSnap.key === reserva.id) {
            update(reservaSnap.ref, { estado: "Cancelada" });

            if (reserva.uid) {
              const avisoRef = ref(dbRealtime, `usuarios/${reserva.uid}/avisos`);
              const aviso = {
                mensaje: `Tu reserva del ${reserva.fecha} a las ${reserva.turno} ha sido cancelada por el administrador.`,
                fecha: new Date().toISOString(),
              };
              update(avisoRef, {
                [Date.now()]: aviso,
              });
            }
          }
        });
      });

      setReservas((prev) =>
        prev.map((r) =>
          r.id === reserva.id ? { ...r, estado: "Cancelada" } : r
        )
      );
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
    }
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>📋 Listado de Reservas</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Clase</th>
            <th style={styles.th}>Usuario</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Turno</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td style={styles.td}>{reserva.clase}</td>
              <td style={styles.td}>{reserva.usuario}</td>
              <td style={styles.td}>{reserva.fecha}</td>
              <td style={styles.td}>{reserva.turno}</td>
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
              <td style={styles.td}>
                {reserva.estado !== "Cancelada" && (
                  <button
                    onClick={() => cancelarReserva(reserva)}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  table: {
    width: "100%",
    maxWidth: 900,
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
};

export default AdminListadoReservas;
