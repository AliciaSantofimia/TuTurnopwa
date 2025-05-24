import React from "react";
import { useNavigate } from "react-router-dom";

const GaleriaTarjetasRegalo = () => {
  const navigate = useNavigate();

  const tarjetas = [
    {
      titulo: "2 clases de 4 horas al mes",
      descripcion: "Ideal para iniciarse poco a poco. Sin experiencia previa.",
      imagen: "/bono2.png",
      ruta: "/detalle-tarjeta-2clases"
    },
    {
      titulo: "Pinta tu pieza de cerámica",
      descripcion: "Decora una pieza blanca libremente. Muy relajante.",
      imagen: "/pintarceramica.png",
      ruta: "/detalle-tarjeta-pintatupieza"
    },
    {
      titulo: "Crea tu pieza favorita",
      descripcion: "Modelado básico + decoración. Elige lo que más te guste.",
      imagen: "/creativoplus.png",
      ruta: "/detalle-tarjeta-creapiezafavorita"
    },
    {
      titulo: "Torno intensivo individual (1 día)",
      descripcion: "Experiencia completa personalizada. Torno durante 1 jornada.",
      imagen: "/tornoalfarero.png",
      ruta: "/detalle-tarjeta-tornointensivo"
    },
    {
      titulo: "4 clases de 3 horas al mes",
      descripcion: "Ideal para quienes quieren practicar cada semana.",
      imagen: "/bono4.png",
      ruta: "/detalle-tarjeta-4clases"
    }
  ];

  return (
    <div style={styles.body}>
      <h1 style={styles.title}>Tarjetas regalo disponibles</h1>
      <div style={styles.grid}>
        {tarjetas.map((tarjeta, index) => (
          <div key={index} style={styles.tarjeta}>
            <div style={styles.info}>
              <h2 style={styles.tarjetaTitulo}>{tarjeta.titulo}</h2>
              <p style={styles.descripcion}>{tarjeta.descripcion}</p>
              <button
                onClick={() => navigate(tarjeta.ruta)}
                style={styles.btn}
              >
                Ver más
              </button>
            </div>
            <img
              src={tarjeta.imagen}
              alt={tarjeta.titulo}
              style={styles.imagen}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    margin: 0,
    padding: 20,
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontFamily: "Georgia, serif",
    color: "#6b3700",
    fontSize: "2rem",
    marginBottom: 30,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
  },
  tarjeta: {
    backgroundColor: "#fff1ee",
    borderLeft: "6px solid #e06c75",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  info: {
    flex: 1,
  },
  tarjetaTitulo: {
    fontSize: "1.1rem",
    color: "#3b3025",
    margin: "0 0 6px 0",
  },
  descripcion: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#555",
  },
  imagen: {
    width: 60,
    height: "auto",
    marginLeft: 12,
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#e0a800",
    color: "white",
    padding: "6px 12px",
    borderRadius: 10,
    fontSize: "0.85rem",
    fontWeight: "bold",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  }
};

// Responsive grid
if (window.innerWidth >= 600) {
  styles.grid.gridTemplateColumns = "repeat(2, 1fr)";
}

export default GaleriaTarjetasRegalo;

