import React from "react";
import { useNavigate } from "react-router-dom";

const PagoFallido = () => {
  const navigate = useNavigate();

  const handleVolverPerfil = () => {
    navigate("/perfil"); // Ajusta esta ruta si tu pantalla de perfil tiene otro path
  };

  return (
    <div style={styles.body}>
      <div style={styles.mensaje}>
        <h2>😞 El pago no se ha completado</h2>
        <p>Puedes volver a intentarlo desde tu perfil.</p>
        <button onClick={handleVolverPerfil} style={styles.btn}>
          Volver al perfil
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#ffe6e6",
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: "center",
    padding: "50px",
    color: "#b00020",
    minHeight: "100vh",
  },
  mensaje: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "inline-block",
  },
  btn: {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#b00020",
    color: "white",
    border: "none",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default PagoFallido;
