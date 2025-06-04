import React, { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { dbRealtime } from "./firebase";


const AdminUsoBonos = () => {
  const [bonos, setBonos] = useState([]);

  useEffect(() => {
    const cargarBonos = async () => {
      try {
        const snapshot = await get(child(ref(dbRealtime), "bonos"));
        if (snapshot.exists()) {
          const datos = [];
          snapshot.forEach((snap) => {
            datos.push({ id: snap.key, ...snap.val() });
          });
          setBonos(datos);
        } else {
          console.log("No hay bonos disponibles.");
        }
      } catch (error) {
        console.error("Error al cargar los bonos:", error);
      }
    };

    cargarBonos();
  }, []);

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>🎟️ Uso de Bonos</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Usuario</th>
            <th style={styles.th}>Tipo de bono</th>
            <th style={styles.th}>Reservas utilizadas</th>
            <th style={styles.th}>Reservas restantes</th>
          </tr>
        </thead>
        <tbody>
          {bonos.map((bono) => (
            <tr key={bono.id}>
              <td style={styles.td}>{bono.usuario}</td>
              <td style={styles.td}>{bono.tipo}</td>
              <td style={styles.td}>{bono.utilizadas}</td>
              <td style={styles.td}>{bono.restantes}</td>
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
  table: {
    width: "100%",
    maxWidth: 800,
    margin: "auto",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    padding: 12,
    backgroundColor: "#ffe1c4",
    textAlign: "left",
    color: "#333",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
};

export default AdminUsoBonos;
