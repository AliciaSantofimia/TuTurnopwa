import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    reservasHoy: 0,
    reservasManana: 0,
    reservasSemana: 0,
    plazasHoy: 0,
    plazasSemana: 0,
    bonosActivos: 0,
    solicitudesPendientes: 0,
    proximasClases: [],
    ocupacionPorClase: [],
  });

  const [cargando, setCargando] = useState(true);
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const hoyDate = new Date();
        const hoy = hoyDate.toISOString().slice(0, 10);

        const mananaDate = new Date(hoyDate);
        mananaDate.setDate(mananaDate.getDate() + 1);
        const manana = mananaDate.toISOString().slice(0, 10);

        const inicioSemana = new Date(hoyDate);
        const dia = inicioSemana.getDay(); // 0 domingo
        const diferenciaLunes = dia === 0 ? -6 : 1 - dia;
        inicioSemana.setDate(inicioSemana.getDate() + diferenciaLunes);
        inicioSemana.setHours(0, 0, 0, 0);

        const finSemana = new Date(inicioSemana);
        finSemana.setDate(finSemana.getDate() + 6);
        finSemana.setHours(23, 59, 59, 999);

        const usersRef = ref(dbRealtime, "usuarios");
        const solicitudesCambioRef = ref(dbRealtime, "solicitudesCambioClases");
        const solicitudesEliminacionRef = ref(dbRealtime, "solicitudesEliminacion");

        const [usersSnap, cambioSnap, eliminacionSnap] = await Promise.all([
          get(usersRef),
          get(solicitudesCambioRef),
          get(solicitudesEliminacionRef),
        ]);

        let reservasHoy = 0;
        let reservasManana = 0;
        let reservasSemana = 0;
        let plazasHoy = 0;
        let plazasSemana = 0;
        let bonosActivos = 0;

        const proximas = [];
        const ocupacionMap = {};

        if (usersSnap.exists()) {
          const usuarios = usersSnap.val();

          Object.values(usuarios).forEach((usuario) => {
            if (usuario?.reservas && typeof usuario.reservas === "object") {
              Object.values(usuario.reservas).forEach((reserva) => {
                if (!reserva || typeof reserva !== "object") return;

                const fechaReserva = reserva.fecha || reserva.fechaInicio || null;
                const plazasReserva = Number(reserva.plazas || 1);
                const claseReserva = reserva.clase || "Clase sin nombre";
                const estado = reserva.estado || "activa";

                if (!fechaReserva) return;
                if (estado === "cancelada") return;

                const fechaObj = new Date(`${fechaReserva}T00:00:00`);

                if (fechaReserva === hoy) {
                  reservasHoy += 1;
                  plazasHoy += plazasReserva;
                }

                if (fechaReserva === manana) {
                  reservasManana += 1;
                }

                if (fechaObj >= inicioSemana && fechaObj <= finSemana) {
                  reservasSemana += 1;
                  plazasSemana += plazasReserva;

                  if (!ocupacionMap[claseReserva]) {
                    ocupacionMap[claseReserva] = {
                      clase: claseReserva,
                      reservas: 0,
                      plazas: 0,
                    };
                  }

                  ocupacionMap[claseReserva].reservas += 1;
                  ocupacionMap[claseReserva].plazas += plazasReserva;
                }

                if (fechaReserva >= hoy) {
                  proximas.push({
                    clase: claseReserva,
                    fecha: fechaReserva,
                    turno: reserva.turno || "Sin turno",
                    plazas: plazasReserva,
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

        const ocupacionPorClase = Object.values(ocupacionMap).sort(
          (a, b) => b.plazas - a.plazas
        );

        const solicitudesCambio = cambioSnap.exists()
          ? Object.keys(cambioSnap.val()).length
          : 0;

        const solicitudesEliminacion = eliminacionSnap.exists()
          ? Object.keys(eliminacionSnap.val()).length
          : 0;

        setDashboard({
          reservasHoy,
          reservasManana,
          reservasSemana,
          plazasHoy,
          plazasSemana,
          bonosActivos,
          solicitudesPendientes: solicitudesCambio + solicitudesEliminacion,
          proximasClases: proximas.slice(0, 12),
          ocupacionPorClase,
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
    return d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const agruparPorFecha = (clases) => {
    const grupos = {};
    clases.forEach((clase) => {
      if (!grupos[clase.fecha]) grupos[clase.fecha] = [];
      grupos[clase.fecha].push(clase);
    });
    return grupos;
  };

  const proximasAgrupadas = agruparPorFecha(dashboard.proximasClases);

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
    <div style={styles.body(esMovil)}>
      <button onClick={() => navigate("/dondereservar")} style={styles.volverApp(esMovil)}>
        🏠 Volver a la app
      </button>

      <div style={styles.panelContainer(esMovil)}>
        <BotonVolver />

        <div style={styles.tituloContainer(esMovil)}>
          <img
            src="/img/logoPCsin.png"
            alt="Logo La Purísima Conchi"
            style={styles.icono(esMovil)}
          />
          <div style={styles.tituloTextoBox}>
            <h1 style={styles.titulo(esMovil)}>La Purísima Conchi</h1>
            <p style={styles.descripcionTitulo(esMovil)}>
              Panel de administración del taller
            </p>
          </div>
        </div>

        <div style={styles.bloquePrincipal(esMovil)}>
          <h2 style={styles.subtitulo(esMovil)}>Panel de control</h2>

          <div style={styles.dashboardGrid(esMovil)}>
            <div style={styles.dashboardCard(esMovil)}>
              <p style={styles.dashboardLabel(esMovil)}>Reservas para hoy</p>
              <p style={styles.dashboardValue(esMovil)}>
                {cargando ? "..." : dashboard.reservasHoy}
              </p>
            </div>

            <div style={styles.dashboardCard(esMovil)}>
              <p style={styles.dashboardLabel(esMovil)}>Reservas para mañana</p>
              <p style={styles.dashboardValue(esMovil)}>
                {cargando ? "..." : dashboard.reservasManana}
              </p>
            </div>

            <div style={styles.dashboardCard(esMovil)}>
              <p style={styles.dashboardLabel(esMovil)}>Reservas esta semana</p>
              <p style={styles.dashboardValue(esMovil)}>
                {cargando ? "..." : dashboard.reservasSemana}
              </p>
            </div>

            <div style={styles.dashboardCard(esMovil)}>
              <p style={styles.dashboardLabel(esMovil)}>Plazas ocupadas hoy</p>
              <p style={styles.dashboardValue(esMovil)}>
                {cargando ? "..." : dashboard.plazasHoy}
              </p>
            </div>

            <div style={styles.dashboardCard(esMovil)}>
              <p style={styles.dashboardLabel(esMovil)}>Plazas esta semana</p>
              <p style={styles.dashboardValue(esMovil)}>
                {cargando ? "..." : dashboard.plazasSemana}
              </p>
            </div>

            <div style={styles.dashboardCard(esMovil)}>
              <p style={styles.dashboardLabel(esMovil)}>Bonos activos</p>
              <p style={styles.dashboardValue(esMovil)}>
                {cargando ? "..." : dashboard.bonosActivos}
              </p>
            </div>

            <div style={styles.dashboardCard(esMovil)}>
              <p style={styles.dashboardLabel(esMovil)}>Solicitudes pendientes</p>
              <p style={styles.dashboardValue(esMovil)}>
                {cargando ? "..." : dashboard.solicitudesPendientes}
              </p>
            </div>
          </div>

          <div style={styles.panelDoble(esMovil)}>
            <div style={styles.proximasBox(esMovil)}>
              <h3 style={styles.proximasTitulo(esMovil)}>Próximas reservas por día</h3>

              {cargando ? (
                <p style={styles.proximasTexto(esMovil)}>Cargando...</p>
              ) : dashboard.proximasClases.length === 0 ? (
                <p style={styles.proximasTexto(esMovil)}>No hay próximas clases registradas.</p>
              ) : (
                Object.entries(proximasAgrupadas).map(([fecha, clases]) => (
                  <div key={fecha} style={styles.grupoFecha}>
                    <div style={styles.fechaGrupo}>{formatearFecha(fecha)}</div>
                    {clases.map((clase, index) => (
                      <div key={index} style={styles.proximaFila(esMovil)}>
                        <span style={styles.proximaClase(esMovil)}>{clase.clase}</span>
                        <span style={styles.proximaMeta(esMovil)}>
                          {clase.turno} · {clase.plazas} plaza{clase.plazas > 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            <div style={styles.proximasBox(esMovil)}>
              <h3 style={styles.proximasTitulo(esMovil)}>Estado de ocupación por clase</h3>

              {cargando ? (
                <p style={styles.proximasTexto(esMovil)}>Cargando...</p>
              ) : dashboard.ocupacionPorClase.length === 0 ? (
                <p style={styles.proximasTexto(esMovil)}>No hay reservas esta semana.</p>
              ) : (
                dashboard.ocupacionPorClase.map((item, index) => (
                  <div key={index} style={styles.proximaFila(esMovil)}>
                    <span style={styles.proximaClase(esMovil)}>{item.clase}</span>
                    <span style={styles.proximaMeta(esMovil)}>
                      {item.reservas} reserva{item.reservas > 1 ? "s" : ""} · {item.plazas} plaza{item.plazas > 1 ? "s" : ""}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {seccionesAdmin.map((seccion) => (
          <div key={seccion.titulo} style={styles.seccionCard(esMovil)}>
            <h2 style={styles.subtituloSeccion(esMovil)}>{seccion.titulo}</h2>

            <div style={styles.botonesContainer}>
              {seccion.acciones.map((accion) => (
                <button
                  key={accion.texto}
                  style={styles.btn(esMovil)}
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
  body: (esMovil) => ({
    backgroundColor: "#fdf8ee",
    fontFamily: "'Segoe UI', sans-serif",
    padding: esMovil ? "16px 12px 24px" : 40,
    minHeight: "100vh",
    display: "block",
    position: "relative",
  }),

  volverApp: (esMovil) => ({
    position: "fixed",
    top: esMovil ? 12 : 20,
    right: esMovil ? 12 : 20,
    backgroundColor: "#b76e4d",
    color: "white",
    padding: esMovil ? "10px 14px" : "10px 16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: esMovil ? "0.9rem" : "0.95rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
    zIndex: 999,
    maxWidth: esMovil ? "calc(100vw - 24px)" : "none",
  }),

  panelContainer: (esMovil) => ({
    backgroundColor: "#ffffff",
    borderRadius: esMovil ? 22 : 28,
    padding: esMovil ? 18 : 36,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
    maxWidth: 920,
    width: "100%",
    margin: esMovil ? "58px auto 0" : "0 auto",
    boxSizing: "border-box",
  }),

  tituloContainer: (esMovil) => ({
    display: "flex",
    flexDirection: esMovil ? "column" : "row",
    alignItems: esMovil ? "flex-start" : "center",
    justifyContent: esMovil ? "flex-start" : "center",
    gap: esMovil ? 12 : 18,
    marginBottom: 28,
    textAlign: "left",
  }),

  tituloTextoBox: {
    width: "100%",
  },

  icono: (esMovil) => ({
    width: esMovil ? 58 : 64,
    height: esMovil ? 58 : 64,
    objectFit: "contain",
  }),

  titulo: (esMovil) => ({
    color: "#2f2f2f",
    fontSize: esMovil ? "1.8rem" : "2rem",
    fontWeight: "bold",
    margin: 0,
    lineHeight: 1.1,
  }),

  descripcionTitulo: (esMovil) => ({
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: esMovil ? "0.95rem" : "0.98rem",
    lineHeight: 1.35,
  }),

  bloquePrincipal: (esMovil) => ({
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: esMovil ? 16 : 22,
    marginBottom: 24,
  }),

  seccionCard: (esMovil) => ({
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: esMovil ? 16 : 22,
    marginBottom: 18,
  }),

  subtitulo: (esMovil) => ({
    color: "#4b3a2a",
    fontSize: esMovil ? "1.2rem" : "1.35rem",
    margin: "0 0 16px 0",
    fontWeight: 700,
  }),

  subtituloSeccion: (esMovil) => ({
    color: "#4b3a2a",
    fontSize: esMovil ? "1.1rem" : "1.25rem",
    margin: "0 0 14px 0",
    fontWeight: 700,
  }),

  dashboardGrid: (esMovil) => ({
    display: "grid",
    gridTemplateColumns: esMovil ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    marginBottom: 18,
  }),

  dashboardCard: (esMovil) => ({
    backgroundColor: "#fff8da",
    borderRadius: 18,
    padding: esMovil ? 16 : 18,
    border: "1px solid #f1e7c6",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  }),

  dashboardLabel: (esMovil) => ({
    margin: 0,
    fontSize: esMovil ? "0.92rem" : "0.95rem",
    color: "#7a6331",
    fontWeight: 600,
    lineHeight: 1.35,
  }),

  dashboardValue: (esMovil) => ({
    margin: "10px 0 0 0",
    fontSize: esMovil ? "1.8rem" : "1.6rem",
    color: "#333",
    fontWeight: "bold",
  }),

  panelDoble: (esMovil) => ({
    display: "grid",
    gridTemplateColumns: esMovil ? "1fr" : "1fr 1fr",
    gap: 16,
  }),

  proximasBox: (esMovil) => ({
    backgroundColor: "#fff8da",
    borderRadius: 18,
    padding: esMovil ? 16 : 18,
    border: "1px solid #f1e7c6",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  }),

  proximasTitulo: (esMovil) => ({
    margin: "0 0 12px 0",
    color: "#5b5b5b",
    fontSize: esMovil ? "1rem" : "1.05rem",
    fontWeight: 700,
  }),

  proximasTexto: (esMovil) => ({
    margin: 0,
    color: "#7a7a7a",
    fontSize: esMovil ? "0.92rem" : "0.95rem",
    lineHeight: 1.4,
  }),

  grupoFecha: {
    marginBottom: 12,
  },

  fechaGrupo: {
    fontWeight: 700,
    color: "#5b4a2d",
    marginBottom: 6,
    fontSize: "0.95rem",
  },

  proximaFila: (esMovil) => ({
    display: "flex",
    flexDirection: esMovil ? "column" : "row",
    justifyContent: "space-between",
    alignItems: esMovil ? "flex-start" : "center",
    gap: esMovil ? 4 : 12,
    padding: "8px 0",
    borderBottom: "1px solid #f1e7c6",
    fontSize: "0.95rem",
  }),

  proximaClase: (esMovil) => ({
    color: "#333",
    fontWeight: 600,
    lineHeight: 1.35,
  }),

  proximaMeta: (esMovil) => ({
    color: "#7a7a7a",
    whiteSpace: esMovil ? "normal" : "nowrap",
    lineHeight: 1.35,
  }),

  botonesContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },

  btn: (esMovil) => ({
    display: "block",
    width: "100%",
    padding: esMovil ? "13px 14px" : "14px 16px",
    backgroundColor: "#fffaf0",
    color: "#3d3126",
    border: "1px solid #eadfbe",
    borderRadius: 14,
    fontSize: esMovil ? "0.96rem" : "1rem",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
    lineHeight: 1.35,
  }),
};

export default AdminPanel;