import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PintaTuPiezaRegalo() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen text-gray-800">
      <button
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/menu");
          }
        }}
        className="text-sm text-blue-600 underline mb-4"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-serif font-bold mb-4 text-yellow-900">Pinta tu pieza</h1>

      <img src="/img/tarjetapintatupieza.jpg" alt="Pinta tu pieza" className="w-64 h-auto mb-4" />

      <p className="mb-4">
        Una sesión de 3 horas para decorar una pieza ya hecha, con esmaltes cerámicos. Muy relajante y creativo.
      </p>

      <p className="mt-6 text-orange-700 font-semibold">
        Para regalar esta clase,{" "}
        <Link to="/registro" className="underline">regístrate aquí</Link>.
      </p>
      <button
  onClick={() => navigate("/reserva-pinta-tu-pieza-regalo")}
  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
>
  Reservar ahora con tu tarjeta regalo
</button>

    </div>
  );
}

