import React from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function MensualBono2Clases() {
  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-sm w-full shadow-md rounded-2xl overflow-hidden relative">
        <img
          src="/img/bono2clases.jpg"
          alt="Clase Bono 2 Clases"
          className="w-full h-[300px] object-cover object-center"
        />

        <div className="absolute top-3 left-5 bg-[#d1f6d8] text-[#3b3025] font-bold text-sm px-4 py-1 rounded-full z-10">
          70€
        </div>

        <div className="p-5 pt-2">
          <h2 className="text-center text-xl font-bold mb-1">MENSUAL BONO 2</h2>
          <p className="text-center text-sm text-gray-500 mb-4">
            2 sesiones de 4:00 horas
          </p>

          <p className="text-sm mb-3">
            Bono ideal para quienes quieren seguir aprendiendo a su ritmo con más flexibilidad. Pensado tanto para personas nuevas como para quienes ya han asistido a clases previas.
          </p>

          <p className="text-sm mb-6">
            Aprenderás técnicas aplicadas antes y después del uso del torno, trabajarás modelado manual o podrás profundizar en decoraciones con pinturas cerámicas.
          </p>

          <BotonReserva destino="/reserva-bono-2-clases" />
        </div>
      </div>
    </PantallaConVolver>
  );
}



