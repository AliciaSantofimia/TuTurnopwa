import React from "react";
import { useNavigate } from "react-router-dom";

export default function FundamentalMini() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fdfaf5] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white text-[#333] font-sans max-w-sm w-full shadow-md rounded-2xl overflow-hidden relative">
        <img
          src="/img/fundamentalmini.jpg"
          alt="Clase Fundamental Mini"
          className="w-full h-[260px] object-cover object-center"
        />

        <div className="absolute top-3 left-4 bg-[#fde68a] text-[#3b3025] font-bold text-sm px-4 py-1 rounded-full z-10">
          35€
        </div>

        <div className="p-5 pt-2">
          <h2 className="text-center text-xl font-bold mb-1">FUNDAMENTAL MINI</h2>
          <p className="text-center text-sm text-gray-500 mb-4">
            Taller único para crear en pequeño formato
          </p>

          <div className="bg-yellow-100 border border-yellow-300 text-sm text-center font-bold p-3 rounded-xl mb-4">
            Ideal para quienes quieren realizar{" "}
            <strong>piezas pequeñas con gran personalidad</strong>.<br />
            También para quienes desean empezar a crear su{" "}
            <span className="uppercase">propia marca</span>.<br />
            <span className="uppercase">sin necesidad de experiencia.</span>
          </div>

          <p className="text-sm mb-3">
            Aprende cerámica creando piezas pequeñas como joyería, utensilios, mini esculturas o accesorios. Explora formas, texturas y colores paso a paso, con materiales incluidos y un ritmo relajado.
          </p>

          <p className="text-sm mb-6">
            Ideal si buscas una experiencia accesible y creativa. También puedes pedir asesoramiento para enfocar tus piezas hacia una línea de marca o proyecto personal.
          </p>

          <button
            onClick={() => navigate("/reserva-fundamental-mini")}
            className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold text-base py-3 rounded-full transition text-center"
          >
            RESERVAR AHORA
          </button>
        </div>
      </div>
    </div>
  );
}
