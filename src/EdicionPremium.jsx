import React from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function EdicionPremium() {
  return (
    <PantallaConVolver>
      <div className="bg-white text-gray-800 font-sans max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
        <img
          src="/img/edicionpremium.jpg"
          alt="Clase Edición Premium"
          className="w-full h-60 object-cover"
        />

        <div className="p-4">
          <p className="bg-yellow-400 text-white text-sm font-bold px-3 py-1 inline-block rounded-full mb-3">
            65€
          </p>

          <h2 className="text-xl font-bold text-center mb-1">EDICIÓN PREMIUM</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Taller único para crear sin límites
          </p>

          <div className="bg-yellow-100 border border-yellow-300 text-sm text-center px-4 py-2 rounded mb-4 font-bold">
            Ideal para quienes buscan una opción más personalizada,<br />
            <span className="uppercase">SIN NECESIDAD DE EXPERIENCIA PREVIA.</span>
          </div>

          <p className="text-sm mb-4">
            Crea tu pieza más completa desde cero. Modela, añade asas, tapas o piezas dobles, y decora con todos los colores y relieves que quieras. Es el taller más detallado y personal, con formación completa, materiales y esmaltado incluidos.
          </p>

          <p className="text-sm mb-6">
            ¡Ideal para quienes quieren ir un paso más allá!
          </p>

          <BotonReserva destino="/reserva-edicion-premium" />
        </div>
      </div>
    </PantallaConVolver>
  );
}

