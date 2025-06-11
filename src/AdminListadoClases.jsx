import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminListadoClases = () => {
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const cargarClases = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "clases"));
        if (snapshot.exists()) {
          const datos = [];
          snapshot.forEach((child) => {
            datos.push({
              id: child.key,
              ...child.val(),
            });
          });
          setClases(datos);
        } else {
          console.log("No hay clases disponibles.");
        }
      } catch (error) {
        console.error("Error al cargar clases desde Firebase:", error);
      }
    };

    cargarClases();
  }, []);

  const handleVerInscripciones = (nombreClase) => {
    console.log("➡️ Ir a inscripciones de:", nombreClase); // 🧪 Depuración
    navigate(`/admin/clases/inscripciones/${nombreClase}`);
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>📋 Listado de Clases</h2>

      {clases.length === 0 ? (
        <p style={{ textAlign: "center" }}>No hay clases disponibles.</p>
      ) : (
        clases.map((clase) => (
          <div key={clase.id} style={styles.clase}>
            <strong>{clase.nombre || clase.id}</strong>
            <p>
              Turnos:{" "}
              {Array.isArray(clase.turnos)
                ? clase.turnos.join(", ")
                : clase.turnos || "No definidos"}
            </p>
            <div style={styles.acciones}>
              <button
                onClick={() => handleVerInscripciones(clase.nombre)}
                style={styles.link}
              >
                👥 Ver inscripciones
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 30,
    color: "#333",
    minHeight: "100vh",
  },
  titulo: {
    textAlign: "center",
    color: "#444",
    marginBottom: 30,
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
    fontSize: 14,
    color: "#4a90e2",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default AdminListadoClases;


