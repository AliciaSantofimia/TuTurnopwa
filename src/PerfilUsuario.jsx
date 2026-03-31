import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dbRealtime } from "./firebase";
import { ref, get } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Footer from "./Footer";
import PantallaConVolver from "./PantallaConVolver";

function obtenerFechaReserva(reserva) {
  if (!reserva) return null;

  const fecha = reserva.fecha;
  if (!fecha) return null;

  let horaInicio = "00:00";

  if (reserva.turno && String(reserva.turno).includes("-")) {
    horaInicio = String(reserva.turno).split("-")[0].trim();
  }

  const fechaHora = new Date(`${fecha}T${horaInicio}:00`);
  return isNaN(fechaHora.getTime()) ? null : fechaHora;
}

export default function PerfilUsuario() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [reservaActiva, setReservaActiva] = useState(null);
  const [reservasActivas, setReservasActivas] = useState([]);
  const [reservasPasadas, setReservasPasadas] = useState([]);
  const [tarjetasRegalo, setTarjetasRegalo] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);

        const userRef = ref(dbRealtime, "usuarios/" + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) setNombre(snapshot.val().nombre);

        const refListaReservas = ref(
          dbRealtime,
          `usuarios/${user.uid}/listaReservas`
        );
        const snapListaReservas = await get(refListaReservas);

        if (snapListaReservas.exists()) {
          const todas = Object.values(snapListaReservas.val()).filter(Boolean);
          const ahora = new Date();

          const futuras = [];
          const pasadas = [];

          todas.forEach((reserva) => {
            const fechaReserva = obtenerFechaReserva(reserva);

            if (fechaReserva && fechaReserva >= ahora) {
              futuras.push(reserva);
            } else {
              pasadas.push(reserva);
            }
          });

          futuras.sort((a, b) => {
            const fechaA = obtenerFechaReserva(a)?.getTime() || 0;
            const fechaB = obtenerFechaReserva(b)?.getTime() || 0;
            return fechaA - fechaB;
          });

          pasadas.sort((a, b) => {
            const fechaA = obtenerFechaReserva(a)?.getTime() || 0;
            const fechaB = obtenerFechaReserva(b)?.getTime() || 0;
            return fechaB - fechaA;
          });

          if (futuras.length > 0) {
            setReservaActiva(futuras[0]);
            setReservasActivas(futuras.slice(1));
          } else {
            setReservaActiva(null);
            setReservasActivas([]);
          }

          setReservasPasadas(pasadas);
        } else {
          setReservaActiva(null);
          setReservasActivas([]);
          setReservasPasadas([]);
        }

        const refTarjetasRegalo = ref(
          dbRealtime,
          `usuarios/${user.uid}/tarjetasRegalo`
        );
        const snapTarjetasRegalo = await get(refTarjetasRegalo);

        if (snapTarjetasRegalo.exists()) {
          const tarjetas = Object.values(snapTarjetasRegalo.val()).sort(
            (a, b) => {
              const fechaA = new Date(a.actualizadoEn || a.fechaCompra || 0);
              const fechaB = new Date(b.actualizadoEn || b.fechaCompra || 0);
              return fechaB - fechaA;
            }
          );

          setTarjetasRegalo(tarjetas);
        } else {
          setTarjetasRegalo([]);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <PantallaConVolver volverA="/dondereservar">
      <div className="max-w-md w-full mx-auto bg-[#fcfaf6] rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#eee6da] p-5 text-[#3b3025]">
        <div className="text-center mb-6">
          <h1 className="text-[2rem] font-serif font-bold text-[#6f3d22] mb-2">
            Tu perfil
          </h1>
          <p className="text-sm text-[#7b6d62]">
            Consulta tus reservas y datos de tu cuenta
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#efe7db] px-4 py-4 shadow-sm mb-5">
          <p className="text-sm mb-2">
            <span className="font-semibold">Nombre:</span> {nombre || "—"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Email:</span> {email || "—"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            className="bg-[#f2c500] hover:bg-[#e4b800] text-[#3b3025] font-bold py-3 rounded-2xl text-sm shadow-md transition"
            onClick={() => navigate("/dondereservar")}
          >
            Reservar
          </button>

          <button
            className="bg-white border border-[#e6a6cf] text-[#b84c85] font-bold py-3 rounded-2xl text-sm shadow-sm transition hover:bg-[#fdf2f8]"
            onClick={() => navigate("/canjear-tarjeta")}
          >
            Canjear tarjeta regalo
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#efe7db] px-4 py-4 shadow-sm mb-5">
          <h2 className="text-base font-semibold mb-3">Tu  reserva</h2>

          {reservaActiva ? (
            <div className="space-y-1 text-sm">
              <p>
                <strong>Clase:</strong> {reservaActiva.clase}
              </p>
              <p>
                <strong>Fecha:</strong> {reservaActiva.fecha}
              </p>
              <p>
                <strong>Turno:</strong> {reservaActiva.turno}
              </p>
              {reservaActiva.ubicacion && (
                <p>
                  <strong>Ubicación:</strong> {reservaActiva.ubicacion}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-[#7b6d62]">
              No tienes reservas activas.
            </p>
          )}
        </div>

        <details className="mb-5 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold">
            Próximas reservas
          </summary>

          <div className="mt-3">
            {reservasActivas.length > 0 ? (
              <ul className="text-sm space-y-2">
                {reservasActivas.map((r, i) => (
                  <li
                    key={i}
                    className="bg-[#faf8f4] p-3 rounded-xl border border-[#ece4d8]"
                  >
                    <strong>{r.fecha}</strong> — {r.clase} ({r.turno})
                    {r.ubicacion ? ` en ${r.ubicacion}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#7b6d62]">
                No tienes más reservas futuras.
              </p>
            )}
          </div>
        </details>

        <details className="mb-5 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold">
            Historial de reservas
          </summary>

          <div className="mt-3">
            {reservasPasadas.length > 0 ? (
              <ul className="text-sm space-y-2">
                {reservasPasadas.map((r, i) => (
                  <li
                    key={i}
                    className="bg-[#faf8f4] p-3 rounded-xl border border-[#ece4d8]"
                  >
                    <strong>{r.fecha}</strong> — {r.clase} ({r.turno})
                    {r.ubicacion ? ` en ${r.ubicacion}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#7b6d62]">
                Aún no tienes reservas anteriores.
              </p>
            )}
          </div>
        </details>

        <details className="mb-5 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold">
            🎁 Mis tarjetas regalo
          </summary>

          <div className="mt-3">
            {tarjetasRegalo.length > 0 ? (
              <ul className="text-sm space-y-2">
                {tarjetasRegalo.map((tarjeta, i) => (
                  <li
                    key={i}
                    className="bg-[#faf8f4] p-3 rounded-xl border border-[#ece4d8]"
                  >
                    <p>
                      <strong>Producto:</strong>{" "}
                      {tarjeta.clase || "Tarjeta regalo"}
                    </p>
                    <p>
                      <strong>Precio:</strong> {tarjeta.precioTotal} €
                    </p>
                    <p>
                      <strong>Código:</strong> {tarjeta.codigo || "—"}
                    </p>
                    <p>
                      <strong>Estado:</strong>{" "}
                      {tarjeta.estadoCanje === "usada"
                        ? "Usada"
                        : tarjeta.estadoCanje === "canjeado"
                        ? "Usada"
                        : "Disponible"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#7b6d62]">
                Aún no has comprado ninguna tarjeta regalo.
              </p>
            )}
          </div>
        </details>

        <details className="mb-5 bg-[#fbf4d8] border border-[#ead66d] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold">
            Recoger mi pieza
          </summary>

          <p className="text-sm mt-3">
            Tus piezas necesitan secado y cocción. Cuando estén listas, podrás
            verlas en la carpeta.
          </p>

          <a
            href="https://drive.google.com/drive/folders/1J0f79NLH--SZ9DGIaFO2n5hSNdjU7rUn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2.5 text-white font-semibold bg-[#e0a800] rounded-full shadow-md"
          >
            Ver piezas
          </a>
        </details>

        <details className="mb-6 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold">
            📍 Contacto
          </summary>

          <ul className="mt-3 text-sm space-y-2">
            <li>📞 644 671 664</li>
            <li>📧 lapurisimaconchioficial@gmail.com</li>
            <li>🏠 Calle Israel Nº5, Córdoba</li>
          </ul>

          <div className="mt-4">
            <button
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=Calle+Israel+5+Córdoba",
                  "_blank"
                )
              }
              className="w-full px-4 py-2 bg-[#f5f1ea] hover:bg-[#ebe4da] rounded-xl text-sm font-medium transition"
            >
              📍 Cómo llegar
            </button>
          </div>
        </details>

        <button
          onClick={handleLogout}
          className="w-full mb-5 bg-[#7a4326] text-white py-3 rounded-2xl font-semibold shadow-md"
        >
          Cerrar sesión
        </button>

        <div className="text-center text-xs space-y-1 text-[#a08f80]">
          <button onClick={() => navigate("/politica-privacidad")}>
            Política de Privacidad
          </button>
          <br />
          <button onClick={() => navigate("/condiciones-pago")}>
            Condiciones de Pago
          </button>
        </div>
      </div>

      <Footer />
    </PantallaConVolver>
  );
}