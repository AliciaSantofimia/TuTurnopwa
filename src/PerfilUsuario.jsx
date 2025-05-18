import React from "react";
import { useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí iría la lógica de cerrar sesión (por ejemplo, con Firebase)
    console.log("Cerrar sesión");
    // navigate("/"); // Si quieres redirigir tras logout
  };

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6 text-[#333]">
        <h1 className="text-center text-[1.6rem] text-[#3b3025] font-semibold mb-6">
          Perfil de Usuario
        </h1>

        <div className="mb-6">
          <p className="mb-1 text-sm">
            <strong>Nombre:</strong> Alicia
          </p>
          <p className="text-sm">
            <strong>Email:</strong> alicia@example.com
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

        <div className="mb-6">
          <h2 className="text-[#6b3700] text-sm font-semibold mb-2">
            Reservas activas
          </h2>
          <div className="bg-[#f9f5ef] rounded-lg px-3 py-2 mb-2 text-sm">
            Edición Premium - 15/07/2025 - 10:00
          </div>
          <div className="bg-[#f9f5ef] rounded-lg px-3 py-2 mb-2 text-sm">
            Pintar cerámica - 20/07/2025 - 12:00
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-[#6b3700] text-sm font-semibold mb-2">
            Historial de reservas
          </h2>
          <div className="bg-[#f9f5ef] rounded-lg px-3 py-2 mb-2 text-sm">
            Creativo Plus - 10/04/2025
          </div>
          <div className="bg-[#f9f5ef] rounded-lg px-3 py-2 mb-2 text-sm">
            Torno intensivo - 22/03/2025
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-[#6b3700] text-sm font-semibold mb-2">
            Bonos y tarjetas regalo
          </h2>
          <div className="bg-[#f9f5ef] rounded-lg px-3 py-2 mb-2 text-sm">
            Bono 4 clases - Usadas: 2 / 4
          </div>
          <div className="bg-[#f9f5ef] rounded-lg px-3 py-2 mb-2 text-sm">
            Tarjeta regalo: Crea tu pieza favorita
          </div>
        </div>

        <div>
          <h2 className="text-[#6b3700] text-sm font-semibold mb-2">
            Notificaciones
          </h2>
          <div className="bg-[#f9f5ef] rounded-lg px-3 py-2 text-sm">
            ¡Te quedan 2 clases por usar este mes!
          </div>
        </div>
      </div>
    </div>
  );
}
