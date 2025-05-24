import React from "react";
import { useNavigate } from "react-router-dom";

export default function BasicoEsencial() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fdfaf5] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white text-[#333] font-sans max-w-sm w-full shadow-md rounded-2xl overflow-hidden relative">
        <img
          src="/img/basicoesencial1.jpg"
          alt="Clase Básico Esencial"
          className="w-full h-[240px] object-cover"
        />

        <div className="absolute top-4 right-4 bg-[#fde8d5] text-[#3b3025] font-bold text-sm px-4 py-1 rounded-full z-10">
          45€
        </div>

        <div className="p-5 pt-4">
          <h2 className="text-xl font-bold mb-1">BÁSICO ESENCIAL</h2>
          <p className="text-sm text-gray-500 mb-4">
            Taller único para crear sin complicaciones
          </p>

          <ul className="list-disc list-inside text-sm mb-4">
            <li>Forma base: modelado a mano o con torno alfarero</li>
            <li>
              Decoración sencilla: elige dos colores y decora con esponja o salpicado
            </li>
          </ul>

          <p className="text-sm mb-3">
            Aprende a crear cerámica desde cero. En este taller realizarás tu primera pieza a través de un diseño básico y personalizable. Puedes trabajar a mano o con torno, y darle color con técnicas fáciles y vistosas.
          </p>

          <p className="text-sm mb-6">
            Incluye todos los materiales, formación paso a paso, y el proceso de esmaltado y cocción realizado por nuestro equipo.
          </p>

          <button
            onClick={() => navigate("/reserva-basico-esencial")}
            className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold text-base py-3 rounded-full transition text-center"
          >
            RESERVAR ESTA CLASE
          </button>
        </div>
      </div>
    </div>
  );
}
