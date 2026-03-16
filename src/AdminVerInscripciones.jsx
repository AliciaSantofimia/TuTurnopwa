import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminVerInscripciones = () => {
  const { nombreClase } = useParams();
  const [inscripciones, setInscripciones] = useState([]);
  const [tituloClase, setTituloClase] = useState(nombreClase || "...");

  useEffect(() => {
    const cargarInscripciones = async () => {
      try {
        const [claseSnap, reservasSnap] = await Promise.all([
          get(ref(dbRealtime, `clases/${nombreClase}`)),
          get(ref(dbRealtime, `reservas/${nombreClase}`)),
        ]);

        if (claseSnap.exists()) {
          const clase = claseSnap.val();
          setTituloClase(clase.nombre || nombreClase);
        } else {
          setTituloClase(nombreClase || "Clase");
        }

        const resultados = [];

        if (reservasSnap.exists()) {
          reservasSnap.forEach((fechaSnap) => {
            const fecha = fechaSnap.key;

            fechaSnap.forEach((turnoSnap) => {
              const turno = turnoSnap.key;

              turnoSnap.forEach((tipoSnap) => {
                const tipo = tipoSnap.key;

                tipoSnap.forEach((reservaSnap) => {
                  const data = reservaSnap.val();

                  resultados.push({
                    nombre: data.nombre || "—",
                    email: data.email || "—",
                    fecha: data.fecha || fecha,
                    turno: data.turno || turno,
                    tipo: data.metodo || tipo,
                    plazas: Number(data.plazas || 1),
                  });
                });
              });
            });
          });
        }

        resultados.sort((a, b) => {
          const fechaA = new Date(`${a.fecha}T00:00:00`);
          const fechaB = new Date(`${b.fecha}T00:00:00`);
          return fechaA - fechaB;
        });

        setInscripciones(resultados);
      } catch (error) {
        console.error("Error al cargar inscripciones:", error);
        setInscripciones([]);
      }
    };

    cargarInscripciones();
  }, [nombreClase]);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h2 style={styles.titulo}>👥 Inscripciones - {tituloClase}</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Turno</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Plazas</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>{item.nombre}</td>
                <td style={styles.td}>{item.email}</td>
                <td style={styles.td}>{item.fecha}</td>
                <td style={styles.td}>{item.turno}</td>
                <td style={styles.td}>{item.tipo}</td>
                <td style={styles.td}>{item.plazas}</td>
              </tr>
            ))}

            {inscripciones.length === 0 && (
              <tr>
                <td colSpan="6" style={styles.emptyTd}>
                  No hay inscripciones registradas para esta clase.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fdf8ee",
    padding: 30,
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  table: {
    width: "100%",
    maxWidth: 900,
    margin: "auto",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    backgroundColor: "#ffe1c4",
    color: "#333",
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "12px 16px",
    textAlign: "left",
    borderBottom: "1px solid #eee",
  },
  emptyTd: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },
};

export default AdminVerInscripciones;