import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./BotonVolver";

export default function ComprarTarjetaRegalo() {
  const navigate = useNavigate();

  const [importe, setImporte] = useState("25");
  const [nombreRegalado, setNombreRegalado] = useState("");
  const [nombreComprador, setNombreComprador] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleContinuar = () => {
    const precio = Number(importe);

    if (!precio || precio <= 0) {
      alert("Selecciona un importe válido.");
      return;
    }

    navigate("/resumen-pago", {
  state: {
    tipo: "tarjeta_regalo",
    clase: "Tarjeta regalo",
    precio,
    precioBase: precio,
    precioTotal: precio,
    importe,
    desdeCompraTarjeta: true,
    nombreRegalado,
    nombreComprador,
    mensaje,
  },
});
  };

  return (
    <div className="bg-[#fffef4] min-h-screen px-4 py-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <BotonVolver />

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-900 font-serif mb-2">
            Comprar tarjeta regalo
          </h1>
          <p className="text-sm text-gray-600">
            Elige el importe de la tarjeta y añade los datos opcionales del regalo.
          </p>
        </div>

        <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-4 mb-5 text-sm text-[#5c3c00]">
          <p className="mb-2">
            <strong>La tarjeta regalo es válida para cualquier taller.</strong>
          </p>
          <p>
            La persona que la reciba podrá canjear el código más adelante y elegir
            fecha y taller según disponibilidad.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block font-bold text-sm mb-2">
              Selecciona el importe
            </label>
            <select
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            >
              <option value="25">25 €</option>
              <option value="35">35 €</option>
              <option value="55">55 €</option>
              <option value="60">60 €</option>
              <option value="79">79 €</option>
              <option value="99">99 €</option>
              <option value="120">120 €</option>
              <option value="145">145 €</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">
              Nombre de la persona que recibe el regalo
            </label>
            <input
              type="text"
              value={nombreRegalado}
              onChange={(e) => setNombreRegalado(e.target.value)}
              placeholder="Ej. María"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">
              Tu nombre
            </label>
            <input
              type="text"
              value={nombreComprador}
              onChange={(e) => setNombreComprador(e.target.value)}
              placeholder="Ej. Alicia"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">
              Mensaje personalizado
            </label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe un mensaje bonito para incluir en la tarjeta..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            />
          </div>

          <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-4 text-sm text-[#5c3c00]">
            <p>
              <strong>Importe seleccionado:</strong> {importe} €
            </p>
            <p className="mt-1">
              Después del pago podrás generar o asociar el código de la tarjeta regalo.
            </p>
          </div>

          <button
            type="button"
            onClick={handleContinuar}
            className="w-full mt-2 px-6 py-3 rounded-full text-white font-semibold
            bg-gradient-to-b from-[#F6D66A] to-[#F4C542]
            shadow-md hover:shadow-lg
            hover:from-[#F4C542] hover:to-[#E5B92F]
            transition-all duration-200"
          >
            Continuar al pago
          </button>
        </div>
      </div>
    </div>
  );
}