import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservaExpresContinuo = () => {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const navigate = useNavigate();

  const handleReserva = () => {
    if (fecha && turno && metodo) {
      const precio = metodo === "torno" ? "27€" : "32€";

      navigate("/resumen-pago", {
        state: {
          clase: "Exprés Continuo",
          fecha,
          turno,
          metodo,
          precio,
        },
      });
    } else {
      alert("Por favor, completa todos los campos antes de continuar.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.titulo}>Reserva: Exprés Continuo</h2>

        <label>📅 Selecciona fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={styles.input}
          min="2025-01-01"
          max="2025-12-31"
        />

        <label>🕒 Selecciona turno:</label>
        <select
          value={turno}
          onChange={(e) => setTurno(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Selecciona --</option>
          <option value="10:00 - 13:00">Mañana (10:00 - 13:00)</option>
          <option value="17:00 - 20:00">Tarde (17:00 - 20:00)</option>
        </select>

        <label>🧱 Método:</label>
        <select
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Selecciona --</option>
          <option value="torno">Torno - 27€</option>
          <option value="general">General - 32€</option>
        </select>

        <button style={styles.boton} onClick={handleReserva}>
          Confirmar y pagar
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 30,
    minHeight: "100vh",
  },
  container: {
    maxWidth: 500,
    margin: "auto",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#6b3700",
  },
  input: {
    width: "100%",
    marginBottom: 20,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  boton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f6bda3",
    border: "none",
    borderRadius: 12,
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default ReservaExpresContinuo;


