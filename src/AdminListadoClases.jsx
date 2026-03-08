import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminListadoClases = () => {
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);
  const [inscripciones, setInscripciones] = useState({});

  useEffect(() => {
    const cargarClases = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "clases"));

        if (snapshot.exists()) {
          const datos = [];

          snapshot.forEach((child) => {
            const clase = {
              id: child.key,
              ...child.val(),
            };

            if (clase.activa === true) {
              datos.push(clase);
            }
          });

          datos.sort((a, b) => {
            const nombreA = (a.nombre || a.id || "").toLowerCase();
            const nombreB = (b.nombre || b.id || "").toLowerCase();
            return nombreA.localeCompare(nombreB, "es");
          });

          setClases(datos);
        } else {
          setClases([]);
          console.log("No hay clases disponibles.");
        }
      } catch (error) {
        console.error("Error al cargar clases desde Firebase:", error);
        setClases([]);
      }
    };

    const contarPlazasReservadas = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "reservas"));
        const contador = {};

        if (snapshot.exists()) {
          const data = snapshot.val();

          Object.values(data).forEach((usuario) => {
            if (!usuario || typeof usuario !== "object") return;

            Object.entries(usuario).forEach(([claveClase, fechas]) => {
              if (!contador[claveClase]) contador[claveClase] = 0;
              if (!fechas || typeof fechas !== "object") return;

              Object.values(fechas).forEach((turnos) => {
                if (!turnos || typeof turnos !== "object") return;

                Object.values(turnos).forEach((metodos) => {
                  if (!metodos || typeof metodos !== "object") return;

                  Object.values(metodos).forEach((reservasPorMetodo) => {
                    if (!reservasPorMetodo || typeof reservasPorMetodo !== "object") return;

                    Object.values(reservasPorMetodo).forEach((reserva) => {
                      if (!reserva || typeof reserva !== "object") return;
                      contador[claveClase] += Number(reserva.plazas || 1);
                    });
                  });
                });
              });
            });
          });
        }

        setInscripciones(contador);
      } catch (error) {
        console.error("Error al contar inscripciones:", error);
        setInscripciones({});
      }
    };

    cargarClases();
    contarPlazasReservadas();
  }, []);

  const handleVerInscripciones = (clase) => {
    const clave = clase.id || clase.nombre;
    navigate(`/admin/clases/inscripciones/${encodeURIComponent(clave)}`);
  };

  const obtenerNombreVisible = (clase) => {
    return clase?.nombre || clase?.id || "Clase sin nombre";
  };

  const obtenerTurnosTexto = (turnos) => {
    if (Array.isArray(turnos)) return turnos.join(", ");
    if (typeof turnos === "string") return turnos;
    return "No definidos";
  };

  const obtenerPrecioTexto = (clase) => {
    if (clase?.precioDesde) return `Desde ${clase.precioDesde} €`;
    if (clase?.precio) return `${clase.precio} €`;
    return "Precio no indicado";
  };

  const obtenerInscritos = (clase) => {
    return (
      inscripciones[clase.id] ||
      inscripciones[clase.nombre] ||
      0
    );
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <div style={styles.header}>
          <h1 style={styles.titulo}>Listado de clases</h1>
          <p style={styles.subtexto}>
            Consulta las clases activas y accede al detalle de sus inscripciones.
          </p>
        </div>

        {clases.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyText}>No hay clases activas disponibles.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {clases.map((clase) => {
              const nombreVisible = obtenerNombreVisible(clase);

              return (
                <div key={clase.id} style={styles.card}>
                  <div style={styles.cardTop}>
                    <h2 style={styles.nombreClase}>{nombreVisible}</h2>
                    <span style={styles.badge}>
                      {obtenerInscritos(clase)} inscritos
                    </span>
                  </div>

                  <p style={styles.info}>
                    <strong>Categoría:</strong> {clase.categoria || "No definida"}
                  </p>

                  <p style={styles.info}>
                    <strong>Precio:</strong> {obtenerPrecioTexto(clase)}
                  </p>

                  {clase.duracion && (
                    <p style={styles.info}>
                      <strong>Duración:</strong> {clase.duracion}
                    </p>
                  )}

                  <p style={styles.info}>
                    <strong>Turnos:</strong> {obtenerTurnosTexto(clase.turnos)}
                  </p>

                  <div style={styles.acciones}>
                    <button
                      onClick={() => handleVerInscripciones(clase)}
                      style={styles.btn}
                    >
                      Ver inscripciones
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
  },
  container: {
    maxWidth: 950,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 32,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
  },
  header: {
    marginBottom: 28,
    textAlign: "center",
  },
  titulo: {
    margin: 0,
    fontSize: "2rem",
    color: "#2f2f2f",
    fontWeight: "bold",
  },
  subtexto: {
    marginTop: 8,
    color: "#7a7a7a",
    fontSize: "0.98rem",
  },
  emptyBox: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 24,
    textAlign: "center",
  },
  emptyText: {
    margin: 0,
    color: "#7a7a7a",
    fontSize: "1rem",
  },
  grid: {
    display: "grid",
    gap: 16,
  },
  card: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 22,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  nombreClase: {
    margin: 0,
    fontSize: "1.2rem",
    color: "#4b3a2a",
    fontWeight: 700,
  },
  badge: {
    backgroundColor: "#fff8da",
    color: "#7a6331",
    border: "1px solid #f1e7c6",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: "0.9rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  info: {
    margin: "0 0 12px 0",
    color: "#555",
    fontSize: "0.98rem",
    lineHeight: 1.5,
  },
  acciones: {
    marginTop: 12,
  },
  btn: {
    display: "inline-block",
    padding: "12px 16px",
    backgroundColor: "#fffaf0",
    color: "#3d3126",
    border: "1px solid #eadfbe",
    borderRadius: 14,
    fontSize: "0.98rem",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
};

export default AdminListadoClases;