import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "./Footer";
import BotonVolver from "./BotonVolver";

export default function DondeReservar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const correosAdmin = [
    "aliciasmelero@gmail.com",
    "lapurisimaconchioficial@gmail.com"
  ];

  const mostrarTheClub = false;
  const mostrarTearium = false;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
    });
    return () => unsubscribe();
  }, []);

  const esAdmin = correosAdmin.includes(userEmail);

  return (
    <div className="p-4 bg-[#fffef4] min-h-screen font-sans relative">
      <BotonVolver />

      <div className="flex flex-col md:flex-row items-start mb-6">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mb-4 md:mb-0 md:mr-4"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-yellow-900 font-serif text-center md:text-left">
            Reserva tu clase
          </h1>
        </div>

        <button
          onClick={() => navigate("/clases-online")}
          className="mt-3 md:mt-0 md:ml-auto bg-gradient-to-r from-pink-400 to-red-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition text-center leading-snug w-52"
        >
          🌟 Novedad:
          <br /> ¡Reserva tu clase online!
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* Taller */}
        <div
          className="cursor-pointer rounded-2xl border border-[#ece7df] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/clases")}
        >
          <img
            src="/img/logoPCsin.png"
            alt="Cerámica Estudio"
            className="w-24 h-24 object-contain mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Cerámica Estudio La Purísima Conchi
          </h2>
          <p className="text-sm text-gray-600 mt-2 text-center leading-6">
            Reserva tu plaza para cualquiera de nuestras clases en el taller.
            Estamos en la Calle Israel nº 5, Córdoba - España -
          </p>
        </div>

        {/* Reservas para grupos */}
        <div
          className="cursor-pointer rounded-2xl border border-[#ece7df] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/reserva-grupos")}
        >
          <img
            src="/img/grupos/portadagrupos.jpg"
            alt="Reservas para grupos"
            className="w-24 h-24 object-contain rounded-xl mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Reservas para grupos
          </h2>
          <p className="text-sm text-gray-600 mt-2 text-center leading-6">
           Si sois un grupo de <strong>5 personas o más</strong> y queréis realizar una actividad de formación en el taller,
  podéis solicitar vuestra reserva aquí. Antes de realizar el pago, es importante contactar
  con el taller por WhatsApp para concretar los detalles.
          </p>
        </div>

        {/* Mi perfil */}
        <div
          className="cursor-pointer rounded-2xl border border-[#ece7df] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
          onClick={() => navigate("/perfil")}
        >
          <img
            src="/img/panel-negro.jpg"
            alt="Mi perfil"
            className="w-24 h-24 object-contain rounded-xl mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Mi perfil
          </h2>
          <p className="text-sm text-gray-600 mt-2 text-center leading-6">
            Consulta tus reservas, edita tus datos y gestiona tu cuenta.
          </p>
        </div>

        {/* The Club oculto temporalmente */}
        {mostrarTheClub && (
          <div
            className="cursor-pointer rounded-2xl border border-[#ece7df] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
            onClick={() => navigate("/theclub")}
          >
            <img
              src="/img/logotheclub.png"
              alt="Logo The Club"
              className="w-24 h-24 object-contain mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              The Club
            </h2>
            <p className="text-sm text-gray-600 mt-2 text-center leading-6">
              Reserva tu experiencia para pintar cerámica en The Club
              (Av. Fray Albino, 3, Córdoba).
            </p>
          </div>
        )}

        {/* Tearium oculto temporalmente */}
        {mostrarTearium && (
          <div
            className="cursor-pointer rounded-2xl border border-[#ece7df] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
            onClick={() => navigate("/teariumInfo")}
          >
            <img
              src="/img/LogoTearium.png"
              alt="Logo Tearium"
              className="w-24 h-24 object-contain mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Tearium
            </h2>
            <p className="text-sm text-gray-600 mt-2 text-center leading-6">
              Pinta tu pieza de cerámica en Pl. Ramón y Cajal, 4 (Córdoba).
            </p>
          </div>
        )}
      </div>

      {/* Panel admin */}
      {esAdmin && (
        <div className="mt-10 flex flex-col items-center">
          <div
            onClick={() => navigate("/admin-dashboard")}
            className="bg-yellow-300 p-4 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
          >
            <img
              src="/img/panel-admin-negro.jpg"
              alt="Panel admin"
              className="w-24 h-auto mx-auto"
            />
          </div>
          <p className="mt-2 text-sm text-gray-700 font-medium text-center">
            Panel admin
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-1">
          Descubre el ambiente del taller
        </p>

        <h3 className="text-lg font-semibold text-[#333] mb-3">
          La Purísima Conchi
        </h3>

        <a
          href="https://www.instagram.com/lapurisimaconchi/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-200 bg-white text-sm font-medium text-[#E1306C] hover:shadow-sm transition"
        >
          📸 @lapurisimaconchi
        </a>

        <p className="text-xs text-gray-400 mt-2">
          Más de 5.000 seguidores
        </p>
      </div>

      <Footer />

     {/* Botón flotante chat ayuda */}
<button
  onClick={() => navigate("/ayuda")}
  className="fixed bottom-20 right-4 z-50 group"
  aria-label="Abrir chat de ayuda"
>
  <div className="flex items-center gap-3 rounded-full border border-[#ead7c5] bg-white/95 backdrop-blur-sm px-3 py-3 shadow-[0_10px_30px_rgba(95,63,43,0.18)] transition duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_14px_36px_rgba(95,63,43,0.22)]">
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#d8b08c] text-white shadow-inner">
      <span className="text-xl">💬</span>
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400"></span>
    </div>

    <div className="pr-1 text-left leading-tight">
      <span className="block text-sm font-semibold text-[#6b4f3f]">
        ¿Tienes dudas?
      </span>
      <span className="block text-xs text-[#8a6a57]">
        Habla con Junquillo
      </span>
    </div>
  </div>
</button>
    </div>
  );
}