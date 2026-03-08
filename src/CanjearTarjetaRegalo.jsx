import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const CanjearTarjetaRegalo = () => {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleValidar = async () => {
    setMensaje("");
    const auth = getAuth();
    const user = auth.currentUser;

    const code = codigo.trim();

    if (!code) {
      setMensaje("Por favor, introduce un código.");
      return;
    }

    if (!user) {
      setMensaje("Debes iniciar sesión para canjear tu tarjeta.");
      return;
    }

    try {
      const snapRef = ref(dbRealtime, `tarjetas_regalo/${code}`);
      const snapshot = await get(snapRef);

      if (!snapshot.exists()) {
        setMensaje("❌ Código no válido. Revisa que lo has escrito bien.");
        return;
      }

      const tarjeta = snapshot.val();

      // Si ya fue usada (consumida en una reserva), bloquea
      if (tarjeta.usado) {
        setMensaje("❌ Este código ya ha sido usado.");
        return;
      }

      // Si ya está canjeada por otra persona, bloquea
      if (tarjeta.canjeadoPorUID && tarjeta.canjeadoPorUID !== user.uid) {
        setMensaje("❌ Este código ya ha sido canjeado por otro usuario.");
        return;
      }

      // Marcamos como CANJEADA (pero NO usada todavía)
      await update(snapRef, {
        canjeado: true,
        canjeadoPorUID: user.uid,
        fechaCanje: tarjeta.fechaCanje || new Date().toISOString(),
      });

      setMensaje("✅ Código válido. Ahora elige tu taller para reservar.");

      // Te mando a la pantalla donde se eligen talleres.
      // Ajusta esta ruta si tu “pantalla de categorías” no es /clases.
      navigate("/reserva-con-tarjeta-regalo", {
  state: {
    desdeTarjeta: true,
    codigo: code,
    tipo: tarjeta.tipo || "tarjeta_regalo_universal",
    importe: tarjeta.importe || tarjeta.precio || tarjeta.valor || null,
    saldo: tarjeta.importe || tarjeta.precio || tarjeta.valor || null,
  },
});
    } catch (error) {
      console.error("Error al validar el código:", error);
      setMensaje("⚠️ Ocurrió un error al validar el código.");
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

        <button onClick={handleValidar} style={styles.btn}>
          VALIDAR CÓDIGO
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
  },
  mensaje: {
    marginTop: 20,
    fontSize: "0.95rem",
    color: "#6b3700",
  },
};

export default CanjearTarjetaRegalo;