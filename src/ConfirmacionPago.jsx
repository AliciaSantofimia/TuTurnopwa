import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmacionPago = () => {
  const navigate = useNavigate();

  // cuando hago clic en el botón, llevo al usuario a su perfil
  const handleVolverInicio = () => {
    navigate("/perfil");
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.check}>✓</div>
        <h1 style={styles.title}>¡Pago realizado con éxito!</h1>
        <p style={styles.text}>
          Gracias por tu reserva. Te esperamos en el taller con muchas ganas.
        </p>
        <button onClick={handleVolverInicio} style={styles.btn}>
          Volver al inicio
        </button>
        <img
          src="/logoPCsin.png"
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
    marginBottom: 20,
  },
  btn: {
    display: "inline-block",
    backgroundColor: "#f59e8f",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "999px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
  },
  logo: {
    display: "block",
    margin: "30px auto 10px",
    width: 80,
  },
};

export default ConfirmacionPago;

