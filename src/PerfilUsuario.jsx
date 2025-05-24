import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { ref, get } from "firebase/database";
import { signOut } from "firebase/auth";
import Menu from "./Menu.jsx";


export default function PerfilUsuario() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      const userRef = ref(db, "usuarios/" + user.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setNombre(snapshot.val().nombre);
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos del perfil:", error);
        });
    }
  }, []);

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
        <div style={{ marginTop: "40px" }}>
  <Menu />
</div>

        {/* Aquí seguiría el resto de tus reservas, historial, etc. */}
      </div>
    </div>
  );
}


