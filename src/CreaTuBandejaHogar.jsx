import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuBandejaHogar() {
  const imagenes = [
    "/img/bandeja/bandeja1.jpg",
    "/img/bandeja/bandeja2.jpg",
    "/img/bandeja/bandeja3.jpg",
    "/img/bandeja/bandeja4.jpg",
    "/img/bandeja/bandeja5.jpg",
    "/img/bandeja/bandeja6.jpg",
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
    alt="Crea tu bandeja de hogar"
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
              CREA TU BANDEJA DE HOGAR
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

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic mb-2">
                  En este tipo de piezas solemos realizar <strong>dos unidades</strong>,
                  ya que las formas planas son más delicadas durante el secado y
                  la cocción.
                </p>
                <p className="text-sm text-gray-700 italic mb-2">
                  Por este motivo, no deben superar los <strong>30 cm de largo o ancho</strong>,
                  ya que las piezas de mayor tamaño tienen más riesgo de
                  deformarse o fracturarse en el horno.
                </p>
                <p className="text-sm text-gray-700 italic mb-2">
                  Durante la cocción pueden producirse pequeñas variaciones o
                  movimientos naturales en la arcilla, un proceso propio del
                  material que forma parte del aprendizaje cerámico.
                </p>
                <p className="text-sm text-gray-700 italic">
                  Para poder realizar ambas piezas dentro del tiempo del taller,
                  se recomiendan decoraciones sencillas, como sellos, líneas,
                  puntos, formas geométricas o aplicación con esponja.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Descubre las bases del modelado cerámico a través de esta práctica
                de formación de una sola sesión, donde podrás crear tus propias
                piezas planas artesanales, ideales para el hogar o como objetos
                decorativos.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Durante la clase podrás elegir qué tipo de pieza realizar:
                una tabla para quesos, una bandeja joyera, una huevera, un plato
                para tostadas u otra pieza funcional de formato plano.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Una formación pensada para quienes desean aprender o seguir
                practicando cerámica en un entorno relajado, con acompañamiento
                personalizado durante todo el proceso.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>
                  • Modelar tus piezas planas desde cero, definiendo forma,
                  grosor y proporciones adecuadas.
                </li>
                <li>
                  • Conseguir una superficie lisa, estable y equilibrada, lista
                  para uso decorativo o culinario.
                </li>
                <li>
                  • Aplicar, si lo deseas, una decoración simple y contemporánea,
                  que realce la forma sin sobrecargarla.
                </li>
                <li>
                  • Comprender las fases finales del proceso: secado, esmaltado y
                  cocción, realizadas por el estudio.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Todos los materiales y herramientas necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado de una pieza incluida (tu pieza plana).</li>
                <li>• Formación guiada y personalizada durante toda la sesión.</li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Formación de una única sesión de aproximadamente 3 horas, donde
                podrás aprender, practicar y disfrutar del proceso con total
                acompañamiento.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Si dentro del tiempo disponible finalizas antes de tus piezas
                  principales, podrás realizar una adicional sin coste, siempre
                  dentro del tiempo asignado.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tus piezas:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Tus piezas no se entregarán el mismo día. El proceso de secado y
                cocción requiere tiempo y puede variar según el clima y el tamaño
                de las piezas.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El plazo estimado de entrega oscila entre <strong>2 semanas y 1
                mes y medio</strong>.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Para recoger tus piezas, deberás seguir las indicaciones que
                encontrarás en la categoría “Quiero recoger mi pieza” de nuestra
                web. Allí encontrarás toda la información actualizada sobre los
                plazos y el procedimiento de recogida.
              </p>

              <p className="text-sm text-gray-700">
                Esta formación te permitirá aprender las bases del modelado
                cerámico a través de piezas planas y funcionales, comprendiendo
                los tiempos, cuidados y transformaciones naturales del proceso.
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
              <BotonReserva destino="/reserva-crea-tu-bandeja-hogar" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}