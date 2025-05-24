import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminHistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");

  useEffect(() => {
    // aquí cargo las reservas reales desde Firebase más adelante
    /*
    const cargarReservas = async () => {
      let ref = collection(db, "reservas");
      if (fechaFiltro) {
        ref = query(ref, where("fecha", "==", fechaFiltro));
      }
      const snapshot = await getDocs(ref);
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservas(datos);
    };
    cargarReservas();
    */

    // datos simulados mientras tanto
    setReservas([
      {
        id: "r1",
        clase: "Edición Premium",
        usuario: "Ana Pérez",
        fecha: "2025-06-10",
        turno: "Mañana",
        estado: "Completada",
      },
      {
        id: "r2",
        clase: "Creativo Plus",
        usuario: "Carlos Ruiz",
        fecha: "2025-06-12",
        turno: "Tarde",
        estado: "Activa",
      },
    ]);
  }, [fechaFiltro]);

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
        <button
          style={styles.btn}
          onClick={() => setFechaFiltro("")}
        >
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
            .filter(r => !fechaFiltro || r.fecha === fechaFiltro)
            .map((r) => (
              <tr key={r.id}>
                <td style={styles.td}>{r.clase}</td>
                <td style={styles.td}>{r.usuario}</td>
                <td style={styles.td}>{r.fecha}</td>
                <td style={styles.td}>{r.turno}</td>
                <td style={styles.td}>{r.estado}</td>
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
};

export default AdminHistorialReservas;
