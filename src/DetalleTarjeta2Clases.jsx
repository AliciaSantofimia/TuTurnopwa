import React from "react";
import { useNavigate } from "react-router-dom";

const DetalleTarjeta2Clases = () => {
  const navigate = useNavigate();

  const handleComprar = () => {
    // Puedes pasar datos a la pantalla de pago si lo necesitas
    navigate("/resumen-pago", {
      state: {
        clase: "2 clases de 3h al mes (tarjeta regalo)",
        fecha: "", // si se elige más adelante
        turno: "", // si aplica
        metodo: "", // si aplica
        precio: "70€"
      }
    });
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <img src="/2clases.jpg" alt="2 clases al mes" style={styles.imagen} />
        <div style={styles.content}>
          <h1 style={styles.titulo}>2 clases de 3h al mes</h1>
          <div style={styles.precio}>70€</div>
          <p style={styles.descripcion}>
            Dos sesiones mensuales de 3 horas para aprender y experimentar con el torno o técnicas manuales.
            Una opción ideal para iniciarte o mantenerte en contacto con la cerámica.
            Incluye todos los materiales, esmaltes y la cocción de tus piezas.
          </p>
          <button onClick={handleComprar} style={styles.btn}>COMPRAR</button>
        </div>
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
    color: "#333",
    minHeight: "100vh",
  },
  container: {
    backgroundColor: "white",
    maxWidth: 500,
    margin: "auto",
    borderRadius: 16,
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  imagen: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  content: {
    padding: 20,
    textAlign: "center",
  },
  titulo: {
    fontSize: "1.3rem",
    marginBottom: 6,
    color: "#3b3025",
  },
  precio: {
    fontSize: "1.1rem",
    color: "#e06c75",
    fontWeight: "bold",
    marginBottom: 14,
  },
  descripcion: {
    fontSize: "0.95rem",
    lineHeight: 1.5,
    marginBottom: 24,
  },
  btn: {
    backgroundColor: "#f8b5b5",
    color: "white",
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: 30,
    fontSize: "0.9rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s ease",
  }
};

export default DetalleTarjeta2Clases;
