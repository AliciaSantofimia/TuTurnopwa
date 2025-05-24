import React from "react";

export default function PoliticaCancelacion() {
  return (
    <div className="bg-orange-50 text-gray-800 min-h-screen px-4 py-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <img
          src="/img/logoPCsin.png"
          alt="Logo del taller"
          className="mx-auto mb-6 w-36"
        />

        <h1 className="text-2xl font-bold text-center text-orange-800 mb-8">
          Política de Reservas y Cancelaciones
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            ✅ Confirmación de Reserva
          </h2>
          <p>
            Para garantizar tu plaza en el taller, es necesario abonar el
            <strong> 100% del importe </strong> en el momento de realizar la
            reserva.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            💸 Gestión de Reserva
          </h2>
          <p>
            En caso de cancelación o no asistencia, se retendrá un
            <strong> 20% del valor total </strong> como cargo por gestión de
            reserva. Este importe cubre:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Costes administrativos</li>
            <li>Preparación de materiales</li>
            <li>Organización logística</li>
          </ul>
          <p className="mt-2">
            Este coste ya está incluido en el precio si asistes al taller.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            ❌ Cancelaciones y Cambios
          </h2>
          <p>
            <strong>Cancelaciones con más de 15 días de antelación:</strong> solo
            se cobrará la gestión de reserva.
          </p>
          <p>
            <strong>Cancelaciones dentro de los 15 días previos:</strong> se
            cobrará la gestión de reserva más un
            <strong> 20% adicional </strong> como cargo por cancelación.
          </p>
          <div className="bg-orange-100 border-l-4 border-orange-400 p-4 mt-4">
            <strong>Opción de reprogramación:</strong> Puedes cambiar tu reserva a
            otro taller disponible con al menos
            <strong> 72 horas de antelación </strong> y evitar el cargo por
            cancelación. Sujeto a disponibilidad.
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            🌟 Importancia de esta Política
          </h2>
          <p>
            Tu reserva asegura una plaza que no podemos ofrecer a otra persona.
            Las cancelaciones tardías dificultan cubrir ese hueco y suponen una
            pérdida para nuestro pequeño negocio.
          </p>
          <p className="mt-2">Agradecemos tu comprensión y apoyo. 🙏</p>
        </section>

        <div className="text-center text-sm text-gray-600">
          ¿Tienes dudas? Contacta con nosotros directamente.
        </div>
      </div>
    </div>
  );
}
