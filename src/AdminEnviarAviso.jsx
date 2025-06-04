import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { dbRealtime } from "./firebase";


const AdminEnviarAviso = () => {
  const { id } = useParams(); // ID del usuario desde la URL
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleEnviar = async () => {
    if (!mensaje.trim()) {
      alert("Por favor, escribe un mensaje.");
      return;
    }

    try {
      const avisosRef = ref(dbRealtime, `usuarios/${id}/avisos`);
      await push(avisosRef, {
        texto: mensaje,
        fecha: new Date().toISOString(),
      });

      alert("Aviso enviado correctamente");
      navigate(`/admin/usuarios/perfil/${id}`);
    } catch (error) {
      console.error("Error al enviar el aviso:", error);
      alert("Error al enviar el aviso");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.aviso}>
        <h2>📢 Enviar aviso al usuario</h2>
        <textarea
          placeholder="Escribe aquí el mensaje o advertencia..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleEnviar} style={styles.btn}>
          Enviar aviso
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    minHeight: "100vh",
  },
  aviso: {
    background: "white",
    padding: 30,
    maxWidth: 600,
    margin: "auto",
    borderRadius: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  textarea: {
    width: "100%",
    height: 150,
    padding: 15,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginTop: 10,
    fontSize: "1rem",
  },
  btn: {
    marginTop: 20,
    padding: "12px 24px",
    backgroundColor: "#4a90e2",
    border: "none",
    borderRadius: 12,
    color: "white",
    fontSize: 16,
    cursor: "pointer",
  },
};

export default AdminEnviarAviso;


