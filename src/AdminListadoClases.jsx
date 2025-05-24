import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminListadoClases = () => {
  const navigate = useNavigate();

  // Estado temporal: se sustituirá con datos reales desde Firebase
  const [clases, setClases] = useState([
    {
      id: "clase1",
      nombre: "Edición Premium",
      turnos: "Mañana y tarde",
    },
    {
      id: "clase2",
      nombre: "Crea tu pieza favorita",
      turnos: "Sábados por la mañana",
    }
  ]);

  // Más adelante: cargar desde Firebase
  useEffect(() => {
    // Aquí se llamaría a Firebase para obtener las clases
    // Por ahora usamos los datos simulados
  }, []);

  const handleNavegar = (ruta, id) => {
    navigate(`/admin/clases/${ruta}/${id}`);
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>Listado de Clases</h2>
      {clases.map((clase) => (
        <div key={clase.id} style={styles.clase}>
          <strong>{clase.nombre}</strong>
          <p>Turnos: {clase.turnos}</p>
          <div style={styles.acciones}>
            <button onClick={() => handleNavegar("editar", clase.id)} style={styles.link}>✏️ Editar</button>
            <button onClick={() => handleNavegar("eliminar", clase.id)} style={styles.link}>🗑️ Eliminar</button>
            <button onClick={() => handleNavegar("imagen", clase.id)} style={styles.link}>🖼️ Cambiar imagen</button>
            <button onClick={() => handleNavegar("inscripciones", clase.id)} style={styles.link}>👥 Ver inscripciones</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 30,
    color: "#333",
    minHeight: "100vh"
  },
  titulo: {
    textAlign: "center",
    color: "#444",
    marginBottom: 30
  },
  clase: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    margin: "15px auto",
    maxWidth: 600,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  acciones: {
    marginTop: 10,
  },
  link: {
    marginRight: 10,
    fontSize: 14,
    color: "#666",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline"
  }
};

export default AdminListadoClases;
