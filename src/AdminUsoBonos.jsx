import React, { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminUsoBonos = () => {
  const [bonos, setBonos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarBonos = async () => {
      try {
        const snapshot = await get(child(ref(dbRealtime), "bonos"));

        if (!snapshot.exists()) {
          setBonos([]);
          return;
        }

        const datos = [];

        snapshot.forEach((snap) => {
          const bono = snap.val();

          const total = bono.clasesIncluidas || 0;
          const utilizadas = bono.utilizadas || 0;
          const restantes = bono.restantes ?? total - utilizadas;

          datos.push({
            id: snap.key,
            usuario: bono.nombre || bono.email || "Sin nombre",
            tipo: bono.tipo || "Desconocido",
            utilizadas,
            restantes,
            total,
          });
        });

        setBonos(datos);
      } catch (error) {
        console.error("Error al cargar los bonos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarBonos();
  }, []);

  return (
    <div style={styles.body}>
      <BotonVolver />

      <h2 style={styles.titulo}>🎟️ Uso de Bonos</h2>

      {cargando ? (
        <p style={styles.mensaje}>Cargando bonos...</p>
      ) : bonos.length === 0 ? (
        <p style={styles.mensaje}>No hay bonos disponibles.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Usuario</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Usadas</th>
              <th style={styles.th}>Restantes</th>
              <th style={styles.th}>Progreso</th>
            </tr>
          </thead>
          <tbody>
            {bonos.map((bono) => {
              const porcentaje =
                bono.total > 0
                  ? Math.round((bono.utilizadas / bono.total) * 100)
                  : 0;

              return (
                <tr key={bono.id}>
                  <td style={styles.td}>{bono.usuario}</td>
                  <td style={styles.td}>{bono.tipo}</td>
                  <td style={styles.td}>{bono.utilizadas}</td>
                  <td style={styles.td}>{bono.restantes}</td>
                  <td style={styles.td}>{porcentaje}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
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
  mensaje: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
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