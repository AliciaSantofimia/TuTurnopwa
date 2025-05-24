import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import { db, storage } from "../firebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminCambiarImagenClase = () => {
  const { id } = useParams(); // aquí recibo el ID de la clase desde la URL
  const [imagenActual, setImagenActual] = useState("/img/ejemplo-clase.jpg"); // esta será la imagen actual
  const [nuevaImagen, setNuevaImagen] = useState(null);

  // cuando selecciono una nueva imagen, la guardo en el estado
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNuevaImagen(e.target.files[0]);
    }
  };

  // cuando pulse actualizar, se subirá la imagen (más adelante con Firebase)
  const handleActualizarImagen = async (e) => {
    e.preventDefault();

    if (!nuevaImagen) {
      alert("Selecciona una imagen primero.");
      return;
    }

    // aquí iría la subida a Firebase Storage y actualización del documento
    /*
    const storageRef = ref(storage, `imagenes-clases/${id}`);
    await uploadBytes(storageRef, nuevaImagen);
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "clases", id), { imagen: url });
    setImagenActual(url);
    alert("Imagen actualizada correctamente");
    */
    alert("Imagen actualizada (simulado)");
  };

  return (
    <div style={styles.body}>
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

