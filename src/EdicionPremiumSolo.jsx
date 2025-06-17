import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EdicionPremium() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <button
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/menu");
          }
        }}
        className="text-sm text-blue-600 underline mb-4"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Edición Premium</h1>
      <img
        src="/img/vasijaedicionpremium.png"
        alt="Edición Premium"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="mb-4">
        La experiencia más completa del taller. Disfruta de una clase intensiva de 5 horas donde podrás desarrollar piezas más elaboradas, con acompañamiento continuo y un ambiente tranquilo.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Martes, miércoles, jueves y sábados</li>
        <li>Turnos: 10:00 – 15:00 (mañana) y 16:00 – 21:00 (tarde)</li>
        <li>Se activa con grupo mínimo</li>
      </ul>

      <p className="mt-6 text-orange-700 font-semibold">
        Para reservar esta clase,{" "}
        <Link to="/registro" className="underline">
          regístrate aquí
        </Link>.
      </p>
    </div>
  );
}

