import React from "react";
import { useNavigate } from "react-router-dom";

const AdminGestionClases = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <h1 style={styles.titulo}>Panel Administración</h1>
      <div style={styles.panel}>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/clases/listado")}>
          📋 Ver listado de clases
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/clases/crear")}>
          ➕ Crear nueva clase
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/clases/editar")}>
          ✏️ Editar clase
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/clases/eliminar")}>
          🗑️ Eliminar clase
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/clases/imagen")}>
          🖼️ Cambiar imagen
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/clases/inscripciones")}>
          👥 Ver inscripciones
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f1ec",
    color: "#333",
    margin: 0,
    padding: 30,
    minHeight: "100vh"
  },
  titulo: {
    textAlign: "center",
    marginBottom: 30,
    color: "#444",
  },
  panel: {
    maxWidth: 600,
    margin: "0 auto",
    background: "#fff",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  btn: {
    display: "block",
    width: "100%",
    padding: 15,
    margin: "10px 0",
    backgroundColor: "#ffe1c4",
    color: "#333",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  }
};

export default AdminGestionClases;


