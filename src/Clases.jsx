import React from "react";
import { useNavigate } from "react-router-dom";

export default function Clases() {
  const navigate = useNavigate();

  const clases = [
    {
      id: 1,
      titulo: "Edición Premium",
      color: "bg-[#fef6c4]",
      imagen: "/img/edicionpremium.png",
      horarios: ["10:00 – 15:00 (mañana)", "16:00 – 21:00 (tarde)"],
    },
    {
      id: 2,
      titulo: "Creativo Plus",
      color: "bg-[#ffe0e4]",
      imagen: "/img/creativoplus.png",
      horarios: ["11:00 – 15:00 (mañana)", "17:00 – 20:00 (tarde)"],
    },
    {
      id: 3,
      titulo: "Básico Esencial",
      color: "bg-[#fff2b2]",
      imagen: "/img/esencialbasico.png",
      horarios: ["12:00 – 15:00 (mañana)", "18:00 – 21:00 (tarde)"],
    },
    {
      id: 4,
      titulo: "Bono 4 Clases",
      color: "bg-[#d9f9ea]",
      imagen: "/img/bono4.png",
      horarios: ["12:00 – 15:00 (mañana)", "18:00 – 21:00 (tarde)"],
    },
    {
      id: 5,
      titulo: "Bono 2 Clases",
      color: "bg-[#eee7ff]",
      imagen: "/img/bono2.png",
      horarios: ["Horario flexible (según clase elegida)"],
    },
    {
      id: 6,
      titulo: "Fundamental Mini",
      color: "bg-[#ffe4c2]",
      imagen: "/img/mini.png",
      horarios: [
        "12:00 – 14:00 (Turno 1 mañana)",
        "10:00 – 12:00 (Turno 2 mañana)",
        "18:00 – 20:00 (Turno 1 tarde)",
        "16:00 – 18:00 (Turno 2 tarde)",
      ],
    },
    {
      id: 7,
      titulo: "Pintar Cerámica",
      color: "bg-[#efffcf]",
      imagen: "/img/pintar.png",
      horarios: [
        "12:00 – 14:00 (Turno 1 mañana)",
        "10:00 – 12:00 (Turno 2 mañana)",
        "18:00 – 20:00 (Turno 1 tarde)",
        "16:00 – 18:00 (Turno 2 tarde)",
      ],
    },
  ];

  return (
    <div className="p-4 bg-[#fffef4] min-h-screen font-sans">
      <div className="flex items-center mb-6">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mr-4"
        />
        <h1 className="text-4xl font-bold text-yellow-900 font-serif">
          Clases disponibles
        </h1>
      </div>

      <div className="grid gap-5">
        {clases.map((clase) => (
          <div
            key={clase.id}
            className={`rounded-xl shadow-md p-4 border-l-8 ${clase.color} flex items-center justify-between hover:shadow-lg transition`}
          >
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-300">
                {clase.id}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {clase.titulo}
                </h3>
                <ul className="text-sm text-gray-700 list-disc ml-4">
                  {clase.horarios.map((turno, idx) => (
                    <li key={idx}>{turno}</li>
                  ))}
                </ul>
                <button
                  className="mt-2 px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                  onClick={() => navigate(`/reserva-${clase.titulo.toLowerCase().replace(/ /g, "-")}`)}
                >
                  Reservar
                </button>
              </div>
            </div>
            <img
              src={clase.imagen}
              alt={`Icono de ${clase.titulo}`}
              className="h-16 w-16 object-contain hidden sm:block"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
