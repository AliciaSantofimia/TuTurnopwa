import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { useSearchParams } from "react-router-dom";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminDetalleUsuarioNuevo = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const [usuario, setUsuario] = useState(null);
  const [reservasUsuario, setReservasUsuario] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        if (!uid) {
          setCargando(false);
          return;
        }

        const snapshot = await get(ref(dbRealtime, `usuarios/${uid}`));

        if (!snapshot.exists()) {
          setUsuario(null);
          setReservasUsuario([]);
          setCargando(false);
          return;
        }

        const data = snapshot.val() || {};

        setUsuario({
          uid,
          nombre: data.nombre || data.displayName || "Sin nombre",
          email: data.email || "Sin email",
          telefono: data.telefono || data.phoneNumber || "",
        });

        let lista = [];

        if (data.reservas && typeof data.reservas === "object") {
          lista = Object.entries(data.reservas).map(([id, reserva]) => ({
            id,
            ...(reserva || {}),
          }));
        } else if (data.listaReservas && typeof data.listaReservas === "object") {
          lista = Object.entries(data.listaReservas).map(([id, reserva]) => ({
            id,
            ...(reserva || {}),
          }));
        }

        lista.sort((a, b) => {
          const fechaA = new Date(`${a.fecha || ""}T00:00:00`);
          const fechaB = new Date(`${b.fecha || ""}T00:00:00`);
          return fechaB - fechaA;
        });

        setReservasUsuario(lista);
      } catch (error) {
        console.error("Error al cargar detalle de usuario:", error);
        setUsuario(null);
        setReservasUsuario([]);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, [uid]);

  if (cargando) {
    return <p style={styles.mensaje}>Cargando usuario...</p>;
  }

  if (!usuario) {
    return <p style={styles.mensaje}>Usuario no encontrado.</p>;
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h1 style={styles.titulo}>Detalle de usuario</h1>

        <div style={styles.card}>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono || "—"}</p>
          <p><strong>UID:</strong> {usuario.uid}</p>
          <p><strong>Total reservas guardadas:</strong> {reservasUsuario.length}</p>
        </div>

        <div style={styles.bloque}>
          <h2 style={styles.subtitulo}>Reservas del usuario</h2>

          {reservasUsuario.length === 0 ? (
            <p style={styles.textoVacio}>Este usuario no tiene reservas guardadas.</p>
          ) : (
            <div style={styles.lista}>
              {reservasUsuario.map((r, index) => (
                <div key={`${r.id}-${index}`} style={styles.reservaItem}>
                  <p style={styles.linea}>
                    <strong>Clase:</strong> {r.clase || "—"}
                  </p>
                  <p style={styles.linea}>
                    <strong>Fecha:</strong> {r.fecha || "—"}
                  </p>
                  <p style={styles.linea}>
                    <strong>Turno:</strong> {r.turno || "—"}
                  </p>
                  <p style={styles.linea}>
                    <strong>Estado:</strong> {r.estado || "—"}
                  </p>
                  <p style={styles.linea}>
                    <strong>Pago:</strong> {r.estadoPago || "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fdf8ee",
    minHeight: "100vh",
    padding: 30,
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 800,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
  },
  titulo: {
    textAlign: "center",
    margin: "0 0 20px 0",
    color: "#2f2f2f",
    fontSize: "2rem",
  },
  subtitulo: {
    margin: "0 0 14px 0",
    color: "#4b3a2a",
    fontSize: "1.2rem",
  },
  card: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    display: "grid",
    gap: 8,
  },
  bloque: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 20,
    padding: 20,
  },
  lista: {
    display: "grid",
    gap: 12,
  },
  reservaItem: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#fffaf0",
    border: "1px solid #eadfbe",
  },
  linea: {
    margin: "4px 0",
    color: "#333",
    fontSize: "0.94rem",
  },
  textoVacio: {
    margin: 0,
    color: "#7a7a7a",
  },
  mensaje: {
    textAlign: "center",
    padding: 40,
    color: "#7a7a7a",
  },
};

export default AdminDetalleUsuarioNuevo;