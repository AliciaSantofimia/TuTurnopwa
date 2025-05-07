import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { db } from "./firebase.js";
import { ref, push, get, child } from "firebase/database";

registerLocale("es", es);

export default function ReservaEdicionPremium() {
  const [fecha, setFecha] = useState(null);
  const [turno, setTurno] = useState("");
  const [tipo, setTipo] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [plazasDisponibles, setPlazasDisponibles] = useState(null);

  // Habilitación de turno 2 (simulado)
  const esTurno1Completo = false;
  const reservasTurno2 = 2;
  const turno2Habilitado = esTurno1Completo && reservasTurno2 >= 3;

  useEffect(() => {
    if (!fecha || !turno || !tipo) {
      setPlazasDisponibles(null);
      return;
    }

    const fechaStr = fecha.toISOString().split("T")[0];
    const ruta = `reservas/Edición Premium/${fechaStr}/${turno}/${tipo}`;

    get(child(ref(db), ruta))
      .then((snapshot) => {
        let totalReservadas = 0;
        snapshot.forEach((child) => {
          totalReservadas += child.val().plazas;
        });

        const maximo = tipo === "torno" ? 12 : 33;
        const disponibles = maximo - totalReservadas;
        setPlazasDisponibles(disponibles);
      })
      .catch((error) => {
        console.error("Error al obtener plazas:", error);
        setPlazasDisponibles(null);
      });
  }, [fecha, turno, tipo]);

  const handleReserva = () => {
    if (!fecha || !turno || !tipo) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }

    const reserva = {
      clase: "Edición Premium",
      fecha: fecha.toISOString().split("T")[0],
      turno: turno,
      tipo: tipo,
      plazas: parseInt(plazas),
    };

    push(ref(db, `reservas/Edición Premium/${reserva.fecha}/${turno}/${tipo}`), reserva)
      .then(() => {
        alert("Reserva guardada con éxito");
      })
      .catch((error) => {
        console.error("Error al guardar la reserva:", error);
      });
  };

  return (
    <div className="bg-[#fffef4] min-h-screen font-sans p-4 max-w-md mx-auto flex flex-col justify-between">
      <div>
        <h1
          className="text-3xl font-bold text-yellow-900 text-center mb-4"
          style={{ fontFamily: "Barriecito" }}
        >
          Reserva - Edición Premium
        </h1>

        {/* Fecha */}
        <label className="block mb-2 font-semibold text-sm text-gray-700">
          Selecciona el día:
        </label>
        <DatePicker
          locale="es"
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full p-2 border rounded"
          minDate={new Date("2025-01-01")}
          maxDate={new Date("2025-12-31")}
          placeholderText="Elige una fecha de 2025"
        />

        {/* Turno */}
        <label className="block mt-4 mb-2 font-semibold text-sm text-gray-700">
          Selecciona el turno:
        </label>
        <select
          value={turno}
          onChange={(e) => setTurno(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Elige turno --</option>
          <option value="10:00 - 15:00">10:00 - 15:00</option>
          {turno2Habilitado ? (
            <option value="16:00 - 21:00">16:00 - 21:00</option>
          ) : (
            <option value="16:00 - 21:00" disabled>
              16:00 - 21:00 (lista de espera)
            </option>
          )}
        </select>

        {/* Tipo de modelado */}
        <label className="block mt-4 mb-2 font-semibold text-sm text-gray-700">
          Tipo de modelado:
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setTipo("mano")}
            className={`flex-1 py-2 rounded-full border ${
              tipo === "mano"
                ? "bg-yellow-300 text-white"
                : "bg-white text-yellow-700 border-yellow-400"
            }`}
          >
            ✋ A mano
          </button>
          <button
            onClick={() => setTipo("torno")}
            className={`flex-1 py-2 rounded-full border ${
              tipo === "torno"
                ? "bg-yellow-300 text-white"
                : "bg-white text-yellow-700 border-yellow-400"
            }`}
            disabled={plazasDisponibles === 0 && tipo === "torno"}
          >
            ⚙️ Torno
          </button>
        </div>

        {/* Plazas disponibles */}
        {plazasDisponibles !== null && (
          <p className="text-sm mt-2 text-gray-600">
            Quedan {plazasDisponibles} plazas disponibles para este turno y
            método
          </p>
        )}

        {/* Número de plazas */}
        <label className="block mt-4 mb-2 font-semibold text-sm text-gray-700">
          ¿Cuántas plazas deseas reservar?
        </label>
        <input
          type="number"
          min="1"
          max={plazasDisponibles || 1}
          value={plazas}
          onChange={(e) => setPlazas(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />

        {/* Botón confirmar */}
        <button
          className="w-full bg-yellow-500 text-white py-2 rounded-full mt-6 hover:bg-yellow-600 transition"
          onClick={handleReserva}
          disabled={plazas > (plazasDisponibles || 0)}
        >
          Confirmar y pagar
        </button>
      </div>

      {/* Logo en el pie */}
      <div className="mt-10 text-center">
      <img
  src="/img/logoPC.png"
  alt="TuTurno logo"
  className="mx-auto w-24 h-auto"
/>
      </div>
    </div>
  );
}

