import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "./Footer";

export default function DondeReservar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const correosAdmin = [
    "aliciasmelero@gmail.com",
    "lapurisimaconchioficial@gmail.com"
  ];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
    });
    return () => unsubscribe();
  }, []);

  const esAdmin = correosAdmin.includes(userEmail);

  return (
    <div className="p-4 bg-[#fffef4] min-h-screen font-sans">
      <div className="flex flex-col md:flex-row items-center mb-6">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mb-4 md:mb-0 md:mr-4"
        />
        <h1 className="text-3xl font-bold text-yellow-900 font-serif text-center md:text-left">
          ¿Dónde quieres reservar?
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {/* Taller */}
        <div
          className="cursor-pointer rounded-xl shadow-md p-4 border-l-8 border-yellow-400 bg-white flex flex-col justify-between hover:shadow-lg transition"
          onClick={() => navigate("/clases")}
        >
          <img
            src="/img/logoPCsin.png"
            alt="Cerámica Estudio"
            className="w-24 h-24 object-contain mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">Cerámica Estudio La Purísima Conchi</h2>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Reserva tu plaza para cualquiera de nuestras clases en el taller.
          </p>
        </div>

        {/* The Club */}
        <div
          className="cursor-pointer rounded-xl shadow-md p-4 border-l-8 border-pink-300 bg-white flex flex-col justify-between hover:shadow-lg transition"
          onClick={() => navigate("/theclub")}
        >
          <img
            src="/img/logotheclub.png"
            alt="Logo The Club"
            className="w-24 h-24 object-contain mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">The Club</h2>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Reserva tu experiencia para pintar cerámica en The Club (Av. Fray Albino, 3, Córdoba).
          </p>
        </div>

        {/* Tearium */}
        <div
          className="cursor-pointer rounded-xl shadow-md p-4 border-l-8 border-blue-400 bg-white flex flex-col justify-between hover:shadow-lg transition"
          onClick={() => navigate("/teariumkarma")}
        >
          <img
            src="/img/LogoTearium.png"
            alt="Logo Tearium"
            className="w-24 h-24 object-contain mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">Tearium y Karma by Tearium</h2>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Pinta tu pieza de cerámica en Pl. Ramón y Cajal, 4 o en C/Isla Gomera, 4 (Córdoba).
          </p>
        </div>

        {/* Mi perfil */}
        <div
          className="cursor-pointer rounded-xl shadow-md p-4 border-l-8 border-orange-400 bg-white flex flex-col justify-between hover:shadow-lg transition"
          onClick={() => navigate("/perfil")}
        >
          <img
            src="/img/fotoperfilcortada.png" 
            alt="Mi perfil"
            className="w-24 h-24 object-contain mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 text-center">Mi perfil</h2>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Consulta tus reservas, edita tus datos y gestiona tu cuenta.
          </p>
        </div>
      </div>

      {/* Panel admin */}
      {esAdmin && (
        <div className="mt-10 flex flex-col items-center">
         <div
  onClick={() => navigate("/admin-panel")}
  className="bg-[#fdf3e7] p-4 rounded-xl shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
>
  <img
    src="/img/vasijafundamentalmini.png"
    alt="Panel admin"
    className="w-24 h-auto mx-auto"
  />
</div>
<p className="mt-2 text-sm text-gray-700 font-medium text-center">Panel admin</p>


        </div>
      )}

      {/* Condiciones */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-700">
          Consulta nuestras
          <span className="block text-base text-orange-700 font-semibold underline mt-2">
            Condiciones de uso y cancelación disponibles en la página principal
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
}

