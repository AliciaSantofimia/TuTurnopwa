import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuTazaEscultorica() {
  const imagenes = [
    "/img/tazaescultorica1.jpg",
    "/img/tazaescultorica2.jpg",
    "/img/tazaescultorica3.jpg",
    "/img/tazaescultorica4.jpg",
    "/img/tazaescultorica5.jpg",
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
                alt="Crea tu taza escultórica"
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2">
              CREA TU TAZA ESCULTÓRICA
            </h1>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              58,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Antes de realizar la compra:</strong> por favor,
                  escríbenos por WhatsApp para consultar la disponibilidad de
                  fechas y horarios. Una vez confirmada la disponibilidad,
                  podrás realizar la compra a través de la web y deberás
                  facilitarnos el número de pedido que recibirás por correo
                  electrónico para formalizar tu reserva.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Explora el lado más creativo de la cerámica en esta formación
                práctica de <strong>dos sesiones</strong>, donde podrás diseñar
                y esmaltar tu propia <strong>taza con detalles escultóricos</strong>.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Durante la primera sesión modelarás tu taza, incorporando
                elementos en volumen como caras, orejas de animal, brazos,
                expresiones o relieves decorativos.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                En la segunda sesión podrás decorarla y esmaltarla, eligiendo
                entre una amplia gama de esmaltes y acabados que realzarán su
                carácter y personalidad.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Cada participante podrá desarrollar su propio diseño, desde una
                taza figurativa hasta una pieza más abstracta o expresiva,
                guiado paso a paso durante todo el proceso.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás:
              </p>

              <p className="text-sm text-gray-700 font-semibold mb-2">
                Primera sesión – Modelado y detalles escultóricos
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Crear la estructura base de una taza mediante modelado a mano o torno.</li>
                <li>• Incorporar elementos escultóricos: rasgos faciales, orejas, brazos, relieves o asas creativas.</li>
                <li>• Aprender a unir las partes correctamente y a equilibrar el peso y las proporciones.</li>
                <li>• Preparar la pieza para la primera cocción (bizcochado).</li>
              </ul>

              <p className="text-sm text-gray-700 font-semibold mb-2">
                Segunda sesión – Decoración y esmaltado
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Aplicar color con esmaltes cerámicos adaptados a los relieves y formas escultóricas.</li>
                <li>• Explorar distintas técnicas decorativas: toques de color, veladuras, contraste de mates y brillos.</li>
                <li>• Realzar los volúmenes y gestos de tu diseño mediante la elección del color.</li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Disponemos de una gran variedad de esmaltes, con acabados que
                  resaltan los detalles escultóricos y aportan una estética
                  única a cada pieza.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Todos los materiales, herramientas y esmaltes necesarios.</li>
                <li>• Cocciones completas en horno cerámico.</li>
                <li>• Esmaltado de una pieza incluido (tu taza).</li>
                <li>• Formación personalizada y acompañamiento técnico durante ambas sesiones.</li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Formación de dos sesiones de aproximadamente 3 horas cada una.
                La segunda sesión se programa tras el secado y primera cocción
                (bizcochado), para garantizar que la pieza esté lista para
                esmaltar.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Entre la primera y la segunda sesión pueden pasar entre 2 y 4
                  semanas, según el ritmo de secado y la carga del horno.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Entrega de tu pieza:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Tu taza no se entrega el mismo día de la segunda sesión.
                Después del esmaltado realizaremos la cocción final.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El plazo estimado de entrega oscila entre <strong>2 semanas tras el esmaltado</strong>.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Para recoger tu pieza, deberás seguir las indicaciones que
                encontrarás en la categoría <strong>“Quiero recoger mi pieza”</strong> de
                nuestra web. Allí encontrarás toda la información actualizada
                sobre los plazos y el procedimiento de recogida.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Esta formación te permitirá explorar el modelado escultórico
                aplicado a una pieza funcional, combinando creatividad, técnica
                y expresión personal.
              </p>

              <p className="text-sm text-gray-700">
                ¡Te esperamos en el estudio para dar vida a tu propia taza con
                carácter y volumen!
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Nota importante:</strong> Las tarifas están sujetas a
                cambios. Si no asististe a tu formación o bono en la fecha
                original y deseas reprogramarlo cuando las tarifas hayan
                cambiado, deberás abonar la diferencia o elegir una formación
                acorde a la cantidad ya pagada.
              </p>

              <p className="text-sm text-gray-700 italic">
                <strong>Antes de reservar:</strong> por favor revisa nuestra
                Política de Reservas. Al proceder con la reserva, confirmas que
                has leído y aceptado los términos.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-crea-tu-taza-escultorica" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}