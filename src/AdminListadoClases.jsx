import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const clasesPermitidas = [
  "crearpiezadesdecero",
  "creatupiezafavorita",
  "creatubrunchbowl",
  "creatucuencoramen",
  "creatubandejahogar",
  "creatutazafavorita",
  "creatumaceta",
  "creatugrancentrodemesa",
  "creatujarrajarrongrande",
  "setmatcha",
  "setsake",
  "tazaescultorica",
  "macetaorganica",
  "modelamano4clases",
  "tornodecoracion4clases",
  "tornodesdecero4clases",
  "tornoperfeccionamiento6clases",
  "pintatupieza",
  "especialpintatupieza",
  "tarjetaregalo",
];

const AdminListadoClases = () => {
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);
  const [inscripciones, setInscripciones] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [clasesSnap, reservasSnap] = await Promise.all([
          get(ref(dbRealtime, "clases")),
          get(ref(dbRealtime, "reservas")),
        ]);

        const clasesData = [];
        const contador = {};

        if (clasesSnap.exists()) {
          clasesSnap.forEach((child) => {
            const clase = {
              id: child.key,
              ...child.val(),
            };

            if (clasesPermitidas.includes(clase.id) && clase.activa !== false) {
              clasesData.push(clase);
            }
          });
        }

        if (reservasSnap.exists()) {
          const reservas = reservasSnap.val();

          Object.entries(reservas).forEach(([claveClase, fechas]) => {
            if (!clasesPermitidas.includes(claveClase)) return;

            let total = 0;

            if (fechas && typeof fechas === "object") {
              Object.values(fechas).forEach((turnos) => {
                if (!turnos || typeof turnos !== "object") return;

                Object.values(turnos).forEach((tipos) => {
                  if (!tipos || typeof tipos !== "object") return;

                  Object.values(tipos).forEach((reservasPorTipo) => {
                    if (!reservasPorTipo || typeof reservasPorTipo !== "object") return;

                    Object.values(reservasPorTipo).forEach((reserva) => {
                      if (!reserva || typeof reserva !== "object") return;
                      total += Number(reserva.plazas || 1);
                    });
                  });
                });
              });
            }

            contador[claveClase] = total;
          });
        }

        clasesData.sort((a, b) => {
          const nombreA = (a.nombre || a.id || "").toLowerCase();
          const nombreB = (b.nombre || b.id || "").toLowerCase();
          return nombreA.localeCompare(nombreB, "es");
        });

        setClases(clasesData);
        setInscripciones(contador);
      } catch (error) {
        console.error("Error al cargar inscritos por clase:", error);
        setClases([]);
        setInscripciones({});
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleVerInscripciones = (clase) => {
    navigate(`/admin/clases/inscripciones/${encodeURIComponent(clase.id)}`);
  };

  const obtenerNombreVisible = (clase) => {
    return clase?.nombre || clase?.id || "Clase sin nombre";
  };

  const obtenerInscritos = (clase) => {
    return inscripciones[clase.id] || 0;
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <div style={styles.header}>
          <h1 style={styles.titulo}>Inscritos por clase</h1>
          <p style={styles.subtexto}>
            Consulta cuántos alumnos hay en cada taller y accede a su lista.
          </p>
        </div>

        {cargando ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyText}>Cargando clases...</p>
          </div>
        ) : clases.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyText}>No hay clases disponibles.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {clases.map((clase) => (
              <div key={clase.id} style={styles.card}>
                <div style={styles.cardTop}>
                  <div>
                    <h2 style={styles.nombreClase}>{obtenerNombreVisible(clase)}</h2>
                    <p style={styles.categoria}>
                      {clase.categoria || "Sin categoría"}
                    </p>
                  </div>

                  <span style={styles.badge}>
                    {obtenerInscritos(clase)} alumno{obtenerInscritos(clase) !== 1 ? "s" : ""}
                  </span>
                </div>

                <div style={styles.acciones}>
                  <button
                    onClick={() => handleVerInscripciones(clase)}
                    style={styles.btn}
                  >
                    Ver lista
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
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
  },
  nombreClase: {
    margin: 0,
    fontSize: "1.15rem",
    color: "#4b3a2a",
    fontWeight: 700,
  },
  categoria: {
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: "0.95rem",
  },
  badge: {
    backgroundColor: "#fff8da",
    color: "#7a6331",
    border: "1px solid #f1e7c6",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: "0.92rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  acciones: {
    marginTop: 16,
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