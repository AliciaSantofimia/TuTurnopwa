import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";

const AdminListadoUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const usuariosRef = ref(dbRealtime, "usuarios/");
      const snapshot = await get(usuariosRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const lista = Object.keys(data)
          .filter((uid) => data[uid].nombre && data[uid].email)
          .map((uid) => ({
            id: uid,
            nombre: data[uid].nombre,
            email: data[uid].email,
            reservas: typeof data[uid].reservas === "number" ? data[uid].reservas : 0,

          }));
        setUsuarios(lista);
      }
    };

    obtenerUsuarios();
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
          {usuarios.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                No hay usuarios registrados todavía.
              </td>
            </tr>
          )}
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
