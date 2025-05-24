import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminEliminarUsuario = () => {
  const { id } = useParams(); // aquí recibo el ID del usuario desde la URL
  const navigate = useNavigate();

  // cuando pulse "Eliminar", aquí borro al usuario (más adelante con Firebase)
  const handleEliminar = async () => {
    /*
    try {
      await deleteDoc(doc(db, "usuarios", id));
      alert("Usuario eliminado correctamente");
      navigate("/admin/usuarios/listado");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
    */
    alert("Usuario eliminado (simulado)");
    navigate("/admin/usuarios/listado");
  };

  // si cancelo, vuelvo al perfil del usuario
  const handleCancelar = () => {
    navigate(`/admin/usuarios/perfil/${id}`);
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h2>🗑️ ¿Eliminar a este usuario?</h2>
        <p>
          Esta acción <strong>no se puede deshacer</strong> y eliminará todos sus datos
          permanentemente.
        </p>
        <button onClick={handleCancelar} style={{ ...styles.btn, ...styles.cancelar }}>
          Cancelar
        </button>
        <button onClick={handleEliminar} style={{ ...styles.btn, ...styles.eliminar }}>
          Eliminar
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
    color: "#b00020",
    minHeight: "100vh",
  },
  card: {
    background: "white",
    padding: 30,
    maxWidth: 400,
    margin: "auto",
    borderRadius: 20,
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
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
    backgroundColor: "#ccc",
    color: "#333",
  },
  eliminar: {
    backgroundColor: "#b00020",
    color: "white",
  },
};

export default AdminEliminarUsuario;

