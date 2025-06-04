import React, { useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "../firebase";

const AdminBuscarUsuario = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    if (!busqueda.trim()) {
      alert("Por favor, introduce un nombre o email");
      return;
    }

    try {
      const snapshot = await get(ref(dbRealtime, "usuarios"));
      const encontrados = [];

      snapshot.forEach((childSnap) => {
        const data = childSnap.val();
        const id = childSnap.key;
        const nombre = data.nombre?.toLowerCase() || "";
        const email = data.email?.toLowerCase() || "";
        const term = busqueda.toLowerCase();

        if (nombre.includes(term) || email.includes(term)) {
          encontrados.push({
            id,
            nombre: data.nombre,
            email: data.email,
            reservas: data.reservas?.length || 0,
          });
        }
      });

      setResultados(encontrados);
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      alert("Hubo un error al buscar. Intenta de nuevo.");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.contenedor}>
        <h2 style={styles.titulo}>🔎 Buscar Usuario</h2>
        <input
          type="text"
          placeholder="Introduce nombre o email"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleBuscar} style={styles.btn}>Buscar</button>
      </div>

      {resultados.length > 0 && (
        <div style={styles.resultados}>
          <h3 style={{ marginBottom: 10 }}>Resultado:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {resultados.map((usuario) => (
              <li key={usuario.id} style={styles.usuario}>
                <strong>{usuario.nombre}</strong><br />
                <span>{usuario.email}</span><br />
                <span>Reservas: {usuario.reservas}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 30,
    textAlign: "center",
    minHeight: "100vh"
  },
  contenedor: {
    maxWidth: 500,
    margin: "auto",
    background: "white",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  titulo: {
    marginBottom: 20,
    color: "#444"
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginTop: 15,
    fontSize: "1rem",
  },
  btn: {
    marginTop: 20,
    padding: "12px 24px",
    borderRadius: 12,
    backgroundColor: "#8899ff",
    border: "none",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
  },
  resultados: {
    marginTop: 40,
  },
  usuario: {
    backgroundColor: "#fff",
    margin: "10px auto",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    maxWidth: 400,
  }
};

export default AdminBuscarUsuario;
