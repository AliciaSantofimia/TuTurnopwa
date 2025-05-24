import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminVerInscripciones = () => {
  const { id } = useParams(); // aquí obtengo el ID de la clase desde la URL
  const [inscripciones, setInscripciones] = useState([]);
  const [nombreClase, setNombreClase] = useState("...");

  // aquí buscaré todas las reservas que coincidan con esta clase
  useEffect(() => {
    const cargarInscripciones = async () => {
      /*
      const q = query(collection(db, "reservas"), where("claseId", "==", id));
      const querySnapshot = await getDocs(q);
      const datos = querySnapshot.docs.map(doc => doc.data());
      setInscripciones(datos);
      */
      // Simulación temporal
      setNombreClase("Edición Premium");
      setInscripciones([
        {
          nombre: "Ana López",
          email: "ana@email.com",
          fecha: "12/06/2025",
          turno: "Tarde",
          tipo: "Torno"
        },
        {
          nombre: "Carlos Ruiz",
          email: "carlos@email.com",
          fecha: "13/06/2025",
          turno: "Mañana",
          tipo: "General"
        }
      ]);
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
