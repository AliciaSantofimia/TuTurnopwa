import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, child } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminPerfilUsuario = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const snapshot = await get(child(ref(dbRealtime), `usuarios/${uid}`));
        if (snapshot.exists()) {
          setUsuario(snapshot.val());
        } else {
          console.error("Usuario no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    cargarUsuario();
  }, [uid]);

  if (!usuario) {
    return <p style={{ textAlign: "center" }}>Cargando perfil...</p>;
  }

  return (
    <div style={styles.body}>
      <button onClick={() => navigate(-1)} style={styles.volver}>
        ← Volver atrás
      </button>

      <div style={styles.perfil}>
        <h2>🦉 {usuario.nombre}</h2>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Reservas realizadas:</strong> {usuario.reservas || 0}</p>
        <div style={styles.acciones}>
          <button
            onClick={() => navigate(`/admin/usuarios/bloquear/${uid}`)}
            style={styles.boton}
          >
            🚫 Bloquear
          </button>
          <button
            onClick={() => navigate(`/admin/usuarios/aviso/${uid}`)}
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
  volver: {
    background: "none",
    border: "none",
    color: "#4a90e2",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.95rem",
    marginBottom: 20,
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
