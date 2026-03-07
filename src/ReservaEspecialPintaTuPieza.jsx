import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
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

export default function ReservaEspecialPintaTuPieza() {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const desdeTarjeta =
    location.state?.desdeTarjeta || location.state?.desdeTarjetaRegalo || false;

  const precioBase = 35;
  const precioTotal = precioBase * Number(plazas || 1);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("Usuario no autenticado.");
      return;
    }

    if (!fecha || !turno) {
      alert("Selecciona la fecha y el turno.");
      return;
    }

    const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;

    try {
      const orderId = Date.now().toString().slice(-12);

      const reserva = {
        clase: "Especial pinta tu pieza de cerámica",
        tipoTaller: "pinta_y_decora",
        fecha,
        turno,
        plazas: plazasNum,
        duracion: "2 horas y media",
        desdeTarjeta,
        precio: precioTotal,
        precioBase,
        precioTotal,
        estadoPago: "pendiente",
        orderId,
        timestamp: new Date().toISOString(),
      };

      const generalRef = ref(
        dbRealtime,
        `reservas/EspecialPintaTuPieza/${fecha}/${turno}`
      );
      await push(generalRef, { uid: currentUser.uid, ...reserva });

      const userHistorialRef = ref(
        dbRealtime,
        `usuarios/${currentUser.uid}/historialReservas`
      );
      await push(userHistorialRef, reserva);

      const userReservaRef = ref(
        dbRealtime,
        `usuarios/${currentUser.uid}/reservas`
      );
      await push(userReservaRef, reserva);

      await actualizarContadorReservas(currentUser.uid);

      navigate("/resumen-pago", {
        state: {
          desdeTarjeta,
          tipo: "clase",
          clase: "Especial pinta tu pieza de cerámica",
          precio: precioTotal,
          precioBase,
          precioTotal,
          fecha,
          turno,
          plazas: plazasNum,
          duracion: "2 horas y media",
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
          Reserva – Especial pinta tu pieza de cerámica
        </h1>

        {desdeTarjeta && (
          <p className="text-sm text-green-700 text-center font-medium mb-4">
            Estás usando una tarjeta regalo 🎁
          </p>
        )}

        <BloqueoReserva>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
              <p><strong>Taller de pintura cerámica.</strong></p>
              <p>
                Tendrás hasta 2 horas y media para pintar tu pieza en un espacio
                creativo y guiado por el estudio.
              </p>
            </div>

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
                <option value="11:00-13:30">11:00 – 13:30</option>
                <option value="17:00-19:30">17:00 – 19:30</option>
              </select>
            </div>

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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              />
            </div>

            {fecha && (
              <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
                <p><strong>Precio por plaza:</strong> 35€</p>
                <p><strong>Precio total:</strong> {precioTotal}€</p>
                <p><strong>Duración:</strong> 2 horas y media</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 rounded-full text-white font-semibold
              bg-gradient-to-b from-[#F6D66A] to-[#F4C542]
              shadow-md hover:shadow-lg
              hover:from-[#F4C542] hover:to-[#E5B92F]
              transition-all duration-200"
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