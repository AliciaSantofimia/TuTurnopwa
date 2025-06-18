import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref as dbRef, get, update } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminCancelarReserva = () => {
  const { id } = useParams(); // ID completo de la reserva
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);

  // Obtener datos de la reserva
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

  // Cambiar estado de la reserva
  const handleCancelar = async () => {
    try {
      const ref = dbRef(dbRealtime, `reservasAdmin/${id}`);
      await update(ref, { estado: "Cancelada" });
      alert("Reserva cancelada correctamente");
      navigate("/admin/reservas/listado");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Hubo un error al cancelar la reserva");
    }
  };

  const handleVolver = () => {
    navigate("/admin/reservas/listado");
  };

  return (
    <div style={styles.body}>
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#f2f2f2",
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
        <h2>❌ ¿Cancelar esta reserva?</h2>
        {reserva ? (
          <>
            <p>
              Clase: <strong>{reserva.clase}</strong><br />
              Usuario: <strong>{reserva.usuario}</strong>
            </p>
            <button onClick={handleCancelar} style={{ ...styles.btn, ...styles.cancelar }}>
              Cancelar reserva
            </button>
            <button onClick={handleVolver} style={{ ...styles.btn, ...styles.volver }}>
              Volver
            </button>
          </>
        ) : (
          <p>Cargando datos de la reserva...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fff4f4",
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: "center",
    padding: 50,
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
    margin: 10,
    padding: "12px 24px",
    borderRadius: 10,
    border: "none",
    fontSize: 16,
    cursor: "pointer",
  },
  cancelar: {
    backgroundColor: "#b00020",
    color: "white",
  },
  volver: {
    backgroundColor: "#ccc",
    color: "#333",
  },
};

export default AdminCancelarReserva;
