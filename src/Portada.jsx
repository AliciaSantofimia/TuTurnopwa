import React from "react";
import { useNavigate } from "react-router-dom";

export default function Portada() {
  const navigate = useNavigate();

  return (
    // Ocupa todo el ancho y alto; fondo uniforme
    <div className="bg-[#fdfaf5] min-h-screen flex w-full">
      {/* Wrapper que centra el contenido en toda la pantalla */}
      <main className="flex-1 flex items-center justify-center px-4">
        {/* Columna centrada con ancho máximo legible */}
        <div className="w-full max-w-3xl text-center">
          <img
            src="/img/logoPCsin.png"
            alt="La Purísima Conchi"
            className="w-40 sm:w-48 md:w-56 lg:w-64 mx-auto mb-8"
          />

          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800">
            Hazte un hueco. <br /> Y una taza.
          </h1>

        <p className="text-lg text-gray-700 mt-4 mb-3">
  Reserva tu clase o sorprende con una tarjeta regalo
</p>

<p className="text-sm text-gray-600 mb-8">
  Regístrate o inicia sesión para empezar.
</p>

          {/* Botones principales */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto justify-center">
            <button
              className="w-full sm:w-auto bg-[#b36a4a] hover:bg-[#9e5c3f] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md transition"
              onClick={() => navigate("/registro")}
            >
              Registrarse
            </button>

            <button
              className="w-full sm:w-auto border border-[#b36a4a] text-[#b36a4a] hover:bg-[#f9ece6] text-lg font-semibold px-6 py-3 rounded-lg transition"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </button>
          </div>

          <button
            className="text-sm text-gray-700 underline"
            onClick={() => navigate("/clases-solo")}
          >
            Ver clases sin registrarse
          </button>
        </div>
      </main>
    </div>
  );
}

