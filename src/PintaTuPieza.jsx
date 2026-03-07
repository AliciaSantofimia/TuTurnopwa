import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function PintaTuPieza() {
  const imagenes = [
    "/img/pintatupieza1.jpg",
    "/img/pintatupieza2.jpg",
    "/img/pintatupieza3.jpg",
    "/img/pintatupieza4.jpg",
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-5">
            <div className="rounded-2xl overflow-hidden bg-[#f8f8f8]">
              <img
                src={imagenActiva}
                alt="Pinta tu pieza de cerámica"
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {imagenes.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setImagenActiva(img)}
                  className={`rounded-xl overflow-hidden border-2 min-w-[72px] h-[72px] ${
                    imagenActiva === img ? "border-[#F4C542]" : "border-[#f1e7c6]"
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
          </div>

          <div className="p-6 flex flex-col justify-start">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2 uppercase">
              Pinta tu pieza de cerámica
            </h1>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              25,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Antes de reservar tu plaza:</strong> por favor revisa
                  nuestra Política de Reservas. Al proceder con la reserva,
                  confirmas que has leído y aceptado los términos.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                En nuestro taller de cerámica encontrarás una amplia variedad de
                piezas, colores y herramientas de la mejor calidad para pintar
                tu bizcocho.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                No necesitas experiencia; nuestro equipo te guiará a través de
                todo el proceso.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Disfruta mientras fluyes con el color, diviértete en un espacio
                creativo y acogedor.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Reserva tu espacio y tendrás hasta <strong>dos horas y media</strong> para
                desatar tu creatividad.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Solo necesitas ganas de pintar y pasar un buen rato.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  El precio base para pintar una pieza blanca de cerámica en
                  nuestro taller es de 25€. Puedes elegir entre una amplia
                  variedad de piezas: tazas, jarras, cuencos, platos y
                  bandejas, de distintos tamaños y formas. Si prefieres
                  combinar dos pequeñas o cambiar a una de mayor valor, solo
                  tendrás que abonar la diferencia.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                Ven y escoge la pieza que más te guste para dar rienda suelta a
                tu creatividad.
              </p>

              <p className="text-sm text-gray-700">
                ¡Te esperamos!
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Nota importante:</strong> Las tarifas están sujetas a
                cambios. Si no asististe a tu curso o bono en la fecha original
                y deseas reprogramarlo cuando las tarifas hayan cambiado,
                deberás abonar la diferencia o elegir un taller acorde a la
                cantidad ya pagada.
              </p>

              <p className="text-sm text-gray-700 italic">
                Antes de reservar, por favor revisa nuestra Política de
                Reservas. Al proceder con la reserva, confirmas que has leído y
                aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-pinta-tu-pieza" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}