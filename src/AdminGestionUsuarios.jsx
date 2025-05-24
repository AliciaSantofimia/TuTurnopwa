import React from "react";
import { useNavigate } from "react-router-dom";

const AdminGestionUsuarios = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <h1 style={styles.titulo}>👩‍💻 Gestión de Usuarios</h1>
      <div style={styles.panel}>
        <button style={styles.btn} onClick={() => navigate("/admin/usuarios/listado")}>
          📋 Ver todos los usuarios
        </button>
        <button style={styles.btn} onClick={() => navigate("/admin/usuarios/buscar")}>
          🔍 Buscar por nombre o email
        </button>
        <button style={styles.btn} onClick={() => navigate("/admin/usuarios/perfil")}>
          👤 Ver perfil de usuario
        </button>
        <button style={styles.btn} onClick={() => navigate("/admin/usuarios/bloquear")}>
          🚫 Bloquear usuario
        </button>
        <button style={styles.btn} onClick={() => navigate("/admin/usuarios/aviso")}>
          📩 Enviar aviso
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f1ec",
    padding: 30,
    color: "#333",
    minHeight: "100vh",
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
    backgroundColor: "#e1e7ff",
    color: "#333",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
};

export default AdminGestionUsuarios;
