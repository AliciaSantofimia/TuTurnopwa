import React from "react";
import { Link } from "react-router-dom";

export default function BasicoEsencialSolo() {
  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Básico Esencial</h1>
      <img
        src="/img/vasijabasicoesencial.png"
        alt="Básico Esencial"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="mb-2">
        Esta clase está pensada para iniciarte en la cerámica. En 3 horas aprenderás las técnicas básicas para crear tu propia pieza a mano o al torno.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Martes, miércoles, jueves y sábados</li>
        <li>Turnos: 12:00 – 15:00 y 18:00 – 21:00</li>
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
