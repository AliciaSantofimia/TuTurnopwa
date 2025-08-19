import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dbRealtime } from "./firebase";
import { ref, get } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Footer from "./Footer";
import PantallaConVolver from "./PantallaConVolver";

export default function PerfilUsuario() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [avisos, setAvisos] = useState([]);
  const [reservaActiva, setReservaActiva] = useState(null);
  const [reservasPasadas, setReservasPasadas] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarTarjetas, setMostrarTarjetas] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        const userRef = ref(dbRealtime, "usuarios/" + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) setNombre(snapshot.val().nombre);

        const avisosRef = ref(dbRealtime, `usuarios/${user.uid}/avisos`);
        const snapAvisos = await get(avisosRef);
        if (snapAvisos.exists()) {
          const data = Object.values(snapAvisos.val());
          setAvisos(data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
        }

        const refReservas = ref(dbRealtime, `usuarios/${user.uid}/reservas`);
        const snapReservas = await get(refReservas);
        if (snapReservas.exists()) {
          const todas = Object.values(snapReservas.val());
          if (todas.length > 0) setReservaActiva(todas[0]);
        }

        const refHistorial = ref(dbRealtime, `usuarios/${user.uid}/historialReservas`);
        const snapHistorial = await get(refHistorial);
        if (snapHistorial.exists()) {
          const historial = Object.values(snapHistorial.val());
          setReservasPasadas(historial);
        }

        const snapTarjetas = await get(ref(dbRealtime, "tarjetas_regalo"));
        if (snapTarjetas.exists()) {
          const data = Object.values(snapTarjetas.val());
          const propias = data.filter(t => t.compradorUID === user.uid && t.desdeTarjeta === true);
          setTarjetas(propias);
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
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6 text-[#333] mx-auto">
        <h1 className="text-center text-[1.6rem] text-[#3b3025] font-semibold mb-6">
          Tu perfil
        </h1>

        {/* Datos básicos */}
        <p className="text-sm mb-1"><strong>Nombre:</strong> {nombre}</p>
        <p className="text-sm mb-4"><strong>Email:</strong> {email}</p>

        {/* Reservas activas — más arriba y destacadas */}
        {reservaActiva && (
          <div className="mb-6 text-sm bg-yellow-50 p-3 rounded-xl border border-yellow-200">
            <h3 className="font-semibold mb-2 text-yellow-800">🎯 Tu reserva activa</h3>
            <p><strong>Clase:</strong> {reservaActiva.clase}</p>
            <p><strong>Fecha:</strong> {reservaActiva.fecha}</p>
            <p><strong>Turno:</strong> {reservaActiva.turno}</p>
            <p><strong>Ubicación:</strong> {reservaActiva.ubicacion}</p>
          </div>
        )}

        {/* Acciones principales más compactas */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            className="bg-yellow-400 hover:bg-yellow-300 text-[#3b3025] font-bold py-2 rounded-xl text-sm shadow"
            onClick={() => navigate("/dondereservar")}
          >
            🗓️ Reservar
          </button>
          <button
            className="bg-pink-300 hover:bg-pink-200 text-[#3b3025] font-bold py-2 rounded-xl text-sm shadow"
            onClick={() => navigate("/canjear-tarjeta")}
          >
            🎁 Canjear
          </button>
        </div>

        {/* Avisos: último visible + anteriores en desplegable */}
        {avisos && avisos.length > 0 && (
          <div className="mb-6">
            <h2 className="text-red-700 font-semibold mb-2">📢 Avisos recibidos</h2>

            {/* Último aviso */}
            <div className="bg-red-50 p-3 rounded border border-red-200 mb-2 text-sm">
              <strong>
                {avisos[0]?.fecha
                  ? new Date(avisos[0].fecha).toLocaleDateString("es-ES")
                  : ""}
                :
              </strong>{" "}
              {avisos[0]?.mensaje}
            </div>

            {/* Desplegable con anteriores */}
            {avisos.length > 1 && (
              <details className="bg-white rounded-xl border border-red-200 p-3">
                <summary className="cursor-pointer text-sm text-red-700 font-semibold">
                  Ver {avisos.length - 1} aviso{avisos.length - 1 > 1 ? "s" : ""} anterior{avisos.length - 1 > 1 ? "es" : ""}
                </summary>
                <ul className="text-sm space-y-1 mt-2">
                  {avisos.slice(1).map((aviso, idx) => (
                    <li key={idx} className="bg-red-50 p-2 rounded border border-red-100">
                      <strong>
                        {aviso.fecha
                          ? new Date(aviso.fecha).toLocaleDateString("es-ES")
                          : ""}
                        :
                      </strong>{" "}
                      {aviso.mensaje}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        {/* Tarjetas regalo (toggle) */}
        <button
          onClick={() => setMostrarTarjetas(!mostrarTarjetas)}
          className="text-blue-700 text-sm underline mb-3"
        >
          {mostrarTarjetas ? "Ocultar" : "Ver historial de tarjetas"}
        </button>
        {mostrarTarjetas && (
          <ul className="text-sm mb-6">
            {tarjetas.map((t, i) => (
              <li key={i} className="mb-2 bg-gray-50 p-2 rounded-xl border">
                <strong>{t.tipo}</strong> — Código: {t.codigo}<br />Fecha: {new Date(t.fechaCompra).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}

        {/* Historial (toggle) */}
        <button
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          className="text-blue-700 text-sm underline mb-3"
        >
          {mostrarHistorial ? "Ocultar" : "Ver historial de reservas"}
        </button>
        {mostrarHistorial && (
          <ul className="text-sm space-y-2 mb-6">
            {reservasPasadas.map((r, i) => (
              <li key={i} className="bg-gray-50 p-2 rounded-xl border">
                <strong>{r.fecha}</strong> — {r.clase} ({r.turno}) en {r.ubicacion || ""}
              </li>
            ))}
          </ul>
        )}

        {/* Recoger pieza — plegable */}
        <details className="mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 shadow">
          <summary className="cursor-pointer text-base font-semibold text-yellow-800">
            🏺 Quiero recoger mi pieza
          </summary>
          <p className="text-sm text-gray-800 mt-3">
            ¿Has venido al taller y estás esperando tu pieza? Recuerda que el proceso de cocción puede tardar hasta <strong>30 días</strong>. Cuando tu pieza esté lista, la subiremos a una carpeta con fotos. Si la reconoces, ¡ya puedes venir a recogerla!
          </p>
          <a
            href="https://drive.google.com/drive/folders/1J0f79NLH--SZ9DGIaFO2n5hSNdjU7rUn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 text-white font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-full transition-shadow shadow-md hover:shadow-lg"
          >
            Ver piezas listas
          </a>
        </details>

        {/* Contacto — plegable y compacto */}
        <details className="mb-6 bg-gray-50 border rounded-2xl p-4 shadow">
          <summary className="cursor-pointer text-base font-semibold text-gray-800">
            📍 Información de contacto
          </summary>

          <ul className="mt-3 text-sm text-gray-800 space-y-1">
            <li>📞 <a href="tel:+34644671664" className="text-blue-600 hover:underline">644 671 664</a></li>
            <li>📧 <a href="mailto:lapurisimaconchioficial@gmail.com" className="text-blue-600 hover:underline">lapurisimaconchioficial@gmail.com</a></li>
            <li>🏠 Calle Israel Nº5, Córdoba - España</li>
          </ul>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => (window.location.href = "tel:+34644671664")}
              className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
            >
              Llamar
            </button>
            <button
              onClick={() => (window.location.href = "mailto:lapurisimaconchioficial@gmail.com")}
              className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
            >
              Email
            </button>
            <button
              onClick={() => window.open("https://maps.google.com/?q=Calle+Israel+5+Córdoba", "_blank")}
              className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
            >
              Cómo llegar
            </button>
          </div>
        </details>

        {/* Legales */}
        <div className="text-center text-sm space-y-2 pb-6">
          <p>
            <button
              onClick={() => navigate("/politica-privacidad")}
              className="text-red-500 underline hover:text-red-700"
            >Política de Privacidad</button>
          </p>
          <p>
            <button
              onClick={() => navigate("/condiciones-pago")}
              className="text-red-500 underline hover:text-red-700"
            >Condiciones del Servicio de Pago</button>
          </p>
        </div>
      </div>
    </PantallaConVolver>
  );
}       