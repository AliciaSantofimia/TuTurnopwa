import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RedirigiendoPago = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const datosReserva = location.state;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Aquí se insertará la lógica real para redirigir o crear formulario de Redsys
      console.log("Reserva enviada a Redsys:", datosReserva);
      window.location.href = "https://sis-t.redsys.es:25443/sis/realizarPago"; // URL de entorno pruebas Redsys
    }, 3000);

    return () => clearTimeout(timer);
  }, [datosReserva]);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Redirigiendo al pago seguro...</h1>
        <p style={styles.text}>
          Estamos conectando con la pasarela de pago segura. Por favor, espera unos segundos...
        </p>
        <div style={styles.spinner}></div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#333",
  },
  container: {
    maxWidth: "400px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "10px",
    color: "#6b3700",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "30px",
  },
  spinner: {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #f59e8f",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    margin: "0 auto",
    animation: "spin 1s linear infinite"
  }
};

// Animación CSS global
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default RedirigiendoPago;

