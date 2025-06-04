import React from "react";
import BotonReserva from "./BotonReserva";

const ExpresContinuo = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.titulo}>EXPRÉS CONTINUO</h1>
        <p style={styles.descripcion}>
          Taller único sin compromiso y para seguir cuando quieras.
        </p>

        <div style={styles.destacado}>
          Ideal para quienes buscan formación continua y personalizada. <br />
          <strong>
            SIN COMPROMISO MENSUAL. SIN NECESIDAD DE EXPERIENCIA.
          </strong>
        </div>

        <div style={styles.imagenes}>
          <div style={styles.bloqueImagen}>
            <img
              src="/img/exprescontinuo1.jpg"
              alt="Exprés Continuo general"
              style={styles.imagen}
            />
            <div style={styles.precioCirculo}>32€</div>
          </div>
          <div style={styles.bloqueImagen}>
            <img
              src="/img/exprescontinuo2.jpg"
              alt="Exprés Continuo torno"
              style={styles.imagen}
            />
            <div style={{ ...styles.precioCirculo, backgroundColor: "#f6e6a3" }}>
              27€
            </div>
          </div>
        </div>

        <p style={styles.texto}>
          Clases sueltas sin compromiso.
          <br />
          Ven cuando quieras, termina piezas pendientes, esmalta tus creaciones
          o empieza desde cero. Tú eliges el ritmo.
          <br />
          Incluye seguimiento, materiales y cocción. No incluye esmaltado por
          parte del estudio.
        </p>

        {/* Botón reutilizable */}
        <div style={{ textAlign: "center" }}>
          <BotonReserva destino="/reserva-exprescontinuo" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 20,
  },
  container: {
    background: "white",
    borderRadius: 20,
    padding: 30,
    maxWidth: 600,
    margin: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  titulo: {
    textAlign: "center",
    color: "#6b3700",
    fontSize: "1.8rem",
    marginBottom: 10,
  },
  descripcion: {
    textAlign: "center",
    marginBottom: 20,
  },
  destacado: {
    backgroundColor: "#fff1bd",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: "0.95rem",
    textAlign: "center",
    color: "#333",
  },
  imagenes: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
    flexWrap: "wrap",
  },
  bloqueImagen: {
    position: "relative",
    width: "45%",
    minWidth: 120,
  },
  imagen: {
    width: "100%",
    borderRadius: 12,
    objectFit: "cover",
  },
  precioCirculo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#f6c29f",
    color: "white",
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  texto: {
    fontSize: "0.95rem",
    lineHeight: 1.5,
    marginBottom: 20,
  },
};

export default ExpresContinuo;

