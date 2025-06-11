import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import { useNavigate } from "react-router-dom";

const AdminHistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "reservas"));
        const datos = [];

        if (snapshot.exists()) {
          snapshot.forEach((fechaSnap) => {
            const fecha = fechaSnap.key;

            fechaSnap.forEach((turnoSnap) => {
              const turno = turnoSnap.key;

              turnoSnap.forEach((tipoSnap) => {
                tipoSnap.forEach((reservaSnap) => {
                  const reserva = reservaSnap.val();

                  datos.push({
                    id: reservaSnap.key,
                    clase: reserva.clase || "—",
                    usuario: reserva.usuario || "—",
                    fecha,
                    turno,
                    estado: reserva.estado || "Activa",
                    tieneNotas: reserva.notasInternas?.length > 0 || false,
                  });
                });
              });
            });
          });
        }

        setReservas(datos);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
        alert("No se pudieron cargar las reservas.");
      }
    };

    cargarReservas();
  }, []);

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>📜 Historial de Reservas</h2>

      <div style={styles.filtro}>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
          style={styles.input}
        />
        <button style={styles.btn} onClick={() => setFechaFiltro("")}>
          Limpiar filtro
        </button>
      </div>

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
          {reservas
            .filter((r) => !fechaFiltro || r.fecha === fechaFiltro)
            .map((r) => (
              <tr key={r.id}>
                <td style={styles.td}>{r.clase}</td>
                <td style={styles.td}>{r.usuario}</td>
                <td style={styles.td}>{r.fecha}</td>
                <td style={styles.td}>{r.turno}</td>
                <td style={styles.td}>
                  {r.estado}
                  <br />
                  <button
                    style={styles.btnNota}
                    onClick={() => navigate(`/admin/reservas/nota/${r.id}`)}
                  >
                    📝 Nota {r.tieneNotas && "📌"}
                  </button>
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
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    minHeight: "100vh",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  filtro: {
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: "1rem",
    marginRight: 10,
  },
  btn: {
    padding: "10px 20px",
    backgroundColor: "#b6e4d8",
    border: "none",
    borderRadius: 10,
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    maxWidth: 900,
    margin: "auto",
    backgroundColor: "white",
    borderCollapse: "collapse",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#d0f0e8",
    padding: 12,
    textAlign: "left",
    color: "#333",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
  btnNota: {
    marginTop: 5,
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default AdminHistorialReservas;



