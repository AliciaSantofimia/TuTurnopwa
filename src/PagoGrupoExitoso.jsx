import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";

const PagoGrupoExitoso = () => {
  const { grupoId } = useParams();
  const [grupo, setGrupo] = useState(null);

  useEffect(() => {
    const cargarGrupo = async () => {
      if (!grupoId) return;

      try {
        const snap = await get(ref(dbRealtime, `reservasGrupos/${grupoId}`));
        if (snap.exists()) {
          setGrupo(snap.val());
        }
      } catch (error) {
        console.error("Error al cargar grupo:", error);
      }
    };

    cargarGrupo();
  }, [grupoId]);

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <div style={styles.icono}>✓</div>

        <h1 style={styles.titulo}>¡Pago realizado con éxito!</h1>

        <p style={styles.texto}>
          Tu plaza se ha pagado correctamente
          {grupo?.nombreGrupo ? (
            <>
              <strong style={{ wordBreak: "break-word" }}>
  {grupo.nombreGrupo}
</strong>
            </>
          ) : (
            "."
          )}
        </p>

        <p style={styles.detalle}>
          El taller ya tiene registrada tu plaza dentro de esta reserva de grupo.
        </p>

        <Link to="/portada" style={styles.boton}>
          Volver al inicio
        </Link>
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
    fontSize: 56,
    color: "#45b657",
    marginBottom: 12,
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
  detalle: {
    color: "#666",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    marginTop: 10,
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

export default PagoGrupoExitoso;