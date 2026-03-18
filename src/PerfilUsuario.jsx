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

        const refListaReservas = ref(dbRealtime, `usuarios/${user.uid}/listaReservas`);
const snapListaReservas = await get(refListaReservas);

if (snapListaReservas.exists()) {
  const todas = Object.values(snapListaReservas.val()).sort((a, b) => {
    const fechaA = new Date(a.timestamp || a.fecha || 0);
    const fechaB = new Date(b.timestamp || b.fecha || 0);
    return fechaB - fechaA;
  });

  if (todas.length > 0) {
    setReservaActiva(todas[0]);
    setReservasPasadas(todas.slice(1));
  }
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
        {/* Cabecera */}
        <div className="text-center mb-6">
          <h1 className="text-[2rem] font-serif font-bold text-[#6f3d22] mb-2">
            Tu perfil
          </h1>
          <p className="text-sm text-[#7b6d62]">
            Consulta tus reservas, avisos y datos de tu cuenta
          </p>
        </div>

        {/* Datos usuario */}
        <div className="bg-white rounded-2xl border border-[#efe7db] px-4 py-4 shadow-sm mb-5">
          <p className="text-sm mb-2">
            <span className="font-semibold text-[#3b3025]">Nombre:</span>{" "}
            {nombre || "—"}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-[#3b3025]">Email:</span>{" "}
            {email || "—"}
          </p>
        </div>

        {/* Reserva activa */}
        <div className="bg-[#f8f1d8] rounded-2xl border border-[#e7d36f] px-4 py-4 shadow-sm mb-5">
          <h2 className="text-base font-semibold text-[#8b5a00] mb-3">
            Tu reserva activa
          </h2>

          {reservaActiva ? (
            <div className="space-y-1 text-sm text-[#3b3025]">
              <p><span className="font-semibold">Clase:</span> {reservaActiva.clase}</p>
              <p><span className="font-semibold">Fecha:</span> {reservaActiva.fecha}</p>
              <p><span className="font-semibold">Turno:</span> {reservaActiva.turno}</p>
              {reservaActiva.ubicacion && (
  <p><span className="font-semibold">Ubicación:</span> {reservaActiva.ubicacion}</p>
)}
            </div>
          ) : (
            <p className="text-sm text-[#7b6d62]">
              No tienes ninguna reserva activa en este momento.
            </p>
          )}
        </div>

        {/* Botones principales */}
<div className="grid grid-cols-2 gap-3 mb-6">
  <button
    className="bg-[#f2c500] hover:bg-[#e4b800] text-[#3b3025] font-bold py-3 rounded-2xl text-sm shadow-md transition"
    onClick={() => navigate("/dondereservar")}
  >
    🗓️ Reservar
  </button>

  <button
    className="bg-[#e6a6cf] hover:bg-[#dc96c6] text-[#3b3025] font-bold py-3 rounded-2xl text-sm shadow-md transition"
    onClick={() => navigate("/canjear-tarjeta")}
  >
     Canjear tarjeta regalo
  </button>
</div>

{/* Avisos */}
<section className="mb-5">

          {avisos.length > 0 ? (
            <>
              <div className="bg-[#fff3f3] p-3 rounded-2xl border border-red-200 text-sm shadow-sm mb-2">
                <strong>
                  {avisos[0]?.fecha
                    ? new Date(avisos[0].fecha).toLocaleDateString("es-ES")
                    : ""}
                  :
                </strong>{" "}
                {avisos[0]?.mensaje}
              </div>

              {avisos.length > 1 && (
                <details className="bg-white rounded-2xl border border-red-200 p-3 shadow-sm">
                  <summary className="cursor-pointer text-sm text-red-700 font-semibold">
                    Ver {avisos.length - 1} aviso{avisos.length - 1 > 1 ? "s" : ""} anterior{avisos.length - 1 > 1 ? "es" : ""}
                  </summary>

                  <ul className="text-sm space-y-2 mt-3">
                    {avisos.slice(1).map((aviso, idx) => (
                      <li
                        key={idx}
                        className="bg-red-50 p-2 rounded-xl border border-red-100"
                      >
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
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-[#efe7db] p-3 text-sm text-[#7b6d62] shadow-sm">
              No tienes avisos por ahora.
            </div>
          )}
        </section>

        {/* Historial reservas */}
        <details className="mb-5 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold text-[#3b3025]">
            📚 Historial de reservas
          </summary>

          <div className="mt-3">
            {reservasPasadas.length > 0 ? (
              <ul className="text-sm space-y-2">
                {reservasPasadas.map((r, i) => (
                  <li key={i} className="bg-[#faf8f4] p-3 rounded-xl border border-[#ece4d8]">
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

        {/* Recoger pieza */}
        <details className="mb-5 bg-[#fbf4d8] border border-[#ead66d] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer text-base font-semibold text-[#8a5a00]">
             Quiero recoger mi pieza
          </summary>

          <p className="text-sm text-[#3b3025] mt-3 leading-6">
            Tus piezas no estarán listas el mismo día. Después de la clase,
            necesitan pasar por el proceso de secado y cocción. Cuando estén listas,
            se subirán fotos a la carpeta correspondiente para que puedas identificarlas.
          </p>

          <a
            href="https://drive.google.com/drive/folders/1J0f79NLH--SZ9DGIaFO2n5hSNdjU7rUn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2.5 text-white font-semibold bg-[#e0a800] hover:bg-[#c99300] rounded-full transition shadow-md"
          >
            Ver piezas listas
          </a>
        </details>

        {/* Contacto */}
        <details className="mb-6 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer text-base font-semibold text-[#3b3025]">
            📍 Información de contacto
          </summary>

          <ul className="mt-3 text-sm text-[#3b3025] space-y-2">
            <li>
              📞{" "}
              <a href="tel:+34644671664" className="text-blue-600 hover:underline">
                644 671 664
              </a>
            </li>
            <li>
              📧{" "}
              <a
                href="mailto:lapurisimaconchioficial@gmail.com"
                className="text-blue-600 hover:underline"
              >
                lapurisimaconchioficial@gmail.com
              </a>
            </li>
            <li>🏠 Calle Israel Nº5, Córdoba - España</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
            <button
              onClick={() => (window.location.href = "tel:+34644671664")}
              className="px-3 py-2 bg-[#f5f1ea] hover:bg-[#ebe4da] rounded-xl text-sm"
            >
              Llamar
            </button>

            <button
              onClick={() =>
                (window.location.href =
                  "mailto:lapurisimaconchioficial@gmail.com")
              }
              className="px-3 py-2 bg-[#f5f1ea] hover:bg-[#ebe4da] rounded-xl text-sm"
            >
              Email
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=Calle+Israel+5+Córdoba",
                  "_blank"
                )
              }
              className="px-3 py-2 bg-[#f5f1ea] hover:bg-[#ebe4da] rounded-xl text-sm"
            >
              Cómo llegar
            </button>
          </div>
        </details>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="w-full mb-5 bg-[#7a4326] hover:bg-[#66361d] text-white py-3 rounded-2xl font-semibold shadow-md transition"
        >
          Cerrar sesión
        </button>

        {/* Legales */}
        <div className="text-center text-sm space-y-2">
          <p>
            <button
              onClick={() => navigate("/politica-privacidad")}
              className="text-[#c35b5b] underline hover:text-[#a94747]"
            >
              Política de Privacidad
            </button>
          </p>
          <p>
            <button
              onClick={() => navigate("/condiciones-pago")}
              className="text-[#c35b5b] underline hover:text-[#a94747]"
            >
              Condiciones del Servicio de Pago
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </PantallaConVolver>
  );
}