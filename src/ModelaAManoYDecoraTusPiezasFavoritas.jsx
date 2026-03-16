import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function ModelaAManoYDecoraTusPiezasFavoritas() {
  const imagenes = [
    "/img/modelamano/modelamano1.jpg",
    "/img/modelamano/modelamano2.jpg",
    "/img/modelamano/modelamano3.jpg",
    "/img/modelamano/modelamano4.jpg",
    "/img/modelamano/modelamano5.jpg",
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [convertirTorno, setConvertirTorno] = useState(false);

  const precioBase = 79;
  const extraTorno = 10;
  const precioFinal = convertirTorno ? precioBase + extraTorno : precioBase;

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* IMÁGENES */}
          <div className="p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="w-full rounded-2xl overflow-hidden bg-[#f8f8f8] flex items-center justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[420px]"
            >
              <img
                src={imagenActiva}
                alt="Modela a mano y decora tus piezas favoritas"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </button>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {imagenes.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setImagenActiva(img)}
                  className={`shrink-0 rounded-xl overflow-hidden border-2 w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] ${
                    imagenActiva === img
                      ? "border-[#F4C542]"
                      : "border-[#f1e7c6]"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Toca la imagen para verla en grande
            </p>
          </div>

          {/* TEXTO */}
          <div className="p-4 sm:p-6 flex flex-col justify-start min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2 uppercase leading-tight break-words">
              Modela a mano y decora tus piezas favoritas
            </h1>

            <p className="text-base text-[#6b3700] font-medium mb-1 leading-relaxed break-words">
              4 clases de 3 horas al mes
            </p>

            <p className="text-lg sm:text-xl font-semibold text-[#6b3700] mb-4 leading-relaxed break-words">
              {precioFinal},00 €
            </p>

            {/* OPCIÓN TORNO */}
            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-4 mb-5">
              <p className="text-sm font-semibold text-[#5c3c00] mb-2">
                Si quieres, convierte una de tus clases de modelado en una de torno alfarero
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setConvertirTorno(true)}
                  className={`w-full text-left rounded-xl border px-4 py-3 text-sm ${
                    convertirTorno
                      ? "border-[#F4C542] bg-[#fff7da]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  SÍ QUIERO 🏺 (+10,00 €)
                </button>

                <button
                  type="button"
                  onClick={() => setConvertirTorno(false)}
                  className={`w-full text-left rounded-xl border px-4 py-3 text-sm ${
                    !convertirTorno
                      ? "border-[#F4C542] bg-[#fff7da]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  En otra ocasión 😊
                </button>
              </div>
            </div>

            {/* INFO */}
            <div className="mb-5 min-w-0">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              

              <p className="text-sm text-gray-700 mb-3 leading-relaxed break-words">
                Descubre el proceso completo de la cerámica sin torno con este
                <strong> bono formativo de modelado manual y decoración</strong>,
                donde aprenderás a dar forma, textura y color a tus propias
                piezas desde cero.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                En esta formación trabajarás exclusivamente con modelado a mano,
                explorando distintas técnicas tradicionales para crear piezas
                únicas: tazas, cuencos, bandejas, jarrones o elementos
                decorativos.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Después pasarás a la fase de decoración con engobes y esmaltes,
                experimentando con color, textura y diferentes acabados para
                personalizar tus creaciones.
              </p>
            </div>

            {/* POLÍTICA */}
            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2 leading-relaxed break-words">
                <strong>Política de venta:</strong> Los bonos son válidos por 3
                meses desde la fecha de compra. Si las tarifas cambian, deberás
                abonar la diferencia o elegir otro equivalente más alto.
              </p>

              <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                <strong>Antes de reservar:</strong> por favor revisa nuestra
                Política de Reservas. Al proceder con la reserva, confirmas que
                has leído y aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva
                destino="/reserva-modela-a-mano-y-decora-tus-piezas-favoritas"
                state={{
                  convertirTorno,
                  precioFinal,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL IMAGEN */}
      {modalAbierto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="relative w-full max-w-4xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-2 right-2 bg-white text-black rounded-full w-10 h-10 text-xl font-bold shadow"
            >
              ×
            </button>

            <img
              src={imagenActiva}
              alt="Imagen ampliada"
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </PantallaConVolver>
  );
}