import React, { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
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
                    usuario: reserva.nombre || "Sin nombre",
                    fecha,
                    turno,
                    estado: reserva.estado || "Activa",
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
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td style={styles.td}>{reserva.clase}</td>
              <td style={styles.td}>{reserva.usuario}</td>
              <td style={styles.td}>{reserva.fecha}</td>
              <td style={styles.td}>{reserva.turno}</td>
              <td style={styles.td}>{reserva.estado}</td>
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
    maxWidth: 800,
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
