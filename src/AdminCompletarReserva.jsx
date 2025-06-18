import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref as dbRef, get, update } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminCompletarReserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const obtenerReserva = async () => {
      const ref = dbRef(dbRealtime, `reservasAdmin/${id}`);
      const snapshot = await get(ref);
      if (snapshot.exists()) {
        setReserva(snapshot.val());
      } else {
        alert("Reserva no encontrada");
        navigate("/admin/reservas/listado");
      }
    };
    obtenerReserva();
  }, [id, navigate]);

  const handleConfirmar = async () => {
    try {
      const ref = dbRef(dbRealtime, `reservasAdmin/${id}`);
      await update(ref, { estado: "Completada" });
      alert("Reserva marcada como completada");
      navigate("/admin/reservas/listado");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      alert("Error al marcar como completada");
    }
  };

  return (
    <div style={styles.body}>
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#e0e0e0",
          border: "1px solid #ccc",
          padding: "6px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Volver
      </button>

      <div style={styles.bloque}>
        <h2>✅ ¿Marcar esta reserva como completada?</h2>
        {reserva ? (
          <p>
            Clase: <strong>{reserva.clase}</strong><br />
            Usuario: <strong>{reserva.usuario}</strong><br />
            Fecha: <strong>{reserva.fecha}</strong>
          </p>
        ) : (
          <p>Cargando reserva...</p>
        )}
        <button onClick={handleConfirmar} style={styles.btn}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4fff0",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 50,
    textAlign: "center",
    minHeight: "100vh",
  },
  bloque: {
    background: "white",
    padding: 30,
    maxWidth: 400,
    margin: "auto",
    borderRadius: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  btn: {
    marginTop: 20,
    padding: "12px 24px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default AdminCompletarReserva;
