
// OBSOLETO - pendiente de borrar cuando se haga limpieza del proyectoimport React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { contarPlazasPorMetodo } from "./utils/contarPlazasDia";
import BotonVolver from "./BotonVolver";
import DateInputReserva from "./components/DateInputReserva";

export default function Reserva2clases4hmesRegalo() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [metodo, setMetodo] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [ocupadasTorno, setOcupadasTorno] = useState(0);
  const [ocupadasModelado, setOcupadasModelado] = useState(0);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const maxTorno = 12;
  const maxModelado = 33;

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuarioLogueado(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

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

    if (!fecha || !turno || !metodo || !plazas) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    const reserva = {
      clase: "2 clases de 4h al mes",
      fecha,
      turno,
      metodo,
      plazas: Number(plazas),
      tipoReserva: "tarjeta regalo",
      codigo: location.state?.codigo || "",
      precio: "0€",
      timestamp: new Date().toISOString(),
    };

    try {
      const refReserva = ref(
        dbRealtime,
        `reservas/2clases4hmes/${fecha}/${turno}/${metodo}`
      );
      await push(refReserva, { uid: user.uid, ...reserva });

      const historialRef = ref(dbRealtime, `usuarios/${user.uid}/listaReservas`);
      await push(historialRef, reserva);

      navigate("/perfil");
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      alert("Ocurrió un error al guardar tu reserva.");
    }
  };

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6">
        <BotonVolver volverA="/perfil" />

        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-4">
          Reserva con tu tarjeta regalo
        </h1>

        {!usuarioLogueado ? (
          <div className="text-center bg-orange-100 text-orange-800 p-4 rounded-xl font-semibold text-base">
            🔐 Inicia sesión para poder reservar esta clase.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FECHA */}
            <div>
              <label htmlFor="fecha" className="block font-bold text-sm mb-1">
                Selecciona el día:
              </label>

              <DateInputReserva
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            {/* TURNO */}
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
                <option value="10:00-13:00">10:00 – 13:00</option>
                <option value="17:00-20:00">17:00 – 20:00</option>
              </select>
            </div>

            {/* MÉTODO */}
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

            {/* PLAZAS */}
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
              disabled={!metodo || Number(plazas) > plazasDisponibles}
            >
              Confirmar reserva con tarjeta regalo
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