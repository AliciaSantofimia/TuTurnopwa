import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { dbRealtime } from "./firebase";

const AdminCrearClase = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horario, setHorario] = useState("");
  const [plazas, setPlazas] = useState("");
  const [imagen, setImagen] = useState("");

  const handleEnviarSolicitud = async () => {
    if (!nombre || !descripcion || !horario || !plazas) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const email = user?.email || "—";

    const solicitud = {
      clase: nombre.trim(),
      tipo: "crear",
      mensaje: `Descripción: ${descripcion}\nHorario: ${horario}\nPlazas: ${plazas}\nImagen: ${imagen || "—"}`,
      fecha: new Date().toISOString(),
      autor: email,
    };

    try {
      await push(ref(dbRealtime, "solicitudesCambiosClases"), solicitud);
      alert("✅ Solicitud de creación enviada correctamente.");
      navigate("/admin");
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      alert("❌ No se pudo enviar la solicitud.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.formulario}>
        <h2 style={styles.titulo}>📋 Solicitar nueva clase</h2>
        <input
          type="text"
          placeholder="Nombre de la clase"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Descripción de la clase"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Horario disponible"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Plazas disponibles"
          value={plazas}
          onChange={(e) => setPlazas(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Ruta de la imagen (opcional)"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleEnviarSolicitud} style={styles.btn}>
          📩 Enviar solicitud
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    padding: 30,
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  formulario: {
    maxWidth: 500,
    margin: "auto",
    background: "white",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  btn: {
    backgroundColor: "#f6bda3",
    color: "white",
    padding: 12,
    border: "none",
    borderRadius: 12,
    width: "100%",
    fontSize: 16,
    cursor: "pointer",
  }
};

export default AdminCrearClase;

