import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Clase2ClasesRegalo() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen text-gray-800">
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

      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">2 clases de 4h al mes</h1>

      <img src="/img/2clasesregalo.jpg" alt="2 clases regalo" className="w-64 h-auto mb-4" />

      <p className="mb-4">
        Dos sesiones mensuales de 4 horas para aprender y experimentar con el torno o técnicas manuales. 
        Incluye todos los materiales, esmaltes y la cocción de tus piezas.
      </p>

      <p className="mt-6 text-orange-700 font-semibold">
        Para regalar esta clase,{" "}
        <Link to="/registro" className="underline">regístrate aquí</Link>.
      </p>
    </div>
  );
}
