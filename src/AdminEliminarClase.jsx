import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminEliminarClase = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // aquí recibo el ID de la clase desde la URL

  // cuando pulse eliminar, aquí eliminaré la clase desde Firebase
  const handleEliminar = async () => {
    /*
    try {
      await deleteDoc(doc(db, "clases", id));
      alert("Clase eliminada correctamente");
      navigate("/admin/clases/listado");
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
    */
    alert("Clase eliminada (simulado)");
    navigate("/admin/clases/listado");
  };

  // si cancelo, vuelvo atrás al listado
  const handleCancelar = () => {
    navigate("/admin/clases/listado");
  };

  return (
    <div style={styles.body}>
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

