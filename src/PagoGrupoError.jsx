import React from "react";
import { useParams, Link } from "react-router-dom";

const PagoGrupoError = () => {
  const { grupoId } = useParams();

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <div style={styles.icono}>!</div>

        <h1 style={styles.titulo}>Pago no completado</h1>

        <p style={styles.texto}>
          El pago no se ha completado. Puedes intentarlo de nuevo desde el enlace del grupo.
        </p>

        {grupoId && (
          <Link to={`/pago-grupo/${grupoId}`} style={styles.boton}>
            Intentar pagar de nuevo
          </Link>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    minHeight: "100vh",
    backgroundColor: "#fffef4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    maxWidth: 520,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },
  icono: {
    fontSize: 48,
    color: "#d9534f",
    marginBottom: 12,
    fontWeight: "bold",
  },
  titulo: {
    color: "#6b3700",
    fontSize: "1.6rem",
    marginBottom: 14,
  },
  texto: {
    color: "#333",
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  boton: {
    display: "inline-block",
    marginTop: 24,
    padding: "12px 22px",
    borderRadius: 30,
    backgroundColor: "#f8b5b5",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default PagoGrupoError;