import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function EspecialPintaTuPieza() {
  const imagenes = [
    "/img/especialpinta/pintatupiezaespecial1.jpg",
    "/img/especialpinta/pintatupiezaespecial2.jpg",
    "/img/especialpinta/pintatupiezaespecial3.jpg",
    "/img/especialpinta/pintatupiezaespecial4.jpg",
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

          {/* GALERÍA */}
          <div className="p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="w-full rounded-2xl overflow-hidden bg-[#f8f8f8] flex items-center justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[420px]"
            >
              <img
                src={imagenActiva}
                alt="Especial pinta tu pieza de cerámica"
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
              Especial pinta tu pieza de cerámica
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#6b3700] mb-4 leading-relaxed break-words">
              35,00 €
            </p>

            <div className="mb-5 min-w-0">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                  <strong>Antes de reservar tu plaza:</strong> por favor revisa
                  nuestra Política de Reservas. Al proceder con la reserva,
                  confirmas que has leído y aceptado los términos.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3 leading-relaxed break-words">
                En nuestro taller de cerámica encontrarás una amplia variedad de
                piezas, colores y herramientas de la mejor calidad para pintar
                tu bizcocho.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                No necesitas experiencia; nuestro equipo te guiará a través de
                todo el proceso.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Disfruta mientras fluyes con el color, diviértete en un espacio
                creativo y acogedor.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Reserva tu espacio y tendrás hasta <strong>dos horas y media</strong> para
                desatar tu creatividad.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Solo necesitas ganas de pintar y pasar un buen rato.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                  El precio base para pintar una pieza blanca de cerámica en
                  nuestro taller es de 25€. Puedes elegir entre una amplia
                  variedad de piezas: tazas, jarras, cuencos, platos y
                  bandejas, de distintos tamaños y formas. Si prefieres
                  combinar dos pequeñas o cambiar a una de mayor valor, solo
                  tendrás que abonar la diferencia.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Ven y escoge la pieza que más te guste para dar rienda suelta a
                tu creatividad.
              </p>

              <p className="text-sm text-gray-700 leading-relaxed break-words">
                ¡Te esperamos!
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2 leading-relaxed break-words">
                <strong>Nota importante:</strong> Las tarifas están sujetas a
                cambios. Si no asististe a tu curso o bono en la fecha original
                y deseas reprogramarlo cuando las tarifas hayan cambiado,
                deberás abonar la diferencia o elegir un taller acorde a la
                cantidad ya pagada.
              </p>

              <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                Antes de reservar, por favor revisa nuestra Política de
                Reservas. Al proceder con la reserva, confirmas que has leído y
                aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-especial-pinta-tu-pieza" />
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
              type="button"
              onClick={() => setModalAbierto(false)}
              className="absolute top-2 right-2 bg-white text-black rounded-full w-10 h-10 text-xl font-bold shadow"
            >
              ×
            </button>

            <img
              src={imagenActiva}
              alt="Especial pinta tu pieza ampliada"
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </PantallaConVolver>
  );
}