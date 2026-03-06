import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function CreaTuPiezaFavorita() {
  const imagenes = [
    "/img/creatupiezafavorita1.jpg",
    "/img/creatupiezafavorita2.jpg",
    "/img/creatupiezafavorita3.jpg",
    "/img/creatupiezafavorita4.jpg",
    "/img/creatupiezafavorita5.jpg",
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
                alt="Crea tu pieza favorita desde cero"
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
              CREA TU PIEZA FAVORITA DESDE CERO
            </h1>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              Desde 55,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Opciones disponibles
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Cuenco o taza — 55€</li>
                <li>• Frutero / cuenco grande — 65€</li>
                <li>• Jarrón grande — 75€</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <p className="text-sm text-gray-700 mb-3">
                Explora el mundo de la cerámica y la vida a tus creaciones en un
                ambiente acogedor y sin experiencia previa requerida. En nuestro
                estudio, te guiaremos paso a paso a través de diferentes técnicas
                de modelado manual y decoración cerámica para que puedas diseñar
                tu propia pieza única.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Lo que incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>
                  • Formación guiada para crear tu pieza favorita desde cero.
                </li>
                <li>
                  • Posibilidad de elegir modelado a mano o torno alfarero.
                </li>
                <li>
                  • Materiales y cocciones incluidos.
                </li>
                <li>
                  • Esmaltado de una pieza culinaria o decorativa.
                </li>
              </ul>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración del taller:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Elige el tiempo y el estilo de pieza. Consulta nuestro horario y
                elige el momento que mejor se ajusta a tus necesidades.
              </p>

              <p className="text-sm text-gray-700">
                Después de la verificación de la reserva, únete a nosotros el día
                elegido y disfruta de crear una pieza propia. Tras las cocciones,
                podrás llevarte a casa tu creación única y personalizada.
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic">
                Nota importante: las tarifas están sujetas a cambios. Si no
                asistes a tu formación o bono en la fecha original y deseas
                reprogramar cuando las tarifas hayan cambiado, deberás abonar la
                diferencia o elegir una formación acorde a la cantidad ya pagada.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-crea-tu-pieza-favorita" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}