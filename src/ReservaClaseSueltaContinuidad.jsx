import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./BotonVolver";
import DateInputReserva from "./components/DateInputReserva";

export default function ReservaClaseSueltaContinuidad() {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [error, setError] = useState("");

  const turnosDisponibles = [
    "12:00 a 15:00",
    "18:00 a 21:00",
  ];

  const metodos = [
    {
      id: "torno",
      nombre: "Torno",
      precio: 32,
    },
    {
      id: "mano",
      nombre: "Modelado a mano o decoración con esmaltes",
      precio: 27,
    },
  ];

  const precioSeleccionado = useMemo(() => {
    const metodoEncontrado = metodos.find((m) => m.id === metodo);
    return metodoEncontrado ? metodoEncontrado.precio : 0;
  }, [metodo]);

  const textoMetodoSeleccionado = useMemo(() => {
    const metodoEncontrado = metodos.find((m) => m.id === metodo);
    return metodoEncontrado ? metodoEncontrado.nombre : "";
  }, [metodo]);

  const continuarAlPago = () => {
    if (!fecha || !turno || !metodo) {
      setError("Por favor, completa la fecha, el turno y la modalidad.");
      return;
    }

    setError("");

    navigate("/pago", {
      state: {
        clase: "Clase suelta con continuidad",
        fecha,
        turno,
        metodo: textoMetodoSeleccionado,
        precio: precioSeleccionado,
        tipoReserva: "normal",
      },
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <BotonVolver />

        <div style={styles.header}>
          <img
            src="/img/logoPCsin.png"
            alt="Logo La Purísima Conchi"
            style={styles.logo}
          />
          <h1 style={styles.title}>Reserva · Clase suelta con continuidad</h1>
        </div>

        <p style={styles.subtitle}>
          Reserva una clase suelta para continuar tu proyecto, practicar torno,
          modelado a mano o decoración con esmaltes, sin compromiso mensual.
        </p>

        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            <strong>Importante:</strong> si finalmente realizas 4 clases, el
            taller podrá aplicar el precio correspondiente al bono en lugar de
            cobrarlas como clases sueltas independientes.
          </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Selecciona una fecha</label>
          <DateInputReserva value={fecha} onChange={setFecha} />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Selecciona un turno</label>
          <div style={styles.optionsGrid}>
            {turnosDisponibles.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTurno(item)}
                style={{
                  ...styles.optionButton,
                  ...(turno === item ? styles.optionButtonActive : {}),
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Selecciona la modalidad</label>
          <div style={styles.methodGrid}>
            {metodos.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMetodo(item.id)}
                style={{
                  ...styles.methodCard,
                  ...(metodo === item.id ? styles.methodCardActive : {}),
                }}
              >
                <div style={styles.methodTitle}>{item.nombre}</div>
                <div style={styles.methodPrice}>{item.precio.toFixed(2)} €</div>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.summaryBox}>
          <h2 style={styles.summaryTitle}>Resumen de la reserva</h2>

          <p style={styles.summaryLine}>
            <strong>Clase:</strong> Clase suelta con continuidad
          </p>
          <p style={styles.summaryLine}>
            <strong>Fecha:</strong> {fecha || "Pendiente de seleccionar"}
          </p>
          <p style={styles.summaryLine}>
            <strong>Turno:</strong> {turno || "Pendiente de seleccionar"}
          </p>
          <p style={styles.summaryLine}>
            <strong>Modalidad:</strong>{" "}
            {textoMetodoSeleccionado || "Pendiente de seleccionar"}
          </p>
          <p style={styles.total}>
            Total: {precioSeleccionado ? `${precioSeleccionado.toFixed(2)} €` : "—"}
          </p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="button" onClick={continuarAlPago} style={styles.mainButton}>
          Continuar al pago
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #fffaf4, #fdf7ef)",
    padding: "24px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "760px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: "24px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "12px",
    marginTop: "8px",
    flexWrap: "wrap",
  },
  logo: {
    width: "54px",
    height: "54px",
    objectFit: "contain",
  },
  title: {
    fontSize: "28px",
    color: "#3b3025",
    margin: 0,
    fontWeight: "700",
  },
  subtitle: {
    color: "#5f5146",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "18px",
  },
  infoBox: {
    backgroundColor: "#fffaf0",
    borderLeft: "4px solid #F4C542",
    borderRadius: "14px",
    padding: "14px 16px",
    marginBottom: "22px",
  },
  infoText: {
    margin: 0,
    color: "#5f5146",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  section: {
    marginBottom: "22px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    color: "#3b3025",
    fontWeight: "700",
    fontSize: "15px",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
  },
  optionButton: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "2px solid #eadfca",
    backgroundColor: "#fffdf8",
    cursor: "pointer",
    color: "#3b3025",
    fontWeight: "600",
    fontSize: "14px",
  },
  optionButtonActive: {
    border: "2px solid #F4C542",
    backgroundColor: "#fff7dd",
  },
  methodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "12px",
  },
  methodCard: {
    padding: "16px",
    borderRadius: "16px",
    border: "2px solid #eadfca",
    backgroundColor: "#fffdf8",
    cursor: "pointer",
    textAlign: "left",
  },
  methodCardActive: {
    border: "2px solid #F4C542",
    backgroundColor: "#fff7dd",
  },
  methodTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#3b3025",
    marginBottom: "8px",
    lineHeight: "1.4",
  },
  methodPrice: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#6b3700",
  },
  summaryBox: {
    backgroundColor: "#fffaf0",
    borderRadius: "16px",
    padding: "18px",
    marginTop: "8px",
    marginBottom: "18px",
  },
  summaryTitle: {
    marginTop: 0,
    marginBottom: "12px",
    color: "#3b3025",
    fontSize: "18px",
  },
  summaryLine: {
    margin: "8px 0",
    color: "#5f5146",
    fontSize: "14px",
  },
  total: {
    marginTop: "14px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#6b3700",
  },
  error: {
    color: "#b42318",
    backgroundColor: "#fff1f0",
    borderRadius: "12px",
    padding: "10px 12px",
    marginBottom: "14px",
    fontSize: "14px",
  },
  mainButton: {
    width: "100%",
    backgroundColor: "#F4C542",
    color: "#3b3025",
    border: "none",
    borderRadius: "16px",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
};