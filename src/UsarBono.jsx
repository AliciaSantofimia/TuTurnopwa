import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, get, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import { usarSesionDeBono } from "./utils/bonos";
import BotonVolver from "./BotonVolver";
import DateInputReserva from "./components/DateInputReserva";

export default function UsarBono() {
  const [user, setUser] = useState(null);
  const [bonos, setBonos] = useState([]);
  const [bonoSeleccionado, setBonoSeleccionado] = useState("");
  const [fechaSesion, setFechaSesion] = useState("");
  const [turno, setTurno] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarBonos = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setCargando(false);
          return;
        }

        setUser(currentUser);

        const bonosRef = ref(dbRealtime, `usuarios/${currentUser.uid}/bonosActivos`);
        const snapshot = await get(bonosRef);

        const listaBonos = [];

        if (snapshot.exists()) {
          snapshot.forEach((snap) => {
            const bono = snap.val();

            if (bono.estado === "activo" && (bono.clasesRestantes || 0) > 0) {
              listaBonos.push({
                id: snap.key,
                ...bono,
              });
            }
          });
        }

        setBonos(listaBonos);
      } catch (error) {
        console.error("Error al cargar bonos activos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarBonos();
  }, []);

  const handleReservar = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Debes iniciar sesión.");
      return;
    }

    if (!bonoSeleccionado || !fechaSesion || !turno) {
      alert("Completa todos los campos.");
      return;
    }

    const bono = bonos.find((b) => b.id === bonoSeleccionado);

    if (!bono) {
      alert("No se encontró el bono seleccionado.");
      return;
    }

    try {
      const reserva = {
        uid: user.uid,
        nombre: user.displayName || user.email || "Usuario",
        clase: bono.clase || "Clase con bono",
        subtipo: bono.subtipo || "bono",
        fecha: fechaSesion,
        turno,
        metodo: bono.modalidad || "general",
        estado: "Confirmada",
        desdeBono: true,
        bonoId: bono.id,
        timestamp: new Date().toISOString(),
      };

      const reservaRef = ref(
        dbRealtime,
        `reservas/${bono.subtipo || "bono"}/${fechaSesion}/${turno}/${bono.modalidad || "general"}`
      );

      await push(reservaRef, reserva);

      const listaReservasUsuarioRef = ref(
        dbRealtime,
        `usuarios/${user.uid}/listaReservas`
      );

      await push(listaReservasUsuarioRef, reserva);

      await usarSesionDeBono({
        uid: user.uid,
        bonoId: bono.id,
        fechaSesion,
        turno,
        taller: bono.clase || "Clase con bono",
      });

      alert("Reserva realizada con bono correctamente.");

      setBonoSeleccionado("");
      setFechaSesion("");
      setTurno("");
    } catch (error) {
      console.error("Error al usar bono:", error);
      alert(error.message || "No se pudo usar el bono.");
    }
  };

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6">
        <BotonVolver />

        <h1 className="text-center text-2xl text-[#5c3c00] font-serif mb-4">
          Usar bono
        </h1>

        {cargando ? (
          <p className="text-center text-sm text-gray-600">Cargando bonos...</p>
        ) : bonos.length === 0 ? (
          <p className="text-center text-sm text-gray-600">
            No tienes bonos activos disponibles.
          </p>
        ) : (
          <form onSubmit={handleReservar} className="space-y-4">
            <div>
              <label className="block font-bold text-sm mb-1">
                Selecciona un bono:
              </label>
              <select
                value={bonoSeleccionado}
                onChange={(e) => setBonoSeleccionado(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                required
              >
                <option value="">-- Elige un bono --</option>
                {bonos.map((bono) => (
                  <option key={bono.id} value={bono.id}>
                    {bono.clase} — {bono.clasesRestantes} clases restantes
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-sm mb-1">
                Selecciona la fecha:
              </label>
              <DateInputReserva
                value={fechaSesion}
                onChange={(e) => setFechaSesion(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-bold text-sm mb-1">
                Selecciona el turno:
              </label>
              <select
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

            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 rounded-full text-white font-semibold
              bg-gradient-to-b from-[#F6D66A] to-[#F4C542]
              shadow-md hover:shadow-lg
              hover:from-[#F4C542] hover:to-[#E5B92F]
              transition-all duration-200"
            >
              Reservar con bono
            </button>
          </form>
        )}
      </div>
    </div>
  );
}