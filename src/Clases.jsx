import React from "react";

export default function Clases() {
  const clases = [
    {
      id: 1,
      titulo: "Edición Premium",
      imagen: "/img/edicionpremium.png",
      color: "bg-yellow-50",
      textoColor: "text-yellow-900",
      horario: ["10:00 – 15:00 (mañana)", "16:00 – 21:00 (tarde)"],
    },
    {
      id: 2,
      titulo: "Creativo Plus",
      imagen: "/img/creativoplus.png",
      color: "bg-rose-100",
      textoColor: "text-rose-900",
      horario: ["11:00 – 15:00 (mañana)", "17:00 – 20:00 (tarde)"],
    },
    {
      id: 3,
      titulo: "Básico Esencial",
      imagen: "/img/esencialbasico.png",
      color: "bg-amber-100",
      textoColor: "text-amber-900",
      horario: ["12:00 – 15:00 (mañana)", "18:00 – 21:00 (tarde)"],
    },
    {
      id: 4,
      titulo: "Bono 4 Clases",
      imagen: "/img/bono4.png",
      color: "bg-emerald-100",
      textoColor: "text-emerald-900",
      horario: ["12:00 - 15:00 (mañana)", "18:00 - 21:00 (tarde)"],
    },
    {
      id: 5,
      titulo: "Bono 2 Clases",
      imagen: "/img/bono2.png",
      color: "bg-sky-100",
      textoColor: "text-sky-900",
      horario: ["Horario flexible (según clase elegida)"],
    },
    {
      id: 6,
      titulo: "Fundamental Mini",
      imagen: "/img/fundamentalmini.png",
      color: "bg-orange-100",
      textoColor: "text-orange-900",
      horario: [
        "12:00 - 14:00 (Turno 1 mañana)",
        "10:00 - 12:00 (Turno 2 mañana)",
        "18:00 - 20:00 (Turno 1 tarde)",
        "16:00 - 18:00 (Turno 2 tarde)",
      ],
    },
    {
      id: 7,
      titulo: "Pintar Cerámica",
      imagen: "/img/pintarceramica.png",
      color: "bg-lime-100",
      textoColor: "text-lime-900",
      horario: [
        "12:00 - 14:00 (Turno 1 mañana)",
        "10:00 - 12:00 (Turno 2 mañana)",
        "18:00 - 20:00 (Turno 1 tarde)",
        "16:00 - 18:00 (Turno 2 tarde)",
      ],
    },
  ];

  return (
    <div className="p-4 bg-[#fffef4] min-h-screen font-sans">
      <div className="flex items-center mb-6">
        <img
          src="/img/logoPC.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mr-4"
        />
        <h1
          className="text-4xl font-bold text-yellow-900 text-center"
          style={{ fontFamily: 'Barriecito' }}
        >
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
                <h3 className={`text-lg font-semibold ${clase.textoColor}`}>
                  {clase.titulo}
                </h3>
                <ul className="text-sm text-gray-700 list-disc ml-4">
                  {clase.horario.map((turno, idx) => (
                    <li key={idx}>{turno}</li>
                  ))}
                </ul>
                <button className="mt-2 px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">
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


