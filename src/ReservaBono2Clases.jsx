
// OBSOLETO - pendiente de borrar cuando se haga limpieza del proyectoimport React, { useState, useEffect } from "react";
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
const toISODate = (d) => d.toISOString().slice(0, 10);

const todayISO = toISODate(new Date());
const maxISO = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 2); // +2 años (cambia si quieres)
  return toISODate(d);
})();

export default function ReservaBono2Clases() {
  const [fecha, setFecha] = useState("");
  const [metodo, setMetodo] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [ocupadasTorno, setOcupadasTorno] = useState(0);
  const [ocupadasModelado, setOcupadasModelado] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const desdeTarjetaRegalo = location.state?.desdeTarjetaRegalo || false;


  const maxTorno = 12;
  const maxModelado = 33;

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

  const plazasDisponibles =
    metodo === "torno"
      ? Math.max(maxTorno - ocupadasTorno, 0)
      : metodo === "modelado a mano"
      ? Math.max(maxModelado - ocupadasModelado, 0)
      : 0;

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) return;

  // calcular total como número
  const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;
  const PRECIO_UNITARIO = 70;
  const totalEuros = PRECIO_UNITARIO * plazasNum;

  const reserva = {
    clase: "Bono 2 Clases",
    fecha,
    turno: "Flexible",
    metodo,
    precio: totalEuros,
    plazas: plazasNum,
    desdeTarjetaRegalo,
    timestamp: new Date().toISOString()
  };

  try {
    const generalRef = ref(
      dbRealtime,
      `reservas/Bono2Clases/${fecha}/Flexible/${metodo}`
    );
    await push(generalRef, { uid: user.uid, ...reserva });

    const historialRef = ref(
      dbRealtime,
      `usuarios/${user.uid}/historialReservas`
    );
    await push(historialRef, reserva);

    // ✅ NUEVO: guardar también como reserva activa
    const userReservaRef = ref(dbRealtime, `usuarios/${user.uid}/reservas`);
    await push(userReservaRef, reserva);

    await actualizarContadorReservas(user.uid);

    if (desdeTarjetaRegalo) {
      navigate("/generar-codigo", {
        state: { tipo: "2clases" }
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
  onClick={() => navigate(-1)}
  className="text-gray-700 hover:text-black text-xl mb-4"
>
  ←
</button>




        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-4">
          Reserva – Bono 2 Clases
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
                Selecciona el día:
              </label>
              <input
  type="date"
  id="fecha"
  value={fecha}
  onChange={(e) => setFecha(e.target.value)}
  min={todayISO}
  max={maxISO}
  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
  required
/>
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

            <div className="text-sm text-gray-600">
              El horario de tus clases será acordado directamente con el taller.
              <br />
              Recibirás un email o WhatsApp de confirmación.
            </div>

            {metodo && (
              <div className="text-sm text-gray-600 mt-2">
                Quedan {plazasDisponibles} plazas disponibles para este método.
              </div>
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
              disabled={!metodo || plazas > plazasDisponibles}
              className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold text-lg py-3 rounded-full transition"
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





