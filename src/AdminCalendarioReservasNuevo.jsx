import React, { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminCalendarioReservasNuevo = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroVista, setFiltroVista] = useState("proximas"); // hoy | semana | proximas | todas

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const [clasesSnap, reservasSnap] = await Promise.all([
          get(ref(dbRealtime, "clases")),
          get(ref(dbRealtime, "reservas")),
        ]);

        const clasesValidas = {};

        if (clasesSnap.exists()) {
          clasesSnap.forEach((claseSnap) => {
            clasesValidas[claseSnap.key] = true;
          });
        }

        const datos = [];

        if (reservasSnap.exists()) {
          reservasSnap.forEach((claseSnap) => {
            const claseKey = claseSnap.key;
            if (!clasesValidas[claseKey]) return;

            claseSnap.forEach((fechaSnap) => {
              const fechaKey = fechaSnap.key;

              fechaSnap.forEach((turnoSnap) => {
                const turnoKey = turnoSnap.key;

                turnoSnap.forEach((nivelSnap) => {
                  const nivelVal = nivelSnap.val();
                  if (!nivelVal || typeof nivelVal !== "object") return;

                  const procesarReserva = (reserva, metodoPorDefecto = "—") => {
                    if (!reserva || typeof reserva !== "object") return;
                    if (reserva.estado !== "Confirmada") return;

                    datos.push({
                      id: reserva.orderId || `${claseKey}-${fechaKey}-${turnoKey}-${Math.random()}`,
                      claseId: reserva.claseId || claseKey,
                      clase: reserva.clase || claseKey,
                      fecha: reserva.fecha || fechaKey,
                      turno: reserva.turno || turnoKey,
                      metodo: reserva.metodo || reserva.tipoClase || metodoPorDefecto,
                      plazas: Number(reserva.plazas || 1),
                      estadoPago: reserva.estadoPago || "—",
                      precioTotal: Number(reserva.precioTotal || reserva.precio || 0),
                    });
                  };

                  const pareceReservaDirecta =
                    "fecha" in nivelVal ||
                    "estado" in nivelVal ||
                    "estadoPago" in nivelVal ||
                    "uid" in nivelVal ||
                    "orderId" in nivelVal;

                  if (pareceReservaDirecta) {
                    procesarReserva(nivelVal);
                    return;
                  }

                  nivelSnap.forEach((reservaSnap) => {
                    procesarReserva(reservaSnap.val(), nivelSnap.key);
                  });
                });
              });
            });
          });
        }

        datos.sort((a, b) => {
          const fechaA = new Date(`${a.fecha}T00:00:00`);
          const fechaB = new Date(`${b.fecha}T00:00:00`);
          if (fechaA - fechaB !== 0) return fechaA - fechaB;
          return (a.turno || "").localeCompare(b.turno || "", "es");
        });

        setReservas(datos);
      } catch (error) {
        console.error("Error al cargar calendario de reservas:", error);
        setReservas([]);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  const reservasFiltradas = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const finSemana = new Date(hoy);
    finSemana.setDate(hoy.getDate() + 7);

    return reservas.filter((r) => {
      const fecha = new Date(`${r.fecha}T00:00:00`);

      if (filtroVista === "hoy") {
        return fecha.getTime() === hoy.getTime();
      }

      if (filtroVista === "semana") {
        return fecha >= hoy && fecha <= finSemana;
      }

      if (filtroVista === "proximas") {
        return fecha >= hoy;
      }

      return true;
    });
  }, [reservas, filtroVista]);

  const reservasAgrupadas = useMemo(() => {
    const grupos = {};

    reservasFiltradas.forEach((r) => {
      if (!grupos[r.fecha]) {
        grupos[r.fecha] = {
          fecha: r.fecha,
          reservas: [],
          totalPlazas: 0,
          totalReservas: 0,
          totalIngresos: 0,
        };
      }

      grupos[r.fecha].reservas.push(r);
      grupos[r.fecha].totalPlazas += r.plazas;
      grupos[r.fecha].totalReservas += 1;
      grupos[r.fecha].totalIngresos += r.precioTotal;
    });

    return Object.values(grupos).sort((a, b) => a.fecha.localeCompare(b.fecha));
  }, [reservasFiltradas]);

  const formatearFecha = (fecha) => {
    const d = new Date(`${fecha}T00:00:00`);
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <div style={styles.header}>
          <h1 style={styles.titulo}>Calendario de reservas</h1>
          <p style={styles.subtitulo}>
            Vista agrupada por fechas para controlar la actividad del taller.
          </p>
        </div>

        <div style={styles.filtrosBox}>
          <div style={styles.botonesVista}>
            <button
              style={filtroVista === "hoy" ? styles.botonActivo : styles.botonVista}
              onClick={() => setFiltroVista("hoy")}
            >
              Hoy
            </button>

            <button
              style={filtroVista === "semana" ? styles.botonActivo : styles.botonVista}
              onClick={() => setFiltroVista("semana")}
            >
              Esta semana
            </button>

            <button
              style={filtroVista === "proximas" ? styles.botonActivo : styles.botonVista}
              onClick={() => setFiltroVista("proximas")}
            >
              Próximas
            </button>

            <button
              style={filtroVista === "todas" ? styles.botonActivo : styles.botonVista}
              onClick={() => setFiltroVista("todas")}
            >
              Todas
            </button>
          </div>
        </div>

        {cargando ? (
          <p style={styles.mensaje}>Cargando reservas...</p>
        ) : reservasAgrupadas.length === 0 ? (
          <p style={styles.mensaje}>No hay reservas para mostrar en esta vista.</p>
        ) : (
          <div style={styles.listaDias}>
            {reservasAgrupadas.map((grupo) => (
              <div key={grupo.fecha} style={styles.cardDia}>
                <div style={styles.cabeceraDia}>
                  <div>
                    <h2 style={styles.fechaTitulo}>{formatearFecha(grupo.fecha)}</h2>
                    <p style={styles.fechaRaw}>{grupo.fecha}</p>
                  </div>

                  <div style={styles.badgesResumen}>
                    <span style={styles.badge}>
                      {grupo.totalReservas} reserva{grupo.totalReservas !== 1 ? "s" : ""}
                    </span>
                    <span style={styles.badge}>
                      {grupo.totalPlazas} plaza{grupo.totalPlazas !== 1 ? "s" : ""}
                    </span>
                    <span style={styles.badge}>{grupo.totalIngresos}€</span>
                  </div>
                </div>

                <div style={styles.listaReservas}>
                  {grupo.reservas.map((r, index) => (
                    <div key={`${r.id}-${index}`} style={styles.reservaFila}>
                      <div>
                        <p style={styles.reservaClase}>{r.clase}</p>
                        <p style={styles.reservaMeta}>
                          {r.turno} · {r.metodo} · {r.plazas} plaza{r.plazas !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <div style={styles.pagoBox}>
                        <span style={styles.pagoEstado}>{r.estadoPago}</span>
                        <span style={styles.pagoPrecio}>{r.precioTotal}€</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fdf8ee",
    minHeight: "100vh",
    padding: 30,
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
  },
  titulo: {
    margin: 0,
    color: "#2f2f2f",
    fontSize: "2rem",
  },
  subtitulo: {
    marginTop: 8,
    color: "#7a7a7a",
  },
  filtrosBox: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  botonesVista: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  botonVista: {
    padding: "10px 14px",
    border: "1px solid #e5d8b8",
    backgroundColor: "#fffaf0",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    color: "#5b4a2d",
  },
  botonActivo: {
    padding: "10px 14px",
    border: "1px solid #d8c89f",
    backgroundColor: "#fff8da",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    color: "#5b4a2d",
  },
  mensaje: {
    textAlign: "center",
    color: "#7a7a7a",
    padding: 20,
  },
  listaDias: {
    display: "grid",
    gap: 18,
  },
  cardDia: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 20,
  },
  cabeceraDia: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  fechaTitulo: {
    margin: 0,
    color: "#4b3a2a",
    fontSize: "1.15rem",
    textTransform: "capitalize",
  },
  fechaRaw: {
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: "0.92rem",
  },
  badgesResumen: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    backgroundColor: "#fff8da",
    color: "#7a6331",
    border: "1px solid #f1e7c6",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: "0.88rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  listaReservas: {
    display: "grid",
    gap: 10,
  },
  reservaFila: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: "12px 0",
    borderBottom: "1px solid #f3ead7",
  },
  reservaClase: {
    margin: 0,
    color: "#333",
    fontSize: "0.97rem",
    fontWeight: 600,
  },
  reservaMeta: {
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: "0.9rem",
  },
  pagoBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    minWidth: 90,
  },
  pagoEstado: {
    color: "#5b4a2d",
    fontSize: "0.88rem",
    textTransform: "capitalize",
  },
  pagoPrecio: {
    color: "#333",
    fontWeight: 700,
    fontSize: "0.96rem",
  },
};

export default AdminCalendarioReservasNuevo;