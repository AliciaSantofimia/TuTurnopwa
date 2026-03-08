import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    reservasHoy: 0,
    plazasHoy: 0,
    bonosActivos: 0,
    solicitudesPendientes: 0,
    proximasClases: [],
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const hoy = new Date().toISOString().slice(0, 10);

        const usersRef = ref(dbRealtime, "usuarios");
        const solicitudesCambioRef = ref(dbRealtime, "solicitudesCambioClases");
        const solicitudesEliminacionRef = ref(dbRealtime, "solicitudesEliminacion");

        const [usersSnap, cambioSnap, eliminacionSnap] = await Promise.all([
          get(usersRef),
          get(solicitudesCambioRef),
          get(solicitudesEliminacionRef),
        ]);

        let reservasHoy = 0;
        let plazasHoy = 0;
        let bonosActivos = 0;
        const proximas = [];

        if (usersSnap.exists()) {
          const usuarios = usersSnap.val();

          Object.values(usuarios).forEach((usuario) => {
            if (usuario?.reservas && typeof usuario.reservas === "object") {
              Object.values(usuario.reservas).forEach((reserva) => {
                if (!reserva || typeof reserva !== "object") return;

                const fechaReserva = reserva.fecha || reserva.fechaInicio || null;
                const plazasReserva = Number(reserva.plazas || 1);

                if (fechaReserva === hoy) {
                  reservasHoy += 1;
                  plazasHoy += plazasReserva;
                }

                if (fechaReserva && fechaReserva >= hoy) {
                  proximas.push({
                    clase: reserva.clase || "Clase sin nombre",
                    fecha: fechaReserva,
                    turno: reserva.turno || "Sin turno",
                  });
                }
              });
            }

            if (usuario?.bonosActivos && typeof usuario.bonosActivos === "object") {
              Object.values(usuario.bonosActivos).forEach((bono) => {
                if (!bono || typeof bono !== "object") return;
                if (bono.estado === "activo") {
                  bonosActivos += 1;
                }
              });
            }
          });
        }

        proximas.sort((a, b) => {
          const fechaA = new Date(`${a.fecha}T00:00:00`);
          const fechaB = new Date(`${b.fecha}T00:00:00`);
          return fechaA - fechaB;
        });

        const solicitudesCambio = cambioSnap.exists()
          ? Object.keys(cambioSnap.val()).length
          : 0;

        const solicitudesEliminacion = eliminacionSnap.exists()
          ? Object.keys(eliminacionSnap.val()).length
          : 0;

        setDashboard({
          reservasHoy,
          plazasHoy,
          bonosActivos,
          solicitudesPendientes: solicitudesCambio + solicitudesEliminacion,
          proximasClases: proximas.slice(0, 5),
        });
      } catch (error) {
        console.error("Error al cargar el panel admin:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDashboard();
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    const d = new Date(`${fecha}T00:00:00`);
    return d.toLocaleDateString("es-ES");
  };

  const seccionesAdmin = [
    {
      titulo: "Clases",
      acciones: [
        { texto: "Ver clases", ruta: "/admin-listado-clases" },
        { texto: "Ver inscripciones por clase", ruta: "/admin-ver-inscripciones" },
      ],
    },
    {
      titulo: "Reservas",
      acciones: [
        { texto: "Ver todas las reservas", ruta: "/admin-listado-reservas" },
        { texto: "Filtrar por fecha", ruta: "/admin-filtrar-reservas" },
        { texto: "Completar reserva", ruta: "/admin-completar-reserva" },
        { texto: "Cancelar reserva", ruta: "/admin-cancelar-reserva" },
      ],
    },
    {
      titulo: "Usuarios",
      acciones: [
        { texto: "Ver usuarios", ruta: "/admin-listado-usuarios" },
        { texto: "Buscar usuario", ruta: "/admin-buscar-usuario" },
      ],
    },
    {
      titulo: "Bonos",
      acciones: [
        { texto: "Ver bonos activos / uso de bonos", ruta: "/admin-uso-bonos" },
      ],
    },
    {
      titulo: "Historial",
      acciones: [
        { texto: "Historial de reservas", ruta: "/admin-historial-reservas" },
        { texto: "Historial de bonos", ruta: "/admin-historial-bonos" },
      ],
    },
    {
      titulo: "Notificaciones",
      acciones: [
        { texto: "Enviar aviso", ruta: "/admin-enviar-aviso" },
        { texto: "Ver avisos enviados", ruta: "/admin-notificaciones" },
      ],
    },
  ];

  return (
    <div style={styles.body}>
      <button
        onClick={() => navigate("/dondereservar")}
        style={styles.volverApp}
      >
        🏠 Volver a la app
      </button>

      <div style={styles.panelContainer}>
        <BotonVolver />

        <div style={styles.tituloContainer}>
          <img
            src="/img/logoPCsin.png"
            alt="Logo La Purísima Conchi"
            style={styles.icono}
          />
          <div>
            <h1 style={styles.titulo}>La Purísima Conchi</h1>
            <p style={styles.descripcionTitulo}>
              Panel de administración del taller
            </p>
          </div>
        </div>

        <div style={styles.bloquePrincipal}>
          <h2 style={styles.subtitulo}>Panel de control</h2>

          <div style={styles.dashboardGrid}>
            <div style={styles.dashboardCard}>
              <p style={styles.dashboardLabel}>Reservas para hoy</p>
              <p style={styles.dashboardValue}>
                {cargando ? "..." : dashboard.reservasHoy}
              </p>
            </div>

            <div style={styles.dashboardCard}>
              <p style={styles.dashboardLabel}>Plazas ocupadas hoy</p>
              <p style={styles.dashboardValue}>
                {cargando ? "..." : dashboard.plazasHoy}
              </p>
            </div>

            <div style={styles.dashboardCard}>
              <p style={styles.dashboardLabel}>Bonos activos</p>
              <p style={styles.dashboardValue}>
                {cargando ? "..." : dashboard.bonosActivos}
              </p>
            </div>

            <div style={styles.dashboardCard}>
              <p style={styles.dashboardLabel}>Solicitudes pendientes</p>
              <p style={styles.dashboardValue}>
                {cargando ? "..." : dashboard.solicitudesPendientes}
              </p>
            </div>
          </div>

          <div style={styles.proximasBox}>
            <h3 style={styles.proximasTitulo}>Próximas clases</h3>

            {cargando ? (
              <p style={styles.proximasTexto}>Cargando...</p>
            ) : dashboard.proximasClases.length === 0 ? (
              <p style={styles.proximasTexto}>No hay próximas clases registradas.</p>
            ) : (
              dashboard.proximasClases.map((clase, index) => (
                <div key={index} style={styles.proximaFila}>
                  <span style={styles.proximaClase}>{clase.clase}</span>
                  <span style={styles.proximaMeta}>
                    {formatearFecha(clase.fecha)} · {clase.turno}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {seccionesAdmin.map((seccion) => (
          <div key={seccion.titulo} style={styles.seccionCard}>
            <h2 style={styles.subtituloSeccion}>{seccion.titulo}</h2>

            <div style={styles.botonesContainer}>
              {seccion.acciones.map((accion) => (
                <button
                  key={accion.texto}
                  style={styles.btn}
                  onClick={() => navigate(accion.ruta)}
                >
                  {accion.texto}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fdf8ee",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  volverApp: {
    position: "fixed",
    top: 20,
    right: 20,
    backgroundColor: "#b76e4d",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "0.95rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
    zIndex: 999,
  },
  panelContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 36,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
    maxWidth: 920,
    width: "100%",
  },
  tituloContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    marginBottom: 28,
    textAlign: "left",
  },
  icono: {
    width: 64,
    height: 64,
    objectFit: "contain",
  },
  titulo: {
    color: "#2f2f2f",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
  },
  descripcionTitulo: {
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: "0.98rem",
  },
  bloquePrincipal: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },
  seccionCard: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },
  subtitulo: {
    color: "#4b3a2a",
    fontSize: "1.35rem",
    margin: "0 0 16px 0",
    fontWeight: 700,
  },
  subtituloSeccion: {
    color: "#4b3a2a",
    fontSize: "1.25rem",
    margin: "0 0 14px 0",
    fontWeight: 700,
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    marginBottom: 18,
  },
  dashboardCard: {
    backgroundColor: "#fff8da",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #f1e7c6",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  dashboardLabel: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#7a6331",
    fontWeight: 600,
  },
  dashboardValue: {
    margin: "10px 0 0 0",
    fontSize: "1.6rem",
    color: "#333",
    fontWeight: "bold",
  },
  proximasBox: {
    backgroundColor: "#fff8da",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #f1e7c6",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  proximasTitulo: {
    margin: "0 0 12px 0",
    color: "#5b5b5b",
    fontSize: "1.05rem",
    fontWeight: 700,
  },
  proximasTexto: {
    margin: 0,
    color: "#7a7a7a",
    fontSize: "0.95rem",
  },
  proximaFila: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid #f1e7c6",
    fontSize: "0.95rem",
  },
  proximaClase: {
    color: "#333",
    fontWeight: 600,
  },
  proximaMeta: {
    color: "#7a7a7a",
    whiteSpace: "nowrap",
  },
  botonesContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "#fffaf0",
    color: "#3d3126",
    border: "1px solid #eadfbe",
    borderRadius: 14,
    fontSize: "1rem",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
};

export default AdminPanel;