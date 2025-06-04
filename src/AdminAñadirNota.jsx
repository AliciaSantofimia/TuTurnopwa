import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { dbRealtime } from "./firebase";


const AdminAñadirNota = () => {
  const { id } = useParams(); // ID de la reserva
  const navigate = useNavigate();
  const [nota, setNota] = useState("");

  // Ejemplo temporal (puedes cargar datos reales si lo deseas)
  const reserva = {
    clase: "Pinta tu pieza",
    usuario: "Marta Ruiz",
  };

  const handleGuardarNota = async () => {
    if (!nota.trim()) {
      alert("Por favor, escribe una nota.");
      return;
    }

    try {
      const notaObj = {
        texto: nota,
        fecha: new Date().toISOString(),
      };

      const refReserva = ref(dbRealtime, `reservasNotas/${id}`);
      const snapshot = await get(refReserva);
      const datosActuales = snapshot.exists() ? snapshot.val() : { notasInternas: [] };

      const nuevasNotas = [...(datosActuales.notasInternas || []), notaObj];

      await update(refReserva, {
        notasInternas: nuevasNotas,
      });

      alert("Nota guardada correctamente");
      navigate("/admin/reservas/listado");
    } catch (error) {
      console.error("❌ Error al guardar la nota:", error);
      alert("Ocurrió un error al guardar la nota.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.bloque}>
        <h2>📝 Añadir nota interna</h2>
        <p>
          Clase: <strong>{reserva.clase}</strong><br />
          Usuario: <strong>{reserva.usuario}</strong>
        </p>
        <textarea
          placeholder="Escribe aquí una nota solo visible para admins..."
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleGuardarNota} style={styles.btn}>
          Guardar nota
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    minHeight: "100vh",
  },
  bloque: {
    background: "white",
    padding: 30,
    maxWidth: 600,
    margin: "auto",
    borderRadius: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  textarea: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    border: "1px solid #ccc",
    padding: 15,
    fontSize: "1rem",
  },
  btn: {
    marginTop: 20,
    padding: "12px 24px",
    backgroundColor: "#4a90e2",
    border: "none",
    color: "white",
    borderRadius: 10,
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default AdminAñadirNota;
