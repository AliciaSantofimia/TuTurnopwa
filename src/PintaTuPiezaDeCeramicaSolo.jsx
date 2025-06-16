import React from "react";
import { Link } from "react-router-dom";

export default function PintaTuPiezaDeCeramicaSolo() {
  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Pinta tu pieza de cerámica</h1>
      <img
        src="/img/vasijapintarceramica.png"
        alt="Pinta tu pieza de cerámica"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="mb-4">
        Una actividad relajante y creativa donde puedes decorar una pieza de cerámica a tu gusto con esmaltes y engobes. Perfecta para todos los niveles, incluso si no tienes experiencia previa.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Disponible en varios espacios</li>
        <li>Turnos: 10:00 – 12:00, 12:00 – 14:00, 16:00 – 18:00 y 18:00 – 20:00</li>
        <li>Incluye materiales y cocción</li>
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
