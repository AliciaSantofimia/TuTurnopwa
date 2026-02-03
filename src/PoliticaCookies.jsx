import React from "react";
import BotonVolver from "./BotonVolver";

export default function PoliticaCookies() {
  return (
    <div className="bg-orange-50 text-gray-800 min-h-screen px-4 py-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <img
          src="/img/logoPCsin.png"
          alt="Logo del taller"
          className="mx-auto mb-6 w-36"
        />

        <BotonVolver />

        <h1 className="text-2xl font-bold text-center text-orange-800 mb-8">
          Política de Cookies
        </h1>

        <section className="mb-6">
          <p>
            En <strong>La Purísima Conchi</strong> utilizamos cookies propias y de
            terceros para garantizar el correcto funcionamiento de nuestra
            aplicación y mejorar la experiencia del usuario, de acuerdo con la
            normativa vigente.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            ¿Qué son las cookies?
          </h2>
          <p>
            Las cookies son pequeños archivos que se descargan en tu dispositivo
            cuando accedes a una página web o aplicación. Permiten, entre otras
            cosas, almacenar y recuperar información sobre tus hábitos de
            navegación o reconocer tu dispositivo en futuras visitas.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            Tipos de cookies que utilizamos
          </h2>

          <p className="mb-2 font-semibold">Cookies técnicas (necesarias)</p>
          <p className="mb-4">
            Son imprescindibles para el correcto funcionamiento de la
            aplicación y para permitir funcionalidades básicas como la
            navegación, el acceso a áreas seguras, la gestión de reservas y la
            sesión del usuario. Estas cookies no requieren el consentimiento
            del usuario.
          </p>

          <p className="mb-2 font-semibold">Cookies de terceros</p>
          <p>
            Nuestra aplicación puede utilizar servicios de terceros, como
            <strong> Firebase (Google)</strong>, para la gestión técnica de la
            base de datos, autenticación y funcionamiento interno de la
            aplicación. En ningún caso se utilizan cookies con fines
            publicitarios ni de seguimiento comercial.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            ¿Cómo puedes gestionar o desactivar las cookies?
          </h2>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu
            dispositivo mediante la configuración de las opciones de tu
            navegador. Ten en cuenta que, si desactivas las cookies técnicas,
            algunas funcionalidades de la aplicación pueden verse afectadas.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            Aceptación de la Política de Cookies
          </h2>
          <p>
            Al acceder a la aplicación por primera vez, se muestra un aviso
            informando del uso de cookies. Si continúas navegando o aceptas el
            aviso, se entenderá que consientes el uso de cookies en los términos
            descritos en esta Política.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">
            Responsable del tratamiento
          </h2>
          <p>
            <strong>BERTO LEÓN CEBALLOS (LA PURÍSIMA CONCHI)</strong>
            <br />
            NIF: 45741240J
            <br />
            Domicilio: C/ Israel, local 5, 14009, Córdoba (España)
            <br />
            Email: lapurisimaconchioficial@gmail.com
          </p>
        </section>

        <div className="text-center text-sm text-gray-600">
          Última actualización: 27/05/2025
        </div>
      </div>
    </div>
  );
}
