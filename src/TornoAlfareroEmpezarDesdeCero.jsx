import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function TornoAlfareroEmpezarDesdeCero() {
  const imagenes = [
    "/img/torno-desde-cero1.jpg",
    "/img/torno-desde-cero2.jpg",
    "/img/torno-desde-cero3.jpg",
    "/img/torno-desde-cero4.jpg",
    "/img/torno-desde-cero5.jpg",
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
                alt="Torno alfarero empezar desde cero"
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
              Torno alfarero. Empezar bien desde cero o perfecciona lo que ya sabes
            </h1>

            <p className="text-base text-[#6b3700] font-medium mb-1">
              4 clases de 3 horas
            </p>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              120,00 €
            </p>

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
                Un curso pensado para quienes quieren aprender torno desde cero
                o para quienes ya lo han probado, pero sienten que algo no acaba
                de salir bien.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Durante <strong>4 clases prácticas</strong> aprenderás a dominar
                las bases reales del torno, corrigiendo errores habituales y
                entendiendo por fin qué hace que una pieza salga equilibrada,
                centrada y firme.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Aquí no se trata de decorar, sino de aprender a tornear de
                verdad: desde el centrado hasta el retorneado, con piezas que
                luego se cuecen y podrás recoger totalmente terminadas
                <strong> (sin color)</strong>.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Ideal si quieres construir una base sólida o pulir la técnica
                  que creías dominar.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás
              </p>

              <p className="text-sm text-gray-700 mb-2">
                Durante las 4 sesiones (3 horas cada una):
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Preparar correctamente el barro antes de tornear.</li>
                <li>• Entender cómo controlar la presión, el agua y la velocidad.</li>
                <li>• Centrar, abrir y levantar paredes con equilibrio y precisión.</li>
                <li>• Detectar y corregir errores comunes.</li>
                <li>• Descentrado o tambaleo del barro.</li>
                <li>• Paredes torcidas o demasiado finas.</li>
                <li>• Falta de control de forma o altura.</li>
                <li>• Retornear (afinar bases y bordes) para dar acabado profesional.</li>
                <li>• Crear piezas progresivas: desde cuencos y tazas pequeñas hasta piezas más grandes y estables.</li>
                <li>• Conocer las fases de secado y cocción en horno cerámico.</li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Empezarás con lo esencial, y terminarás comprendiendo cómo
                  “leer” el barro y responder a sus movimientos.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• 4 clases de 3 horas cada una.</li>
                <li>• Todos los materiales, herramientas y cocciones.</li>
                <li>• Formación práctica personalizada en cada paso.</li>
                <li>• Cocción de todas tus piezas realizadas durante el curso.</li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Este curso no incluye decoración ni color.</strong> Si
                  más adelante deseas darles acabado o esmalte, podrás hacerlo
                  contratando un bono mensual o clases sueltas de continuidad.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Horario y duración:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Formación de 4 sesiones de 3 horas cada una, con horarios flexibles.
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Las clases de torno se imparten principalmente los viernes por la
                tarde, aunque podemos adaptar tu horario según la disponibilidad
                del estudio.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Cada nivel se completa en un ciclo de 6 clases consecutivas.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Tras completar este nivel, podrás continuar perfeccionando tu
                  técnica o avanzar hacia decoraciones y esmaltados.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tus piezas:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Tus piezas se cocerán en el estudio una vez finalizadas y
                estarán listas para recoger tras el proceso de cocción.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El plazo estimado de entrega oscila aproximadamente entre
                <strong> 2 y 4 semanas</strong>, según el secado y la carga del horno.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Para recoger tus piezas, deberás seguir las indicaciones que
                encontrarás en la categoría <strong>“Quiero recoger mi pieza”</strong> de
                nuestra web.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Este curso te permitirá entender de verdad el torno y conseguir
                resultados firmes y equilibrados, tanto si es tu primera vez
                como si ya lo has intentado antes sin lograr estabilidad o control.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Aprenderás a trabajar con calma, técnica y seguridad,
                disfrutando del proceso tanto como del resultado.
              </p>

              <p className="text-sm text-gray-700">
                ¡Te esperamos en el estudio para empezar desde cero (o volver a empezar mejor)!
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Nota importante:</strong> Las tarifas están sujetas a
                cambios. Si no asististe a tu curso o bono en la fecha original
                y deseas reprogramarlo cuando las tarifas hayan cambiado,
                deberás abonar la diferencia o elegir una formación acorde a la
                cantidad ya pagada.
              </p>

              <p className="text-sm text-gray-700 italic">
                <strong>Antes de reservar:</strong> por favor revisa nuestra
                Política de Reserva. Al proceder con la reserva, confirmas que
                has leído y aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-torno-alfarero-empezar-desde-cero" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}