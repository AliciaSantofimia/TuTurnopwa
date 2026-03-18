import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { crearBonoActivo } from "./utils/bonos";
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

const sumarUnMes = (fechaISO) => {
  const d = new Date(fechaISO + "T12:00:00");
  d.setMonth(d.getMonth() + 1);
  return d.toISOString().slice(0, 10);
};

const sumarTresMeses = (fechaISO) => {
  const d = new Date(fechaISO + "T12:00:00");
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().slice(0, 10);
};

export default function ReservaTornoAlfareroEmpezarDesdeCero() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [turno, setTurno] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const desdeTarjeta =
    location.state?.desdeTarjeta || location.state?.desdeTarjetaRegalo || false;

  const precioBase = 120;
  const precioTotal = 120;

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

    if (!fechaInicio || !turno) {
      alert("Selecciona la fecha de inicio y el turno.");
      return;
    }

    try {
      const orderId = Date.now().toString().slice(-12);

     const reserva = {
  clase: "Torno alfarero. Empezar bien desde cero o perfecciona lo que ya sabes",
  claseId: "tornodesdecero4clases",
  tipoTaller: "bono_mensual",
  subtipo: "4_clases_3h_torno",
  fechaInicio,
  fechaFinMes: sumarUnMes(fechaInicio),
  fechaCaducidadBono: sumarTresMeses(fechaInicio),
  turno,
  numeroClases: 4,
  duracionClase: "3 horas",
  modalidad: "torno",
  incluyeDecoracion: false,
  precio: precioTotal,
  precioBase,
  precioTotal,
  desdeTarjeta,
  estadoPago: "pendiente",
  orderId,
  clasesConsumidas: 0,
  clasesRestantes: 4,
  timestamp: new Date().toISOString(),
};

      const generalRef = ref(
        dbRealtime,
        `reservas/TornoAlfareroEmpezarDesdeCero/${fechaInicio}/${turno}`
      );
      await push(generalRef, { uid: currentUser.uid, ...reserva });

      const userListaReservasRef = ref(
  dbRealtime,
  `usuarios/${currentUser.uid}/listaReservas`
);
await push(userListaReservasRef, reserva);

      await crearBonoActivo({
        uid: currentUser.uid,
        clase: "Torno alfarero. Empezar bien desde cero o perfecciona lo que ya sabes",
        subtipo: "4_clases_3h_torno",
        numeroClases: 4,
        fechaInicio,
        fechaFinMes: sumarUnMes(fechaInicio),
        fechaCaducidadBono: sumarTresMeses(fechaInicio),
        turno,
        orderId,
        datosExtra: {
          modalidad: "torno",
          incluyeDecoracion: false,
          desdeTarjeta,
          precio: precioTotal,
          precioBase,
          precioTotal,
          duracionClase: "3 horas",
        },
      });

      await actualizarContadorReservas(currentUser.uid);

      navigate("/resumen-pago", {
        state: {
          desdeTarjeta,
          tipo: "bono",
          clase: "Torno alfarero. Empezar bien desde cero o perfecciona lo que ya sabes",
          precio: precioTotal,
          precioBase,
          precioTotal,
          fechaInicio,
          fechaFinMes: sumarUnMes(fechaInicio),
          fechaCaducidadBono: sumarTresMeses(fechaInicio),
          turno,
          numeroClases: 4,
          duracionClase: "3 horas",
          modalidad: "torno",
          incluyeDecoracion: false,
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
          Reserva – Torno alfarero desde cero
        </h1>

        {desdeTarjeta && (
          <p className="text-sm text-green-700 text-center font-medium mb-4">
            Estás usando una tarjeta regalo 🎁
          </p>
        )}

        <BloqueoReserva>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
              <p><strong>Curso de 4 clases.</strong></p>
              <p>
                Incluye 4 sesiones de 3 horas centradas exclusivamente en torno
                alfarero, sin decoración. El mes comienza con tu primera sesión
                y finaliza el mismo día del mes siguiente.
              </p>
            </div>

            <div>
              <label htmlFor="fechaInicio" className="block font-bold text-sm mb-1">
                Selecciona el día de tu primera clase:
              </label>
              <DateInputReserva
                id="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="turno" className="block font-bold text-sm mb-1">
                Selecciona el turno habitual:
              </label>
              <select
                id="turno"
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              >
                <option value="">-- Elige turno --</option>
                <option value="viernes-tarde">Viernes por la tarde</option>
                <option value="otro-horario">Otro horario según disponibilidad</option>
              </select>
            </div>

            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
              <p>
                <strong>Modalidad:</strong> Torno alfarero
              </p>
              <p>
                <strong>Clases incluidas:</strong> 4 sesiones de 3 horas
              </p>
              <p>
                <strong>Decoración:</strong> No incluida
              </p>
            </div>

            {fechaInicio && (
              <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-3 text-sm text-[#5c3c00]">
                <p><strong>Precio total:</strong> 120€</p>
                <p>
                  <strong>Fin del bono mensual:</strong> {sumarUnMes(fechaInicio)}
                </p>
                <p>
                  <strong>Validez máxima del bono:</strong> {sumarTresMeses(fechaInicio)}
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