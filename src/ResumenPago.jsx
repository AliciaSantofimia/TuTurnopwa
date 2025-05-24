import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResumenPago = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const datos = location.state;

  if (!datos) {
    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <h1 style={styles.title}>No hay datos para mostrar</h1>
          <p style={{ textAlign: "center" }}>
            Por favor, vuelve a seleccionar tu clase.
          </p>
          <button style={styles.btn} onClick={() => navigate("/clases")}>
            Volver a clases
          </button>
        </div>
      </div>
    );
  }

  const { clase, fecha, turno, metodo, precio, plazas } = datos;

  const handlePagar = () => {
    alert("Redirigiendo a la pasarela de pago...");
    // Aquí puedes redirigir a Redsys o a una pantalla intermedia
    // navigate("/redirigiendo-pago");
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Resumen de tu reserva</h1>

        <div style={styles.resumen}>
          <p><strong>Clase:</strong> {clase}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Turno:</strong> {turno}</p>
          {metodo && <p><strong>Método:</strong> {metodo}</p>}
          {plazas && <p><strong>Plazas:</strong> {plazas}</p>}
        </div>

        <div style={styles.precio}>{precio}</div>

        <button onClick={handlePagar} style={styles.btn}>Pagar ahora</button>

        <img src="/logoPCsin.png" alt="Logo TuTurno" style={styles.logo} />
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
    maxWidth: 400,
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: 24,
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: 20,
    textAlign: "center",
    color: "#6b3700",
  },
  resumen: {
    marginBottom: 20,
    fontSize: "1rem",
  },
  precio: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#e76a44",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btn: {
    display: "block",
    width: "100%",
    backgroundColor: "#f59e8f",
    color: "white",
    padding: 12,
    border: "none",
    borderRadius: 999,
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
  },
  logo: {
    display: "block",
    margin: "30px auto 10px",
    width: 80,
  }
};

export default ResumenPago;



