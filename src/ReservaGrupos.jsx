import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, get, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";
import BloqueoReserva from "./BloqueoReserva";
import DateInputReserva from "./components/DateInputReserva";

const WHATSAPP_BERTO = "34644671664";

const MIN_PERSONAS = 5;
const MAX_PERSONAS = 45;

const TALLERES_RECOMENDADOS = [
  {
    id: "especial-pinta",
    nombre: "Especial pinta tu pieza de cerámica",
    precio: 35,
    descripcion: "Una opción ideal para celebraciones y grupos.",
    imagen: "/img/grupos/enjoy.jpg",
    ruta: "/especial-pinta-tu-pieza",
  },
  {
    id: "pinta-tu-pieza",
    nombre: "Pinta tu pieza de cerámica",
    precio: 25,
    descripcion: "Perfecto para pasar un rato creativo en grupo.",
    imagen: "/img/pintatupieza.jpg",
    ruta: "/pinta-tu-pieza",
  },
  {
    id: "crea-tu-pieza",
    nombre: "Crea tu pieza favorita desde cero",
    precio: 55,
    descripcion: "Una experiencia más completa para grupos especiales.",
    imagen: "/img/grupos/desdecero.jpg",
    ruta: "/talleres/crear-piezas",
  },
];

const TODAS_LAS_CLASES = [
  { nombre: "Crea tu pieza favorita desde cero — Cuenco o taza", precio: 55 },
  { nombre: "Crea tu pieza favorita desde cero — Frutero / cuenco grande", precio: 65 },
  { nombre: "Crea tu pieza favorita desde cero — Jarrón grande", precio: 75 },
  { nombre: "Crea tu brunch bowl", precio: 55 },
  { nombre: "Crea tu cuenco para ramen", precio: 55 },
  { nombre: "Crea tu bandeja de hogar", precio: 55 },
  { nombre: "Crea tu taza favorita", precio: 55 },
  { nombre: "Crea tu maceta", precio: 55 },
  { nombre: "Crea tu gran centro de mesa", precio: 65 },
  { nombre: "Crea tu jarra / jarrón grande", precio: 75 },
  { nombre: "Crea tu set de matcha", precio: 60 },
  { nombre: "Crea tu set de sake", precio: 60 },
  { nombre: "Crea tu taza escultórica", precio: 58 },
  { nombre: "Crea tu maceta orgánica", precio: 59 },
  { nombre: "Modela a mano y decora tus piezas favoritas — 4 clases", precio: 79 },
  { nombre: "Torno alfarero y decoración — 4 clases", precio: 99 },
  { nombre: "Torno alfarero empezar desde cero — 4 clases", precio: 120 },
  { nombre: "Torno alfarero perfecciona lo que ya sabes — 6 clases", price: 145 },
  { nombre: "Pinta tu pieza de cerámica", precio: 25 },
  { nombre: "Especial pinta tu pieza de cerámica", precio: 35 },
];

function obtenerHorarioPorFecha(fechaISO) {
  if (!fechaISO) return "";

  const [year, month, day] = fechaISO.split("-").map(Number);
  const fecha = new Date(year, month - 1, day);
  const dia = fecha.getDay();

  if (dia === 5 || dia === 6) return "17:30 a 20:30";
  if (dia === 0) return "11:30 a 14:30";

  return "";
}

function esFechaValidaGrupo(fechaISO) {
  if (!fechaISO) return false;

  const [year, month, day] = fechaISO.split("-").map(Number);
  const fecha = new Date(year, month - 1, day);
  const dia = fecha.getDay();

  return dia === 5 || dia === 6 || dia === 0;
}

function construirMensajeWhatsApp({
  nombre,
  telefono,
  taller,
  fecha,
  horario,
  personas,
  notas,
}) {
  return encodeURIComponent(
    `Hola Berto, quiero reservar un taller para grupo en La Purísima Conchi.

Nombre: ${nombre || "-"}
Teléfono: ${telefono || "-"}
Taller: ${taller || "-"}
Fecha: ${fecha || "-"}
Horario: ${horario || "-"}
Personas: ${personas || "-"}

Notas:
${notas || "-"}

¿Podemos concretarlo?`
  );
}

