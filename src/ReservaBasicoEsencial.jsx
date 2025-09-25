import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { contarPlazasPorMetodo } from "./utils/contarPlazasDia";
import BloqueoReserva from "./BloqueoReserva";
import BotonVolver from "./BotonVolver";

const actualizarContadorReservas = async (uid) => {
  const userRef = ref(dbRealtime, "usuarios/" + uid);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const datos = snapshot.val();
    const nuevasReservas = (datos.reservas || 0) + 1;
    await update(userRef, { reservas: nuevasReservas });
  }
};

export default function ReservaBasicoEsencial() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [ocupadasTorno, setOcupadasTorno] = useState(0);
  const [ocupadasModelado, setOcupadasModelado] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const desdeTarjetaRegalo = location.state?.desdeTarjetaRegalo || false;

  const maxTorno = 12;
  const maxTotales = 45;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (fecha) {
      contarPlazasPorMetodo(fecha).then(({ torno, modelado }) => {
        setOcupadasTorno(torno);
        setOcupadasModelado(modelado);
      });
    }
  }, [fecha]);

  const plazasTotalesOcupadas = ocupadasTorno + ocupadasModelado;
  const plazasDisponibles =
    metodo === "torno"
      ? Math.max(Math.min(maxTorno - ocupadasTorno, maxTotales - plazasTotalesOcupadas), 0)
      : metodo === "modelado a mano"
      ? Math.max(maxTotales - plazasTotalesOcupadas, 0)
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!fecha || !turno || !metodo) {
      alert("Selecciona fecha, turno y método.");
      return;
    }

    const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;
    if (plazasDisponibles <= 0 || plazasNum > plazasDisponibles) {
      alert("No hay plazas suficientes para este método y turno.");
      return;
    }

    try {
      const PRECIO_UNITARIO = 55;
      const totalEuros = PRECIO_UNITARIO * plazasNum;

      const orderId = Date.now().toString().slice(-12);

      const reserva = {
        clase: "Básico Esencial",
        fecha,
        turno,
        metodo,
        plazas: plazasNum,
        desdeTarjetaRegalo,
        precio: totalEuros,
        estadoPago: "pendiente",
        orderId,
        timestamp: new Date().toISOString(),
      };

      const reservaRef = ref(dbRealtime, `reservas/BasicoEsencial/${fecha}/${turno}/${metodo}`);
      await push(reservaRef, { uid: user.uid, ...reserva });

      const historialRef = ref(dbRealtime, `usuarios/${user.uid}/historialReservas`);
      await push(historialRef, reserva);

      const userReservaRef = ref(dbRealtime, `usuarios/${user.uid}/reservas`);
      await push(userReservaRef, reserva);

      await actualizarContadorReservas(user.uid);

      if (desdeTarjetaRegalo) {
        navigate("/generar-codigo", { state: { tipo: "2clases" } });
        return;
      }

      navigate("/resumen-pago", {
        state: {
          desdeTarjeta: false,
          tipo: "clase",
          clase: "Básico Esencial",
          precio: totalEuros,
          fecha,
          turno,
          metodo,
          plazas: plazasNum,
          orderId,
        },
      });
    } catch (err) {
      console.error("Error al guardar la reserva:", err);
      alert("No se pudo guardar la reserva.");
    }
  };

  const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6">
        <BotonVolver />

        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-6">
          Reserva – Básico Esencial
        </h1>

        {desdeTarjetaRegalo && (
          <p className="text-sm text-green-700 text-center font-medium mb-4">
            Estás usando una tarjeta regalo 🎁
          </p>
        )}

        <BloqueoReserva>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fecha" className="block font-bold text-sm mb-1">
                Selecciona fecha:
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
                Selecciona turno:
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
              <div className="text-sm text-gray-600">
                Quedan {plazasDisponibles} plazas disponibles para este método.
              </div>
            )}

            <div>
              <label htmlFor="plazas" className="block font-bold text-sm mb-1">
                ¿Cuántas plazas?
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
              disabled={!metodo || plazasNum > plazasDisponibles || plazasDisponibles <= 0}
            >
              Confirmar y pagar
            </button>
          </form>
        </BloqueoReserva>

        <div className="mt-8 text-center">
          <img
            src="/img/logoPCsin.png"
            alt="La Purísima Conchi"
            className="w-20 mx-auto"
          />
        </div>
      </div>
    </div>
  );
}



