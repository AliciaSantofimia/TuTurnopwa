import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuTazaFavorita() {
  const imagenes = [
    "/img/tazafavorita/taza1.jpg",
    "/img/tazafavorita/taza2.jpg",
    "/img/tazafavorita/taza3.jpg",
    "/img/tazafavorita/taza4.jpg",
    "/img/tazafavorita/taza5.jpg",
    "/img/tazafavorita/taza6.jpg",
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
    alt="Crea tu taza favorita"
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
              CREA TU TAZA FAVORITA
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
                  de fechas y horarios. Una vez confirmada la disponibilidad,
                  podrás realizar la compra a través de la web y después
                  facilitarnos el número de pedido que recibirás por correo
                  electrónico para formalizar tu reserva.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Aprende a modelar y decorar tu propia <strong>taza artesanal</strong>{" "}
                en una formación práctica de una sola sesión, pensada para
                quienes desean descubrir la cerámica desde la experiencia directa
                y guiada.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Durante la clase realizarás una taza de uso cotidiano, que podrás
                personalizar a tu gusto y que será posteriormente esmaltada y
                cocida por el estudio.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Podrás elegir la técnica de trabajo que más te motive:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>
                  • <strong>Modelado a mano</strong>, ideal si buscas una taza
                  más orgánica, expresiva o con forma libre.
                </li>
                <li>
                  • <strong>Torno alfarero</strong>, perfecta si prefieres una
                  forma más precisa y simétrica.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Fundamentos del modelado y el esmaltado de piezas cerámicas.</li>
                <li>• Cómo dar forma al cuerpo de la taza y añadir su asa de manera correcta.</li>
                <li>• Acabado de bordes y superficie para lograr una textura lisa y agradable al tacto.</li>
                <li>
                  • Aplicación de una decoración sencilla y equilibrada, con opciones como:
                </li>
                <li className="ml-4">• Sellos o texturas suaves</li>
                <li className="ml-4">• Líneas o puntos decorativos</li>
                <li className="ml-4">• Esponjados o pequeños toques de color</li>
                <li>
                  • Conocerás los pasos finales del proceso: secado, esmaltado y
                  cocción, que serán realizados por el estudio.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Todos los materiales y herramientas necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado de una pieza incluida (tu taza).</li>
                <li>• Formación personalizada y acompañamiento durante toda la sesión.</li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Formación de una única sesión de aproximadamente 3 horas, donde
                podrás aprender y crear a tu ritmo, con asistencia constante.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Si dentro del tiempo disponible finalizas antes tu taza
                  principal, podrás realizar una segunda pieza sin coste
                  adicional, siempre dentro del tiempo asignado.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tu pieza:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Tu taza no se entrega el mismo día. El proceso de secado y
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
                Esta formación te permitirá comprender las bases del modelado
                cerámico a través de una pieza funcional, aplicando técnicas
                básicas y decoraciones sencillas para obtener una taza única
                hecha completamente por ti.
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
              <BotonReserva destino="/reserva-crea-tu-taza-favorita" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}