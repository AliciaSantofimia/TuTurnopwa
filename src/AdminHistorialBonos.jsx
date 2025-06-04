import React, { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminHistorialBonos = () => {
  const [bonos, setBonos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");

  useEffect(() => {
    const cargarBonos = async () => {
      try {
        const snapshot = await get(child(ref(dbRealtime), `bonos`));
        const datos = [];

        snapshot.forEach((bonoSnap) => {
          const bono = bonoSnap.val();
          datos.push({
            id: bonoSnap.key,
            usuario: bono.nombre || "Sin nombre",
            tipo: bono.tipo || "Desconocido",
            fechaCompra: bono.fechaCompra || "Sin fecha",
            clasesIncluidas: bono.clasesIncluidas || 0,
          });
        });

        setBonos(datos);
      } catch (error) {
        console.error("Error al cargar bonos:", error);
        alert("No se pudieron cargar los bonos.");
      }
    };

    cargarBonos();
  }, []);

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>🎟️ Historial de Bonos Comprados</h2>

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
            <th style={styles.th}>Usuario</th>
            <th style={styles.th}>Tipo de bono</th>
            <th style={styles.th}>Fecha de compra</th>
            <th style={styles.th}>Clases incluidas</th>
          </tr>
        </thead>
        <tbody>
          {bonos
            .filter(b => !fechaFiltro || b.fechaCompra === fechaFiltro)
            .map((b) => (
              <tr key={b.id}>
                <td style={styles.td}>{b.usuario}</td>
                <td style={styles.td}>{b.tipo}</td>
                <td style={styles.td}>{b.fechaCompra}</td>
                <td style={styles.td}>{b.clasesIncluidas}</td>
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
    backgroundColor: "#ffd39f",
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
    backgroundColor: "#ffe1c4",
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

export default AdminHistorialBonos;
