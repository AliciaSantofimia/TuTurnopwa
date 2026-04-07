import React, { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";
import { useNavigate } from "react-router-dom";

const LIMITE_RESERVAS_PREVIEW = 6;

const AdminCalendarioReservasNuevo = () => {
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mesActual, setMesActual] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  });
  const obtenerFechaLocalISO = (fecha = new Date()) => {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
  return obtenerFechaLocalISO(new Date());
});

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const reservasSnap = await get(ref(dbRealtime, "reservas"));
        const datos = [];

        const procesarReserva = (
          reserva,
          {
            claseKey = "",
            fechaKey = "",
            turnoKey = "",
            metodoKey = "—",
          } = {}
        ) => {
          if (!reserva || typeof reserva !== "object") return;
          if (reserva.estado !== "Confirmada") return;

          const fechaFinal = reserva.fecha || fechaKey;
          if (!fechaFinal) return;

          datos.push({
            id:
              reserva.orderId ||
              reserva.id ||
              `${claseKey}-${fechaFinal}-${turnoKey}-${metodoKey}-${Math.random()}`,
            claseId: reserva.claseId || claseKey || "",
            clase: reserva.clase || claseKey || "Clase",
            fecha: fechaFinal,
            turno: reserva.turno || turnoKey || "—",
            metodo: reserva.metodo || reserva.tipoClase || metodoKey || "—",
            plazas: Number(reserva.plazas || 1),
            estadoPago: reserva.estadoPago || "—",
            precioTotal: Number(reserva.precioTotal || reserva.precio || 0),
            uid: reserva.uid || "",
          });
        };

        const pareceReservaDirecta = (obj) => {
          if (!obj || typeof obj !== "object") return false;

          return (
            "fecha" in obj ||
            "estado" in obj ||
            "estadoPago" in obj ||
            "uid" in obj ||
            "orderId" in obj ||
            "clase" in obj ||
            "claseId" in obj
          );
        };

        if (reservasSnap.exists()) {
          reservasSnap.forEach((claseSnap) => {
            const claseKey = claseSnap.key;

            claseSnap.forEach((fechaSnap) => {
              const fechaKey = fechaSnap.key;

              if (pareceReservaDirecta(fechaSnap.val())) {
                procesarReserva(fechaSnap.val(), {
                  claseKey,
                  fechaKey,
                });
                return;
              }

              fechaSnap.forEach((turnoSnap) => {
                const turnoKey = turnoSnap.key;
                const turnoVal = turnoSnap.val();

                if (pareceReservaDirecta(turnoVal)) {
                  procesarReserva(turnoVal, {
                    claseKey,
                    fechaKey,
                    turnoKey,
                  });
                  return;
                }

                turnoSnap.forEach((nivelSnap) => {
                  const nivelVal = nivelSnap.val();

                  if (pareceReservaDirecta(nivelVal)) {
                    procesarReserva(nivelVal, {
                      claseKey,
                      fechaKey,
                      turnoKey,
                      metodoKey: nivelSnap.key,
                    });
                    return;
                  }

                  if (nivelVal && typeof nivelVal === "object") {
                    nivelSnap.forEach((reservaSnap) => {
                      procesarReserva(reservaSnap.val(), {
                        claseKey,
                        fechaKey,
                        turnoKey,
                        metodoKey: nivelSnap.key,
                      });
                    });
                  }
                });
              });
            });
          });
        }

        datos.sort((a, b) => {
          const fechaA = new Date(`${a.fecha}T00:00:00`);
          const fechaB = new Date(`${b.fecha}T00:00:00`);

          if (fechaA.getTime() !== fechaB.getTime()) {
            return fechaA - fechaB;
          }

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

  const resumenPorFecha = useMemo(() => {
    const mapa = {};

    reservas.forEach((reserva) => {
      if (!mapa[reserva.fecha]) {
        mapa[reserva.fecha] = {
          fecha: reserva.fecha,
          totalReservas: 0,
          totalPlazas: 0,
          totalIngresos: 0,
          reservas: [],
        };
      }

      mapa[reserva.fecha].totalReservas += 1;
      mapa[reserva.fecha].totalPlazas += Number(reserva.plazas || 1);
      mapa[reserva.fecha].totalIngresos += Number(reserva.precioTotal || 0);
      mapa[reserva.fecha].reservas.push(reserva);
    });

    return mapa;
  }, [reservas]);

  const detalleDiaSeleccionado = useMemo(() => {
    return resumenPorFecha[fechaSeleccionada] || null;
  }, [resumenPorFecha, fechaSeleccionada]);

  const reservasPreview = useMemo(() => {
    if (!detalleDiaSeleccionado?.reservas?.length) return [];
    return detalleDiaSeleccionado.reservas.slice(0, LIMITE_RESERVAS_PREVIEW);
  }, [detalleDiaSeleccionado]);

  const hayMasReservas =
    detalleDiaSeleccionado?.reservas?.length > LIMITE_RESERVAS_PREVIEW;

  const nombreMes = useMemo(() => {
    return mesActual.toLocaleDateString("es-ES", {
      month: "long",
      year: "numeric",
    });
  }, [mesActual]);

  const diasCalendario = useMemo(() => {
    const year = mesActual.getFullYear();
    const month = mesActual.getMonth();

    const primerDiaMes = new Date(year, month, 1);
    const ultimoDiaMes = new Date(year, month + 1, 0);

    let diaSemanaInicio = primerDiaMes.getDay();
    if (diaSemanaInicio === 0) diaSemanaInicio = 7;

    const totalDiasMes = ultimoDiaMes.getDate();
    const celdas = [];

    for (let i = 1; i < diaSemanaInicio; i++) {
      celdas.push(null);
    }

    for (let dia = 1; dia <= totalDiasMes; dia++) {
  const mesTexto = String(month + 1).padStart(2, "0");
  const diaTexto = String(dia).padStart(2, "0");
  const fechaISO = `${year}-${mesTexto}-${diaTexto}`;

  celdas.push({
    dia,
    fechaISO,
  });
}

    while (celdas.length % 7 !== 0) {
      celdas.push(null);
    }

    return celdas;
  }, [mesActual]);

  const cambiarMes = (direccion) => {
    setMesActual((prev) => {
      const nuevo = new Date(prev);
      nuevo.setMonth(prev.getMonth() + direccion);
      return new Date(nuevo.getFullYear(), nuevo.getMonth(), 1);
    });
  };

  const irAMesActual = () => {
  const hoy = new Date();
  setMesActual(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  setFechaSeleccionada(obtenerFechaLocalISO(hoy));
};

 const esHoy = (fechaISO) => {
  const hoy = obtenerFechaLocalISO(new Date());
  return fechaISO === hoy;
};

  const esDiaPasado = (fechaISO) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(`${fechaISO}T00:00:00`);
    return fecha < hoy;
  };

  const formatearFecha = (fecha) => {
    const d = new Date(`${fecha}T00:00:00`);
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const obtenerEstiloDia = (celda) => {
    if (!celda) return styles.diaVacio;

    const resumen = resumenPorFecha[celda.fechaISO];
    const seleccionado = fechaSeleccionada === celda.fechaISO;
    const hoy = esHoy(celda.fechaISO);
    const pasado = esDiaPasado(celda.fechaISO);

    let estilo = {
      ...styles.dia,
    };

    if (pasado) {
      estilo = {
        ...estilo,
        ...styles.diaPasado,
      };
    }

    if (resumen?.totalReservas > 0) {
      estilo = {
        ...estilo,
        ...styles.diaConReservas,
      };
    }

    if (resumen?.totalReservas >= 4) {
      estilo = {
        ...estilo,
        ...styles.diaActividadMedia,
      };
    }

    if (resumen?.totalReservas >= 7) {
      estilo = {
        ...estilo,
        ...styles.diaActividadAlta,
      };
    }

    if (hoy) {
      estilo = {
        ...estilo,
        ...styles.diaHoy,
      };
    }

    if (seleccionado) {
      estilo = {
        ...estilo,
        ...styles.diaSeleccionado,
      };
    }

    return estilo;
  };

 const irAReservasDelDia = () => {
  if (!fechaSeleccionada) return;
  navigate(`/admin-reservas-nuevo?fecha=${fechaSeleccionada}`);
};

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <div style={styles.header}>
          <h1 style={styles.titulo}>Calendario de reservas</h1>
          <p style={styles.subtitulo}>
            Vista mensual general para ver rápidamente los días con actividad.
          </p>
        </div>

        <div style={styles.barraMes}>
          <button style={styles.botonMes} onClick={() => cambiarMes(-1)}>
            ← Mes anterior
          </button>

          <div style={styles.mesCentro}>
            <h2 style={styles.mesTitulo}>{nombreMes}</h2>
            <button style={styles.botonHoy} onClick={irAMesActual}>
              Ir a hoy
            </button>
          </div>

          <button style={styles.botonMes} onClick={() => cambiarMes(1)}>
            Mes siguiente →
          </button>
        </div>

        {cargando ? (
          <p style={styles.mensaje}>Cargando calendario...</p>
        ) : (
          <>
            <div style={styles.calendarioBox}>
              <div style={styles.semanaHeader}>
                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((dia) => (
                  <div key={dia} style={styles.semanaDia}>
                    {dia}
                  </div>
                ))}
              </div>

              <div style={styles.gridDias}>
                {diasCalendario.map((celda, index) => {
                  if (!celda) {
                    return <div key={`vacio-${index}`} style={styles.diaVacio} />;
                  }

                  const resumen = resumenPorFecha[celda.fechaISO];

                  return (
                    <button
                      key={celda.fechaISO}
                      type="button"
                      style={obtenerEstiloDia(celda)}
                      onClick={() => setFechaSeleccionada(celda.fechaISO)}
                    >
                      <div style={styles.diaNumero}>{celda.dia}</div>

                      {resumen ? (
                        <div style={styles.infoDia}>
                          <span style={styles.infoDiaTexto}>
                            {resumen.totalReservas} reserva
                            {resumen.totalReservas !== 1 ? "s" : ""}
                          </span>
                          <span style={styles.infoDiaTexto}>
                            {resumen.totalPlazas} plaza
                            {resumen.totalPlazas !== 1 ? "s" : ""}
                          </span>
                        </div>
                      ) : (
                        <div style={styles.infoDiaVacio}>Sin reservas</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={styles.detalleBox}>
              <div style={styles.detalleCabecera}>
                <div>
                  <h3 style={styles.detalleTitulo}>
                    {fechaSeleccionada
                      ? `Detalle del ${formatearFecha(fechaSeleccionada)}`
                      : "Selecciona un día"}
                  </h3>

                  {detalleDiaSeleccionado ? (
                    <p style={styles.detalleSubtitulo}>
                      {detalleDiaSeleccionado.totalReservas} reserva
                      {detalleDiaSeleccionado.totalReservas !== 1 ? "s" : ""} ·{" "}
                      {detalleDiaSeleccionado.totalPlazas} plaza
                      {detalleDiaSeleccionado.totalPlazas !== 1 ? "s" : ""} ·{" "}
                      {detalleDiaSeleccionado.totalIngresos}€
                    </p>
                  ) : (
                    <p style={styles.detalleSubtitulo}>
                      No hay reservas confirmadas para este día.
                    </p>
                  )}
                </div>

                {detalleDiaSeleccionado?.reservas?.length > 0 && (
                  <button style={styles.botonIrReservas} onClick={irAReservasDelDia}>
                    Ir a reservas del día
                  </button>
                )}
              </div>

              {detalleDiaSeleccionado?.reservas?.length ? (
                <>
                  {hayMasReservas && (
                    <p style={styles.mensajeResumen}>
                      Mostrando {LIMITE_RESERVAS_PREVIEW} de{" "}
                      {detalleDiaSeleccionado.reservas.length} reservas.
                    </p>
                  )}

                  <div style={styles.listaReservas}>
                    {reservasPreview.map((r, index) => (
                      <div key={`${r.id}-${index}`} style={styles.reservaFila}>
                        <div style={styles.reservaIzq}>
                          <p style={styles.reservaClase}>{r.clase}</p>
                          <p style={styles.reservaMeta}>
                            {r.turno} · {r.metodo} · {r.plazas} plaza
                            {r.plazas !== 1 ? "s" : ""}
                          </p>
                        </div>

                        <div style={styles.reservaDer}>
                          <span style={styles.pagoEstado}>{r.estadoPago}</span>
                          <span style={styles.pagoPrecio}>{r.precioTotal}€</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p style={styles.mensajeDetalle}>No hay detalle para mostrar.</p>
              )}
            </div>
          </>
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
    maxWidth: 1200,
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
  barraMes: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  mesCentro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 220,
  },
  mesTitulo: {
    margin: 0,
    color: "#4b3a2a",
    textTransform: "capitalize",
    fontSize: "1.35rem",
  },
  botonMes: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #e5d8b8",
    backgroundColor: "#fffaf0",
    cursor: "pointer",
    fontWeight: 600,
    color: "#5b4a2d",
  },
  botonHoy: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #e5d8b8",
    backgroundColor: "#fff8da",
    cursor: "pointer",
    fontWeight: 600,
    color: "#5b4a2d",
  },
  mensaje: {
    textAlign: "center",
    color: "#7a7a7a",
    padding: 20,
  },
  calendarioBox: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
  },
  semanaHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 10,
    marginBottom: 10,
  },
  semanaDia: {
    textAlign: "center",
    fontWeight: 700,
    color: "#6d5a3c",
    fontSize: "0.95rem",
    padding: "8px 4px",
  },
  gridDias: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 10,
  },
  dia: {
    minHeight: 110,
    borderRadius: 16,
    border: "1px solid #efe4ca",
    backgroundColor: "#fffaf2",
    padding: 10,
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.2s ease",
  },
  diaVacio: {
    minHeight: 110,
    borderRadius: 16,
    backgroundColor: "#fbf7ef",
    border: "1px dashed #f2ead9",
  },
  diaPasado: {
    opacity: 0.78,
  },
  diaConReservas: {
    backgroundColor: "#fff6db",
    border: "1px solid #ecdca8",
  },
  diaActividadMedia: {
    backgroundColor: "#ffefc4",
    border: "1px solid #e6d18c",
  },
  diaActividadAlta: {
    backgroundColor: "#ffe7a8",
    border: "1px solid #d9bc67",
  },
  diaHoy: {
    boxShadow: "inset 0 0 0 2px #c9a64a",
  },
  diaSeleccionado: {
    outline: "3px solid #8b6a2f",
    outlineOffset: 0,
  },
  diaNumero: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#3e3022",
  },
  infoDia: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  infoDiaTexto: {
    fontSize: "0.8rem",
    color: "#6d5a3c",
    fontWeight: 600,
    lineHeight: 1.2,
  },
  infoDiaVacio: {
    fontSize: "0.78rem",
    color: "#b0a38d",
  },
  detalleBox: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 20,
  },
  detalleCabecera: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  detalleTitulo: {
    margin: 0,
    color: "#4b3a2a",
    textTransform: "capitalize",
    fontSize: "1.2rem",
  },
  detalleSubtitulo: {
    marginTop: 8,
    color: "#7a7a7a",
  },
  botonIrReservas: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #d8c89f",
    backgroundColor: "#fff8da",
    cursor: "pointer",
    fontWeight: 700,
    color: "#5b4a2d",
    whiteSpace: "nowrap",
  },
  mensajeResumen: {
    margin: "0 0 14px 0",
    color: "#7a7a7a",
    fontSize: "0.92rem",
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
    flexWrap: "wrap",
  },
  reservaIzq: {
    minWidth: 220,
    flex: 1,
  },
  reservaClase: {
    margin: 0,
    color: "#333",
    fontSize: "0.98rem",
    fontWeight: 600,
  },
  reservaMeta: {
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: "0.9rem",
  },
  reservaDer: {
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
  mensajeDetalle: {
    color: "#7a7a7a",
    margin: 0,
  },
};

export default AdminCalendarioReservasNuevo;