import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const AdminListadoUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  // aquí más adelante cargaré los usuarios reales desde Firebase
  useEffect(() => {
    /*
    const obtenerUsuarios = async () => {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const datos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsuarios(datos);
    };

    obtenerUsuarios();
    */

    // ejemplo temporal mientras no conecto Firebase
    setUsuarios([
      { id: "u1", nombre: "Ana Pérez", email: "ana@email.com", reservas: 3 },
      { id: "u2", nombre: "Juan López", email: "juan@email.com", reservas: 5 },
    ]);
  }, []);

  const verPerfil = (id) => {
    navigate(`/admin/usuarios/perfil/${id}`);
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>🐸 Listado de Usuarios</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Reservas</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td style={styles.td}>{usuario.nombre}</td>
              <td style={styles.td}>{usuario.email}</td>
              <td style={styles.td}>{usuario.reservas}</td>
              <td style={styles.td}>
                <button onClick={() => verPerfil(usuario.id)} style={styles.btnLink}>
                  Ver perfil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f1ec",
    padding: 30,
    minHeight: "100vh",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
  },
  table: {
    width: "100%",
    maxWidth: 800,
    margin: "auto",
    background: "white",
    borderCollapse: "collapse",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#e1e7ff",
    color: "#333",
    padding: "12px 16px",
    textAlign: "left",
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
  btnLink: {
    background: "none",
    border: "none",
    color: "#4a5acc",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
};

export default AdminListadoUsuarios;
