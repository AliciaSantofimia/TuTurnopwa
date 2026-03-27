import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";
import { OPCIONES_TARJETA_REGALO } from "./opcionesTarjetaRegalo";

const CanjearTarjetaRegalo = () => {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [validando, setValidando] = useState(false);
  const navigate = useNavigate();

  const buscarTarjetaPorCodigo = async (codigoBuscado) => {
    const tarjetasRef = ref(dbRealtime, "tarjetasRegalo");
    const snapshot = await get(tarjetasRef);

    if (!snapshot.exists()) return null;

    let encontrada = null;

    snapshot.forEach((itemSnap) => {
      const tarjeta = itemSnap.val();

      if (
        tarjeta?.codigo &&
        String(tarjeta.codigo).trim().toUpperCase() ===
          codigoBuscado.toUpperCase()
      ) {
        encontrada = {
          id: itemSnap.key,
          ...tarjeta,
        };
      }
    });

    return encontrada;
  };

  const obtenerOpcionRegalo = (tarjeta) => {
    if (!tarjeta) return null;

    return (
      OPCIONES_TARJETA_REGALO.find((opcion) => {
        const mismoClaseId = opcion.claseId === tarjeta.claseId;
        if (!mismoClaseId) return false;

        const subtipoTarjeta = String(tarjeta.subtipo || "").trim();
        const subtipoOpcion = String(opcion.subtipo || "").trim();

        const tipoPiezaTarjeta = String(tarjeta.tipoPieza || "").trim();
        const tipoPiezaOpcion = String(opcion.tipoPieza || "").trim();

        if (subtipoTarjeta && subtipoOpcion) {
          return subtipoTarjeta === subtipoOpcion;
        }

        if (tipoPiezaTarjeta && tipoPiezaOpcion) {
          return tipoPiezaTarjeta === tipoPiezaOpcion;
        }

        if (!subtipoTarjeta && !tipoPiezaTarjeta) {
          return true;
        }

        return false;
      }) || null
    );
  };

  const handleValidar = async () => {
    setMensaje("");
    setValidando(true);

    const auth = getAuth();
    const user = auth.currentUser;
    const code = codigo.trim();

    if (!code) {
      setMensaje("Por favor, introduce un código.");
      setValidando(false);
      return;
    }

    if (!user) {
      setMensaje("Debes iniciar sesión para canjear tu tarjeta.");
      setValidando(false);
      return;
    }

    try {
      const tarjeta = await buscarTarjetaPorCodigo(code);

      if (!tarjeta) {
        setMensaje("❌ Código no válido. Revisa que lo has escrito bien.");
        setValidando(false);
        return;
      }

      if (String(tarjeta.estadoPago || "").toLowerCase() !== "pagado") {
        setMensaje("❌ Esta tarjeta regalo aún no consta como pagada.");
        setValidando(false);
        return;
      }

      if (tarjeta.usado) {
        setMensaje("❌ Este código ya ha sido usado.");
        setValidando(false);
        return;
      }

      if (tarjeta.canjeadoPorUID && tarjeta.canjeadoPorUID !== user.uid) {
        setMensaje("❌ Este código ya ha sido canjeado por otro usuario.");
        setValidando(false);
        return;
      }

      const opcionRegalo = obtenerOpcionRegalo(tarjeta);

      if (!opcionRegalo || !opcionRegalo.rutaReserva) {
        setMensaje(
          "❌ No se ha podido identificar la clase de esta tarjeta regalo."
        );
        setValidando(false);
        return;
      }

      setMensaje("✅ Código válido. Redirigiendo a tu reserva...");

      navigate(opcionRegalo.rutaReserva, {
        state: {
          desdeTarjeta: true,
          desdeTarjetaRegalo: true,
          codigoTarjeta: tarjeta.codigo,
          tarjetaRegaloId: tarjeta.id,
          clase: tarjeta.clase || opcionRegalo.clase,
          claseId: tarjeta.claseId || opcionRegalo.claseId,
          subtipo: tarjeta.subtipo || opcionRegalo.subtipo || "",
          tipoPieza: tarjeta.tipoPieza || opcionRegalo.tipoPieza || "",
          tipoTaller: tarjeta.tipoTaller || opcionRegalo.tipoTaller || "",
          precio: tarjeta.precioTotal || opcionRegalo.precio || 0,
          precioTotal: tarjeta.precioTotal || opcionRegalo.precio || 0,
          rutaReserva: opcionRegalo.rutaReserva,
          requiereMetodo: !!opcionRegalo.requiereMetodo,
          requiereTipoPieza: !!opcionRegalo.requiereTipoPieza,
        },
      });
   } catch (error) {
  console.error("Error al validar el código:", error);
  setMensaje(`⚠️ Error al validar: ${error?.message || "desconocido"}`);
} finally {
  setValidando(false);
}
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h2 style={styles.titulo}>Canjear tarjeta regalo</h2>
        <p style={styles.descripcion}>
          Introduce el código de tu tarjeta para acceder a tu taller.
        </p>

        <input
          type="text"
          placeholder="Introduce tu código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleValidar}
          style={styles.btn}
          disabled={validando}
        >
          {validando ? "VALIDANDO..." : "VALIDAR CÓDIGO"}
        </button>

        {mensaje && <div style={styles.mensaje}>{mensaje}</div>}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fffef4",
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    maxWidth: 420,
    width: "100%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  titulo: {
    color: "#6b3700",
    fontSize: "1.3rem",
    marginBottom: 10,
  },
  descripcion: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ccc",
    marginBottom: 20,
    fontSize: "1rem",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#f8b5b5",
    color: "white",
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: 30,
    fontSize: "0.95rem",
    border: "none",
    cursor: "pointer",
    opacity: 1,
  },
  mensaje: {
    marginTop: 20,
    fontSize: "0.95rem",
    color: "#6b3700",
  },
};

export default CanjearTarjetaRegalo;