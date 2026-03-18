import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { contarPlazasPorMetodo } from "./utils/contarPlazasDia";
import BloqueoReserva from "./BloqueoReserva";
import BotonVolver from "./BotonVolver";
import DateInputReserva from "./components/DateInputReserva";

const actualizarContadorReservas = async (uid) => {
  const userRef = ref(dbRealtime, "usuarios/" + uid);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const datos = snapshot.val();
    const nuevasReservas = (datos.reservas || 0) + 1;
    await update(userRef, { reservas: nuevasReservas });
  }
};

const sumar28Dias = (fechaISO) => {
  const d = new Date(fechaISO + "T12:00:00");
  d.setDate(d.getDate() + 28);
  return d.toISOString().slice(0, 10);
};

export default function ReservaCreaTuSetMatcha() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [plazas, setPlazas] = useState("1");
  const [ocupadasTorno, setOcupadasTorno] = useState(0);
  const [ocupadasModelado, setOcupadasModelado] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const desdeTarjeta =
    location.state?.desdeTarjeta || location.state?.desdeTarjetaRegalo || false;

  const maxTorno = 12;
  const maxTotales = 45;

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
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
      ? Math.max(
          Math.min(maxTorno - ocupadasTorno, maxTotales - plazasTotalesOcupadas),
          0
        )
      : metodo === "modelado a mano"
      ? Math.max(maxTotales - plazasTotalesOcupadas, 0)
      : 0;

  const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("Usuario no autenticado.");
      return;
    }

    if (!fecha || !turno || !metodo) {
      alert("Selecciona fecha, turno y método.");
      return;
    }

    if (plazasNum > plazasDisponibles) {
      alert("No hay suficientes plazas disponibles para este método.");
      return;
    }

    try {
      const precioUnitario = 60;
      const precioTotal = precioUnitario * plazasNum;
      const orderId = Date.now().toString().slice(-12);
      const fechaDisponibleSegundaSesion = sumar28Dias(fecha);

     const reserva = {
  clase: "Crea tu set de matcha",
  claseId: "setmatcha",
  tipoTaller: "dos_sesiones",
  fecha,
  fechaPrimeraSesion: fecha,
  turno,
  metodo,
  plazas: plazasNum,
  desdeTarjeta,
  precio: precioTotal,
  precioUnitario,
  precioTotal,
  estadoPago: "pendiente",
  orderId,
  segundaSesion: {
    habilitada: false,
    fechaDisponible: fechaDisponibleSegundaSesion,
    reservada: false,
    fechaReserva: null,
  },
  timestamp: new Date().toISOString(),
};

      const generalRef = ref(
        dbRealtime,
        `reservas/CreaTuSetMatcha/${fecha}/${turno}/${metodo}`
      );
      await push(generalRef, { uid: currentUser.uid, ...reserva });

     const userListaReservasRef = ref(
  dbRealtime,
  `usuarios/${currentUser.uid}/listaReservas`
);
await push(userListaReservasRef, reserva);

      await actualizarContadorReservas(currentUser.uid);

      navigate("/resumen-pago", {
        state: {
          desdeTarjeta,
          tipo: "clase",
          clase: "Crea tu set de matcha",
          precio: precioTotal,
          precioUnitario,
          precioTotal,
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

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6">
        <BotonVolver />

        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-4">
          Reserva – Crea tu set de matcha
        </h1>

        {desdeTarjeta && (
          <p className="text-sm text-green-700 text-center font-medium mb-4">
            Estás usando una tarjeta regalo 🎁
          </p>
        )}

        <BloqueoReserva>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
              <p><strong>Incluye 2 sesiones.</strong></p>
              <p>
                La primera sesión se reserva ahora. La segunda se habilitará a
                partir de 4 semanas después de la primera, y antes deberás
                contactar con el taller para confirmar que tu pieza ya está lista.
              </p>
            </div>

            <div>
              <label htmlFor="fecha" className="block font-bold text-sm mb-1">
                Selecciona el día de la primera sesión:
              </label>
              <DateInputReserva
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
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
                <option value="11:00-15:00">11:00 – 15:00 (mañana)</option>
                <option value="17:00-20:00">17:00 – 20:00 (tarde)</option>
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
              <p className="text-sm text-green-700">
                Quedan {plazasDisponibles} plazas disponibles para este método.
              </p>
            )}

            <div className="text-sm text-gray-600">
              Máximo 45 plazas por día (12 para torno y 33 para modelado a mano).
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">
                ¿Cuántas plazas deseas reservar?
              </label>

              <div className="flex items-center justify-between border border-gray-300 rounded-xl px-3 py-2">
                <button
                  type="button"
                  onClick={() => setPlazas(Math.max(1, plazasNum - 1))}
                  className="text-xl font-bold px-3 py-1 rounded-lg bg-gray-100"
                >
                  −
                </button>

                <span className="text-lg font-semibold">{plazasNum}</span>

                <button
                  type="button"
                  onClick={() =>
                    setPlazas(Math.min(plazasDisponibles || 1, plazasNum + 1))
                  }
                  className="text-xl font-bold px-3 py-1 rounded-lg bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Máximo {plazasDisponibles} plazas disponibles.
              </p>
            </div>

            {fecha && (
              <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
                <p><strong>Precio unitario:</strong> 60€</p>
                <p><strong>Precio total:</strong> {60 * plazasNum}€</p>
                <p>
                  <strong>Segunda sesión disponible a partir de:</strong>{" "}
                  {sumar28Dias(fecha)}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 rounded-full text-white font-semibold
              bg-gradient-to-b from-[#F6D66A] to-[#F4C542]
              shadow-md hover:shadow-lg
              hover:from-[#F4C542] hover:to-[#E5B92F]
              transition-all duration-200"
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



