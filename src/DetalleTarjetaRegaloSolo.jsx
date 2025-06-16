import React from "react";
import { Link } from "react-router-dom";

export default function DetalleTarjetaRegaloSolo() {
  return (
    <div className="p-6 bg-[#fffef4] min-h-screen text-gray-800">
      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">¿Cómo funcionan las tarjetas regalo?</h1>

      <p className="mb-4">
        Las tarjetas regalo permiten regalar una experiencia creativa en nuestro taller. Puedes elegir entre diferentes tipos de clase, cada una con su precio y duración. El destinatario recibirá un código para canjear en el momento que prefiera.
      </p>

      <ul className="list-disc ml-6 mb-4">
        <li>Se paga online y se genera un código único</li>
        <li>No caduca, y se puede usar cuando el taller tenga disponibilidad</li>
        <li>Perfecto para regalar arte, calma y tiempo de calidad</li>
      </ul>

      <p className="mt-6 text-orange-700 font-semibold">
        Para regalar una clase,{" "}
        <Link to="/registro" className="underline">
          regístrate aquí
        </Link>.
      </p>
    </div>
  );
}
