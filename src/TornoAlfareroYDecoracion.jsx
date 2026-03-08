import React, { useState } from "react";
import BotonReserva from "./BotonReserva";
import PantallaConVolver from "./PantallaConVolver";

export default function TornoAlfareroYDecoracion() {
  const imagenes = [
    "/img/tornoalfarero/torno-decoracion1.jpg",
    "/img/tornoalfarero/torno-decoracion2.jpg",
    "/img/tornoalfarero/torno-decoracion3.jpg",
    "/img/tornoalfarero/torno-decoracion4.jpg",
    "/img/tornoalfarero/torno-decoracion5.jpg",
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
                alt="Torno alfarero y decoración"
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b3025] mb-2 uppercase">
              Torno alfarero y decoración
            </h1>

            <p className="text-base text-[#6b3700] font-medium mb-1">
              4 clases de 3 horas al mes
            </p>

            <p className="text-xl font-semibold text-[#6b3700] mb-4">
              99,00 €
            </p>

            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
                Información del producto
              </h2>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Antes de realizar la compra:</strong> por favor,
                  escríbenos por WhatsApp para consultar la disponibilidad de
                  plazas y horarios. Una vez confirmada la disponibilidad,
                  podrás realizar la compra a través de la web y facilitarnos el
                  número de pedido que recibirás por correo electrónico para
                  formalizar tu reserva.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Sumérgete en el proceso completo de la cerámica con este
                <strong> bono formativo de 4 sesiones</strong>, diseñado para
                quienes desean aprender torno y técnicas de decoración cerámica.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                El recorrido combina dos sesiones centradas en el torno alfarero
                y dos sesiones dedicadas a la decoración con engobes o esmaltes,
                guiadas paso a paso en el estudio.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Podrás crear tus propias piezas torneadas —cuencos, tazas,
                jarrones o piezas con tapa— y después decorarlas aplicando
                color, efectos y acabados personales.
              </p>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué aprenderás
              </p>

              <p className="text-sm text-gray-700 font-semibold mb-2">
                Sesiones de torno (2 clases):
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Conocer y usar las herramientas esenciales para el torno alfarero.</li>
                <li>• Aprender a centrar, abrir y levantar paredes controlando el grosor y la forma.</li>
                <li>• Practicar el retorneado y remate de bases.</li>
                <li>• Crear piezas utilitarias o decorativas como cuencos, tazas o pequeños jarrones.</li>
              </ul>

              <p className="text-sm text-gray-700 font-semibold mb-2">
                Sesiones de decoración (2 clases):
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Aplicar engobes o esmaltes sobre piezas ya bizcochadas o crudas.</li>
                <li>• Experimentar con diferentes efectos, mezclas y acabados (brillantes, mates o satinados).</li>
                <li>• Desarrollar tu propio estilo de color y textura sobre piezas torneadas.</li>
                <li>• Comprender cómo los materiales reaccionan durante la cocción.</li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Este bono te permite vivir el proceso completo: desde el torno
                  hasta la pieza final decorada.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Qué incluye:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• 4 sesiones de 3 horas (2 de torno + 2 de decoración).</li>
                <li>• Todos los materiales, herramientas y cocciones necesarias.</li>
                <li>• Formación personalizada y acompañamiento técnico en todo el proceso.</li>
              </ul>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  En las tarifas de bono no está incluida la acción de esmaltar
                  piezas por parte del personal del estudio. Sin embargo,
                  tendrás la oportunidad de esmaltar tú mismo tus piezas,
                  personalizando cada detalle según tus preferencias.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Duración y validez del bono:
              </p>

              <p className="text-sm text-gray-700 mb-3">
                El bono está compuesto por <strong>4 sesiones de 3 horas</strong> cada una.
              </p>

              <p className="text-sm text-gray-700 mb-3">
                Podrás asistir cuando tú decidas, dentro del mismo mes, según el
                horario disponible.
              </p>

              <p className="text-sm text-gray-700 mb-3">
                El mes comienza con tu primera sesión y finaliza el mismo día
                del mes siguiente.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                <strong>Validez del bono:</strong> 3 meses desde la fecha de compra.
              </p>

              <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  Si lo deseas, puedes ampliar el bono con sesiones adicionales.
                  Solo tienes que comunicarlo.
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-2 font-semibold">
                Resultados:
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Aprenderás a dominar el torno y a decorar tus propias piezas
                desde una base técnica sólida, comprendiendo todas las fases del
                proceso cerámico.
              </p>

              <p className="text-sm text-gray-700 mb-4">
                Podrás crear objetos únicos, tanto funcionales como decorativos,
                y desarrollar una autonomía real en el torno.
              </p>
            </div>

            <div className="bg-[#fffaf0] border-l-4 border-[#F4C542] rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Política de reservas y condiciones:</strong> Las tarifas
                están sujetas a cambios. Si no asististe a tu curso o bono en
                la fecha original y deseas reprogramarlo cuando las tarifas hayan
                cambiado, deberás abonar la diferencia o elegir una formación
                acorde a la cantidad ya pagada.
              </p>

              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Política de venta:</strong> Validez 3 meses desde la
                fecha de compra. Si las tarifas cambian, deberás abonar la
                diferencia o elegir otro bono equivalente o superior. Si no se
                utiliza dentro del plazo, no se reembolsará el importe.
              </p>

              <p className="text-sm text-gray-700 italic mb-2">
                <strong>Cancelaciones:</strong> En caso de cancelación voluntaria
                sin causa justificada, La Purísima Conchi podrá, de forma
                excepcional, ofrecer una devolución parcial, deduciendo un 20%
                en concepto de gastos de gestión y reserva de plaza.
              </p>

              <p className="text-sm text-gray-700 italic">
                Te recomendamos leer nuestros términos y condiciones y políticas
                de devolución antes de realizar tu compra.
              </p>
            </div>

            <div className="mt-auto">
              <BotonReserva destino="/reserva-torno-alfarero-y-decoracion" />
            </div>
          </div>
        </div>
      </div>
    </PantallaConVolver>
  );
}