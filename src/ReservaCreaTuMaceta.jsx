import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

export default function ReservaCreaTuMaceta() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [tamanoMaceta, setTamanoMaceta] = useState("");
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
      ? Math.max(
          Math.min(maxTorno - ocupadasTorno, maxTotales - plazasTotalesOcupadas),
          0
        )
      : metodo === "modelado a mano"
      ? Math.max(maxTotales - plazasTotalesOcupadas, 0)
      : 0;

  const getPrecioUnitario = () => {
    if (tamanoMaceta === "estandar") return 55;
    if (tamanoMaceta === "mediana") return 65;
    if (tamanoMaceta === "grande") return 75;
    return 0;
  };

  const getNombreTamano = () => {
    if (tamanoMaceta === "estandar") return "Estándar hasta 12 cm";
    if (tamanoMaceta === "mediana") return "Mediana hasta 20 cm";
    if (tamanoMaceta === "grande") return "Grande hasta 30 cm";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!fecha || !turno || !metodo || !tamanoMaceta) {
      alert("Selecciona tamaño, fecha, turno y método.");
      return;
    }

    const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;

    if (plazasDisponibles <= 0 || plazasNum > plazasDisponibles) {
      alert("No hay plazas suficientes para este método y turno.");
      return;
    }

    try {
      const precioUnitario = getPrecioUnitario();
      const precioTotal = precioUnitario * plazasNum;
      const nombreTamano = getNombreTamano();
      const orderId = Date.now().toString().slice(-12);

      const reserva = {
        clase: "Crea tu maceta",
        tamanoMaceta,
        nombreTamano,
        fecha,
        turno,
        metodo,
        plazas: plazasNum,
        desdeTarjeta,
        precio: precioTotal,
        precioUnitario,
        precioTotal,
        estadoPago: "pendiente",
        orderId,
        timestamp: new Date().toISOString(),
      };

      const reservaRef = ref(
        dbRealtime,
        `reservas/CreaTuMaceta/${fecha}/${turno}/${metodo}`
      );
      await push(reservaRef, { uid: user.uid, ...reserva });

      const historialRef = ref(dbRealtime, `usuarios/${user.uid}/historialReservas`);
      await push(historialRef, reserva);

      const userReservaRef = ref(dbRealtime, `usuarios/${user.uid}/reservas`);
      await push(userReservaRef, reserva);

      await actualizarContadorReservas(user.uid);

      navigate("/resumen-pago", {
        state: {
          desdeTarjeta,
          tipo: "clase",
          clase: "Crea tu maceta",
          subtipo: nombreTamano,
          tamanoMaceta,
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

  const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;
  const precioUnitario = getPrecioUnitario();
  const precioTotal = precioUnitario * plazasNum;

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6">
        <BotonVolver />

        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-6">
          Reserva – Crea tu maceta
        </h1>

        {desdeTarjeta && (
          <p className="text-sm text-green-700 text-center font-medium mb-4">
            Estás usando una tarjeta regalo 🎁
          </p>
        )}

        <BloqueoReserva>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tamanoMaceta" className="block font-bold text-sm mb-1">
                Tamaño de la maceta:
              </label>
              <select
                id="tamanoMaceta"
                value={tamanoMaceta}
                onChange={(e) => setTamanoMaceta(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              >
                <option value="">-- Elige una opción --</option>
                <option value="estandar">Estándar hasta 12 cm — 55€</option>
                <option value="mediana">Mediana hasta 20 cm — 65€</option>
                <option value="grande">Grande hasta 30 cm — 75€</option>
              </select>
            </div>

            <div>
              <label htmlFor="fecha" className="block font-bold text-sm mb-1">
                Selecciona fecha:
              </label>
              <DateInputReserva
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
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
              <div className="text-sm text-gray-600">
                Quedan {plazasDisponibles} plazas disponibles para este método.
              </div>
            )}

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

            {tamanoMaceta && (
              <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
                <p>
                  <strong>Tamaño elegido:</strong> {getNombreTamano()}
                </p>
                <p>
                  <strong>Precio unitario:</strong> {precioUnitario}€
                </p>
                <p>
                  <strong>Precio total:</strong> {precioTotal}€
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
              disabled={
                !tamanoMaceta ||
                !metodo ||
                plazasNum > plazasDisponibles ||
                plazasDisponibles <= 0
              }
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