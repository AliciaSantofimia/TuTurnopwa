import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { dbRealtime } from "./firebase";


const AdminCrearClase = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horario, setHorario] = useState("");
  const [plazas, setPlazas] = useState("");
  const [imagen, setImagen] = useState("");

  const handleCrearClase = async () => {
    if (!nombre || !descripcion || !horario || !plazas) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevaClase = {
      nombre,
      descripcion,
      horario,
      plazas: parseInt(plazas),
      imagen,
    };

    try {
      const claseRef = ref(dbRealtime, `clases/${nombre}`);
      await set(claseRef, nuevaClase);
      alert("Clase creada con éxito");
      navigate("/admin/clases");
    } catch (error) {
      console.error("Error al crear la clase:", error);
      alert("Hubo un error al guardar la clase.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.formulario}>
        <h2 style={styles.titulo}>Crear nueva clase</h2>
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
          placeholder="Ruta de la imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCrearClase} style={styles.btn}>
          Crear clase
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
