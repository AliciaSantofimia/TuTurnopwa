import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";
import { dbRealtime } from "./firebase"; // Esta es la ruta correcta

const AdminBloquearUsuario = () => {
  const { id } = useParams(); // obtengo el ID del usuario desde la URL
  const navigate = useNavigate();

  const handleBloquear = async () => {
    try {
      const refUsuario = ref(dbRealtime, "usuarios/" + id);
      await update(refUsuario, { bloqueado: true });

      alert("Usuario bloqueado correctamente");
      navigate("/admin/usuarios/listado");
    } catch (error) {
      console.error("❌ Error al bloquear usuario:", error);
      alert("Ocurrió un error al bloquear el usuario.");
    }
  };

  const handleCancelar = () => {
    navigate("/admin/usuarios/perfil/" + id);
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
