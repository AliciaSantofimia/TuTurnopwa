import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dbRealtime } from "./firebase";
import { ref, get } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Menu from "./Menu.jsx";
import HistorialTarjetasRegalo from "./HistorialTarjetasRegalo.jsx";
import HistorialReservasUsuario from "./HistorialReservasUsuario.jsx";

// Componente para mostrar avisos
const AvisosUsuario = () => {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const avisosRef = ref(dbRealtime, `usuarios/${user.uid}/avisos`);
    get(avisosRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const lista = Object.values(data);
        // Ordena por fecha descendente si lo deseas
        setAvisos(lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
      }
    });
  }, []);

  if (avisos.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2 text-red-700">📢 Avisos recibidos</h2>
      <ul className="text-sm">
        {avisos.map((aviso, index) => (
          <li
            key={index}
            className="mb-2 bg-red-50 p-2 rounded-lg border border-red-200"
          >
            <strong>{new Date(aviso.fecha).toLocaleDateString("es-ES")}:</strong> {aviso.mensaje}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PerfilUsuario() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        const userRef = ref(dbRealtime, "usuarios/" + user.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setNombre(snapshot.val().nombre);
            }
          })
          .catch((error) => {
            console.error("Error al obtener datos del perfil:", error);
          });
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6 text-[#333]">
        <h1 className="text-center text-[1.6rem] text-[#3b3025] font-semibold mb-6">
          Perfil de Usuario
        </h1>

        <div className="mb-6">
          <p className="mb-1 text-sm">
            <strong>Nombre:</strong> {nombre}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {email}
          </p>
        </div>

        <div className="flex justify-between gap-3 mb-6">
          <button
            className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 rounded-xl text-sm"
            onClick={() => navigate("/editar-perfil")}
          >
            Editar perfil
          </button>
          <button
            className="flex-1 bg-red-400 hover:bg-red-500 text-white font-bold py-2 rounded-xl text-sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Avisos */}
        <AvisosUsuario />

        {/* Historial */}
        <div className="mb-8">
          <HistorialTarjetasRegalo />
        </div>

        <div className="mb-8">
          <HistorialReservasUsuario />
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/politica-privacidad")}
            className="text-sm text-red-500 underline hover:text-red-700 transition"
          >
            Ver Política de Privacidad
          </button>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => navigate("/condiciones-pago")}
            className="text-sm text-red-500 underline hover:text-red-700 transition"
          >
            Ver Condiciones del Servicio de Pago
          </button>
        </div>

        <div style={{ marginTop: "40px" }}>
          <Menu />
        </div>
      </div>
    </div>
  );
}
