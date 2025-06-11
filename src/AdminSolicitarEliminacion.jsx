import React, { useEffect, useState } from "react";
import { ref, get, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function AdminSolicitarEliminacion() {
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState("");
  const [motivo, setMotivo] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email || "—";

  useEffect(() => {
    const cargarClases = async () => {
      const snapshot = await get(ref(dbRealtime, "clases"));
      if (snapshot.exists()) {
        const lista = [];
        snapshot.forEach((snap) => {
          lista.push({ id: snap.key, nombre: snap.val().nombre });
        });
        setClases(lista);
      }
    };
    cargarClases();
  }, []);

  const handleEnviarSolicitud = async () => {
    if (!claseSeleccionada || motivo.trim() === "") {
      alert("Selecciona una clase y escribe un motivo.");
      return;
    }
  
    const clase = clases.find((c) => c.id === claseSeleccionada);
  
    try {
      await push(ref(dbRealtime, "solicitudesCambiosClases"), {
        clase: clase.nombre,
        tipo: "eliminar",
        mensaje: motivo.trim(),
        fecha: new Date().toISOString(),
        autor: email
      });
      alert("✅ Solicitud enviada correctamente.");
      navigate("/admin");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("❌ Error al enviar la solicitud.");
    }
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.titulo}>🛑 Solicitar eliminación de clase</h2>

      <select
        value={claseSeleccionada}
        onChange={(e) => setClaseSeleccionada(e.target.value)}
        style={styles.select}
      >
        <option value="">-- Selecciona una clase --</option>
        {clases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Motivo de la solicitud"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={handleEnviarSolicitud} style={styles.btn}>
        Enviar solicitud
      </button>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    padding: 30,
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  select: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: 120,
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginBottom: 20,
  },
  btn: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f76b6b",
    color: "white",
    fontSize: 16,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
  },
};

