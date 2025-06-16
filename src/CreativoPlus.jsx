import React from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreativoPlus() {
  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-sm w-full shadow-md rounded-2xl overflow-hidden">
        <img
          src="/img/creativoplus.jpg"
          alt="Clase Creativo Plus"
          className="w-full h-[240px] object-cover"
        />

        <div className="p-5">
          <div className="bg-yellow-400 text-white font-bold text-sm inline-block px-4 py-1 rounded-full mb-4">
            55€
          </div>

          <h2 className="text-center text-xl font-bold mb-1">CREATIVO PLUS</h2>
          <p className="text-center text-sm text-gray-500 mb-4">
            Taller único con detalles que marcan la diferencia
          </p>

          <div className="bg-yellow-100 border border-yellow-300 text-sm text-center font-bold p-3 rounded-xl mb-4">
            Ideal para quienes buscan una opción más creativa y utilitaria. <br />
            <span className="uppercase">sin necesidad de experiencia.</span>
          </div>

          <p className="text-sm mb-3">
            Crea tu pieza favorita en cerámica desde cero y haz posible ese diseño que tanto te gusta. Modela o tornea y decora una pieza básica con decoraciones sencillas y añade un elemento adicional como asas o paredes y decora con los colores que más te gusten para darle tu toque único.
          </p>

          <p className="text-sm mb-6">
            Incluye: formación completa, materiales y el proceso de esmaltado y cocción realizado por nuestro equipo. Si el tiempo lo permite, podrás realizar más de una pieza.
          </p>

          <BotonReserva destino="/reserva-creativo-plus" />
        </div>
      </div>
    </PantallaConVolver>
  );
}
