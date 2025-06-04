import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { dbRealtime } from "./firebase";


const AdminEditarClase = () => {
  const { id } = useParams(); // obtengo el ID (nombre de la clase)
  const navigate = useNavigate();

  const [clase, setClase] = useState({
    nombre: "",
    descripcion: "",
    horario: "",
    plazas: "",
    imagen: ""
  });

  useEffect(() => {
    const cargarClase = async () => {
      try {
        const claseRef = ref(dbRealtime, `clases/${id}`);
        const snapshot = await get(claseRef);
        if (snapshot.exists()) {
          setClase(snapshot.val());
        } else {
          console.error("Clase no encontrada");
        }
      } catch (error) {
        console.error("Error al obtener la clase:", error);
      }
    };

    cargarClase();
  }, [id]);

  const handleChange = (e) => {
    setClase({ ...clase, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    if (!clase.nombre || !clase.descripcion || !clase.horario || !clase.plazas) {
      alert("Por favor, completa todos los campos");
      return;
    }

    try {
      const claseRef = ref(dbRealtime, `clases/${id}`);
      await update(claseRef, clase);
      alert("Clase actualizada correctamente");
      navigate("/admin/clases");
    } catch (error) {
      console.error("Error al actualizar la clase:", error);
      alert("Error al guardar los cambios.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.formulario}>
        <h2 style={styles.titulo}>Editar clase</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la clase"
          value={clase.nombre}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={clase.descripcion}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="horario"
          placeholder="Horario"
          value={clase.horario}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="plazas"
          placeholder="Plazas disponibles"
          value={clase.plazas}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="imagen"
          placeholder="Ruta de imagen"
          value={clase.imagen}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleGuardar} style={styles.btn}>
          Guardar cambios
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

export default AdminEditarClase;


