import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";

export default function HistorialReservasUsuario() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarReservas = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      try {
        const snapshot = await get(ref(dbRealtime, `usuarios/${user.uid}/listaReservas`));
        if (snapshot.exists()) {
          const datos = snapshot.val();
          const reservasArray = Object.values(datos).sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setReservas(reservasArray);
        } else {
          setReservas([]);
        }
      } catch (error) {
        console.error("Error al cargar historial de reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarReservas();
  }, []);

  if (loading) return <p className="text-center">Cargando reservas...</p>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-[#3b3025] mb-4 text-center">
        Mis reservas realizadas
      </h3>
      {reservas.length === 0 ? (
        <p className="text-center text-gray-500">Aún no has hecho ninguna reserva.</p>
      ) : (
        <ul className="space-y-4">
          {reservas.map((reserva, idx) => (
            <li
              key={idx}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-sm text-[#333]"
            >
              <p><strong>Clase:</strong> {reserva.clase}</p>
              <p><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</p>
              <p><strong>Turno:</strong> {reserva.turno}</p>
              <p><strong>Método:</strong> {reserva.metodo || "N/A"}</p>
              <p><strong>Plazas:</strong> {reserva.plazas}</p>
              <p><strong>Reserva vía:</strong> {reserva.tipoReserva === "tarjetaRegalo" ? "Tarjeta regalo" : "Normal"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
