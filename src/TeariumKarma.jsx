import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeariumKarma() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffef4] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <img
          src="/img/pintarkarma.jpg"
          alt="Tearium y Karma"
          className="w-full h-60 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-serif text-[#a85d38] font-bold mb-4 text-center">
          Tearium & Karma by Tearium
        </h1>

        <p className="text-gray-700 text-base mb-4">
          Vive una experiencia única de pintura cerámica en cualquiera de nuestros dos espacios:
          el acogedor <strong>Tearium</strong> o nuestro nuevo local <strong>Karma by Tearium</strong>.
          Ambos están pensados para que desconectes, disfrutes del arte y compartas un rato relajante contigo mismo o
          con otras personas.
        </p>

        <p className="text-gray-700 text-base mb-4">
          Ponemos a tu disposición pinceles, pinturas, piezas de cerámica y todo el material necesario.
          No necesitas experiencia previa. Podrás elegir si pintar una taza, un cuenco o dejarte llevar.
          Además, tendrás la oportunidad de disfrutar de un ambiente tranquilo, buena música
          y la opción de tomar algo si te apetece.
        </p>

        <div className="text-sm text-gray-600 mb-6">
          <strong>Horarios y espacios:</strong>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Tearium:</strong> lunes, martes, jueves y sábado (mañana). Miércoles solo en horario de mañana.
            </li>
            <li>
              <strong>Karma by Tearium:</strong> lunes a viernes. Turnos de 10:00 a 12:00, 12:00 a 14:00 y 18:00 a 20:00.
            </li>
            <li>
              Precio por sesión: 25 €. Es necesario reservar previamente.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate("/reservatearium")}
            className="bg-[#a85d38] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#8f4f2e] transition"
          >
            Reservar en Tearium
          </button>
          <button
            onClick={() => navigate("/reservakarma")}
            className="bg-[#f1c40f] text-gray-800 px-6 py-3 rounded-xl text-lg hover:bg-[#d4ac0d] transition"
          >
            Reservar en Karma by Tearium
          </button>
        </div>
      </div>
    </div>
  );
}

