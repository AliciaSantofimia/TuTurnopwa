import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import BotonVolver from "./BotonVolver";

export default function Clases() {
  const navigate = useNavigate();

  const categorias = [
  {
    id: 1,
    titulo: "Crear piezas desde cero",
    descripcion: ["Talleres de 1 sesión", "Talleres de 2 sesiones"],
    ruta: "/talleres/crear-piezas",
    color: "border-[#F4C542]",
    imagen: "/img/vasijaedicionpremium.png",
  },
  {
    id: 2,
    titulo: "Cursos y bonos mensuales",
    descripcion: ["Cursos de torno y modelado", "Bonos mensuales"],
    ruta: "/talleres/cursos-bonos",
    color: "border-[#F4C542]",
    imagen: "/img/vasijabono4.png",
  },
  {
    id: 3,
    titulo: "Clase suelta con continuidad",
    descripcion: [
      "Clases sueltas para continuar tu proyecto o empezar uno nuevo en el taller",
    ],
    ruta: "/talleres/clase-suelta-continuidad",
    color: "border-[#F4C542]",
    imagen: "/img/vasijaclasesuelta.png",
  },
  {
    id: 4,
    titulo: "Pinta y decora tu pieza",
    descripcion: ["Talleres para pintar cerámica", "Opciones especiales"],
    ruta: "/talleres/pinta-decora",
    color: "border-[#F4C542]",
    imagen: "/img/vasijapintarceramica.png",
  },
  {
    id: 5,
    titulo: "Tarjeta regalo",
    descripcion: [
      "Regala un taller sin fecha fija",
      "Ideal para sorprender a alguien",
    ],
    ruta: "/tarjeta-regalo",
    color: "border-[#F4C542]",
    imagen: "/img/vasijatarjetaregalo.png",
  },
];

  const handleClick = (categoria) => {
    const currentUser = getAuth().currentUser;

    if (categoria.ruta === "/tarjeta-regalo") {
      navigate("/tarjeta-regalo");
      return;
    }

    if (!currentUser) {
      navigate("/registro");
      return;
    }

    navigate(categoria.ruta);
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
            Talleres disponibles
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            Elige una categoría para ver los talleres y reservar tu plaza.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {categorias.map((cat) => (
          <div
            key={cat.id}
           className={`rounded-2xl bg-white p-5 border border-[#f1e7c6] border-l-8 ${cat.color}
shadow-lg
hover:shadow-xl
hover:scale-[1.015]
transition
flex flex-col justify-between`}
          >
            <div className="flex items-start gap-4">
              <div className="text-sm font-bold bg-white rounded-full w-9 h-9 flex items-center justify-center border border-gray-200 mt-0.5">
                {cat.id}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {cat.titulo}
                </h3>

                <ul className="text-[13px] text-gray-600 list-disc ml-4 mt-2 space-y-1">
                  {cat.descripcion.map((linea, idx) => (
                    <li key={idx}>{linea}</li>
                  ))}
                </ul>

                <button
  className="mt-4 px-6 py-2.5 rounded-full text-white font-semibold
  bg-gradient-to-b from-[#F6D66A] to-[#F4C542]
  shadow-md hover:shadow-lg
  hover:from-[#F4C542] hover:to-[#E5B92F]
  transition-all duration-200"
  onClick={() => handleClick(cat)}
>
  Ver talleres
</button>
              </div>
            </div>

            <img
              src={cat.imagen}
              alt={`Icono de ${cat.titulo}`}
              className="w-28 h-28 object-contain mt-4 ml-auto opacity-95 hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
