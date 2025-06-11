import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResumenPagoTheClub() {
  const navigate = useNavigate();
  const location = useLocation();
  const datos = location.state || {};

  const handlePagar = () => {
    // En producción: aquí irá la redirección a Redsys o pasarela
    navigate("/perfil", {
      state: {
        mensaje: "✅ Reserva confirmada",
        ...datos,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#fffef4] p-6">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-serif text-[#5c3c00] mb-4 text-center">
          Resumen de tu reserva en The Club
        </h2>

        <div className="text-gray-800 text-base space-y-2 mb-6">
          <p><strong>Clase:</strong> {datos.clase}</p>
          <p><strong>Fecha:</strong> {datos.fecha}</p>
          <p><strong>Turno:</strong> {datos.turno}</p>
          <p><strong>Plazas:</strong> {datos.plazas}</p>
          <p><strong>Precio total:</strong> {Number(datos.plazas) * 25} €</p>
        </div>

        <button
          onClick={handlePagar}
          className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold py-3 rounded-full"
        >
          Ir al pago seguro
        </button>
      </div>
    </div>
  );
}
