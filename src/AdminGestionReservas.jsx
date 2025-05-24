import React from "react";
import { useNavigate } from "react-router-dom";

const AdminGestionReservas = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <h1 style={styles.titulo}>📅 Gestión de Reservas</h1>
      <div style={styles.panel}>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/reservas/listado")}>
          📋 Ver listado de reservas
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/reservas/filtrar")}>
          🔎 Filtrar por fecha
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/reservas/completar")}>
          ✅ Marcar como completada
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/reservas/cancelar")}>
          ❌ Cancelar reserva
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/reservas/nota")}>
          📝 Añadir nota interna
        </button>
        <button className="btn" style={styles.btn} onClick={() => navigate("/admin/reservas/veruso-bonos")}>
          🎟️ Ver uso de bonos
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
    backgroundColor: "#d0f0e8",
    color: "#333",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default AdminGestionReservas;

