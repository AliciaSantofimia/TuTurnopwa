import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Karma() {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-[#fffef4] min-h-screen font-sans">
      <div className="flex flex-col md:flex-row items-center mb-6">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mb-4 md:mb-0 md:mr-4"
        />
        <h1 className="text-3xl font-bold text-yellow-900 font-serif text-center md:text-left">
          Pinta tu pieza en Karma by Tearium
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src="/img/pintarkarma.jpg"
          alt="Pinta en Karma"
          className="w-full md:w-1/2 rounded-xl shadow-md"
        />
        <div className="text-gray-800 md:w-1/2 text-lg">
          <p className="mb-4">
            Vive una experiencia creativa y relajante en <strong>Karma by Tearium</strong>,
            donde podrás elegir entre diferentes piezas de cerámica para pintar a tu
            gusto. Dispondrás de todos los utensilios necesarios para dar rienda
            suelta a tu imaginación, mientras disfrutas de un café o un té en un
            ambiente acogedor.
          </p>
          <p className="mb-4">
            Todo está preparado para que te sientas como en casa. Elige el día y turno
            disponibles y ven a disfrutar de una actividad distinta.
          </p>
          <p className="font-semibold">Precio por persona: 25€</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-4 bg-[#b36a4a] hover:bg-[#9e5c3f] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md"
          onClick={() => navigate("/reservakarma")}
        >
          Reservar ahora
        </button>
      </div>

      <Footer />
    </div>
  );
}
