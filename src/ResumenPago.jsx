// ResumenPago.jsx
import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import BotonVolver from "./BotonVolver";

/* ----------------- Utilidades ----------------- */
function normalize(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
function parseEuro(n) {
  const v = Number(String(n ?? "").replace(/[^\d.,-]/g, "").replace(",", "."));
  return Number.isFinite(v) ? v : 0;
}

/**
 * Precios unitarios por clase.
 * - SOLO Bono 4 Clases aplica +5€ si metodo === "torno".
 * - Exprés Continuo: torno 32€, general/modelado 27€.
 * - Pinta tu pieza de cerámica: 25€ siempre (sin recargo).
 * - Tearium / The Club: 25€.
 */
function getUnitPrice(clase = "", metodo = "") {
  const c = normalize(clase);
  const m = normalize(metodo);
  const isTorno = m === "torno";

  // Conjuntos de alias (soportan variaciones de texto)
  const BASICO = new Set(["basico esencial", "básico esencial"]);
  const CREATIVO_PLUS = new Set(["creativo plus"]);
  const EDICION_PREMIUM = new Set(["edicion premium", "edición premium"]);
  const FUNDAMENTAL_MINI = new Set(["fundamental mini"]);
  const EXPRESS_CONTINUO = new Set(["expres continuo", "expres continuo", "exprés continuo", "express continuo"]);
  const PINTA = new Set([
    "pinta tu pieza de ceramica",
    "pinta tu pieza de cerámica",
    "pinta tu pieza",
  ]);
  const CREA_PIEZA = new Set(["crea tu pieza favorita"]);
  const TEARIUM = new Set(["tearum", "tea rium", "tearium"]);
  const THE_CLUB = new Set(["the club"]);
  const BONO2 = new Set([
    "bono 2 clases",
    "2 clases 4h/mes",
    "2 clases de 4h al mes",
    "dos clases 4h/mes",
  ]);
  const BONO4 = new Set([
    "bono 4 clases",
    "4 clases 3h/mes",
    "4 clases de 3h al mes",
    "cuatro clases 3h/mes",
  ]);
  const TORNO_INTENSIVO = new Set([
    "torno intensivo individual (1 dia)",
    "torno intensivo individual (1 dia)",
    "torno intensivo individual (1 dia)", // normalizado sin acentos
    "torno intensivo individual (1 dia)".replaceAll("dia", "dia"), // redundante pero inocuo
    "torno intensivo individual (1 dia/dio)", // por si llega mal tecleado
    "torno intensivo individual 1 dia",
    "torno intensivo individual 1 dio",
  ]);

  if (BASICO.has(c)) return 45;
  if (CREATIVO_PLUS.has(c)) return 55;
  if (EDICION_PREMIUM.has(c)) return 65;
  if (FUNDAMENTAL_MINI.has(c)) return 35;

  if (EXPRESS_CONTINUO.has(c)) {
    // torno 32, general/modelado 27
    if (isTorno) return 32;
    return 27;
  }

  if (PINTA.has(c)) return 25;
  if (CREA_PIEZA.has(c)) return 45;
  if (TEARIUM.has(c)) return 25;
  if (THE_CLUB.has(c)) return 25;

  if (BONO2.has(c)) return 70;

  if (BONO4.has(c)) {
    // 79€ (+5€ SOLO si es torno)
    return isTorno ? 79 + 5 : 79;
  }

  if (TORNO_INTENSIVO.has(c)) return 85;

  // fallback
  return 0;
}

/* ----------------- Componente ----------------- */
export default function ResumenPago() {
  const { state = {} } = useLocation();
  const navigate = useNavigate();

  const {
    desdeTarjeta,               // boolean: si es tarjeta regalo
    tipo,                       // opcional, por si lo usas en generar código
    clase,                      // nombre de la clase
    precio,                     // podría venir ya como TOTAL (número o string)
    fecha,
    turno,
    metodo,                     // "torno" | "modelado a mano" | "general" | ...
    plazas,
    orderId: orderIdFromState,
    payMethod: payMethodFromState, // "card" | "bizum"
  } = state;

  /* Cálculo robusto: si 'precio' viene numérico desde state, se toma como TOTAL;
     si no, se calcula con la tabla unitario × plazas */
  const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;
  const unitFromTable = useMemo(() => getUnitPrice(clase, metodo), [clase, metodo]);
  const totalEuros = useMemo(() => {
    const desdeState = parseEuro(precio);
    if (desdeState > 0) return desdeState;           // respeta total si ya llega
    return unitFromTable * plazasNum;                 // si no, calcula aquí
  }, [precio, unitFromTable, plazasNum]);
  const showUnit = unitFromTable > 0 && plazasNum > 1;

  // URLs absolutas (puedes moverlas a envs en Vercel)
  const ORIGIN =
    typeof window !== "undefined" ? window.location.origin : "https://app.lapurisimaconchi.com";
  const URL_OK = new URL("/pago/exito", ORIGIN).toString();
  const URL_KO = new URL("/pago/error", ORIGIN).toString();
  const URL_NOTIFY = new URL("/api/notificacionTPV", ORIGIN).toString();

  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [cargando, setCargando] = useState(false);

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

    // Tarjeta regalo → no cobra aquí, genera el código con el PVP total calculado
    if (desdeTarjeta) {
      if (!(totalEuros > 0)) {
        alert("Falta el precio para generar la tarjeta.");
        return;
      }
      navigate("/generarcodigotarjetaregalo", {
        state: { tipo, clase, precio: totalEuros, metodo, plazas: plazasNum },
      });
      return;
    }

    // Debe estar logueado para pagar
    const auth = getAuth();
    if (!auth.currentUser) {
      alert("Debes iniciar sesión.");
      return;
    }

    if (!(totalEuros > 0)) {
      alert("No se ha podido calcular el precio de la clase.");
      return;
    }

    try {
      setCargando(true);
      irAPasarela({
        precio: totalEuros,
        orderId: orderIdFromState,
        payMethod: payMethodFromState || "card",
      });
    } finally {
      // La navegación ocurre enseguida; el estado es solo por UX si hubiera latencia
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
        <p className="mb-2"><strong>Plazas:</strong> {plazasNum}</p>

        {showUnit && (
          <p className="mb-1">
            <strong>Precio unitario:</strong> {unitFromTable.toFixed(2)} €
          </p>
        )}
        <p className="mb-4">
          <strong>Precio total:</strong>{" "}
          {totalEuros > 0 ? `${totalEuros.toFixed(2)} €` : <span className="text-red-600">— falta precio —</span>}
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
          disabled={!aceptaPoliticas || !(totalEuros > 0) || cargando}
          className={`w-full py-2 px-4 rounded-xl font-bold mb-4 ${
            aceptaPoliticas && totalEuros > 0 && !cargando
              ? "bg-yellow-600 hover:bg-yellow-500 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {cargando ? "Conectando con el banco..." : desdeTarjeta ? "Generar tarjeta regalo" : "Confirmar pago"}
        </button>
      </div>
    </div>
  );
}
