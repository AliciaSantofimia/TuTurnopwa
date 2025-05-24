import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminListadoReservas = () => {
  const [reservas, setReservas] = useState([]);

  // aquí cargo todas las reservas reales desde Firebase
  useEffect(() => {
    /*
    const obtenerReservas = async () => {
      const querySnapshot = await getDocs(collection(db, "reservas"));
      const datos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservas(datos);
    };

    obtenerReservas();
    */

    // datos simulados mientras no está Firebase conectado
    setReservas([
      {
        id: "r1",
        clase: "Edición Premium",
        usuario: "Ana Pérez",
        fecha: "10/06/2025",
        turno: "Mañana",
        estado: "Activa",
      },
      {
        id: "r2",
        clase: "Crea tu pieza",
        usuario: "Juan López",
        fecha: "11/06/2025",
        turno: "Tarde",
        estado: "Completada",
      },
    ]);
  }, []);

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>📋 Listado de Reservas</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Clase</th>
            <th style={styles.th}>Usuario</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Turno</th>
            <th style={styles.th}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td style={styles.td}>{reserva.clase}</td>
              <td style={styles.td}>{reserva.usuario}</td>
              <td style={styles.td}>{reserva.fecha}</td>
              <td style={styles.td}>{reserva.turno}</td>
              <td style={styles.td}>{reserva.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f1ec",
    padding: 30,
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
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  th: {
    padding: 12,
    borderBottom: "1px solid #eee",
    backgroundColor: "#d0f0e8",
    textAlign: "left",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
};

export default AdminListadoReservas;
