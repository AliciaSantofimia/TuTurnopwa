import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminBloquearUsuario = () => {
  const { id } = useParams(); // aquí obtengo el ID del usuario desde la URL
  const navigate = useNavigate();

  // cuando pulse "Bloquear", aquí actualizaré el estado del usuario
  const handleBloquear = async () => {
    /*
    try {
      const ref = doc(db, "usuarios", id);
      await updateDoc(ref, { bloqueado: true });
      alert("Usuario bloqueado correctamente");
      navigate("/admin/usuarios/listado");
    } catch (error) {
      console.error("Error al bloquear usuario:", error);
    }
    */
    alert("Usuario bloqueado (simulado)");
    navigate("/admin/usuarios/listado");
  };

  // si cancelo, simplemente vuelvo atrás
  const handleCancelar = () => {
    navigate("/admin/usuarios/perfil/" + id);
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h2>❌ ¿Bloquear a este usuario?</h2>
        <p>
          El usuario no podrá acceder a su cuenta ni hacer nuevas reservas.
        </p>
        <button onClick={handleCancelar} style={{ ...styles.btn, ...styles.cancelar }}>
          Cancelar
        </button>
        <button onClick={handleBloquear} style={{ ...styles.btn, ...styles.bloquear }}>
          Bloquear
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
  bloquear: {
    backgroundColor: "#b00020",
    color: "white",
  },
};

export default AdminBloquearUsuario;

