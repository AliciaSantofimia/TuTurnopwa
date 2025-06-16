import React from "react";
import { Link } from "react-router-dom";

export default function CreativoPlus() {
  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Creativo Plus</h1>
      <img
        src="/img/vasijacreativoplus.png"
        alt="Creativo Plus"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="mb-4">
        Una clase para dar rienda suelta a tu creatividad. Aprenderás técnicas variadas mientras creas tus propias piezas con estilo personal.
        Es perfecta si quieres avanzar a tu ritmo y experimentar.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>De martes a viernes</li>
        <li>Turnos: 11:00 – 15:00 (mañana) y 17:00 – 20:00 (tarde)</li>
        <li>Incluye uso del torno o modelado a mano</li>
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
