import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TornoIntensivoRegalo() {
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

      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Torno intensivo (1 día)</h1>
      <img
        src="/img/tornointensivoregalo.jpg"
        alt="Torno intensivo"
        className="w-64 h-auto mb-4"
      />
      <p className="mb-4">
        Una jornada completa centrada en el torno. Clase personalizada para vivir la cerámica en profundidad. Incluye todos los materiales y cocciones.
      </p>
      <p className="mt-6 text-orange-700 font-semibold">
        Para regalar esta clase,{" "}
        <Link to="/registro" className="underline">regístrate aquí</Link>.
      </p>
    </div>
  );
}

