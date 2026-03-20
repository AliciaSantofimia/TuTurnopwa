import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmacionPago = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.check}>✓</div>

        <h1 style={styles.title}>¡Pago realizado con éxito!</h1>

        <p style={styles.text}>
          Gracias por tu reserva. Te esperamos en el taller con muchas ganas.
        </p>

        <div style={styles.botones}>
          <button
            onClick={() => navigate("/dondereservar")}
            style={styles.botonPrincipal}
          >
            Seguir reservando
          </button>

          <button
            onClick={() => navigate("/perfil")}
            style={styles.botonSecundario}
          >
            Ver mi reserva
          </button>
        </div>

        <img
          src="/img/logoPC.png"
          alt="Logo TuTurno"
          style={styles.logo}
        />
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    margin: 0,
    padding: 20,
    minHeight: "100vh",
    color: "#333",
  },
  container: {
    maxWidth: 400,
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: 24,
    textAlign: "center",
  },
  check: {
    fontSize: "4rem",
    color: "#4BB543",
    marginBottom: 20,
  },
  title: {
    fontSize: "1.6rem",
    marginBottom: 10,
    color: "#6b3700",
  },
  text: {
    fontSize: "1rem",
    marginBottom: 24,
    lineHeight: 1.5,
  },
  botones: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 24,
  },
  botonPrincipal: {
    backgroundColor: "#f59e8f",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "999px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  botonSecundario: {
    backgroundColor: "white",
    color: "#5f6368",
    padding: "12px 20px",
    border: "1px solid #d1d5db",
    borderRadius: "999px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  logo: {
    display: "block",
    margin: "10px auto 0",
    width: 80,
    height: "auto",
  },
};

export default ConfirmacionPago;