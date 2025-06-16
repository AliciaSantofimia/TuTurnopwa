import React from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function MensualBono4Clases() {
  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-sm w-full shadow-md rounded-2xl overflow-hidden">
        <img
          src="/img/cuatroclases.jpg"
          alt="Clase Bono 4 Clases"
          className="w-full h-[240px] object-cover object-center"
        />

        <div className="px-5 pt-4">
          <div className="flex justify-center gap-2 mb-4">
            <span className="bg-yellow-200 text-[#3b3025] font-bold text-sm px-4 py-1 rounded-full">
              79€ Modelado
            </span>
            <span className="bg-yellow-200 text-[#3b3025] font-bold text-sm px-4 py-1 rounded-full">
              +5€ Tornos por sesión
            </span>
          </div>

          <h2 className="text-center text-xl font-bold mb-1">MENSUAL BONO 4</h2>
          <p className="text-center text-sm text-gray-500 mb-4">
            4 sesiones de 3:00 horas
          </p>

          <div className="bg-yellow-100 border border-yellow-300 text-sm text-center font-bold p-3 rounded-xl mb-4">
            Ideal para quienes buscan formación continua y personalizada.
            <br />
            <span className="uppercase">sin necesidad de experiencia.</span>
          </div>

          <p className="text-sm mb-3">
            Este bono mensual incluye 4 sesiones donde podrás aprender a tu ritmo. Elige entre torno, modelado manual o combinar ambos según tus intereses.
          </p>

          <p className="text-sm mb-3">
            Aprenderás técnicas manuales antes y después del uso del torno, experimentarás con pintura cerámica y podrás crear piezas como cuencos, tazas, jarrones o platos.
          </p>

          <p className="text-sm mb-6">
            Tú decides qué técnica y qué pieza desarrollar en cada sesión. La formación es personalizada y se adapta a tus preferencias.
          </p>

          <BotonReserva destino="/reserva-bono-4-clases" />
        </div>
      </div>
    </PantallaConVolver>
  );
}