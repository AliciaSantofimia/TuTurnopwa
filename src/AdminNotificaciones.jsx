import React, { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { dbRealtime } from "./firebase";


const AdminNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    // Cargar desde Firebase Realtime Database
    /*
    const cargarNotificaciones = async () => {
      try {
        const snapshot = await get(child(ref(dbRealtime), "notificaciones"));
        const datos = [];

        snapshot.forEach((snap) => {
          const noti = snap.val();
          datos.push({
            id: snap.key,
            usuario: noti.usuario || "Desconocido",
            mensaje: noti.mensaje || "",
            fecha: noti.fecha || "",
          });
        });

        setNotificaciones(datos);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    cargarNotificaciones();
    */

    // Datos simulados
    setNotificaciones([
      {
        id: "n1",
        usuario: "Ana Pérez",
        mensaje: "Tu clase ha sido reprogramada para el 15/06.",
        fecha: "2025-06-10",
      },
      {
        id: "n2",
        usuario: "Juan López",
        mensaje: "Has agotado tu bono. Compra uno nuevo para seguir reservando.",
        fecha: "2025-06-11",
      },
    ]);
  }, []);

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>🔔 Notificaciones enviadas</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Usuario</th>
            <th style={styles.th}>Mensaje</th>
            <th style={styles.th}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {notificaciones.map((n) => (
            <tr key={n.id}>
              <td style={styles.td}>{n.usuario}</td>
              <td style={styles.td}>{n.mensaje}</td>
              <td style={styles.td}>{n.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  table: {
    width: "100%",
    maxWidth: 900,
    margin: "auto",
    backgroundColor: "white",
    borderCollapse: "collapse",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#ccd8ff",
    padding: 12,
    textAlign: "left",
    color: "#333",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
};

export default AdminNotificaciones;
