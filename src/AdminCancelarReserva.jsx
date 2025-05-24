import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminCancelarReserva = () => {
  const { id } = useParams(); // aquí recibo el ID de la reserva desde la URL
  const navigate = useNavigate();

  // temporalmente uso estos datos simulados (luego los traeré de Firebase)
  const reserva = {
    clase: "Creativo Plus",
    usuario: "Laura Gómez",
  };

  // cuando pulse cancelar, cambio el estado a "Cancelada"
  const handleCancelar = async () => {
    /*
    try {
      const ref = doc(db, "reservas", id);
      await updateDoc(ref, { estado: "Cancelada" });
      alert("Reserva cancelada correctamente");
      navigate("/admin/reservas/listado");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
    */
    alert("Reserva cancelada (simulado)");
    navigate("/admin/reservas/listado");
  };

  const handleVolver = () => {
    navigate("/admin/reservas/listado");
  };

  return (
    <div style={styles.body}>
      <div style={styles.bloque}>
        <h2>❌ ¿Cancelar esta reserva?</h2>
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
