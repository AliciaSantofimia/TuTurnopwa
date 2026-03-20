import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const correosAdmin = [
  "aliciasmelero@gmail.com",
  "lapurisimaconchioficial@gmail.com",
];

const RutaAdmin = ({ children }) => {
  const [usuario, setUsuario] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user || null);
    });

    return () => unsubscribe();
  }, []);

  if (usuario === undefined) {
    return <p style={{ padding: 40, textAlign: "center" }}>Cargando...</p>;
  }

  if (!usuario || !correosAdmin.includes(usuario.email)) {
    return <Navigate to="/portada" replace />;
  }

  return children;
};

export default RutaAdmin;