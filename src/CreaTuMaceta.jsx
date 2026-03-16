import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuMaceta() {
  const imagenes = [
    "/img/maceta/maceta1.jpg",
    "/img/maceta/maceta2.jpg",
    "/img/maceta/maceta3.jpg",
    "/img/maceta/maceta4.jpg",
    "/img/maceta/maceta5.jpg",
    "/img/maceta/maceta6.jpg",
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
                alt="Crea tu maceta"
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
              CREA TU MACETA
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#6b3700] mb-4 leading-snug break-words">
              Desde 55,00 €
            </p>

            <div className="mb-5 min-w-0">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Tamaños disponibles
              </h2>
              <ul className="text-sm text-gray-700 space-y-2 leading-relaxed break-words">
                <li>• Estándar hasta 12 cm — 55€</li>
                <li>• Mediano hasta 20 cm — 65€</li>
                <li>• Grande hasta 30 cm — 75€</li>
              </ul>
            </div>

            <div className="mb-5 min-w-0">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

            

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic mb-2 leading-relaxed break-words">
                  En esta formación podrás realizar macetas de diferentes tamaños,
                  adaptando el diseño a tu gusto y nivel de experiencia.
                </p>
                <p className="text-sm text-gray-700 italic mb-2 leading-relaxed break-words">
                  Al realizar la reserva, deberás elegir la opción de precio
                  acorde al tamaño de maceta que desees realizar, siendo el
                  tamaño máximo alrededor de 30 cm de altura.
                </p>
                <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                  Estas medidas son orientativas y se ajustarán de manera
                  equilibrada durante el modelado, para mantener la estabilidad
                  y el comportamiento adecuado del barro en el secado y la
                  cocción.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3 leading-relaxed break-words">
                Aprende a crear tu propia maceta artesanal en una formación
                práctica de una sola sesión, donde podrás diseñar una pieza
                funcional y decorativa adaptada a tu estilo.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Podrás elegir la técnica de trabajo que prefieras:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4 leading-relaxed break-words">
                <li>
                  • <strong>Modelado a mano</strong>, ideal para formas más
                  orgánicas, texturadas o con carácter.
                </li>
                <li>
                  • <strong>Torno alfarero</strong>, si buscas una maceta más
                  simétrica y precisa.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4 leading-relaxed break-words">
                <li>
                  • Modelar la estructura de una maceta equilibrada y resistente,
                  adaptando el grosor y la proporción al tamaño elegido.
                </li>
                <li>
                  • Crear bordes y base estables, con opción de plato incorporado
                  o agujero de drenaje.
                </li>
                <li>• Añadir texturas, relieves o decoraciones simples.</li>
                <li>
                  • Aplicar una decoración ligera y natural, como sellos, líneas,
                  puntos o formas geométricas.
                </li>
                <li>
                  • Comprender los tiempos de secado y cocción según el tamaño y
                  el tipo de pieza.
                </li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic leading-relaxed break-words">
                  Las piezas más grandes requieren un secado más lento y
                  controlado. Durante la cocción pueden producirse pequeñas
                  variaciones naturales, propias del proceso cerámico.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4 leading-relaxed break-words">
                <li>• Todos los materiales y herramientas necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado de una pieza incluida (tu maceta).</li>
                <li>
                  • Formación guiada y acompañamiento personalizado durante toda
                  la sesión.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                Formación de una única sesión de aproximadamente 3 horas, donde
                podrás trabajar tu maceta paso a paso con asistencia constante.
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
                Tu maceta no se entrega el mismo día. El proceso de secado y
                cocción requiere tiempo y cuidado, y puede variar según el clima
                y el tamaño de la pieza.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
                El plazo estimado de entrega oscila entre <strong>2 semanas y 1
                mes y medio</strong>.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed break-words">
               Cuando tus piezas estén listas, se subirán fotos a la carpeta correspondiente para que puedas identificarlas.

Para saber si tu pieza ya está disponible y cómo recogerla, entra en “Quiero recoger mi pieza” dentro de tu perfil.
Ahí encontrarás siempre la información actualizada.
              </p>

              <p className="text-sm text-gray-700 leading-relaxed break-words">
                Esta formación te permitirá aprender las bases del modelado
                cerámico a través de una pieza funcional, explorando proporción,
                textura y diseño para crear una maceta única hecha completamente
                por ti.
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
              <BotonReserva destino="/reserva-crea-tu-maceta" />
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
              alt="Crea tu maceta ampliada"
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </PantallaConVolver>
  );
}