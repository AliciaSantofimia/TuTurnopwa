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

  return (
    <PantallaConVolver>
      <div className="bg-white text-[#333] font-sans max-w-5xl w-full shadow-md rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-5">
            <div className="rounded-2xl overflow-hidden bg-[#f8f8f8]">
              <img
                src={imagenActiva}
                alt="Crea tu maceta"
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

          <div className="p-6 flex flex-col justify-start">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2">
              CREA TU MACETA
            </h1>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              Desde 55,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Tamaños disponibles
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Estándar hasta 12 cm — 55€</li>
                <li>• Mediano hasta 20 cm — 65€</li>
                <li>• Grande hasta 30 cm — 75€</li>
              </ul>
            </div>

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

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic mb-2">
                  En esta formación podrás realizar macetas de diferentes tamaños,
                  adaptando el diseño a tu gusto y nivel de experiencia.
                </p>
                <p className="text-sm text-gray-700 italic mb-2">
                  Al realizar la reserva, deberás elegir la opción de precio
                  acorde al tamaño de maceta que desees realizar, siendo el
                  tamaño máximo alrededor de 30 cm de altura.
                </p>
                <p className="text-sm text-gray-700 italic">
                  Estas medidas son orientativas y se ajustarán de manera
                  equilibrada durante el modelado, para mantener la estabilidad
                  y el comportamiento adecuado del barro en el secado y la
                  cocción.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Aprende a crear tu propia maceta artesanal en una formación
                práctica de una sola sesión, donde podrás diseñar una pieza
                funcional y decorativa adaptada a tu estilo.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Podrás elegir la técnica de trabajo que prefieras:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
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

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
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
                <p className="text-sm text-gray-700 italic">
                  Las piezas más grandes requieren un secado más lento y
                  controlado. Durante la cocción pueden producirse pequeñas
                  variaciones naturales, propias del proceso cerámico.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
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

              <p className="text-sm text-gray-700 mb-4">
                Formación de una única sesión de aproximadamente 3 horas, donde
                podrás trabajar tu maceta paso a paso con asistencia constante.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Si dentro del tiempo disponible finalizas antes tu pieza
                  principal, podrás realizar una segunda más pequeña sin coste
                  adicional, siempre dentro del tiempo asignado.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tu pieza:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Tu maceta no se entrega el mismo día. El proceso de secado y
                cocción requiere tiempo y cuidado, y puede variar según el clima
                y el tamaño de la pieza.
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
                Esta formación te permitirá aprender las bases del modelado
                cerámico a través de una pieza funcional, explorando proporción,
                textura y diseño para crear una maceta única hecha completamente
                por ti.
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
              <BotonReserva destino="/reserva-crea-tu-maceta" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}