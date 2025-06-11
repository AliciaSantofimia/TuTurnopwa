import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, push, update } from "firebase/database";
import { dbRealtime } from "./firebase";

export default function ResumenPagoKarma() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const { fecha, turno, plazas, metodo } = location.state || {};
  const precioClase = 25;
  const total = precioClase * (plazas || 1);

  const handleConfirmarPago = async () => {
    if (!user) return;

    // Guardar reserva en el nodo de reservas
    const nuevaReservaRef = ref(dbRealtime, `reservas_karma/${fecha}/${turno}`);
    const nuevaReserva = {
      uid: user.uid,
      email: user.email,
      fecha,
      turno,
      plazas,
      metodo,
      precio: total,
      timestamp: Date.now(),
    };
    push(nuevaReservaRef, nuevaReserva);

    // Guardar en el perfil del usuario
    const userReservaRef = ref(dbRealtime, `usuarios/${user.uid}/reservas`);
    push(userReservaRef, {
      tipo: "Karma by Tearium",
      fecha,
      turno,
      plazas,
      metodo,
      precio: total,
    });

    // Redirigir al perfil
    navigate("/perfilusuario");
  };

  return (
    <div className="min-h-screen bg-[#fffef4] p-6 font-sans">
      <h1 className="text-2xl font-bold text-yellow-900 mb-4">
        Resumen de tu reserva en Karma by Tearium
      </h1>
      <div className="bg-white rounded-xl shadow-md p-4 border-l-8 border-blue-400 mb-6">
        <p className="text-gray-800 font-semibold">Fecha: {fecha}</p>
        <p className="text-gray-800 font-semibold">Turno: {turno}</p>
        <p className="text-gray-800 font-semibold">Plazas: {plazas}</p>
        <p className="text-gray-800 font-semibold">Método: {metodo}</p>
        <p className="text-gray-800 font-semibold mt-2">Precio por plaza: 25€</p>
        <p className="text-xl font-bold text-yellow-700 mt-2">Total: {total}€</p>
      </div>
      <button
        onClick={handleConfirmarPago}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition"
      >
        Confirmar y pagar
      </button>
    </div>
  );
}
