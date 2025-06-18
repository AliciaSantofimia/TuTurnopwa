import React from "react";
import { useNavigate } from "react-router-dom";

export default function CondicionesUso() {
  const navigate = useNavigate();

  return (
    <div className="bg-orange-50 text-gray-800 min-h-screen px-4 py-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <img
          src="/img/logoPCsin.png"
          alt="Logo del taller"
          className="mx-auto mb-6 w-36"
        />

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-700 hover:text-black underline mb-6"
        >
          ← Volver atrás
        </button>

        <h1 className="text-2xl font-bold text-center text-orange-800 mb-8">
          Condiciones de Uso
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            1. Información General
          </h2>
          <p>
            Este sitio es gestionado por La Purísima Conchi. Al acceder y utilizar esta aplicación o sitio web, aceptas cumplir con las condiciones aquí descritas.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            2. Servicios Ofrecidos
          </h2>
          <p>
            A través de esta plataforma puedes reservar clases, talleres y experiencias relacionadas con la cerámica y otras actividades creativas ofrecidas por nuestro espacio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            3. Uso Adecuado
          </h2>
          <p>
            Te comprometes a utilizar este sitio de forma responsable y a no emplearlo para fines ilícitos, fraudulentos o que perjudiquen el buen funcionamiento del servicio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            4. Política de Cancelaciones
          </h2>
          <p>
            Consulta nuestra <a href="/politicacancelacion" className="text-orange-700 underline">Política de Reservas y Cancelaciones</a> para conocer los detalles relacionados con pagos, cancelaciones y cambios de fecha.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            5. Propiedad Intelectual
          </h2>
          <p>
            Todo el contenido (imágenes, textos, logotipos, diseños) es propiedad de La Purísima Conchi o se usa con licencia. Queda prohibida su reproducción total o parcial sin autorización expresa.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            6. Modificaciones
          </h2>
          <p>
            Nos reservamos el derecho de modificar estas condiciones en cualquier momento. Las modificaciones tendrán efecto desde su publicación.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            7. Legislación Aplicable
          </h2>
          <p>
            Estas condiciones se rigen por la legislación española. Para cualquier conflicto, las partes se someterán a los juzgados y tribunales del domicilio del prestador del servicio.
          </p>
        </section>

        <div className="text-center text-sm text-gray-600">
          ¿Tienes dudas legales? Escríbenos directamente y te ayudaremos.
        </div>
      </div>
    </div>
  );
}
