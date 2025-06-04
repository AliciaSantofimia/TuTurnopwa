import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dbRealtime } from "./firebase";
import { ref, get } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Menu from "./Menu.jsx";
import HistorialTarjetasRegalo from "./HistorialTarjetasRegalo.jsx";
import HistorialReservasUsuario from "./HistorialReservasUsuario.jsx";

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

        {/* Historial de tarjetas regalo */}
        <div className="mb-8">
          <HistorialTarjetasRegalo />
        </div>

        {/* Historial de reservas realizadas */}
        <div className="mb-8">
          <HistorialReservasUsuario />
        </div>

        {/* Enlaces legales */}
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





