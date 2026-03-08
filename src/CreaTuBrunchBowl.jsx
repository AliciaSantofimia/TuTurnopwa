import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuBrunchBowl() {
  const imagenes = [
    "/img/brunchbowl/brunch1.jpg",
    "/img/brunchbowl/brunch2.jpg",
    "/img/brunchbowl/brunch3.jpg",
    "/img/brunchbowl/brunch4.jpg",
    "/img/brunchbowl/brunch5.jpg",
    "/img/brunchbowl/brunch6.jpg",
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Galería izquierda */}
          <div className="p-5">
            <div className="rounded-2xl overflow-hidden bg-[#f8f8f8]">
              <img
                src={imagenActiva}
                alt="Crea tu Brunch Bowl"
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

          {/* Contenido derecha */}
          <div className="p-6 flex flex-col justify-start">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2">
              CREA TU BRUNCH BOWL
            </h1>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              55,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Antes de reservar:</strong> consulta la disponibilidad
                  de fechas y horarios. Una vez confirmada, podrás realizar la
                  compra a través de la web y después facilitarnos el número de
                  pedido que recibirás por correo electrónico para formalizar tu
                  reserva.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Participa en una formación práctica de cerámica en la que
                aprenderás las bases del modelado y la decoración cerámica a
                través de la creación de tu propio <strong>Brunch Bowl</strong>,
                un cuenco de aproximadamente 16 cm de diámetro y 10 cm de altura,
                ideal para desayunos, frutas, ensaladas o sopas.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Esta formación se realiza en <strong>una sola sesión</strong> y
                está diseñada tanto para principiantes como para personas que
                deseen reforzar sus conocimientos en técnicas manuales o torno
                alfarero.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>
                  • Fundamentos del modelado cerámico, eligiendo entre técnica a
                  mano o torno alfarero.
                </li>
                <li>
                  • Cómo preparar la arcilla, modelar la forma y pulir los
                  acabados.
                </li>
                <li>
                  • Aplicación de una decoración sencilla tipo salpicado o
                  líneas, sobre una textura lisa y uniforme.
                </li>
                <li>
                  • Conceptos básicos sobre secado, cocción y esmaltado
                  cerámico.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Todos los materiales y herramientas necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado de una pieza incluida (tu Brunch Bowl).</li>
                <li>
                  • Formación guiada y acompañamiento durante toda la sesión.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Formación de una única sesión de alrededor de 3 horas. Consulta
                el horario disponible y elige el momento que mejor se adapta a
                ti.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Si durante el tiempo de la formación te da tiempo a realizar
                  una segunda pieza, podrás hacerlo sin coste adicional siempre
                  dentro del tiempo asignado a la sesión.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tu pieza:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Tu Brunch Bowl no se entrega el mismo día. El proceso de secado y
                cocción requiere tiempo y cuidado, y puede variar según el clima
                y el tamaño de las piezas.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El plazo estimado de entrega oscila entre <strong>2 semanas y 1
                mes y medio</strong>.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Para recoger tu pieza, deberás seguir las indicaciones que
                encontrarás en la categoría “Quiero recoger mi pieza” de nuestra
                web. Allí encontrarás toda la información actualizada sobre los
                plazos y el procedimiento de recogida.
              </p>

              <p className="text-sm text-gray-700">
                Esta formación te permitirá comprender los tiempos, materiales y
                procesos esenciales del trabajo cerámico funcional, finalizando
                con una pieza creada íntegramente por ti.
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
              <BotonReserva destino="/reserva-crea-tu-brunch-bowl" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}