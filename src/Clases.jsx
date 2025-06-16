import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Footer from "./Footer";

export default function Clases() {
  const navigate = useNavigate();

  const clases = [
    {
      id: 1,
      titulo: "Edición Premium",
      slug: "edicion-premium",
      color: "border-[#f1c40f]",
      imagen: "/img/vasijaedicionpremium.png",
      horarios: ["10:00 – 15:00 (mañana)", "16:00 – 21:00 (tarde)"],
    },
    {
      id: 2,
      titulo: "Creativo Plus",
      slug: "creativo-plus",
      color: "border-[#f58cb4]",
      imagen: "/img/vasijacreativoplus.png",
      horarios: ["11:00 – 15:00 (mañana)", "17:00 – 20:00 (tarde)"],
    },
    {
      id: 3,
      titulo: "Básico Esencial",
      slug: "basico-esencial",
      color: "border-[#f7c974]",
      imagen: "/img/vasijabasicoesencial.png",
      horarios: ["12:00 – 15:00 (mañana)", "18:00 – 21:00 (tarde)"],
    },
    {
      id: 4,
      titulo: "Bono 4 Clases",
      slug: "bono-4-clases",
      color: "border-[#96dec3]",
      imagen: "/img/vasijabono4.png",
      horarios: ["12:00 – 15:00 (mañana)", "18:00 – 21:00 (tarde)"],
    },
    {
      id: 5,
      titulo: "Bono 2 Clases",
      slug: "bono-2-clases",
      color: "border-[#cdbaf7]",
      imagen: "/img/vasijabono2.png",
      horarios: ["Horario flexible (según clase elegida)"],
    },
    {
      id: 6,
      titulo: "Fundamental Mini",
      slug: "fundamental-mini",
      color: "border-[#f2c29b]",
      imagen: "/img/vasijafundamentalmini.png",
      horarios: [
        "12:00 – 14:00 (Turno 1 mañana)",
        "10:00 – 12:00 (Turno 2 mañana)",
        "18:00 – 20:00 (Turno 1 tarde)",
        "16:00 – 18:00 (Turno 2 tarde)",
      ],
    },
    {
      id: 7,
      titulo: "Pinta tu pieza de Cerámica",
      slug: "pintar-ceramica",
      color: "border-[#c9e6a3]",
      imagen: "/img/vasijapintarceramica.png",
      horarios: [
        "12:00 – 14:00 (Turno 1 mañana)",
        "10:00 – 12:00 (Turno 2 mañana)",
        "18:00 – 20:00 (Turno 1 tarde)",
        "16:00 – 18:00 (Turno 2 tarde)",
      ],
    },
    {
      id: 8,
      titulo: "Exprés Continuo",
      slug: "exprescontinuo",
      color: "border-[#e06c75]",
      imagen: "/img/vasijaexprescontinuo.png",
      horarios: [
        "Tú eliges el ritmo",
        "Clases sueltas, personalizadas",
        "Incluye materiales y cocción",
      ],
    },
    {
      id: 9,
      titulo: "Tarjeta Regalo",
      slug: "tarjetaregalo",
      color: "border-[#e06c75]",
      imagen: "/img/vasijatarjetaregalo.png",
      horarios: [
        "Regala un taller sin fecha fija",
        "Ideal para sorprender a alguien",
      ],
    },
  ];

  return (
    <div className="p-4 bg-[#fffef4] min-h-screen font-sans">
      {/* 🔙 Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-700 underline mb-4"
      >
        ← Volver
      </button>

      <div className="flex flex-col md:flex-row items-center mb-6">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mb-4 md:mb-0 md:mr-4"
        />
        <h1 className="text-3xl font-bold text-yellow-900 font-serif text-center md:text-left">
          Clases disponibles
        </h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
        {clases.map((clase) => (
          <div
            key={clase.id}
            className={`rounded-xl shadow-md p-4 border-l-8 ${clase.color} bg-white flex flex-col justify-between hover:shadow-lg transition`}
          >
            <div className="flex items-start gap-3">
              <div className="text-sm font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 mt-1">
                {clase.id}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {clase.titulo}
                </h3>
                <ul className="text-sm text-gray-700 list-disc ml-4 mt-1">
                  {clase.horarios.map((turno, idx) => (
                    <li key={idx}>{turno}</li>
                  ))}
                </ul>

                <button
                  className="mt-3 px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                  onClick={() => {
                    const currentUser = getAuth().currentUser;

                    if (clase.titulo === "Tarjeta Regalo") {
                      navigate("/tarjeta-regalo");
                    } else if (!currentUser) {
                      navigate("/registro");
                    } else {
                      navigate(`/${clase.slug}`);
                    }
                  }}
                >
                  Ver más / Reservar
                </button>
              </div>
            </div>

            <img
              src={clase.imagen}
              alt={`Icono de ${clase.titulo}`}
              className="w-32 h-32 object-contain mt-3 ml-auto opacity-90 hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Comentado porque ya está incluido en <Footer /> */}
      {/*
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-700">
          Al reservar una clase, aceptas nuestra
          <Link
            to="/politicacancelacion"
            className="block text-base text-orange-700 font-semibold underline mt-2 hover:text-orange-900"
          >
            Política de Cancelación y Condiciones de Reserva
          </Link>
        </p>
        <p className="text-sm text-gray-700 mt-4">
          Consulta también nuestras
          <Link
            to="/condicionesuso"
            className="block text-base text-orange-700 font-semibold underline mt-2 hover:text-orange-900"
          >
            Condiciones de Uso
          </Link>
        </p>
      </div>
      */}

      <Footer />
    </div>
  );
}

