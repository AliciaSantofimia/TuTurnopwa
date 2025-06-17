import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreaTuPiezaFavoritaRegalo() {
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

      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">
        Crea tu pieza favorita
      </h1>

      <img
        src="/img/creatupiezafavoritaregalo.jpg"
        alt="Crear pieza"
        className="w-64 h-auto mb-4"
      />

      <p className="mb-4">
        Una clase de 3 horas para modelar y decorar tu propia pieza desde cero.
        Es ideal para iniciarte en el mundo de la cerámica, tanto con torno como con técnicas manuales.
      </p>

      <p className="mt-6 text-orange-700 font-semibold">
        Para regalar esta clase,{" "}
        <Link to="/registro" className="underline">regístrate aquí</Link>.
      </p>
    </div>
  );
}
