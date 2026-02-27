// IMPORTS
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { contarPlazasPorMetodo } from "./utils/contarPlazasDia";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver"; 
import DateInputReserva from "./components/DateInputReserva";

// FUNCIONES
const actualizarContadorReservas = async (uid) => {
  const userRef = ref(dbRealtime, "usuarios/" + uid);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const datos = snapshot.val();
    const nuevasReservas = (datos.reservas || 0) + 1;
    await update(userRef, { reservas: nuevasReservas });
  }
};

// COMPONENTE
export default function ReservaFundamentalMini() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [ocupadasTorno, setOcupadasTorno] = useState(0);
  const [ocupadasModelado, setOcupadasModelado] = useState(0);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [mensajeEspera, setMensajeEspera] = useState(false);

  const navigate = useNavigate();

  const maxTorno = 12;
  const maxModelado = 33;

  const turnosConListaEspera = ["10:00-12:00", "16:00-18:00"];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuarioLogueado(!!user);
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

      const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;
const PRECIO_UNITARIO = 35;              // Fundamental Mini
const totalEuros = PRECIO_UNITARIO * plazasNum;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fecha || !turno || !metodo || !plazas) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const esTurnoEnEspera = turnosConListaEspera.includes(turno);

    const reserva = {
      clase: "Fundamental Mini",
      fecha,
      turno,
      metodo,
      precio: totalEuros, 
      plazas: plazasNum, 
      timestamp: new Date().toISOString(),
      tipoReserva: "normal"
    };

    if (esTurnoEnEspera) {
      reserva.estado = "espera";
    }

   try {
  const basePath = esTurnoEnEspera
    ? "esperaFundamentalMini"
    : "reservas/FundamentalMini";

  const refGeneral = ref(dbRealtime, `${basePath}/${fecha}/${turno}/${metodo}`);
  await push(refGeneral, { uid: user.uid, ...reserva });

  const historialRef = ref(dbRealtime, `usuarios/${user.uid}/listaReservas`);
  await push(historialRef, reserva);

  // ✅ NUEVO: guardar también como reserva activa
  const userReservaRef = ref(dbRealtime, `usuarios/${user.uid}/reservas`);
  await push(userReservaRef, reserva);

  await actualizarContadorReservas(user.uid);

  if (esTurnoEnEspera) {
    alert("Estás en lista de espera. Te avisaremos si se activa este turno.");
    setTimeout(() => {
      navigate("/perfil");
    }, 100);
  } else {
    navigate("/resumen-pago", { state: reserva });
  }
} catch (error) {
  console.error("Error al guardar la reserva:", error);
  alert("Ocurrió un error al guardar tu reserva.");
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
          Reserva – Fundamental Mini
        </h1>

        {!usuarioLogueado ? (
          <div className="text-center bg-orange-100 text-orange-800 p-4 rounded-xl font-semibold text-base">
            🔒 Inicia sesión para poder reservar esta clase.
          </div>
        ) : (
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
                onChange={(e) => {
                  setTurno(e.target.value);
                  setMensajeEspera(turnosConListaEspera.includes(e.target.value));
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              >
                <option value="">-- Elige turno --</option>
                <option value="10:00-12:00">10:00 – 12:00</option>
                <option value="12:00-14:00">12:00 – 14:00</option>
                <option value="16:00-18:00">16:00 – 18:00</option>
                <option value="18:00-20:00">18:00 – 20:00</option>
              </select>

              {mensajeEspera && (
                <p className="mt-2 text-sm text-orange-600 font-medium">
                  Este turno requiere al menos 3 personas para confirmarse. Estás en lista de espera.
                </p>
              )}
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
                ¿Cuántas plazas deseas reservar?
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

            <button
              type="submit"
              className="w-full bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-bold text-lg py-3 rounded-full transition"
              disabled={!metodo || plazas > plazasDisponibles}
            >
              Confirmar y {mensajeEspera ? "entrar en lista de espera" : "pagar"}
            </button>
          </form>
        )}

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
