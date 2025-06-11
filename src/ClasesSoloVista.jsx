import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import Footer from "./Footer";

export default function ClasesSoloVista() {
  const [clases, setClases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarClases = async () => {
      const snapshot = await get(ref(dbRealtime, "clases"));
      if (snapshot.exists()) {
        const lista = [];
        snapshot.forEach((snap) => {
          lista.push({ id: snap.key, ...snap.val() });
        });
        setClases(lista);
      }
    };
    cargarClases();
  }, []);

  const handleVerMas = () => {
    alert("🔒 Debes iniciar sesión para poder reservar esta clase.");
  };

  return (
    <div className="p-4 bg-[#fffef4] min-h-screen font-sans">
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
        {clases.map((clase, index) => (
          <div
            key={clase.id}
            className={`rounded-xl shadow-md p-4 border-l-8 ${
              clase.color || "border-gray-300"
            } bg-white flex flex-col justify-between hover:shadow-lg transition`}
          >
            <div className="flex items-start gap-3">
              <div className="text-sm font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {clase.nombre}
                </h3>
                <ul className="text-sm text-gray-700 list-disc ml-4 mt-1">
                  {Array.isArray(clase.turnos) ? (
                    clase.turnos.map((turno, i) => <li key={i}>{turno}</li>)
                  ) : (
                    <li>{clase.turnos}</li>
                  )}
                </ul>

                <button
                  className="mt-3 px-4 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                  onClick={handleVerMas}
                >
                  Ver más
                </button>
              </div>
            </div>

            {clase.imagen && (
              <img
                src={clase.imagen}
                alt={`Icono de ${clase.nombre}`}
                className="w-32 h-32 object-contain mt-3 ml-auto opacity-90 hover:scale-110 transition-transform duration-300 drop-shadow-md"
              />
            )}
          </div>
        ))}
      </div>

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
