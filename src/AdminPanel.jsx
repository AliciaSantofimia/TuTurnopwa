import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <div style={styles.panelContainer}>
        <div style={styles.tituloContainer}>
          <img
            src="/img/logoPCsin.png"
            alt="icono decorativo"
            style={styles.icono}
          />
          <h1 style={styles.titulo}>La Purísima Conchi</h1>
        </div>

        <div style={styles.seccion}>
          <h2 style={styles.subtitulo}>
            <img src="/img/vasijabono2.png" alt="vasija" style={styles.subtituloIconoGrande} /> Gestión de Clases
          </h2>
          <button style={styles.btn} onClick={() => navigate("/admin/clases/listado")}>🏺 Ver listado de clases</button>
          <button style={styles.btn} onClick={() => navigate("/admin/clases/crear")}>➕ Crear nueva clase</button>
<button style={styles.btn} onClick={() => navigate("/admin/clases/editar")}>✏️ Editar clase</button> 
<button style={styles.btn} onClick={() => navigate("/admin/clases/solicitar-eliminacion")}>🛑 Solicitar eliminación de clase</button>

          <button style={styles.btn} onClick={() => navigate("/admin/solicitudes")}>📮 Ver solicitudes</button>
        </div>

        <div style={styles.seccion}>
          <h2 style={styles.subtitulo}>
            <img src="/img/vasijabono4.png" alt="vasija usuarios" style={styles.subtituloIconoGrande} /> Gestión de Usuarios
          </h2>
          <button style={styles.btn} onClick={() => navigate("/admin/usuarios/listado")}>📋 Ver todos los usuarios</button>
          <button style={styles.btn} onClick={() => navigate("/admin/usuarios/buscar")}>🔍 Buscar por nombre o email</button>
        </div>

        <div style={styles.seccion}>
          <h2 style={styles.subtitulo}>
            <img src="/img/vasijafundamentalmini.png" alt="vasija reservas" style={styles.subtituloIconoGrande} /> Gestión de Reservas
          </h2>
          <button style={styles.btn} onClick={() => navigate("/admin/reservas/listado")}>📋 Ver listado de reservas</button>
          <button style={styles.btn} onClick={() => navigate("/admin/reservas/filtrar")}>🔎 Filtrar por fecha</button>
          <button style={styles.btn} onClick={() => navigate("/admin/reservas/uso-bonos")}>🎟️ Ver uso de bonos</button>
        </div>

        <div style={styles.seccion}>
          <h2 style={styles.subtitulo}>📜 Historiales</h2>
          <button style={styles.btn} onClick={() => navigate("/admin/historial/reservas")}>📘 Historial de Reservas</button>
          <button style={styles.btn} onClick={() => navigate("/admin/historial/bonos")}>🎟️ Historial de Bonos Comprados</button>
        </div>

        <div style={styles.seccion}>
          <h2 style={styles.subtitulo}>🔔 Notificaciones</h2>
          <button style={styles.btn} onClick={() => navigate("/admin/notificaciones")}>📢 Notificaciones enviadas</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fff5cc",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  panelContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 40,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    maxWidth: 700,
    width: "100%",
  },
  tituloContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    gap: 20,
  },
  icono: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  titulo: {
    color: "#333",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    color: "#555",
    fontSize: "22px",
    margin: "30px 0 15px",
    display: "flex",
    alignItems: "center",
  },
  subtituloIconoGrande: {
    width: 48,
    height: 48,
    marginRight: 14,
    verticalAlign: "middle",
  },
  seccion: {
    marginBottom: 10,
  },
  btn: {
    display: "block",
    width: "100%",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff6cc",
    color: "#333",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    textAlign: "left",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AdminPanel;







