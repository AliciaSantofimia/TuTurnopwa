import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuSetSake() {
  const imagenes = [
    "/img/sake/setsake1.jpg",
    "/img/sake/setsake2.jpg",
    "/img/sake/setsake3.jpg",
    "/img/sake/setsake4.jpg",
    "/img/sake/setsake5.jpg",
    "/img/sake/setsake6.jpg",
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
    alt="Crea tu set de sake"
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
              CREA TU SET DE SAKE
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
                Descubre la elegancia de la cerámica japonesa en esta formación
                de <strong>dos sesiones</strong>, donde podrás crear y esmaltar
                tu propio <strong>set de sake</strong> artesanal, compuesto por
                una botella y cuatro vasitos.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Durante la primera sesión modelarás las piezas, y en la segunda
                las decorarás con una amplia selección de esmaltes de distintos
                colores, brillos y efectos, que transformarán tu conjunto en un
                set único.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Podrás elegir entre dos acabados:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>
                  • <strong>Superficie lisa y pulida</strong>, con líneas suaves
                  y un aspecto refinado.
                </li>
                <li>
                  • <strong>Técnica Kurinuki</strong>, en la que se trabaja el
                  exterior con cortes e incisiones que crean planos facetados,
                  texturas y volúmenes irregulares, resaltando el gesto artesanal
                  y la belleza del trabajo manual.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás:
              </p>

              <p className="text-sm text-gray-700 font-semibold mb-2">
                Primera sesión — Modelado de las piezas
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Crear las cinco piezas del set (una botella y cuatro vasitos).</li>
                <li>• Definir proporciones, grosor y equilibrio entre las partes.</li>
                <li>• Aplicar el acabado elegido: superficie lisa o tratamiento Kurinuki.</li>
                <li>• Pulir bordes, base y boca de las piezas, preparándolas para la primera cocción.</li>
              </ul>

              <p className="text-sm text-gray-700 font-semibold mb-2">
                Segunda sesión — Decoración y esmaltado
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Aprender a aplicar esmaltes cerámicos de alta temperatura.</li>
                <li>• Experimentar con colores, texturas y efectos especiales: satinados, brillantes, metálicos o mate.</li>
                <li>• Comprender cómo los esmaltes reaccionan en el horno según su aplicación y grosor.</li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Disponemos de una gran variedad de esmaltes exclusivos, con
                  resultados sorprendentes que podrás combinar libremente para
                  personalizar tu set.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Todos los materiales, herramientas y esmaltes necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado de las cinco piezas incluido (una botella + cuatro vasitos).</li>
                <li>• Formación guiada y acompañamiento personalizado durante ambas sesiones.</li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Formación de dos sesiones de aproximadamente 3 horas cada una.
                La segunda sesión se programa tras el secado y primera cocción
                (bizcochado), para garantizar que las piezas estén listas para
                esmaltar.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Entre la primera y la segunda sesión pueden pasar entre 2 y 4
                  semanas, según el ritmo de secado y la carga del horno.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tu set:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Tu set de sake no se entrega el mismo día de la segunda sesión.
                Después del esmaltado realizaremos la cocción final.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El plazo estimado de entrega oscila entre <strong>2 y 3 semanas tras el esmaltado</strong>.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Para recoger tu set, deberás seguir las indicaciones que
                encontrarás en la categoría “Quiero recoger mi pieza” de nuestra
                web. Allí encontrarás toda la información actualizada sobre los
                plazos y el procedimiento de recogida.
              </p>

              <p className="text-sm text-gray-700">
                Esta formación te permitirá descubrir las dos vertientes de la
                cerámica japonesa: la precisión y armonía de la superficie lisa y
                la textura expresiva del acabado Kurinuki, experimentando además
                con el color y el esmalte para crear un set funcional y lleno de
                carácter.
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
              <BotonReserva destino="/reserva-crea-tu-set-sake" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}