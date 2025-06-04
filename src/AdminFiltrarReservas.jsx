import React, { useState } from "react";
import { ref, get, child } from "firebase/database";
import { dbRealtime } from "./firebase";


const AdminFiltrarReservas = () => {
  const [fecha, setFecha] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    if (!fecha) {
      alert("Por favor, selecciona una fecha.");
      return;
    }

    try {
      const snapshot = await get(child(ref(dbRealtime), `reservas`));
      const datos = [];

      snapshot.forEach((claseSnap) => {
        const fechaSnap = claseSnap.child(fecha);
        if (fechaSnap.exists()) {
          fechaSnap.forEach((turnoSnap) => {
            turnoSnap.forEach((metodoSnap) => {
              metodoSnap.forEach((reservaSnap) => {
                const reserva = reservaSnap.val();
                datos.push({
                  id: reservaSnap.key,
                  clase: claseSnap.key,
                  usuario: reserva.nombre || "Desconocido",
                  turno: turnoSnap.key,
                  estado: reserva.estado || "Pendiente",
                });
              });
            });
          });
        }
      });

      setResultados(datos);
    } catch (error) {
      console.error("Error al cargar las reservas:", error);
      alert("No se pudieron cargar las reservas.");
    }
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>🔎 Filtrar reservas por fecha</h2>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleBuscar} style={styles.boton}>
        Buscar
      </button>

      {resultados.length > 0 && (
        <div style={styles.resultados}>
          <h3>Resultados para {fecha}:</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Clase</th>
                <th style={styles.th}>Usuario</th>
                <th style={styles.th}>Turno</th>
                <th style={styles.th}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((r) => (
                <tr key={r.id}>
                  <td style={styles.td}>{r.clase}</td>
                  <td style={styles.td}>{r.usuario}</td>
                  <td style={styles.td}>{r.turno}</td>
                  <td style={styles.td}>{r.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    textAlign: "center",
    minHeight: "100vh",
  },
  titulo: {
    marginBottom: 20,
    color: "#333",
  },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    margin: 10,
    width: 200,
    fontSize: "1rem",
  },
  boton: {
    padding: "12px 24px",
    backgroundColor: "#65baa3",
    border: "none",
    color: "white",
    borderRadius: 12,
    fontSize: 16,
    cursor: "pointer",
  },
  resultados: {
    marginTop: 40,
  },
  table: {
    width: "100%",
    maxWidth: 800,
    margin: "auto",
    backgroundColor: "#fff",
    borderCollapse: "collapse",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#d0f0e8",
    padding: 12,
    textAlign: "left",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
};

export default AdminFiltrarReservas;
