import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { contarPlazasPorMetodo } from "./utils/contarPlazasDia";
import BloqueoReserva from "./BloqueoReserva";

export default function ReservaPintaTuPiezaRegalo() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("modelado");
  const [bloqueado, setBloqueado] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  const turnos = ["12:00 - 15:00", "18:00 - 21:00"];
  const diasPermitidos = ["martes", "miércoles", "jueves", "sábado"];
  const añoPermitido = 2025;

  const maxTorno = 12;
  const maxTotal = 45;

  const esFechaPermitida = (fechaStr) => {
    const fechaObj = new Date(fechaStr);
    const diaSemana = fechaObj.toLocaleDateString("es-ES", { weekday: "long" });
    return diasPermitidos.includes(diaSemana.toLowerCase()) && fechaObj.getFullYear() === añoPermitido;
  };

  const handleReserva = async () => {
    if (!fecha || !turno || !metodo || !uid) return;

    const plazas = await contarPlazasPorMetodo("Pinta tu pieza de cerámica", fecha, turno);
    const plazasTorno = plazas["torno"] || 0;
    const plazasModelado = plazas["modelado"] || 0;
    const total = plazasTorno + plazasModelado;

    if ((metodo === "torno" && plazasTorno >= maxTorno) || total >= maxTotal) {
      setBloqueado(true);
      return;
    }

    const nuevaReserva = {
      uid,
      clase: "Pinta tu pieza de cerámica",
      fecha,
      turno,
      metodo,
      esRegalo: true,
      estado: "activa",
      timestamp: Date.now()
    };

    const reservasRef = ref(dbRealtime, "reservas");
    await push(reservasRef, nuevaReserva);

    navigate("/resumen-pago", { state: { ...nuevaReserva } });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Reserva con tarjeta regalo: Pinta tu pieza</h1>

      <label className="block mb-2">Selecciona la fecha:</label>
      <input
        type="date"
        className="border p-2 w-full mb-4"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <label className="block mb-2">Selecciona el turno:</label>
      <select
        className="border p-2 w-full mb-4"
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
      >
        <option value="">-- Elige un turno --</option>
        {turnos.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label className="block mb-2">¿Con torno o modelado a mano?</label>
      <select
        className="border p-2 w-full mb-4"
        value={metodo}
        onChange={(e) => setMetodo(e.target.value)}
      >
        <option value="modelado">Modelado a mano</option>
        <option value="torno">Torno</option>
      </select>

      {bloqueado && <BloqueoReserva />}

      <button
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 w-full"
        onClick={handleReserva}
        disabled={!fecha || !turno || !esFechaPermitida(fecha)}
      >
        Confirmar reserva
      </button>
    </div>
  );
}
