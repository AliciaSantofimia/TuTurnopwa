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
  const [reservaActiva, setReservaActiva] = useState(null);
  const [reservasPasadas, setReservasPasadas] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);

        const userRef = ref(dbRealtime, "usuarios/" + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) setNombre(snapshot.val().nombre);

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
            Consulta tus reservas y datos de tu cuenta
          </p>
        </div>

        {/* Datos usuario */}
        <div className="bg-white rounded-2xl border border-[#efe7db] px-4 py-4 shadow-sm mb-5">
          <p className="text-sm mb-2">
            <span className="font-semibold">Nombre:</span> {nombre || "—"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Email:</span> {email || "—"}
          </p>
        </div>

        {/* Botones principales */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            className="bg-[#f2c500] hover:bg-[#e4b800] text-[#3b3025] font-bold py-3 rounded-2xl text-sm shadow-md transition"
            onClick={() => navigate("/dondereservar")}
          >
            🗓️ Reservar
          </button>

          <button
            className="bg-white border border-[#e6a6cf] text-[#b84c85] font-bold py-3 rounded-2xl text-sm shadow-sm transition hover:bg-[#fdf2f8]"
            onClick={() => navigate("/canjear-tarjeta")}
          >
            🎁 Canjear tarjeta
          </button>
        </div>

        {/* Reserva activa */}
        <div className="bg-white rounded-2xl border border-[#efe7db] px-4 py-4 shadow-sm mb-5">
          <h2 className="text-base font-semibold mb-3">
            Tu próxima reserva
          </h2>

          {reservaActiva ? (
            <div className="space-y-1 text-sm">
              <p><strong>Clase:</strong> {reservaActiva.clase}</p>
              <p><strong>Fecha:</strong> {reservaActiva.fecha}</p>
              <p><strong>Turno:</strong> {reservaActiva.turno}</p>
              {reservaActiva.ubicacion && (
                <p><strong>Ubicación:</strong> {reservaActiva.ubicacion}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-[#7b6d62]">
              No tienes reservas activas.
            </p>
          )}
        </div>

        {/* Historial */}
        <details className="mb-5 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold">
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
          <summary className="cursor-pointer font-semibold">
            🏺 Recoger mi pieza
          </summary>

          <p className="text-sm mt-3">
            Tus piezas necesitan secado y cocción. Cuando estén listas, podrás verlas en la carpeta.
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

        {/* Contacto */}
        <details className="mb-6 bg-white border border-[#efe7db] rounded-2xl p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold">
            📍 Contacto
          </summary>

          <ul className="mt-3 text-sm space-y-2">
            <li>📞 644 671 664</li>
            <li>📧 lapurisimaconchioficial@gmail.com</li>
            <li>🏠 Calle Israel Nº5, Córdoba</li>
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
          </ul>
        </details>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mb-5 bg-[#7a4326] text-white py-3 rounded-2xl font-semibold shadow-md"
        >
          Cerrar sesión
        </button>

        {/* Legales */}
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