import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="bg-[#fdfaf5] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Clases disponibles
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {clases.map((clase) => (
          <div
            key={clase.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/${clase.id.toLowerCase().replace(/\s+/g, "-")}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{clase.nombre}</h2>
            <p className="text-gray-700 mb-2">{clase.descripcion || "Sin descripción"}</p>
            <p className="text-gray-600 italic">Duración: {clase.duracion || "—"}</p>
            <p className="text-gray-600 italic">Precio: {clase.precio || "—"}</p>
            <p className="text-sm text-red-500 mt-4 font-medium">
              🔒 Inicia sesión para poder reservar esta clase.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
