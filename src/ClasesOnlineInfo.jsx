import React from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./BotonVolver";

export default function ClasesOnlineInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffef4] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <BotonVolver />

        <img
          src="/img/logoPCsin.png" 
          alt="Clases Online"
          className="w-28 h-28 object-contain mx-auto mb-6"
        />

        <h1 className="text-3xl font-serif text-[#a85d38] font-bold mb-4 text-center">
          Clases Online – La Purísima Conchi
        </h1>

        <p className="text-gray-700 mb-4">
          Conéctate desde casa y aprende cerámica en sesiones online en directo 
          impartidas por <strong>La Purísima Conchi</strong>. Perfecto para iniciarte, 
          aprender técnicas de decoración y esmaltado, o disfrutar de un taller creativo sin moverte de casa.
        </p>

        <div className="text-sm text-gray-700 mb-6">
          <strong>¿Qué necesitas?</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Ordenador o móvil con cámara y micrófono.</li>
            <li>Conexión a internet estable.</li>
            <li>Materiales sugeridos según la sesión (te enviaremos la lista).</li>
          </ul>
        </div>

        <div className="text-sm text-gray-700 mb-6">
          <strong>Formato</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Sesiones grupales en directo (Zoom/Meet).</li>
            <li>Duración habitual: 90–120 minutos.</li>
            <li>Precio: 25 € por sesión.</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/reserva-online")}
            className="bg-[#a85d38] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#8f4f2e] transition"
          >
            Reservar clase online
          </button>
        </div>
      </div>
    </div>
  );
}
