import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminPerfilUsuario = () => {
  const { id } = useParams(); // aquí recibo el ID del usuario desde la URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // aquí cargo los datos del usuario real desde Firebase
  useEffect(() => {
    /*
    const cargarUsuario = async () => {
      const ref = doc(db, "usuarios", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setUsuario({ id: snapshot.id, ...snapshot.data() });
      } else {
        console.error("Usuario no encontrado");
      }
    };

    cargarUsuario();
    */

    // Ejemplo temporal
    setUsuario({
      nombre: "Ana Pérez",
      email: "ana@email.com",
      reservas: 3
    });
  }, [id]);

  if (!usuario) {
    return <p style={{ textAlign: "center" }}>Cargando perfil...</p>;
  }

  return (
    <div style={styles.body}>
      <div style={styles.perfil}>
        <h2>🦉 {usuario.nombre}</h2>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Reservas realizadas:</strong> {usuario.reservas}</p>
        <div style={styles.acciones}>
          <button
            onClick={() => navigate(`/admin/usuarios/bloquear/${id}`)}
            style={styles.boton}
          >
            🚫 Bloquear
          </button>
          <button
            onClick={() => navigate(`/admin/usuarios/aviso/${id}`)} // si en App.jsx es /enviar-aviso cambia esto
            style={styles.boton}
          >
            📩 Enviar aviso
          </button>
          <button
            onClick={() => navigate("/admin/usuarios/listado")}
            style={styles.boton}
          >
            🔙 Volver
          </button>
        </div>
      </div>
    </div>
  );
  
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f1ec",
    padding: 30,
    color: "#333",
    minHeight: "100vh",
  },
  perfil: {
    background: "white",
    padding: 30,
    maxWidth: 600,
    margin: "auto",
    borderRadius: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  acciones: {
    marginTop: 20,
  },
  boton: {
    display: "inline-block",
    marginRight: 15,
    backgroundColor: "#ccd8ff",
    color: "#333",
    padding: "10px 15px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default AdminPerfilUsuario;
