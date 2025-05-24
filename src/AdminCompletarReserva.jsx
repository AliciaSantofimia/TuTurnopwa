import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminCompletarReserva = () => {
  const { id } = useParams(); // aquí recibo el ID de la reserva desde la URL
  const navigate = useNavigate();

  // en un caso real, aquí traería los datos reales de la reserva con getDoc
  const reserva = {
    clase: "Básico Esencial",
    usuario: "Juan López",
    fecha: "11/06/2025",
  };

  // cuando pulse confirmar, cambiaré el estado a "completada"
  const handleConfirmar = async () => {
    /*
    try {
      const ref = doc(db, "reservas", id);
      await updateDoc(ref, { estado: "Completada" });
      alert("Reserva marcada como completada");
      navigate("/admin/reservas/listado");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
    */
    alert("Reserva marcada como completada (simulado)");
    navigate("/admin/reservas/listado");
  };

  return (
    <div style={styles.body}>
      <div style={styles.bloque}>
        <h2>✅ ¿Marcar esta reserva como completada?</h2>
        <p>
          Clase: <strong>{reserva.clase}</strong><br />
          Usuario: <strong>{reserva.usuario}</strong><br />
          Fecha: <strong>{reserva.fecha}</strong>
        </p>
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

