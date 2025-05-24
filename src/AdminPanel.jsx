import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <h1 style={styles.titulo}>🎨 Panel Principal del Administrador</h1>

      <div style={styles.panel}>
        <button style={styles.btn} onClick={() => navigate("/admin/clases")}>
          📚 Gestión de Clases
        </button>

        <button style={styles.btn} onClick={() => navigate("/admin/usuarios")}>
          👥 Gestión de Usuarios
        </button>

        <button style={styles.btn} onClick={() => navigate("/admin/reservas")}>
          📅 Gestión de Reservas
        </button>

        <button style={styles.btn} onClick={() => navigate("/admin/historiales")}>
          🕓 Historiales
        </button>

        <button style={styles.btn} onClick={() => navigate("/admin/notificaciones")}>
          🔔 Notificaciones
        </button>
      </div>
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
    marginBottom: 30,
    color: "#333",
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
    backgroundColor: "#eae6ff",
    color: "#333",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AdminPanel;
