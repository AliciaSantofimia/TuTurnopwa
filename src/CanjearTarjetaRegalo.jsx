import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CanjearTarjetaRegalo = () => {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [codigoValido, setCodigoValido] = useState(false);
  const navigate = useNavigate();

  const handleValidar = () => {
    if (codigo.trim() === "") {
      setMensaje("Por favor, introduce un código.");
      setCodigoValido(false);
    } else if (codigo === "TUTURNO2025") {
      setMensaje("🎉 Código válido. ¡Ya puedes reservar tu taller!");
      setCodigoValido(true);
    } else {
      setMensaje("❌ Código no válido. Revisa que lo has escrito bien.");
      setCodigoValido(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.titulo}>Canjear tarjeta regalo</h2>
        <p style={styles.descripcion}>
          Introduce el código de tu tarjeta para acceder a tu taller.
        </p>
        <input
          type="text"
          placeholder="Introduce tu código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleValidar} style={styles.btn}>
          VALIDAR CÓDIGO
        </button>
        {mensaje && <div style={styles.mensaje}>{mensaje}</div>}
        {codigoValido && (
          <button
            onClick={() => navigate("/clases")}
            style={{ ...styles.btn, marginTop: 16 }}
          >
            VER CLASES DISPONIBLES
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    maxWidth: 420,
    width: "100%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  titulo: {
    color: "#6b3700",
    fontSize: "1.3rem",
    marginBottom: 10,
  },
  descripcion: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ccc",
    marginBottom: 20,
    fontSize: "1rem",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#f8b5b5",
    color: "white",
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: 30,
    fontSize: "0.95rem",
    border: "none",
    cursor: "pointer",
  },
  mensaje: {
    marginTop: 20,
    fontSize: "0.95rem",
    color: "#6b3700",
  }
};

export default CanjearTarjetaRegalo;
