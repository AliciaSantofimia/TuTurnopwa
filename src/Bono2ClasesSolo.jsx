import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Bono2Clases() {
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

      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Bono 2 Clases</h1>

      <img
        src="/img/vasijabono2.png"
        alt="Bono 2 Clases"
        className="w-48 h-48 object-contain mb-4"
      />

      <p className="mb-4">
        Este bono te permite disfrutar de dos clases de cerámica de 3 horas cada una.
        Tú eliges en qué clases utilizarlo, según la disponibilidad.
      </p>

      <ul className="list-disc ml-6 mb-4">
        <li>Horario flexible (según clase elegida)</li>
        <li>Ideal para regalar o iniciarte poco a poco</li>
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

