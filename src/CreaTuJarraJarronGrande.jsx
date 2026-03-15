import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuJarraJarronGrande() {
  const imagenes = [
    "/img/jarron/jarrajarrongrande1.jpg",
    "/img/jarron/jarrajarrongrande2.jpg",
    "/img/jarron/jarrajarrongrande3.jpg",
    "/img/jarron/jarrajarrongrande4.jpg",
    "/img/jarron/jarrajarrongrande5.jpg",
    "/img/jarron/jarrajarrongrande6.jpg",
  ];

  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="w-full rounded-2xl overflow-hidden bg-[#f8f8f8] flex items-center justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[420px]"
            >
              <img
                src={imagenActiva}
                alt="Crea tu jarra o jarrón grande"
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

          <div className="p-4 sm:p-6 flex flex-col justify-start min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2 leading-tight break-words">
              CREA TU JARRA / JARRÓN GRANDE
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#6b3700] mb-4 leading-snug break-words">
              75,00 €
            </p>

            <div className="mb-5 min-w-0">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                  <strong>Antes de reservar:</strong> consulta la disponibilidad
                  de fechas y horarios. Una vez confirmada la disponibilidad,
                  podrás realizar la compra a través de la web y después
                  facilitarnos el número de pedido que recibirás por correo
                  electrónico para formalizar tu reserva.
                </p>
              </div>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic mb-2 leading-relaxed break-words">
                  En esta formación trabajaremos piezas verticales de alrededor
                  de 30 cm de altura, pudiendo adaptar el diseño según tu
                  interés: una jarra funcional con asa y pico o un jarrón
                  decorativo con detalles o texturas añadidas.
                </p>
                <p className="text-sm text-gray-700 italic mb-2 leading-relaxed break-words">
                  Estas piezas requieren atención en el modelado y un secado más
                  lento y uniforme, ya que las formas altas y cerradas tienden a
                  retener más humedad.
                </p>
                <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                  Durante la cocción pueden producirse ligeras variaciones
                  naturales en la forma o el tono del barro, una parte inherente
                  al proceso cerámico y al trabajo con materiales vivos.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3 leading-relaxed break-words">
                Descubre cómo crear piezas verticales llenas de carácter en esta
                formación práctica de una sola sesión, donde aprenderás a modelar
                y decorar tu propia jarra o jarrón artesanal.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Podrás elegir la técnica de trabajo que prefieras:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4 leading-relaxed break-words">
                <li>
                  • <strong>Modelado a mano</strong>, ideal para resultados más
                  orgánicos y expresivos.
                </li>
                <li>
                  • <strong>Torno alfarero</strong>, perfecto si buscas
                  precisión, simetría y control en el volumen.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4 leading-relaxed break-words">
                <li>
                  • Modelar una pieza de altura media-grande (aprox. 30 cm),
                  controlando la estabilidad y el grosor.
                </li>
                <li>
                  • Definir proporciones equilibradas entre base, cuerpo y
                  cuello.
                </li>
                <li>
                  • Añadir accesorios o detalles según el tipo de pieza:
                </li>
                <li className="ml-4">
                  • Asas, picos o bordes reforzados en el caso de una jarra.
                </li>
                <li className="ml-4">
                  • Relieves, texturas o pequeñas decoraciones en el caso de un
                  jarrón.
                </li>
                <li>
                  • Aplicar una decoración sencilla, con opciones como trazos de
                  brocha o esponja, sellos o formas geométricas, y detalles
                  lineales o puntos contrastados.
                </li>
                <li>
                  • Comprender los cuidados y tiempos que requieren las piezas
                  altas durante el secado y la cocción.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4 leading-relaxed break-words">
                <li>• Todos los materiales y herramientas necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado de una pieza incluida (tu jarra o jarrón).</li>
                <li>
                  • Formación personalizada y acompañamiento técnico durante toda
                  la sesión.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Formación de una única sesión de aproximadamente 3 horas, donde
                podrás concentrarte en el modelado, el volumen y los detalles de
                tu pieza.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                  Si dentro del tiempo disponible finalizas antes tu pieza
                  principal, podrás realizar una segunda más pequeña sin coste
                  adicional, siempre dentro del tiempo asignado.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tu pieza:
              </p>

              <p className="text-sm text-gray-700 mb-3 leading-relaxed break-words">
                Tu jarra o jarrón no se entrega el mismo día. El proceso de
                secado y cocción requiere tiempo y cuidado, y puede variar según
                el clima y el tamaño de la pieza.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                El plazo estimado de entrega oscila entre <strong>2 semanas y 1
                mes y medio</strong>.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Para recoger tu pieza, deberás seguir las indicaciones que
                encontrarás en la categoría “Quiero recoger mi pieza” de nuestra
                web. Allí encontrarás toda la información actualizada sobre los
                plazos y el procedimiento de recogida.
              </p>

              <p className="text-sm text-gray-700 leading-relaxed break-words">
                Esta formación te permitirá explorar la creación de piezas
                verticales, aprendiendo a equilibrar forma, volumen y detalle, y
                comprendiendo los procesos que dan vida a la cerámica artesanal.
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2 leading-relaxed break-words">
                <strong>Nota importante:</strong> Las tarifas están sujetas a
                cambios. Si no asistes a tu formación o bono en la fecha original
                y deseas reprogramarlo cuando las tarifas hayan cambiado, deberás
                abonar la diferencia o elegir una formación acorde a la cantidad
                ya pagada.
              </p>

              <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                <strong>Antes de reservar:</strong> por favor revisa nuestra
                Política de Reservas. Al proceder con la reserva, confirmas que
                has leído y aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-crea-tu-jarra-jarron-grande" />
            </div>
          </div>
        </div>
      </div>

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
              alt="Crea tu jarra o jarrón grande ampliada"
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </PantallaConVolver>
  );
}