export default function ReservaGrupos() {
  const navigate = useNavigate();
  const location = useLocation();

  const verDetallesTaller = (taller) => {
    navigate(taller.ruta, {
      state: {
        desdeGrupos: true,
        volverA: "/reserva-grupos",
      },
    });
  };

  const [user, setUser] = useState(null);
  const [nombreReserva, setNombreReserva] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [personas, setPersonas] = useState(5);
  const [notas, setNotas] = useState("");
  const [claseSeleccionada, setClaseSeleccionada] = useState("");
  const [contactoConfirmado, setContactoConfirmado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [fechasBloqueadas, setFechasBloqueadas] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser || null);

      if (firebaseUser) {
        setEmail(firebaseUser.email || "");

        try {
          const userRef = ref(dbRealtime, `usuarios/${firebaseUser.uid}`);
          const snap = await get(userRef);

          if (snap.exists()) {
            const datos = snap.val() || {};
            setNombreReserva(datos.nombre || "");
            setTelefono(datos.telefono || "");
          }
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const cargarFechasBloqueadas = async () => {
      try {
        const snap = await get(ref(dbRealtime, "bloqueosFechas"));
        if (snap.exists()) {
          setFechasBloqueadas(snap.val() || {});
        } else {
          setFechasBloqueadas({});
        }
      } catch (error) {
        console.error("Error al cargar fechas bloqueadas:", error);
        setFechasBloqueadas({});
      }
    };

    cargarFechasBloqueadas();
  }, []);

  useEffect(() => {
    if (!fecha) {
      setHorario("");
      return;
    }

    if (esFechaValidaGrupo(fecha)) {
      setHorario(obtenerHorarioPorFecha(fecha));
    } else {
      setHorario("");
    }
  }, [fecha]);

  useEffect(() => {
    const clasePreseleccionada = location.state?.clasePreseleccionada;

    if (clasePreseleccionada) {
      setClaseSeleccionada(clasePreseleccionada);
    }
  }, [location.state]);

  const precioUnitario = useMemo(() => {
    const claseObj = TODAS_LAS_CLASES.find(
      (item) => item.nombre === claseSeleccionada
    );
    return claseObj ? Number(claseObj.precio || 0) : 0;
  }, [claseSeleccionada]);

  const precioTotal = useMemo(() => {
    const personasNum = Number(personas) || 0;
    return precioUnitario * personasNum;
  }, [precioUnitario, personas]);

  const whatsappUrl = useMemo(() => {
    const mensaje = construirMensajeWhatsApp({
      nombre: nombreReserva,
      telefono,
      taller: claseSeleccionada,
      fecha,
      horario,
      personas,
      notas,
    });

    return `https://wa.me/${WHATSAPP_BERTO}?text=${mensaje}`;
  }, [nombreReserva, telefono, claseSeleccionada, fecha, horario, personas, notas]);

  const fechaBloqueada = useMemo(() => {
    if (!fecha) return null;

    const bloqueo = fechasBloqueadas?.[fecha];
    if (bloqueo?.bloqueado) {
      return bloqueo;
    }

    return null;
  }, [fecha, fechasBloqueadas]);

  const seleccionarRecomendado = (nombre) => {
    setClaseSeleccionada(nombre);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Debes iniciar sesión para reservar.");
      return;
    }

    if (!nombreReserva || !telefono || !claseSeleccionada || !fecha) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    if (!esFechaValidaGrupo(fecha)) {
      alert("Solo se permiten reservas de grupo los viernes, sábados y domingos.");
      return;
    }

    if (fechaBloqueada) {
      alert(
        `No se puede reservar el día ${fecha}. Motivo: ${
          fechaBloqueada.motivo || "día bloqueado"
        }.`
      );
      return;
    }

    if (!horario) {
      alert("No se ha podido asignar el horario.");
      return;
    }

    const personasNum = Number(personas) || 0;

    if (personasNum < MIN_PERSONAS) {
      alert("El mínimo para reservar en grupo es de 5 personas.");
      return;
    }

    if (personasNum > MAX_PERSONAS) {
      alert("El máximo de plazas para grupos es de 45 personas.");
      return;
    }

    if (!(precioUnitario > 0)) {
      alert("No se ha podido calcular el precio del taller.");
      return;
    }

    if (!contactoConfirmado) {
      alert("Debes confirmar antes que ya has contactado con Berto por WhatsApp.");
      return;
    }

    try {
      setCargando(true);

      const orderId = Date.now().toString().slice(-12);

      const reservaGrupo = {
        uid: user.uid,
        nombreReserva,
        telefono,
        email: email || "",
        clase: claseSeleccionada,
        claseId: "reserva-grupo",
        tipo: "grupo",
        fecha,
        turno: horario,
        metodo: "grupo",
        plazas: personasNum,
        precio: precioTotal,
        precioUnitario,
        precioTotal,
        notas: notas || "",
        contactoConfirmado: true,
        estado: "Pendiente",
        estadoPago: "pendiente",
        orderId,
        timestamp: new Date().toISOString(),
      };

      await push(ref(dbRealtime, "reservasGrupos"), reservaGrupo);

      navigate("/resumen-pago", {
        state: {
          tipo: "grupo",
          clase: claseSeleccionada,
          claseId: "reserva-grupo",
          precio: precioTotal,
          precioUnitario,
          precioTotal,
          fecha,
          turno: horario,
          metodo: "grupo",
          plazas: personasNum,
          orderId,
          notas: notas || "",
          telefono,
          email: email || "",
          nombreReserva,
        },
      });
    } catch (error) {
      console.error("Error al guardar la reserva de grupo:", error);
      alert("No se pudo guardar la reserva de grupo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-[#fffef4] min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <BotonVolver />

          <h1 className="text-3xl font-bold text-[#5c3c00] font-serif mb-4 text-center">
            Reservas para grupos
          </h1>

          <p className="text-gray-700 text-center max-w-3xl mx-auto leading-7 mb-3">
            Si sois un grupo y queréis celebrar una experiencia especial en el taller,
            podéis reservar vuestro taller aquí. Antes de realizar el pago, es
            importante contactar con el taller por WhatsApp para concretar bien todos los detalles.
          </p>

          <p className="text-sm text-[#7a5a1e] bg-[#fff8df] border border-[#f1e7c6] rounded-xl p-3 text-center mb-8">
            Horarios disponibles para grupos:
            <br />
            <strong>Viernes y sábados:</strong> 17:30 a 20:30
            <br />
            <strong>Domingos:</strong> 11:30 a 14:30
            <br />
            Si necesitáis otro día u otro horario, contactad con el taller antes de reservar.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#3b3025] mb-4 text-center">
              Talleres recomendados para grupos
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              {TALLERES_RECOMENDADOS.map((taller) => {
                const activo = claseSeleccionada === taller.nombre;

                return (
                  <div
                    key={taller.id}
                    className={`rounded-2xl border overflow-hidden shadow-sm transition ${
                      activo
                        ? "border-yellow-500 bg-[#fff9e8]"
                        : "border-[#ece7df] bg-white hover:shadow-md"
                    }`}
                  >
                    <img
                      src={taller.imagen}
                      alt={taller.nombre}
                      className="w-full h-44 object-cover"
                    />

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {taller.nombre}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3">
                        {taller.descripcion}
                      </p>

                      <p className="text-base font-bold text-[#5c3c00] mb-4">
                        Desde {taller.precio}€
                      </p>

                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => verDetallesTaller(taller)}
                          className="w-full px-4 py-2 rounded-full border border-[#d8c7a0] text-[#5c3c00] font-medium hover:bg-[#fff8df] transition"
                        >
                          Ver detalles
                        </button>

                        {taller.id !== "crea-tu-pieza" && (
                          <button
                            type="button"
                            onClick={() => seleccionarRecomendado(taller.nombre)}
                            className="w-full px-4 py-2 rounded-full bg-[#f4c542] text-[#5c3c00] font-semibold hover:bg-[#e8b932] transition"
                          >
                            Elegir este taller
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <BloqueoReserva>
            <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl mx-auto">
              <div>
                <label className="block font-bold text-sm mb-1">
                  Taller elegido
                </label>
                <select
                  value={claseSeleccionada}
                  onChange={(e) => setClaseSeleccionada(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
                  required
                >
                  <option value="">-- Elige un taller --</option>
                  {TODAS_LAS_CLASES.map((claseItem) => (
                    <option key={claseItem.nombre} value={claseItem.nombre}>
                      {claseItem.nombre} — {claseItem.precio}€
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block font-bold text-sm mb-1">
                    Nombre de la persona que reserva
                  </label>
                  <input
                    type="text"
                    value={nombreReserva}
                    onChange={(e) => setNombreReserva(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-bold text-sm mb-1">
                  Selecciona fecha
                </label>
                <DateInputReserva
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
                {fecha && !esFechaValidaGrupo(fecha) && (
                  <p className="text-sm text-red-600 mt-2">
                    Solo puedes reservar grupos los viernes, sábados y domingos.
                  </p>
                )}
                {fechaBloqueada && (
                  <p className="text-sm text-red-600 mt-2">
                    Este día no está disponible para reservar.
                    {fechaBloqueada.motivo
                      ? ` Motivo: ${fechaBloqueada.motivo}.`
                      : ""}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-sm mb-1">
                  Horario asignado
                </label>
                <input
                  type="text"
                  value={horario}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                  placeholder="Se asignará automáticamente según el día elegido"
                />
              </div>

              <div>
                <label className="block font-bold text-sm mb-2">
                  Número de personas
                </label>

                <div className="flex items-center justify-between border border-gray-300 rounded-xl px-3 py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPersonas((prev) => Math.max(MIN_PERSONAS, prev - 1))
                    }
                    className="text-xl font-bold px-3 py-1 rounded-lg bg-gray-100"
                  >
                    −
                  </button>

                  <span className="text-lg font-semibold">{personas}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setPersonas((prev) => Math.min(MAX_PERSONAS, prev + 1))
                    }
                    className="text-xl font-bold px-3 py-1 rounded-lg bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 5 personas. Máximo 45 plazas.
                </p>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1">
                  Cuéntanos un poco lo que necesitáis
                </label>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Ejemplo: somos un grupo de cumpleaños, queremos mesa junta, nos interesa una opción sencilla, etc."
                />
              </div>

              <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-4 text-sm text-[#5c3c00]">
                <p>
                  <strong>Taller elegido:</strong> {claseSeleccionada || "-"}
                </p>
                <p>
                  <strong>Precio por persona:</strong>{" "}
                  {precioUnitario > 0 ? `${precioUnitario}€` : "-"}
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  {precioTotal > 0 ? `${precioTotal}€` : "-"}
                </p>
              </div>

              <div className="bg-[#f7f7f7] border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 mb-3">
                  Antes de realizar el pago, debes hablar con Berto por WhatsApp
                  para confirmar bien el taller, el horario y cualquier detalle especial.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                >
                  Hablar con Berto por WhatsApp
                </a>

                <label className="flex items-start mt-4 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2 mt-1"
                    checked={contactoConfirmado}
                    onChange={(e) => setContactoConfirmado(e.target.checked)}
                  />
                  <span>
                    Ya he contactado con Berto y he concretado los detalles de la reserva.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={
                  cargando ||
                  !!fechaBloqueada ||
                  !claseSeleccionada ||
                  !nombreReserva ||
                  !telefono ||
                  !fecha ||
                  !horario ||
                  personas < MIN_PERSONAS ||
                  !(precioUnitario > 0) ||
                  !contactoConfirmado
                }
                className={`w-full mt-4 px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 ${
                  cargando
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-b from-[#F6D66A] to-[#F4C542] shadow-md hover:shadow-lg hover:from-[#F4C542] hover:to-[#E5B92F]"
                }`}
              >
                {cargando ? "Guardando..." : "Continuar al pago"}
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
    </div>
  );
}