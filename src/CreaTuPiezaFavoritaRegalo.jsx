import React from "react";
import { Link } from "react-router-dom";

export default function CreaTuPiezaFavoritaRegalo() {
  return (
    <div className="p-6 bg-[#fffef4] min-h-screen text-gray-800">
      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Crea tu pieza favorita</h1>
      <img src="/img/tarjetacreapiezafavorita.jpg" alt="Crear pieza" className="w-64 h-auto mb-4" />
      <p className="mb-4">
        Clase de 3 horas para modelar y decorar tu pieza desde cero. Ideal para una primera experiencia con torno o técnicas manuales.
      </p>
      <p className="mt-6 text-orange-700 font-semibold">
        Para regalar esta clase,{" "}
        <Link to="/registro" className="underline">regístrate aquí</Link>.
      </p>
    </div>
  );
}
