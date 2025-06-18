import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminEliminarClase = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // recibo el ID de la clase desde la URL

  const handleEliminar = async () => {
    try {
      const claseRef = ref(dbRealtime, `clases/${id}`);
      await remove(claseRef);
      alert("Clase eliminada correctamente");
      navigate("/admin/clases/listado");
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
      alert("Error al intentar eliminar la clase");
    }
  };

  const handleCancelar = () => {
    navigate("/admin/clases/listado");
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

      <div style={styles.confirm}>
        <h2>¿Eliminar esta clase?</h2>
        <p>Esta acción no se puede deshacer.</p>
        <button onClick={handleCancelar} style={{ ...styles.button, ...styles.cancelar }}>
          Cancelar
        </button>
        <button onClick={handleEliminar} style={{ ...styles.button, ...styles.eliminar }}>
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
    padding: 40,
    textAlign: "center",
    color: "#b00020",
    minHeight: "100vh",
  },
  confirm: {
    background: "white",
    padding: 30,
    maxWidth: 400,
    margin: "auto",
    borderRadius: 20,
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  button: {
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
  }
};

export default AdminEliminarClase;
