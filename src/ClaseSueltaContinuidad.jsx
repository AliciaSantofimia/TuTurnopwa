import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function ClaseSueltaContinuidad() {
  const imagenes = [
    "/img/clasesuelta/recorte.JPG",
    "/img/clasesuelta/clase-suelta2.JPG",
    "/img/clasesuelta/clase-suelta3.JPG",
    "/img/clasesuelta/clase-suelta4.JPG",
    "/img/clasesuelta/clase-suelta5.JPG",
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
    alt="Clase suelta con continuidad"
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
          </div>

          <div className="p-6 flex flex-col justify-start">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2">
              CLASE SUELTA CON CONTINUIDAD
            </h1>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              Torno: 32,00 € · Modelado a mano o decoración: 27,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información de la clase
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Antes de reservar:</strong> consulta la disponibilidad
                  de fechas y horarios. Esta opción está pensada para personas
                  que desean asistir a clases sueltas sin compromiso mensual,
                  manteniendo la posibilidad de continuar su proceso en el
                  taller.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                La clase suelta con continuidad es una opción flexible para
                quienes quieren seguir aprendiendo cerámica y avanzar en sus
                piezas sin necesidad de contratar un bono mensual desde el
                principio.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Puedes venir de forma puntual y comprar cada sesión por separado,
                continuando tu proyecto poco a poco en el taller. Es ideal tanto
                para personas que ya han tenido contacto con la cerámica como
                para quienes quieren empezar con más libertad y sin compromiso
                fijo.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Durante estas clases podrás elegir entre trabajar en{" "}
                <strong>torno</strong>, realizar piezas de{" "}
                <strong>modelado a mano</strong> o dedicar la sesión a la{" "}
                <strong>decoración con esmaltes</strong>, según el momento del
                proceso en el que te encuentres.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Si finalmente realizas <strong>4 clases</strong>, se aplicará
                  el <strong>precio de bono</strong> en lugar de cobrarlas como
                  sesiones sueltas independientes.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Precios:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Clase suelta de torno: 32,00 €</li>
                <li>
                  • Clase suelta de modelado a mano o decoración con esmaltes:
                  27,00 €
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué podrás hacer en esta clase:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>
                  • Continuar una pieza empezada anteriormente en el taller.
                </li>
                <li>
                  • Empezar un nuevo proyecto en torno o modelado a mano.
                </li>
                <li>
                  • Decorar y esmaltar piezas ya bizcochadas, si corresponde con
                  tu proceso.
                </li>
                <li>
                  • Practicar técnica, forma, volumen y acabado con
                  acompañamiento personalizado.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Arcilla y materiales necesarios para la sesión.</li>
                <li>• Uso de herramientas y espacio de trabajo del taller.</li>
                <li>• Esmaltes y decoración, cuando formen parte del proceso.</li>
                <li>• Cocción en horno cerámico.</li>
                <li>• Acompañamiento guiado durante toda la clase.</li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Clase de aproximadamente <strong>3 horas</strong>, pensada para
                avanzar de forma real en tu pieza o práctica, con tiempo para
                trabajar con calma y resolver dudas durante el proceso.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Importante:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El tiempo necesario para finalizar una pieza dependerá del tipo
                de trabajo elegido, del ritmo de cada persona y de la técnica
                utilizada. Algunas piezas pueden requerir varias sesiones para
                completarse correctamente.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tus piezas:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Las piezas no se entregan el mismo día. Después de cada sesión,
                deben pasar por su proceso de secado, primera cocción, esmaltado
                si corresponde, y cocción final.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El plazo estimado puede variar entre{" "}
                <strong>2 semanas y 1 mes y medio</strong>, según el clima, el
                volumen de trabajo del taller y el tipo de pieza.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Para recoger tus piezas, sigue las indicaciones disponibles en
                la sección <strong>“Quiero recoger mi pieza”</strong> de la web,
                donde encontrarás la información actualizada sobre plazos y
                procedimiento.
              </p>

              <p className="text-sm text-gray-700">
                Esta modalidad está pensada para ofrecerte continuidad y
                flexibilidad, permitiéndote aprender y disfrutar del proceso
                cerámico a tu ritmo, sin perder el seguimiento de tus piezas.
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Nota importante:</strong> Las tarifas están sujetas a
                cambios. Si no asistes a tu clase en la fecha reservada y deseas
                reprogramarla cuando las tarifas hayan cambiado, deberás abonar
                la diferencia o adaptarte a la tarifa vigente.
              </p>

              <p className="text-sm text-gray-700 italic">
                <strong>Antes de reservar:</strong> por favor revisa nuestra
                Política de Reservas. Al proceder con la reserva, confirmas que
                has leído y aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-clase-suelta-continuidad" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}