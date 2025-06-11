import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { contarPlazasPorMetodo } from "./utils/contarPlazasDia";
import BloqueoReserva from "./BloqueoReserva";

const actualizarContadorReservas = async (uid) => {
  const userRef = ref(dbRealtime, "usuarios/" + uid);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const datos = snapshot.val();
    const nuevasReservas = (datos.reservas || 0) + 1;
    await update(userRef, {
      reservas: nuevasReservas
    });
  }
};

export default function ReservaBono4Clases() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [ocupadasTorno, setOcupadasTorno] = useState(0);
  const [ocupadasModelado, setOcupadasModelado] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const desdeTarjeta = location.state?.desdeTarjeta || false;

  const maxTorno = 12;
  const maxModelado = 33;

  useEffect(() => {
    if (fecha) {
      contarPlazasPorMetodo(fecha).then(({ torno, modelado }) => {
        setOcupadasTorno(torno);
        setOcupadasModelado(modelado);
      });
    }
  }, [fecha]);

  const plazasDisponibles =
    metodo === "torno"
      ? Math.max(maxTorno - ocupadasTorno, 0)
      : metodo === "modelado a mano"
      ? Math.max(maxModelado - ocupadasModelado, 0)
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("Usuario no autenticado.");
      return;
    }

    if (plazas > plazasDisponibles) {
      alert("No hay suficientes plazas disponibles para este método.");
      return;
    }

    const reserva = {
      clase: "Bono 4 Clases",
      fecha,
      turno,
      metodo,
      precio: "79€",
      plazas: Number(plazas),
      timestamp: new Date().toISOString(),
      tipoReserva: desdeTarjeta ? "tarjetaRegalo" : "normal"
    };

    try {
      const generalRef = ref(
        dbRealtime,
        `reservas/Bono4Clases/${fecha}/${turno}/${metodo}`
      );
      await push(generalRef, {
        uid: user.uid,
        ...reserva
      });

      const userHistorialRef = ref(
        dbRealtime,
        `usuarios/${user.uid}/historialReservas`
      );
      await push(userHistorialRef, reserva);

      await actualizarContadorReservas(user.uid);

      if (desdeTarjeta) {
        navigate("/generar-codigo", {
          state: reserva
        });
      } else {
        navigate("/resumen-pago", {
          state: reserva
        });
      }
    } catch (err) {
      console.error("Error al guardar la reserva:", err);
    }
  };

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6">
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

        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-4">
          Reserva – Bono 4 Clases
        </h1>

        {desdeTarjeta && (
          <p className="text-sm text-green-700 text-center font-medium mb-4">
            Estás usando una tarjeta regalo 🎁
          </p>
        )}

        <BloqueoReserva>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fecha" className="block font-bold text-sm mb-1">
                Selecciona el día:
              </label>
              <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min="2025-01-01"
                max="2025-12-31"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="turno" className="block font-bold text-sm mb-1">
                Selecciona el turno:
              </label>
              <select
                id="turno"
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              >
                <option value="">-- Elige turno --</option>
                <option value="12:00-15:00">12:00 – 15:00 (mañana)</option>
                <option value="18:00-21:00">18:00 – 21:00 (tarde)</option>
              </select>
            </div>

            <div>
              <label htmlFor="metodo" className="block font-bold text-sm mb-1">
                Método:
              </label>
              <select
                id="metodo"
                value={metodo}
                onChange={(e) => setMetodo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              >
                <option value="">-- Selecciona --</option>
                <option value="torno">Torno</option>
                <option value="modelado a mano">Modelado a mano</option>
              </select>
            </div>

            {metodo && (
              <p className="text-sm text-gray-600">
                Quedan {plazasDisponibles} plazas disponibles para este método.
              </p>
            )}

            <div>
              <label htmlFor="plazas" className="block font-bold text-sm mb-1">
                ¿Cuántas plazas deseas reservar?
              </label>
              <input
                type="number"
                id="plazas"
                value={plazas}
                onChange={(e) => setPlazas(e.target.value)}
                min="1"
                max={plazasDisponibles || 1}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold text-lg py-3 rounded-full transition"
              disabled={!metodo || plazas > plazasDisponibles}
            >
              Confirmar y pagar
            </button>
          </form>
        </BloqueoReserva>

        <div className="mt-8 text-center">
          <img src="/img/logoPCsin.png" alt="La Purísima Conchi" className="w-20 mx-auto" />
        </div>
      </div>
    </div>
  );
}


