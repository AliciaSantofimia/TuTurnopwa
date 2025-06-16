import React from "react";
import { Link } from "react-router-dom";

export default function ExpresContinuo() {
  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Exprés Continuo</h1>
      <img
        src="/img/vasijaexprescontinuo.png"
        alt="Exprés Continuo"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="mb-4">
        Una opción libre y sin compromiso. Ven cuando quieras, elige la clase que más te apetezca y paga por sesión. Perfecta para quienes no pueden comprometerse con horarios fijos pero quieren seguir creando.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Tú eliges el ritmo</li>
        <li>Clases sueltas, personalizadas</li>
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
