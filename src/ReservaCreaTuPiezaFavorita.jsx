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

export default function ReservaCreaTuPiezaFavorita() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [tipoPieza, setTipoPieza] = useState("");
  const [plazas, setPlazas] = useState(1);
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
    if (tipoPieza === "cuenco_taza") return 55;
    if (tipoPieza === "frutero_grande") return 65;
    if (tipoPieza === "jarron_grande") return 75;
    return 0;
  };

  const getNombreTipoPieza = () => {
    if (tipoPieza === "cuenco_taza") return "Cuenco o taza";
    if (tipoPieza === "frutero_grande") return "Frutero / cuenco grande";
    if (tipoPieza === "jarron_grande") return "Jarrón grande";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!fecha || !turno || !metodo || !tipoPieza) {
      alert("Selecciona tipo de pieza, fecha, turno y método.");
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
      const nombreTipoPieza = getNombreTipoPieza();
      const orderId = Date.now().toString().slice(-12);

     const reserva = {
  clase: "Crea tu pieza favorita desde cero",
  claseId: "creatupiezafavorita",
  tipoPieza,
  nombreTipoPieza,
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
        `reservas/CreaTuPiezaFavorita/${fecha}/${turno}/${metodo}`
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
          clase: "Crea tu pieza favorita desde cero",
          subtipo: nombreTipoPieza,
          tipoPieza,
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
          Reserva – Crea tu pieza favorita
        </h1>

        {desdeTarjeta && (
          <p className="text-sm text-green-700 text-center font-medium mb-4">
            Estás usando una tarjeta regalo 🎁
          </p>
        )}

        <BloqueoReserva>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tipoPieza" className="block font-bold text-sm mb-1">
                Tipo de pieza:
              </label>
              <select
                id="tipoPieza"
                value={tipoPieza}
                onChange={(e) => setTipoPieza(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              >
                <option value="">-- Elige una opción --</option>
                <option value="cuenco_taza">Cuenco o taza — 55€</option>
                <option value="frutero_grande">Frutero / cuenco grande — 65€</option>
                <option value="jarron_grande">Jarrón grande — 75€</option>
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
                onChange={(e) => setPlazas(Number(e.target.value))}
                min="1"
                max={plazasDisponibles || 1}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              />
            </div>

            {tipoPieza && (
              <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
                <p>
                  <strong>Tipo elegido:</strong> {getNombreTipoPieza()}
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
                !tipoPieza ||
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