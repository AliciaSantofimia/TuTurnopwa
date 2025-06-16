import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";

export default function DetalleClaseSolo() {
  const { id } = useParams(); // Este es el slug que llega por la URL
  const navigate = useNavigate();
  const [clase, setClase] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const buscarClasePorSlug = async () => {
      const snapshot = await get(ref(dbRealtime, "clases"));
      if (snapshot.exists()) {
        let encontrada = null;

        snapshot.forEach((snap) => {
          const data = snap.val();
          if (data.slug === id) {
            encontrada = { id: snap.key, ...data };
          }
        });

        if (encontrada) {
          setClase(encontrada);
        } else {
          navigate("/clases-solo"); // Si no se encuentra, redirige
        }
      }
      setCargando(false);
    };

    buscarClasePorSlug();
  }, [id, navigate]);

  if (cargando) return <p className="text-center mt-10 text-blue-800">Cargando clase...</p>;

  if (!clase) return null;

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen text-gray-800 font-sans max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4 text-[#3b3025]">{clase.nombre}</h1>

      {clase.imagen && (
        <img
          src={clase.imagen}
          alt={clase.nombre}
          className="w-full h-auto mb-6 rounded-xl shadow"
        />
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#5c3c00] mb-2">Turnos disponibles:</h2>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {Array.isArray(clase.turnos) ? (
            clase.turnos.map((t, i) => <li key={i}>{t}</li>)
          ) : (
            <li>{clase.turnos}</li>
          )}
        </ul>
      </div>

      <p className="text-gray-600 text-sm mb-6 text-center">
        Para poder reservar esta clase, necesitas iniciar sesión o registrarte.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#b36a4a] text-white px-5 py-2 rounded-lg hover:bg-[#9e5c3f]"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate("/registro")}
          className="bg-[#b36a4a] text-white px-5 py-2 rounded-lg hover:bg-[#9e5c3f]"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

