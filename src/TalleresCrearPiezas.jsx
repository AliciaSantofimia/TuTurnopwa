import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import BotonVolver from "./BotonVolver";

export default function TalleresCrearPiezas() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null); // null | "1" | "2"

  const talleres1Sesion = [
    {
      id: 1,
      titulo: "Crea tu pieza favorita desde cero",
      precio: "desde 55€",
      descripcion: "Elige el tamaño dentro del taller",
      slug: "/crea-tu-pieza-favorita-desde-cero",
      imagen: "/img/vasijaedicionpremium.png",
      especial: true,
    },
    {
      id: 2,
      titulo: "Crea tu brunch bowl",
      precio: "55€",
      slug: "/crea-tu-brunch-bowl",
      imagen: "/img/vasijabasicoesencial.png",
    },
    {
      id: 3,
      titulo: "Crea tu cuenco para ramen",
      precio: "55€",
      slug: "/crea-tu-cuenco-ramen",
      imagen: "/img/vasijabasicoesencial.png",
    },
    {
      id: 4,
      titulo: "Crea tu bandeja de hogar",
      precio: "55€",
      slug: "/crea-tu-bandeja-hogar",
      imagen: "/img/vasijabasicoesencial.png",
    },
    {
      id: 5,
      titulo: "Crea tu taza favorita",
      precio: "55€",
      slug: "/crea-tu-taza-favorita",
      imagen: "/img/vasijabasicoesencial.png",
    },
    {
      id: 6,
      titulo: "Crea tu maceta",
      precio: "55€",
      slug: "/crea-tu-maceta",
      imagen: "/img/vasijabasicoesencial.png",
    },
    {
      id: 7,
      titulo: "Crea tu gran centro de mesa",
      precio: "65€",
      slug: "/crea-tu-gran-centro-mesa",
      imagen: "/img/vasijacreativoplus.png",
    },
    {
      id: 8,
      titulo: "Crea tu jarra / jarrón grande",
      precio: "75€",
      slug: "/crea-tu-jarra-jarron-grande",
      imagen: "/img/vasijaedicionpremium.png",
    },
  ];

  const talleres2Sesiones = [
    {
      id: 9,
      titulo: "Crea tu set de matcha",
      precio: "60€",
      slug: "/crea-tu-set-matcha",
      imagen: "/img/vasijabono2.png",
    },
    {
      id: 10,
      titulo: "Crea tu set de sake",
      precio: "60€",
      slug: "/crea-tu-set-sake",
      imagen: "/img/vasijabono2.png",
    },
    {
      id: 11,
      titulo: "Crea tu taza escultórica",
      precio: "58€",
      slug: "/crea-tu-taza-escultorica",
      imagen: "/img/vasijabono2.png",
    },
    {
      id: 12,
      titulo: "Crea tu maceta orgánica",
      precio: "59€",
      slug: "/crea-tu-maceta-organica",
      imagen: "/img/vasijabono2.png",
    },
  ];

  const handleReservar = (taller) => {
    const currentUser = getAuth().currentUser;

    if (!currentUser) {
      navigate("/registro");
      return;
    }

    navigate(taller.slug, { state: { desdeTarjeta: false } });
  };

  const CardTaller = ({ taller }) => (
    <div
      className="rounded-2xl bg-white p-5 border border-[#f1e7c6] border-l-8 border-[#F4C542]
      shadow-lg
      hover:shadow-xl
      hover:scale-[1.015]
      transition
      flex flex-col justify-between"
    >
      <div className="flex items-start gap-4">
        <div className="text-sm font-bold bg-white rounded-full w-9 h-9 flex items-center justify-center border border-gray-200 mt-0.5">
          {taller.id}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {taller.titulo}
          </h3>

          <p className="text-[13px] text-gray-600 mt-2">
            Precio: <span className="font-semibold">{taller.precio}</span>
          </p>

          {taller.especial && (
            <p className="text-[12px] text-gray-500 mt-1">
              (Cuenco/taza 55€ · Frutero 65€ · Jarrón 75€)
            </p>
          )}

          {taller.descripcion && (
            <p className="text-[12px] text-gray-500 mt-1">
              {taller.descripcion}
            </p>
          )}

          <button
            className="mt-4 px-6 py-2.5 rounded-full text-white font-semibold
            bg-gradient-to-b from-[#F6D66A] to-[#F4C542]
            shadow-md hover:shadow-lg
            hover:from-[#F4C542] hover:to-[#E5B92F]
            transition-all duration-200"
            onClick={() => handleReservar(taller)}
          >
            Ver / Reservar
          </button>
        </div>
      </div>

      <img
        src={taller.imagen}
        alt={`Icono de ${taller.titulo}`}
        className="w-28 h-28 object-contain mt-4 ml-auto opacity-95 hover:scale-110 transition-transform duration-300 drop-shadow-md"
      />
    </div>
  );

  const TarjetaSeccion = ({ id, titulo, subtitulo }) => {
    const isOpen = openSection === id;

    return (
      <button
        onClick={() => setOpenSection(isOpen ? null : id)}
        className="w-full rounded-2xl bg-white p-5 border border-[#f1e7c6] border-l-8 border-[#F4C542]
        shadow-lg
        hover:shadow-xl
        hover:scale-[1.015]
        transition
        text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{titulo}</h2>
            <p className="text-sm text-gray-600 mt-1">{subtitulo}</p>
          </div>

          <div className="text-[#b8860b] font-bold text-2xl leading-none">
            {isOpen ? "−" : "+"}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="p-5 bg-[#fffef4] min-h-screen font-sans">
      <BotonVolver />

      <div className="flex flex-col md:flex-row items-center mb-7">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima Conchi"
          className="h-20 w-auto mb-4 md:mb-0 md:mr-4"
        />

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 font-serif">
            Crear piezas desde cero
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Elige el tipo de taller y después selecciona tu opción.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mb-6">
        <TarjetaSeccion
          id="1"
          titulo="Taller de 1 sesión"
          subtitulo={`${talleres1Sesion.length} opciones disponibles`}
        />
        <TarjetaSeccion
          id="2"
          titulo="Taller de 2 sesiones"
          subtitulo={`${talleres2Sesiones.length} opciones disponibles`}
        />
      </div>

      {openSection === "1" && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mb-10">
          {talleres1Sesion.map((t) => (
            <CardTaller key={t.id} taller={t} />
          ))}
        </div>
      )}

      {openSection === "2" && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {talleres2Sesiones.map((t) => (
            <CardTaller key={t.id} taller={t} />
          ))}
        </div>
      )}
    </div>
  );
}