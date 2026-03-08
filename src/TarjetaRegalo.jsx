import React from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./BotonVolver";

export default function TarjetaRegalo() {
  const navigate = useNavigate();

  return (
    <div className="p-5 bg-[#fffef4] min-h-screen font-sans">
      <BotonVolver />

      <div className="flex flex-col md:flex-row items-center mb-7">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mb-4 md:mb-0 md:mr-4"
        />

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 font-serif">
            Tarjeta regalo
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Válida para cualquier taller. El destinatario elige fecha y taller
            cuando quiera.
          </p>
        </div>
      </div>

      {/* BLOQUE A: INFO */}
      <div className="rounded-2xl bg-white p-5 border border-[#f1e7c6] border-l-8 border-[#F4C542] shadow-lg hover:shadow-xl hover:scale-[1.015] transition mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          ¿Cómo regalar un taller de cerámica?
        </h2>

        <ol className="text-sm text-gray-700 list-decimal ml-5 space-y-2">
          <li>Compra la tarjeta regalo.</li>
          <li>
            Recibirás un comprobante con un <b>código</b> (número de pedido).
          </li>
          <li>
            Entrega el código a la persona que recibe el regalo.
          </li>
          <li>
            La persona canjea el código en la app y reserva su plaza cuando
            quiera.
          </li>
        </ol>

        <p className="text-sm text-gray-600 mt-4">
          <b>Importante:</b> La tarjeta regalo sirve para <b>cualquier taller</b>.
        </p>
      </div>

      {/* BLOQUE B: COMPRAR */}
      <div className="rounded-2xl bg-white p-5 border border-[#f1e7c6] border-l-8 border-[#F4C542] shadow-lg hover:shadow-xl hover:scale-[1.015] transition mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Comprar tarjeta regalo
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Compra la tarjeta regalo y recibirás el código por email.
        </p>

        <button
          className="mt-4 px-6 py-2.5 rounded-full text-white font-semibold bg-gradient-to-b from-[#F6D66A] to-[#F4C542] shadow-md hover:shadow-lg hover:from-[#F4C542] hover:to-[#E5B92F] transition-all duration-200"
          onClick={() => navigate("/comprar-tarjeta-regalo")}
        >
          Comprar tarjeta regalo
        </button>
      </div>

      {/* BLOQUE C: CANJEAR */}
      <div className="rounded-2xl bg-white p-5 border border-[#f1e7c6] border-l-8 border-[#F4C542] shadow-lg hover:shadow-xl hover:scale-[1.015] transition">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          ¿Tienes un código?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Canjea tu tarjeta regalo para poder reservar tu taller.
        </p>

        <button
          className="mt-4 px-6 py-2.5 rounded-full text-white font-semibold bg-gradient-to-b from-[#F6D66A] to-[#F4C542] shadow-md hover:shadow-lg hover:from-[#F4C542] hover:to-[#E5B92F] transition-all duration-200"
          onClick={() => navigate("/canjear-tarjeta-regalo")}
        >
          Canjear código
        </button>
      </div>
    </div>
  );
}