import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHistoriales = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>🕓 Historiales</h2>

      <div style={styles.panel}>
        <button
          style={styles.btn}
          onClick={() => navigate("/admin/historial/reservas")}
        >
          📜 Historial de Reservas
        </button>

        <button
          style={styles.btn}
          onClick={() => navigate("/admin/historial/bonos")}
        >
          🎟️ Historial de Bonos Comprados
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
    maxWidth: 500,
    margin: "0 auto",
    background: "#fff",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AdminHistoriales;
