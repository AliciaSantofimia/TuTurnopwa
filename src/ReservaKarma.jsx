import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get, set, push, child } from "firebase/database";
import { dbRealtime } from "./firebase";
import { getAuth } from "firebase/auth";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

export default function ReservaKarma() {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [fecha, setFecha] = useState(null);
  const [turno, setTurno] = useState("");
  const [plazas, setPlazas] = useState(1);

  const precio = 25;
  const maxPlazas = 20;

  const turnosDisponibles = [
    "10:00 - 12:00",
    "12:00 - 14:00",
    "18:00 - 20:00"
  ];

  const diasPermitidos = [1, 2, 3, 4, 5]; // lunes a viernes

  const isDiaPermitido = (date) => {
    const dia = date.getDay(); // 0=domingo ... 6=sábado
    return diasPermitidos.includes(dia);
  };

  const handleReserva = async () => {
    if (!user || !fecha || !turno || plazas < 1) return;

    const fechaFormateada = fecha.toISOString().split("T")[0];
    const ruta = `reservas/Karma/${fechaFormateada}/${turno}`;

    const snapshot = await get(child(ref(dbRealtime), ruta));
    let plazasOcupadas = 0;

    if (snapshot.exists()) {
      snapshot.forEach((res) => {
        plazasOcupadas += res.val().plazas || 0;
      });
    }

    if (plazasOcupadas + plazas > maxPlazas) {
      alert("No hay suficientes plazas disponibles para este turno.");
      return;
    }

    const userRef = ref(dbRealtime, "usuarios/" + user.uid);
    const userSnapshot = await get(userRef);
    const nombreUsuario =
      userSnapshot.exists() && userSnapshot.val().nombre
        ? userSnapshot.val().nombre
        : user.displayName || "Sin nombre";

    const reserva = {
      uid: user.uid,
      email: user.email,
      nombre: nombreUsuario,
      clase: "Pinta tu pieza - Karma by Tearium",
      fecha: fechaFormateada,
      turno,
      ubicacion: "Karma by Tearium",
      metodo: "general",
      plazas,
      reservaVia: "Normal",
      precio,
      timestamp: Date.now()
    };

    try {
      const nuevaReservaRef = push(ref(dbRealtime, ruta));
      await set(nuevaReservaRef, reserva);

      const userReservaRef = push(ref(dbRealtime, `usuarios/${user.uid}/reservas`));
      await set(userReservaRef, reserva);

      navigate("/resumenpagokarma", {
        state: {
          ...reserva,
          desdeKarma: true
        }
      });
    } catch (err) {
      console.error("Error al guardar la reserva:", err);
      alert("Hubo un error al hacer la reserva. Intenta más tarde.");
    }
  };

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
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

      <h1 className="text-2xl font-bold text-center mb-2">Pinta tu pieza - Karma by Tearium</h1>
      <p className="text-center text-lg mb-6 text-gray-700">
        Horarios: 10:00 - 12:00, 12:00 - 14:00 y 18:00 - 20:00 (lunes a viernes)
      </p>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-4 space-y-4">
        <div>
          <span className="text-gray-700 font-medium block mb-1">Elige la fecha:</span>
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            filterDate={isDiaPermitido}
            placeholderText="Selecciona una fecha"
            dateFormat="dd/MM/yyyy"
            className="p-2 border rounded w-full"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            locale="es"
          />
        </div>

        <div>
          <span className="text-gray-700 font-medium block mb-1">Elige el turno:</span>
          <select
            className="block w-full rounded border border-gray-300 p-2"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
          >
            <option value="">-- Selecciona --</option>
            {turnosDisponibles.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="text-gray-700 font-medium block mb-1">Número de plazas:</span>
          <input
            type="number"
            min="1"
            max="10"
            className="block w-full rounded border border-gray-300 p-2"
            value={plazas}
            onChange={(e) => setPlazas(Number(e.target.value))}
          />
        </div>

        <div className="text-center pt-4">
          <button
            onClick={handleReserva}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full"
          >
            Confirmar y pagar {precio * plazas} €
          </button>
        </div>
      </div>
    </div>
  );
}
