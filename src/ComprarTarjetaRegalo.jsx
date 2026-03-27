import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./BotonVolver";
import { OPCIONES_TARJETA_REGALO } from "./opcionesTarjetaRegalo";

export default function ComprarTarjetaRegalo() {
  const navigate = useNavigate();

  const [opcionSeleccionadaId, setOpcionSeleccionadaId] = useState("");
  const [nombreRegalado, setNombreRegalado] = useState("");
  const [nombreComprador, setNombreComprador] = useState("");
  const [mensaje, setMensaje] = useState("");

  const opcionSeleccionada = OPCIONES_TARJETA_REGALO.find(
    (op) => op.id === opcionSeleccionadaId
  );

  const handleContinuar = () => {
    if (!opcionSeleccionada) {
      alert("Selecciona una opción válida para regalar.");
      return;
    }

    navigate("/resumen-pago", {
      state: {
        tipo: "tarjeta_regalo",
        desdeCompraTarjeta: true,

        clase: opcionSeleccionada.clase,
        claseId: opcionSeleccionada.claseId,
        subtipo: opcionSeleccionada.subtipo || "",
        tipoPieza: opcionSeleccionada.tipoPieza || "",
        tipoTaller: opcionSeleccionada.tipoTaller || "",
        rutaReserva: opcionSeleccionada.rutaReserva || "",
        requiereMetodo: opcionSeleccionada.requiereMetodo || false,
        requiereTipoPieza: opcionSeleccionada.requiereTipoPieza || false,

        precio: opcionSeleccionada.precio,
        precioBase: opcionSeleccionada.precio,
        precioTotal: opcionSeleccionada.precio,
        plazas: 1,

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
            Elige el taller o experiencia que quieres regalar.
          </p>
        </div>

        <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-4 mb-5 text-sm text-[#5c3c00]">
          <p className="mb-2">
            <strong>La tarjeta regalo será válida solo para la opción elegida.</strong>
          </p>
          <p>
            La persona que la reciba podrá canjear el código más adelante y reservar
            su fecha para ese taller concreto.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block font-bold text-sm mb-2">
              Selecciona el taller o regalo
            </label>
            <select
              value={opcionSeleccionadaId}
              onChange={(e) => setOpcionSeleccionadaId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            >
              <option value="">-- Elige una opción --</option>
              {OPCIONES_TARJETA_REGALO.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>
                  {opcion.label}
                </option>
              ))}
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

          {opcionSeleccionada && (
            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-4 text-sm text-[#5c3c00]">
              <p>
                <strong>Regalo seleccionado:</strong> {opcionSeleccionada.clase}
              </p>

              {opcionSeleccionada.subtipo && (
                <p className="mt-1">
                  <strong>Opción:</strong> {opcionSeleccionada.subtipo}
                </p>
              )}

              <p className="mt-1">
                <strong>Precio:</strong> {opcionSeleccionada.precio} €
              </p>
            </div>
          )}

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