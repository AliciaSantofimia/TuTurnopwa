import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuSetMatcha() {
  const imagenes = [
    "/img/matcha/setmatcha1.jpg",
    "/img/matcha/setmatcha2.jpg",
    "/img/matcha/setmatcha3.jpg",
    "/img/matcha/setmatcha4.jpg",
    "/img/matcha/setmatcha5.jpg",
    "/img/matcha/setmatcha6.jpg",
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-5">
           <div className="rounded-2xl overflow-hidden bg-[#f8f8f8] flex items-center justify-center min-h-[280px] md:min-h-[420px]">
  <img
    src={imagenActiva}
    alt="Crea tu set de matcha"
    className="w-full h-auto max-h-[70vh] object-contain"
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2">
              CREA TU SET DE MATCHA
            </h1>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              60,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Antes de reservar:</strong> consulta la disponibilidad
                  de fechas y horarios. Una vez confirmada la disponibilidad,
                  podrás realizar la compra a través de la web y después
                  facilitarnos el número de pedido que recibirás por correo
                  electrónico para formalizar tu reserva.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Crea tu propio <strong>set de matcha</strong> artesanal en una
                formación de <strong>dos sesiones</strong>, pensada para quienes
                quieren vivir el proceso completo de la cerámica: modelado,
                secado, cocción, esmaltado y segunda intervención decorativa.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                En la primera sesión crearás tu set desde cero y aprenderás a dar
                forma a piezas funcionales con equilibrio, delicadeza y carácter.
                Más adelante, cuando la pieza esté cocida, podrás completar el
                proceso con la segunda sesión.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Formación guiada en 2 sesiones.</li>
                <li>• Todos los materiales y herramientas necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado y acabado final de las piezas.</li>
                <li>• Acompañamiento durante todo el proceso.</li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Funcionamiento de las 2 sesiones:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• <strong>Sesión 1:</strong> modelado de las piezas.</li>
                <li>
                  • <strong>Sesión 2:</strong> se habilitará aproximadamente 4
                  semanas después, cuando la pieza ya esté lista.
                </li>
                <li>
                  • Antes de reservar la segunda sesión, deberás contactar con el
                  taller para confirmar que la pieza ya se puede decorar.
                </li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  La segunda sesión no se reserva en el mismo momento. Primero se
                  realiza la sesión inicial y, tras el proceso de secado y
                  cocción, el sistema habilitará la opción para la segunda.
                </p>
              </div>

              <p className="text-sm text-gray-700">
                Es una experiencia ideal para disfrutar del proceso cerámico con
                más calma y llevarte a casa un set artesanal único, creado por ti
                desde el principio hasta el acabado final.
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Nota importante:</strong> Las tarifas están sujetas a
                cambios. Si no asistes a tu formación o bono en la fecha original
                y deseas reprogramarlo cuando las tarifas hayan cambiado, deberás
                abonar la diferencia o elegir una formación acorde a la cantidad
                ya pagada.
              </p>

              <p className="text-sm text-gray-700 italic">
                <strong>Antes de reservar:</strong> por favor revisa nuestra
                Política de Reservas. Al proceder con la reserva, confirmas que
                has leído y aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-crea-tu-set-matcha" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}



