import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservaBono2Clases() {
  const [fecha, setFecha] = useState("");
  const [plazas, setPlazas] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fecha, plazas });

    navigate("/resumen-pago", {
      state: {
        clase: "Bono 2 Clases",
        fecha,
        turno: "Flexible",
        metodo: "",
        precio: "70€",
        plazas,
      },
    });
  };

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6">
        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-6">
          Reserva – Bono 2 Clases
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fecha */}
          <div>
            <label htmlFor="fecha" className="block font-bold text-sm mb-1">
              Selecciona el día:
            </label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              min="2025-01-01"
              max="2025-12-31"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
              required
            />
          </div>

          {/* Turno flexible */}
          <div className="text-sm text-gray-600">
            El horario de tus clases será acordado directamente con el taller.
            <br />
            Recibirás un email o WhatsApp de confirmación.
          </div>

          {/* Plazas */}
          <div>
            <label htmlFor="plazas" className="block font-bold text-sm mb-1">
              ¿Cuántas plazas deseas reservar?
            </label>
            <input
              type="number"
              id="plazas"
              value={plazas}
              onChange={(e) => setPlazas(e.target.value)}
              min="1"
              max="8"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
              required
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold text-lg py-3 rounded-full transition"
          >
            Confirmar y pagar
          </button>
        </form>

        {/* Logo */}
        <div className="mt-8 text-center">
          <img src="/img/logoPCsin.png" alt="La Purísima Conchi" className="w-20 mx-auto" />
        </div>
      </div>
    </div>
  );
}

