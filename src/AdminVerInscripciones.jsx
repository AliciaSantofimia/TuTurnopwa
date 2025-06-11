import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminVerInscripciones = () => {
  const { id } = useParams(); // id de la clase, como "BásicoEsencial"
  const [inscripciones, setInscripciones] = useState([]);
  const [nombreClase, setNombreClase] = useState(id || "...");

  useEffect(() => {
    const cargarInscripciones = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, `reservas/${id}`));
        const resultados = [];

        if (snapshot.exists()) {
          snapshot.forEach((fechaSnap) => {
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
                  });
                });
              });
            });
          });
        }

        setInscripciones(resultados);
      } catch (error) {
        console.error("Error al cargar inscripciones:", error);
      }
    };

    cargarInscripciones();
  }, [id]);

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>👥 Inscripciones - {nombreClase}</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Turno</th>
            <th style={styles.th}>Tipo</th>
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
            </tr>
          ))}
          {inscripciones.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                No hay inscripciones registradas para esta clase.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f0f4f8",
    padding: 30,
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  table: {
    width: "100%",
    maxWidth: 800,
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
  }
};

export default AdminVerInscripciones;
