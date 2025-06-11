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
        // Leer listaReservas (antiguas)
        const refAntiguas = ref(dbRealtime, `usuarios/${user.uid}/listaReservas`);
        const snapAntiguas = await get(refAntiguas);
        const reservasAntiguas = snapAntiguas.exists()
          ? Object.values(snapAntiguas.val())
          : [];

        // Leer reservas (nuevas)
        const refNuevas = ref(dbRealtime, `usuarios/${user.uid}/reservas`);
        const snapNuevas = await get(refNuevas);
        const reservasNuevas = snapNuevas.exists()
          ? Object.values(snapNuevas.val())
          : [];

        // Combinar y ordenar
        const combinadas = [...reservasAntiguas, ...reservasNuevas].sort(
          (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
        );

        setReservas(combinadas);
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
              <p><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString("es-ES")}</p>
              <p><strong>Turno:</strong> {reserva.turno}</p>
              <p><strong>Ubicación:</strong> {reserva.tipo || "—"}</p>
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
