import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResumenPagoTearium() {
  const location = useLocation();
  const navigate = useNavigate();

  const { fecha, turno, plazas, precioTotal } = location.state || {};

  const handleConfirmarPago = () => {
    // Más adelante redirigirá a Redsys
    navigate("/perfilusuario", {
      state: {
        mensaje: "✅ Tu reserva en Tearium ha sido registrada con éxito.",
      },
    });
  };

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 border border-yellow-200">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center font-serif">
          Resumen de tu reserva
        </h2>

        <p><strong>Lugar:</strong> Tearium</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Turno:</strong> {turno}</p>
        <p><strong>Número de plazas:</strong> {plazas}</p>
        <p className="mb-4"><strong>Precio total:</strong> {precioTotal} €</p>

        <p className="text-sm text-gray-600 mb-6">
          Podrás pintar una pieza de cerámica a tu elección. En Tearium tendrás todos los utensilios necesarios, y además podrás disfrutar de un té o café en un ambiente relajado. ¡Ideal para desconectar mientras creas algo bonito!
        </p>

        <button
          onClick={handleConfirmarPago}
          className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition"
        >
          Confirmar y pagar
        </button>
      </div>
    </div>
  );
}
