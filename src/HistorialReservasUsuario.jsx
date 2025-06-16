import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, get, set, remove } from "firebase/database";
import { dbRealtime } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function HistorialReservasUsuario() {
  const [reservasFuturas, setReservasFuturas] = useState([]);
  const [reservasPasadas, setReservasPasadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarYFiltrarReservas = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      try {
        const uid = user.uid;
        const hoy = new Date().setHours(0, 0, 0, 0);

        const refReservas = ref(dbRealtime, `usuarios/${uid}/reservas`);
        const snapReservas = await get(refReservas);
        const futuras = [];
        const pasadas = [];

        if (snapReservas.exists()) {
          const todas = Object.entries(snapReservas.val());

          for (const [key, reserva] of todas) {
            const fechaReserva = new Date(reserva.fecha).setHours(0, 0, 0, 0);

            if (fechaReserva < hoy) {
              const refHistorial = ref(dbRealtime, `usuarios/${uid}/historialReservas/${key}`);
              await set(refHistorial, reserva);
              await remove(ref(dbRealtime, `usuarios/${uid}/reservas/${key}`));
              pasadas.push(reserva);
            } else {
              futuras.push(reserva);
            }
          }
        }

        const refHistorial = ref(dbRealtime, `usuarios/${uid}/historialReservas`);
        const snapHistorial = await get(refHistorial);
        const historial = snapHistorial.exists() ? Object.values(snapHistorial.val()) : [];

        setReservasPasadas([...pasadas, ...historial].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)));
        setReservasFuturas(futuras.sort((a, b) => (a.fecha > b.fecha ? 1 : -1)));
      } catch (error) {
        console.error("Error al cargar o mover reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarYFiltrarReservas();
  }, []);

  if (loading) return <p className="text-center">Cargando reservas...</p>;

  return (
    <div className="mt-8 px-4">
      {/* 🟡 Botón Volver */}
      <button
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/perfil");
          }
        }}
        className="text-sm text-blue-600 underline mb-4"
      >
        ← Volver
      </button>

      <h3 className="text-lg font-semibold text-[#3b3025] mb-4 text-center">📌 Reservas activas</h3>
      {reservasFuturas.length === 0 ? (
        <p className="text-center text-gray-500">No tienes reservas futuras.</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {reservasFuturas.map((reserva, idx) => (
            <ReservaItem key={idx} reserva={reserva} />
          ))}
        </ul>
      )}

      <h3 className="text-lg font-semibold text-[#3b3025] mb-4 text-center">📜 Historial de reservas</h3>
      {reservasPasadas.length === 0 ? (
        <p className="text-center text-gray-500">No hay reservas anteriores.</p>
      ) : (
        <ul className="space-y-4">
          {reservasPasadas.map((reserva, idx) => (
            <ReservaItem key={idx} reserva={reserva} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ReservaItem({ reserva }) {
  return (
    <li className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-sm text-[#333]">
      <p><strong>Clase:</strong> {reserva.clase}</p>
      <p><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString("es-ES")}</p>
      <p><strong>Turno:</strong> {reserva.turno}</p>
      <p><strong>Ubicación:</strong> {reserva.ubicacion || "—"}</p>
      <p><strong>Método:</strong> {reserva.metodo || "N/A"}</p>
      <p><strong>Plazas:</strong> {reserva.plazas}</p>
      <p><strong>Reserva vía:</strong> {reserva.tipoReserva === "tarjetaRegalo" ? "Tarjeta regalo" : "Normal"}</p>
    </li>
  );
}

