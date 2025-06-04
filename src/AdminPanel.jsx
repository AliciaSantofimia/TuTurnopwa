import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <div style={styles.panelContainer}>
        <div style={styles.tituloContainer}>
          <img
            src="/img/vasijabono4.png"
            alt="icono decorativo"
            style={styles.icono}
          />
          <h1 style={styles.titulo}>Panel Administrador</h1>
        </div>

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
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  panelContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 20,
    padding: 40,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    maxWidth: 600,
    width: "100%",
  },
  tituloContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    gap: 20,
  },
  icono: {
    width: 70, // aumentado el tamaño
    height: 70,
    objectFit: "contain",
    filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))", // mejora visual
  },
  titulo: {
    color: "#333",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  btn: {
    width: "100%",
    padding: 15,
    backgroundColor: "#eae6ff",
    color: "#333",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default AdminPanel;







