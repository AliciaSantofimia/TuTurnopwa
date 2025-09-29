import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import BotonVolver from "./BotonVolver";

export default function ResumenPago() {
  const { state = {} } = useLocation();
  const navigate = useNavigate();

  const {
    desdeTarjeta,
    tipo,
    clase,
    precio, // € (número o string)
    fecha,
    turno,
    metodo,
    plazas,
    orderId: orderIdFromState,
    payMethod: payMethodFromState, // "card" | "bizum"
  } = state;

  // Precio seguro en €
  const precioFinal = useMemo(() => {
    const n = Number(String(precio).replace(/[^\d.,]/g, "").replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [precio]);

  // URLs absolutas (puedes moverlas a envs en Vercel)
  const ORIGIN =
    typeof window !== "undefined" ? window.location.origin : "https://app.lapurisimaconchi.com";
  const URL_OK = new URL("/pago/exito", ORIGIN).toString();
  const URL_KO = new URL("/pago/error", ORIGIN).toString();
  const URL_NOTIFY = new URL("/api/notificacionTPV", ORIGIN).toString();

  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [cargando, setCargando] = useState(false);

  const plazasMostrar = Number(plazas) > 0 ? Number(plazas) : 1;

  // ORDER válido (4–12, empieza en dígito)
  function makeOrderId(base) {
    let oid = String(base ?? Date.now());
    oid = oid.replace(/\D/g, "");
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
    oid = oid.padStart(12, "0").slice(-12);
    if (!/^\d/.test(oid)) oid = "9" + oid.slice(1);
    return oid;
  }

  // Redirección a tu API (que devolverá el <form> auto-submit)
  function irAPasarela({ precio, orderId, payMethod = "card" }) {
    const amountCents = Math.max(1, Math.round(Number(precio) * 100));
    const oid = makeOrderId(orderId);
    const qs = new URLSearchParams({
      orderId: oid,
      amountCents: String(amountCents),
      okUrl: URL_OK,
      koUrl: URL_KO,
      notifyUrl: URL_NOTIFY,
      payMethod,
    });
    window.location.href = `/api/crear-sesion?${qs.toString()}`;
  }

  async function handleConfirmarPago() {
    if (!aceptaPoliticas) return;

    // Tarjeta regalo → no cobra aquí
    if (desdeTarjeta) {
      if (!Number.isFinite(precioFinal)) {
        alert("Falta el precio para generar la tarjeta.");
        return;
      }
      navigate("/generarcodigotarjetaregalo", {
        state: { tipo, clase, precio: precioFinal },
      });
      return;
    }

    // Debe estar logueado
    const auth = getAuth();
    if (!auth.currentUser) {
      alert("Debes iniciar sesión.");
      return;
    }

    if (!Number.isFinite(precioFinal) || precioFinal <= 0) {
      alert("No se ha podido calcular el precio de la clase.");
      return;
    }

    try {
      setCargando(true);
      irAPasarela({
        precio: precioFinal,
        orderId: orderIdFromState,
        payMethod: payMethodFromState || "card",
      });
    } finally {
      // La navegación ocurre inmediatamente; este estado es por UX si algo retrasa el cambio
      setCargando(false);
    }
  }

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6 text-[#333] text-center">
        <BotonVolver />
        <h1 className="text-[1.6rem] text-[#3b3025] font-semibold mb-4">Resumen del pago</h1>

        <p className="mb-2"><strong>Clase:</strong> {clase || (desdeTarjeta ? "Clase regalo" : "-")}</p>
        <p className="mb-2"><strong>Fecha:</strong> {fecha || "-"}</p>
        <p className="mb-2"><strong>Turno:</strong> {turno || "-"}</p>
        <p className="mb-2"><strong>Método:</strong> {metodo || "-"}</p>
        <p className="mb-2"><strong>Plazas:</strong> {plazasMostrar}</p>

        <p className="mb-4">
          <strong>Precio:</strong>{" "}
          {Number.isFinite(precioFinal) ? `${precioFinal.toFixed(2)} €` : <span className="text-red-600">— falta precio —</span>}
        </p>

        <div className="text-sm text-gray-700 text-left mb-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mr-2 mt-1"
              checked={aceptaPoliticas}
              onChange={(e) => setAceptaPoliticas(e.target.checked)}
            />
            <span>
              He leído y acepto las{" "}
              <span className="text-red-500 underline cursor-pointer" onClick={() => navigate("/condiciones-pago")}>
                Condiciones de Uso
              </span>
              ,{" "}
              <span className="text-red-500 underline cursor-pointer" onClick={() => navigate("/politica-cancelacion")}>
                Política de Cancelación
              </span>{" "}
              y{" "}
              <span className="text-red-500 underline cursor-pointer" onClick={() => navigate("/politica-piezas")}>
                Política sobre roturas de piezas
              </span>.
            </span>
          </label>
        </div>

        <button
          onClick={handleConfirmarPago}
          disabled={!aceptaPoliticas || !Number.isFinite(precioFinal) || cargando}
          className={`w-full py-2 px-4 rounded-xl font-bold mb-4 ${
            aceptaPoliticas && Number.isFinite(precioFinal) && !cargando
              ? "bg-yellow-600 hover:bg-yellow-500 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {cargando ? "Conectando con el banco..." : "Confirmar pago"}
        </button>
      </div>
    </div>
  );
}
