import React from "react";
import { useNavigate } from "react-router-dom";

export default function Portada() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fdfaf5] min-h-screen flex flex-col items-center justify-center text-center px-4">
      <img
        src="/img/logoPCsin.png"
        alt="La Purísima Conchi"
        className="w-48 mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800">
        Hazte un hueco. <br /> Y una taza.
      </h1>

      <p className="text-lg text-gray-700 mt-4 mb-8">
        Reserva tu clase de cerámica
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          className="bg-[#b36a4a] hover:bg-[#9e5c3f] text-white text-lg font-semibold px-6 py-3 rounded-lg"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>
        <button
          className="bg-[#b36a4a] hover:bg-[#9e5c3f] text-white text-lg font-semibold px-6 py-3 rounded-lg"
          onClick={() => navigate("/registro")}
        >
          Registrarse
        </button>
      </div>

      <button
        className="text-sm text-gray-700 underline mb-12"
        onClick={() => navigate("/clases")}
      >
        Ver clases sin registrarse
      </button>

      <p className="text-sm text-gray-500">
        Desarrollado con <span className="text-blue-600">♥</span> por{" "}
        <a
          href="https://tuturnoapp.es"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-700"
        >
          TuTurnoapp.es
        </a>
      </p>
    </div>
  );
}
