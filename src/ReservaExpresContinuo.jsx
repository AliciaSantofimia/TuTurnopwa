import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { contarPlazasPorMetodo } from "./utils/contarPlazasDia";

const actualizarContadorReservas = async (uid) => {
  const userRef = ref(dbRealtime, "usuarios/" + uid);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const datos = snapshot.val();
    const nuevasReservas = (datos.reservas || 0) + 1;

    await update(userRef, {
      reservas: nuevasReservas
    });
  }
};

const ReservaExpresContinuo = () => {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [ocupadasTorno, setOcupadasTorno] = useState(0);
  const [ocupadasModelado, setOcupadasModelado] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const desdeTarjeta = location.state?.desdeTarjeta || false;

  const maxTorno = 12;
  const maxModelado = 33;

  useEffect(() => {
    if (fecha) {
      contarPlazasPorMetodo(fecha).then(({ torno, modelado }) => {
        setOcupadasTorno(torno);
        setOcupadasModelado(modelado);
      });
    }
  }, [fecha]);

  const plazasDisponibles =
    metodo === "torno"
      ? Math.max(maxTorno - ocupadasTorno, 0)
      : metodo === "general"
      ? Math.max(maxModelado - ocupadasModelado, 0)
      : 0;

  const handleReserva = async () => {
    if (!fecha || !turno || !metodo || !plazas) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (plazas > plazasDisponibles) {
      alert("No hay suficientes plazas disponibles.");
      return;
    }

    const precio = metodo === "torno" ? "27€" : "32€";

    const reserva = {
      clase: "Exprés Continuo",
      fecha,
      turno,
      metodo,
      precio,
      plazas: Number(plazas),
      timestamp: new Date().toISOString(),
      tipoReserva: desdeTarjeta ? "tarjetaRegalo" : "normal"
    };

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("Usuario no autenticado.");
        return;
      }

      // Guardar en reservas generales
      const reservaRef = ref(
        dbRealtime,
        `reservas/ExpresContinuo/${fecha}/${turno}/${metodo}`
      );
      await push(reservaRef, { uid: user.uid, ...reserva });

      // Guardar en historial del usuario
      const historialRef = ref(
        dbRealtime,
        `usuarios/${user.uid}/listaReservas`
      );
      await push(historialRef, reserva);

      await actualizarContadorReservas(user.uid);

      if (desdeTarjeta) {
        navigate("/generar-codigo", { state: reserva });
      } else {
        navigate("/resumen-pago", { state: reserva });
      }
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      alert("Ocurrió un error al guardar tu reserva.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.titulo}>Reserva: Exprés Continuo</h2>

        {desdeTarjeta && (
          <p style={styles.mensaje}>Estás usando una tarjeta regalo 🎁</p>
        )}

        <label>Selecciona fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={styles.input}
          min="2025-01-01"
          max="2025-12-31"
        />

        <label>Selecciona turno:</label>
        <select
          value={turno}
          onChange={(e) => setTurno(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Selecciona --</option>
          <option value="10:00 - 13:00">Mañana (10:00 - 13:00)</option>
          <option value="17:00 - 20:00">Tarde (17:00 - 20:00)</option>
        </select>

        <label>Método:</label>
        <select
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Selecciona --</option>
          <option value="torno">Torno - 27€</option>
          <option value="general">General - 32€</option>
        </select>

        {metodo && (
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 10 }}>
            Quedan {plazasDisponibles} plazas disponibles para este método.
          </p>
        )}

        <label>¿Cuántas plazas?</label>
        <input
          type="number"
          value={plazas}
          onChange={(e) => {
            const valor = e.target.value;
            const num = parseInt(valor, 10);
            if (!isNaN(num) && num >= 1) {
              setPlazas(num);
            }
          }}
          min="1"
          max={plazasDisponibles || 1}
          style={styles.input}
        />

        <button
          style={styles.boton}
          onClick={handleReserva}
          disabled={!metodo || plazas > plazasDisponibles}
        >
          Confirmar y pagar
        </button>

        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/menu");
            }
          }}
          style={{
            marginTop: 12,
            fontSize: "0.9rem",
            color: "#2563eb",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 20,
  },
  container: {
    background: "white",
    borderRadius: 20,
    padding: 30,
    maxWidth: 600,
    margin: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  titulo: {
    textAlign: "center",
    color: "#6b3700",
    fontSize: "1.8rem",
    marginBottom: 10,
  },
  mensaje: {
    textAlign: "center",
    fontSize: "0.95rem",
    fontWeight: "bold",
    color: "#2d7a46",
    backgroundColor: "#e3fce5",
    padding: 8,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: "1rem",
    marginBottom: 15,
    border: "1px solid #ccc",
    borderRadius: 8,
  },
  boton: {
    display: "block",
    margin: "auto",
    padding: "12px 24px",
    backgroundColor: "#f59e8f",
    color: "white",
    border: "none",
    borderRadius: 30,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ReservaExpresContinuo;








