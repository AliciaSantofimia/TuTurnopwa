
// OBSOLETO - pendiente de borrar cuando se haga limpieza del proyecto// src/Reserva4clases3hmesRegalo.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, push, set, get, child } from "firebase/database";
import { dbRealtime } from "./firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BotonVolver from "./BotonVolver";
import DateInputReserva from "./components/DateInputReserva";


export default function Reserva4clases3hmesRegalo() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const user = auth.currentUser;

  const [fecha, setFecha] = useState(null);
  const [turno, setTurno] = useState("");
  const [mensaje, setMensaje] = useState("");

  const codigo = location.state?.codigo || "";
  const turnos = ["10:00-13:00", "17:00-20:00"];
  const diasPermitidos = [2, 3, 4, 6]; // martes, miércoles, jueves, sábado

  const isDiaPermitido = (date) => diasPermitidos.includes(date.getDay());

  const handleReserva = async () => {
    if (!fecha || !turno) {
      setMensaje("Por favor, elige una fecha y turno.");
      return;
    }

    if (!user) {
      setMensaje("Debes iniciar sesión para hacer la reserva.");
      return;
    }

    const fechaFormateada = fecha.toISOString().split("T")[0];
    const ruta = `reservas/4clases3hmesRegalo/${fechaFormateada}/${turno}`;

    const snapshot = await get(child(ref(dbRealtime), ruta));
    let plazasOcupadas = 0;
    if (snapshot.exists()) {
      snapshot.forEach((res) => {
        plazasOcupadas += res.val().plazas || 0;
      });
    }

    const plazasMaximas = 45;
    if (plazasOcupadas >= plazasMaximas) {
      alert("No hay plazas disponibles en este turno.");
      return;
    }

    const reserva = {
      uid: user.uid,
      email: user.email,
      clase: "4 clases de 3h al mes (tarjeta regalo)",
      fecha: fechaFormateada,
      turno,
      metodo: "general",
      ubicacion: "La Purísima Conchi",
      plazas: 1,
      reservaVia: "Tarjeta regalo",
      codigoCanjeado: codigo,
      timestamp: Date.now()
    };

    try {
      const nuevaRef = push(ref(dbRealtime, ruta));
      await set(nuevaRef, reserva);

      const userReservaRef = push(ref(dbRealtime, `usuarios/${user.uid}/reservas`));
      await set(userReservaRef, reserva);

      navigate("/perfil");
    } catch (err) {
      console.error("Error al guardar reserva:", err);
      setMensaje("Error al guardar la reserva. Intenta más tarde.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffef4] p-6 flex items-center justify-center">
      <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-md">
        <BotonVolver volverA="/perfil" />

        <h2 className="text-2xl font-bold text-center text-[#5c3c00] mb-4">
          Reserva – 4 clases de 3h/mes (Tarjeta regalo)
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Selecciona la fecha:</label>
            <DatePicker
              selected={fecha}
              onChange={(date) => setFecha(date)}
              filterDate={isDiaPermitido}
              placeholderText="Elige una fecha"
              dateFormat="dd/MM/yyyy"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Selecciona el turno:</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
            >
              <option value="">-- Elige turno --</option>
              {turnos.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReserva}
            className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold py-2 rounded-full mt-4"
          >
            Confirmar reserva
          </button>

          {mensaje && <p className="text-sm text-red-600 mt-2">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}
