import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref as dbRef, get, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { dbRealtime } from "./firebase";

const AdminCambiarImagenClase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagenActual, setImagenActual] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState(null);

  useEffect(() => {
    const fetchImagen = async () => {
      const snapshot = await get(dbRef(dbRealtime, `clases/${id}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setImagenActual(data.imagen || "/img/ejemplo-clase.jpg");
      }
    };
    fetchImagen();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNuevaImagen(e.target.files[0]);
    }
  };

  const handleActualizarImagen = async (e) => {
    e.preventDefault();

    if (!nuevaImagen) {
      alert("Selecciona una imagen primero.");
      return;
    }

    try {
      const storagePath = `imagenes-clases/${id}`;
      const storageReference = storageRef(storage, storagePath);
      await uploadBytes(storageReference, nuevaImagen);
      const url = await getDownloadURL(storageReference);

      await update(dbRef(dbRealtime, `clases/${id}`), {
        imagen: url,
      });

      setImagenActual(url);
      alert("Imagen actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar imagen:", error);
      alert("Hubo un error al actualizar la imagen.");
    }
  };

  return (
    <div style={styles.body}>
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#f2f2f2",
          border: "1px solid #ccc",
          padding: "6px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Volver
      </button>

      <div style={styles.contenedor}>
        <h2 style={styles.titulo}>🖼️ Cambiar imagen de la clase</h2>
        <p style={styles.texto}>Imagen actual:</p>
        <img src={imagenActual} alt="Imagen actual" style={styles.imagen} />
        <form onSubmit={handleActualizarImagen}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.inputFile}
          />
          <br />
          <button type="submit" style={styles.btn}>
            Actualizar imagen
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#fdf6f0",
    padding: 30,
    textAlign: "center",
    minHeight: "100vh",
  },
  contenedor: {
    background: "white",
    maxWidth: 500,
    margin: "auto",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  titulo: {
    marginBottom: 10,
    color: "#444",
  },
  texto: {
    marginBottom: 10,
    color: "#777",
  },
  inputFile: {
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#ffa07a",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    cursor: "pointer",
  },
  imagen: {
    maxWidth: "100%",
    borderRadius: 12,
    marginTop: 15,
  },
};

export default AdminCambiarImagenClase;

