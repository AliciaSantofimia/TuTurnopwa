import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function TarjetaRegaloSolo() {
  const navigate = useNavigate();

  const tarjetas = [
    {
      id: 1,
      titulo: "2 clases de 4 horas al mes",
      slug: "2clases",
      descripcion: "Ideal para iniciarse poco a poco. Sin experiencia previa.",
      imagen: "/img/2clasesregalo.jpg",
    },
    {
      id: 2,
      titulo: "Pinta tu pieza de cerámica",
      slug: "pintatupieza",
      descripcion: "Decora una pieza blanca libremente. Muy relajante.",
      imagen: "/img/pintatupiezaregalo.jpg",
    },
    {
      id: 3,
      titulo: "Crea tu pieza favorita",
      slug: "creapiezafavorita",
      descripcion: "Modelado básico + decoración. Elige lo que más te guste.",
      imagen: "/img/creatupiezafavoritaregalo.jpg",
    },
    {
      id: 4,
      titulo: "Torno intensivo individual (1 día)",
      slug: "tornointensivo",
      descripcion: "Experiencia personalizada. Torno durante 1 jornada.",
      imagen: "/img/tornointensivoregalo.jpg",
    },
    {
      id: 5,
      titulo: "4 clases de 3 horas al mes",
      slug: "4clases",
      descripcion: "Ideal para quienes quieren practicar cada semana.",
      imagen: "/img/4clasesregalo.jpg",
    },
  ];

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <button
        onClick={() => navigate("/")}
        className="text-sm text-blue-600 underline mb-4"
      >
        ← Volver a la portada
      </button>

      <h1 className="text-3xl font-serif font-bold mb-6 text-yellow-900">
        Tarjetas regalo disponibles
      </h1>

      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
        {tarjetas.map((tarjeta) => (
          <div
            key={tarjeta.id}
            className="bg-[#fff5f5] border rounded-lg shadow-sm p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={tarjeta.imagen}
                alt={tarjeta.titulo}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-md font-semibold text-gray-900">
                  {tarjeta.titulo}
                </h2>
                <p className="text-sm text-gray-600">{tarjeta.descripcion}</p>
              </div>
            </div>

            <button
              className="mt-4 px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
              onClick={() =>
                navigate(`/tarjeta-regalo-solo/${tarjeta.slug}`)
              }
            >
              Ver más
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

