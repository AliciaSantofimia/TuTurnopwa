import React, { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./BotonVolver";

const AdminClasesNuevo = () => {
  const navigate = useNavigate();
  const [notasPorClase, setNotasPorClase] = useState({});

  const [clases, setClases] = useState([]);
  const [resumen, setResumen] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [clasesSnap, reservasSnap, clasesNotasSnap] = await Promise.all([
          get(ref(dbRealtime, "clases")),
          get(ref(dbRealtime, "reservas")),
          get(ref(dbRealtime, "clasesNotas")),
        ]);

        const listaClases = [];
        const mapaResumen = {};
        const mapaNotas = {};

        if (clasesNotasSnap.exists()) {
          clasesNotasSnap.forEach((claseNotaSnap) => {
            const claseId = claseNotaSnap.key;
            const notasInternas = claseNotaSnap.child("notasInternas").val() || {};
            mapaNotas[claseId] = Object.keys(notasInternas).length;
          });
        }

        if (clasesSnap.exists()) {
          clasesSnap.forEach((claseSnap) => {
            const claseId = claseSnap.key;
            const claseData = claseSnap.val() || {};

            if (claseData.activa === false) return;

            const nombre = claseData.nombre || claseId;

            listaClases.push({
              id: claseId,
              nombre,
              categoria: claseData.categoria || "Sin categoría",
              precioDesde: claseData.precioDesde || "",
            });

            mapaResumen[claseId] = {
              reservasTotales: 0,
              plazasTotales: 0,
              reservasFuturas: 0,
              plazasFuturas: 0,
              proximaFecha: "",
            };
          });
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (reservasSnap.exists()) {
          reservasSnap.forEach((claseSnap) => {
            const claseKey = claseSnap.key;

            claseSnap.forEach((fechaSnap) => {
              const fechaKey = fechaSnap.key;

              fechaSnap.forEach((turnoSnap) => {
                turnoSnap.forEach((nivelSnap) => {
                  const nivelVal = nivelSnap.val();

                  if (!nivelVal || typeof nivelVal !== "object") return;

                  const procesarReserva = (reserva) => {
                    if (!reserva || typeof reserva !== "object") return;
                    if (reserva.estado !== "Confirmada") return;

                    const claseIdReal = reserva.claseId || claseKey;
                    if (!mapaResumen[claseIdReal]) return;

                    const plazas = Number(reserva.plazas || 1);
                    const fecha = reserva.fecha || fechaKey;
                    const fechaObj = new Date(`${fecha}T00:00:00`);

                    mapaResumen[claseIdReal].reservasTotales += 1;
                    mapaResumen[claseIdReal].plazasTotales += plazas;

                    if (fechaObj >= hoy) {
                      mapaResumen[claseIdReal].reservasFuturas += 1;
                      mapaResumen[claseIdReal].plazasFuturas += plazas;

                      if (
                        !mapaResumen[claseIdReal].proximaFecha ||
                        fecha < mapaResumen[claseIdReal].proximaFecha
                      ) {
                        mapaResumen[claseIdReal].proximaFecha = fecha;
                      }
                    }
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
                    procesarReserva(reservaSnap.val());
                  });
                });
              });
            });
          });
        }

        listaClases.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

        setClases(listaClases);
        setResumen(mapaResumen);
        setNotasPorClase(mapaNotas);
      } catch (error) {
        console.error("Error al cargar clases:", error);
        setClases([]);
        setResumen({});
        setNotasPorClase({});
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const clasesConResumen = useMemo(() => {
    return clases.map((clase) => ({
      ...clase,
      ...(resumen[clase.id] || {
        reservasTotales: 0,
        plazasTotales: 0,
        reservasFuturas: 0,
        plazasFuturas: 0,
        proximaFecha: "",
      }),
    }));
  }, [clases, resumen]);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <div style={styles.header}>
          <h1 style={styles.titulo}>Clases</h1>
          <p style={styles.subtitulo}>
            Resumen general de actividad por clase.
          </p>
        </div>

        {cargando ? (
          <p style={styles.mensaje}>Cargando clases...</p>
        ) : clasesConResumen.length === 0 ? (
          <p style={styles.mensaje}>No hay clases para mostrar.</p>
        ) : (
          <div style={styles.grid}>
            {clasesConResumen.map((clase) => (
              <div
                key={clase.id}
                style={styles.card}
                onClick={() =>
                  navigate(`/admin-detalle-clase?clase=${clase.id}`)
                }
              >
                <div style={styles.cardTop}>
                  <div>
                    <h2 style={styles.nombre}>{clase.nombre}</h2>
                    <p style={styles.categoria}>{clase.categoria}</p>

                    {notasPorClase[clase.id] > 0 && (
                      <span style={styles.badgeNotas}>
                        {notasPorClase[clase.id]} nota{notasPorClase[clase.id] !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  <span style={styles.badge}>
                    {clase.reservasFuturas} futura
                    {clase.reservasFuturas !== 1 ? "s" : ""}
                  </span>
                </div>

                <div style={styles.infoBox}>
                  <p style={styles.linea}>
                    <strong>Reservas totales:</strong> {clase.reservasTotales}
                  </p>
                  <p style={styles.linea}>
                    <strong>Plazas totales:</strong> {clase.plazasTotales}
                  </p>
                  <p style={styles.linea}>
                    <strong>Reservas futuras:</strong> {clase.reservasFuturas}
                  </p>
                  <p style={styles.linea}>
                    <strong>Plazas futuras:</strong> {clase.plazasFuturas}
                  </p>
                  <p style={styles.linea}>
                    <strong>Próxima fecha:</strong>{" "}
                    {clase.proximaFecha || "Sin reservas futuras"}
                  </p>
                  <p style={styles.linea}>
                    <strong>Precio base:</strong>{" "}
                    {clase.precioDesde ? `${clase.precioDesde}€` : "—"}
                  </p>
                </div>

                <div style={styles.acciones}>
                  <button
                    style={styles.boton}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin-reservas-nuevo?clase=${clase.id}`);
                    }}
                  >
                    Ver reservas
                  </button>
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
    maxWidth: 1200,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
  },
  header: {
    textAlign: "center",
    marginBottom: 26,
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
  mensaje: {
    textAlign: "center",
    color: "#7a7a7a",
    padding: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 18,
  },
  card: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    cursor: "pointer",
    transition: "0.2s",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  nombre: {
    margin: 0,
    color: "#4b3a2a",
    fontSize: "1.15rem",
  },
  categoria: {
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: "0.92rem",
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
  badgeNotas: {
    backgroundColor: "#eef3ff",
    color: "#4d63b3",
    border: "1px solid #cfd9ff",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: "0.82rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
    display: "inline-block",
    marginTop: 8,
  },
  infoBox: {
    display: "grid",
    gap: 8,
    marginBottom: 16,
  },
  linea: {
    margin: 0,
    color: "#333",
    fontSize: "0.94rem",
  },
  acciones: {
    marginTop: 8,
  },
  boton: {
    display: "inline-block",
    padding: "12px 16px",
    backgroundColor: "#fffaf0",
    color: "#3d3126",
    border: "1px solid #eadfbe",
    borderRadius: 14,
    fontSize: "0.96rem",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
};

export default AdminClasesNuevo;