import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function ModelaAManoYDecoraTusPiezasFavoritas() {
  const imagenes = [
    "/img/modelamano1.jpg",
    "/img/modelamano2.jpg",
    "/img/modelamano3.jpg",
    "/img/modelamano4.jpg",
    "/img/modelamano5.jpg",
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);
  const [convertirTorno, setConvertirTorno] = useState(false);

  const precioBase = 79;
  const extraTorno = 10;
  const precioFinal = convertirTorno ? precioBase + extraTorno : precioBase;

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-5">
            <div className="rounded-2xl overflow-hidden bg-[#f8f8f8]">
              <img
                src={imagenActiva}
                alt="Modela a mano y decora tus piezas favoritas"
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
              Modela a mano y decora tus piezas favoritas
            </h1>

            <p className="text-base text-[#6b3700] font-medium mb-1">
              4 clases de 3 horas al mes
            </p>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              {precioFinal},00 €
            </p>

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

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Antes de realizar la compra:</strong> por favor,
                  escríbenos por WhatsApp para consultar la disponibilidad de
                  plazas y horarios. Una vez confirmada la disponibilidad,
                  podrás realizar la compra a través de la web y facilitarnos el
                  número de pedido que recibirás por correo electrónico para
                  formalizar tu reserva.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Descubre el proceso completo de la cerámica sin torno con este
                <strong> bono formativo de modelado manual y decoración</strong>,
                donde aprenderás a dar forma, textura y color a tus propias
                piezas desde cero.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                En esta formación trabajarás exclusivamente con modelado a mano,
                explorando distintas técnicas tradicionales para crear piezas
                únicas: tazas, cuencos, bandejas, jarrones o elementos
                decorativos.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Después pasarás a la fase de decoración con engobes y esmaltes,
                experimentando con color, textura y diferentes acabados para
                personalizar tus creaciones.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Una formación ideal para quienes buscan un proceso más pausado,
                  expresivo y artesanal, sin necesidad de torno.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Técnicas básicas de modelado a mano: pellizco, churros, planchas y unión de piezas.</li>
                <li>• Control de formas, proporciones y grosor según el tipo de proyecto.</li>
                <li>• Aplicación de texturas, relieves o estampaciones con herramientas o elementos naturales.</li>
                <li>• Decoración con engobes y esmaltes cerámicos, comprendiendo cómo reaccionan durante la cocción.</li>
                <li>• Cómo elegir entre distintos acabados: brillantes, satinados, mates o con efectos especiales.</li>
                <li>• Preparación de tus piezas para secado, esmaltado y cocción dentro del ritmo natural del estudio.</li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Contamos con una gran variedad de esmaltes con diferentes
                  colores y efectos para que experimentes libremente y encuentres
                  tu propio estilo.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• 4 sesiones de 3 horas cada una.</li>
                <li>• Todos los materiales, herramientas, engobes y esmaltes.</li>
                <li>• Cocciones incluidas a medida que se completan las piezas.</li>
                <li>• Formación personalizada y acompañamiento técnico durante todo el proceso.</li>
                <li>• Posibilidad de continuar con clases sueltas o bonos mensuales de continuidad.</li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración y validez:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                El bono está compuesto por <strong>4 clases de 3 horas</strong> cada
                una, que podrás realizar en el horario que mejor se adapte a ti,
                dentro del mismo mes.
              </p>

              <p className="text-sm text-gray-700 mb-3">
                El mes comienza con tu primera sesión y finaliza el mismo día del
                mes siguiente.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                <strong>Validez del bono:</strong> 3 meses desde la fecha de compra.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Puedes ampliar el bono con clases extra o continuar después con
                  formaciones específicas en torno o técnicas avanzadas.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                Este bono te permitirá disfrutar del modelado y la decoración
                paso a paso, viendo cómo tus piezas evolucionan a tu propio
                ritmo.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Una experiencia relajada y creativa para aprender, experimentar y
                dar vida a tus ideas en barro.
              </p>

              <p className="text-sm text-gray-700">
                ¡Te esperamos en el estudio para crear y esmaltar tus piezas con
                nuestras manos llenas de color!
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Política de venta:</strong> Los bonos son válidos por 3
                meses desde la fecha de compra. Si las tarifas cambian, deberás
                abonar la diferencia o elegir otro equivalente más alto. Si no se
                utiliza dentro del plazo, no se reembolsará el dinero.
              </p>

              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Cancelación voluntaria:</strong> La Purísima Conchi podrá,
                de forma excepcional y según criterio propio, ofrecer una
                devolución parcial deduciendo un 20% del importe abonado en
                concepto de gastos de gestión y reserva de plaza.
              </p>

              <p className="text-sm text-gray-700 italic">
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
    </PantallaConVolver>
  );
}