import React, { useEffect, useState } from "react";
import { ref, get, remove } from "firebase/database";
import { dbRealtime } from "./firebase";
import { useNavigate } from "react-router-dom";

const AdminSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "solicitudesCambiosClases"));
        const datos = [];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            datos.push({
              id: child.key,
              ...child.val(),
            });
          });
        }
        setSolicitudes(datos);
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
      }
    };

    cargarSolicitudes();
  }, []);

  const handleEliminarSolicitud = async (id) => {
    const confirmar = window.confirm("¿Quieres eliminar esta solicitud?");
    if (!confirmar) return;

    try {
      await remove(ref(dbRealtime, `solicitudesCambiosClases/${id}`));
      setSolicitudes((prev) => prev.filter((s) => s.id !== id));
      alert("Solicitud eliminada");
    } catch (error) {
      console.error("Error al eliminar solicitud:", error);
    }
  };

  const renderTipo = (tipo) => {
    if (tipo === "editar") return "✏️ Editar";
    if (tipo === "eliminar") return "🗑️ Eliminar";
    if (tipo === "crear") return "🆕 Crear";
    return "—";
  };

  return (
    <div style={styles.body}>
      <button onClick={() => navigate(-1)} style={styles.volver}>
        ← Volver atrás
      </button>

      <h2 style={styles.titulo}>📮 Solicitudes de Cambios</h2>
      {solicitudes.length === 0 ? (
        <p style={{ textAlign: "center" }}>No hay solicitudes pendientes.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Clase</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Mensaje</th>
              <th style={styles.th}>Solicitada por</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}>{s.clase || "—"}</td>
                <td style={styles.td}>{renderTipo(s.tipo)}</td>
                <td style={styles.td}>{s.mensaje || "—"}</td>
                <td style={styles.td}>{s.autor || "—"}</td>
                <td style={styles.td}>
                  {new Date(s.fecha).toLocaleString("es-ES")}
                </td>
                <td style={styles.td}>
                  <button onClick={() => handleEliminarSolicitud(s.id)} style={styles.btn}>
                    ❌ Eliminar
                  </button>
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
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 30,
    minHeight: "100vh",
  },
  volver: {
    background: "none",
    border: "none",
    color: "#4a90e2",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.95rem",
    marginBottom: 10,
  },
  titulo: {
    textAlign: "center",
    marginBottom: 30,
    color: "#444",
  },
  table: {
    width: "100%",
    maxWidth: 1000,
    margin: "auto",
    borderCollapse: "collapse",
    backgroundColor: "white",
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
  btn: {
    backgroundColor: "#f66",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
};

export default AdminSolicitudes;


