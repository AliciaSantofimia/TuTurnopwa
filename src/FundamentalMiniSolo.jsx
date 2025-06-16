import React from "react";
import { Link } from "react-router-dom";

export default function FundamentalMiniSolo() {
  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Fundamental Mini</h1>
      <img
        src="/img/vasijafundamentalmini.png"
        alt="Fundamental Mini"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="mb-4">
        Clase ideal para probar el barro en un formato corto. Aprende técnicas básicas de modelado con resultados bonitos y rápidos.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Turnos: 12–14, 10–12, 16–18, 18–20</li>
        <li>Disponible de martes a sábado</li>
        <li>Incluye materiales y cocción</li>
      </ul>

      <p className="mt-6 text-orange-700 font-semibold">
        Para reservar esta clase,{" "}
        <Link to="/registro" className="underline">regístrate aquí</Link>.
      </p>
    </div>
  );
}
