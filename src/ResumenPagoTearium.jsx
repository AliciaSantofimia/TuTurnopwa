import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function ResumenPagoTearium() {
  const location = useLocation();
  const { fecha, turno, plazas, precioTotal, payMethod: payMethodFromState } = location.state || {};
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [cargando, setCargando] = useState(false);

  const PRECIO_UNITARIO = 25;
  const plazasNum = Number(plazas) > 0 ? Number(plazas) : 1;

  // Total en €
  const totalEuros = useMemo(() => {
    const total = Number(String(precioTotal ?? "").replace(/[^\d.,]/g, "").replace(",", "."));
    return Number.isFinite(total) && total > 0 ? total : plazasNum * PRECIO_UNITARIO;
  }, [plazasNum, precioTotal]);

  // URLs absolutas (según entorno)
  const ORIGIN =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://app.lapurisimaconchi.com";
  const URL_OK = new URL("/pago/exito", ORIGIN).toString();
  const URL_KO = new URL("/pago/error", ORIGIN).toString();
  const URL_NOTIFY = new URL("/api/notificacionTPV", ORIGIN).toString();

  // OrderId 12 dígitos (empieza por dígito)
  function makeOrderId(base) {
    let oid = String(base ?? Date.now());
    oid = oid.replace(/\D/g, "");
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
    oid = oid.padStart(12, "0").slice(-12);
    if (!/^\d/.test(oid)) oid = "9" + oid.slice(1);
    return oid;
  }

  async function irAPasarela({ precio, orderId, payMethod = "card" }) {
    // 1) Céntimos
    const amountCents = Math.max(1, Math.round(Number(precio) * 100));

    // 2) ORDER válido
    const oid = makeOrderId(orderId);

    // 3) Pide a tu API los 3 campos (POST JSON)
    const resp = await fetch("/api/crear-sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: oid,
        amountCents,
        okUrl: URL_OK,
        koUrl: URL_KO,
        notifyUrl: URL_NOTIFY,
        payMethod, // "card" | "bizum" (si lo activas)
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error("Error crear sesión TPV:", txt);
      throw new Error("No se pudo iniciar el pago");
    }

    const data = await resp.json();
    const { endpoint, Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = data || {};
    if (!endpoint || !Ds_SignatureVersion || !Ds_MerchantParameters || !Ds_Signature) {
      throw new Error("Respuesta de TPV incompleta");
    }

    // 4) FORM POST a Redsys (requisito)
    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoint;

    const fields = { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature };
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  const handleConfirmarPago = async () => {
    if (!aceptaPoliticas) return;

    try {
      setCargando(true);
      await irAPasarela({
        precio: totalEuros,
        orderId: Date.now().toString(), // ya lo normalizamos dentro
        payMethod: payMethodFromState || "card",
      });
    } catch (error) {
      console.error("Error al iniciar pago:", error);
      alert("Ocurrió un error al iniciar el pago. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 bg-[#fffef4] min-h-screen font-sans text-gray-800">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 border border-yellow-200">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center font-serif">
          Resumen de tu reserva
        </h2>

        <p><strong>Lugar:</strong> Tearium</p>
        <p><strong>Fecha:</strong> {fecha || "-"}</p>
        <p><strong>Turno:</strong> {turno || "-"}</p>
        <p><strong>Número de plazas:</strong> {plazasNum}</p>
        <p className="mb-4">
          <strong>Precio total:</strong>{" "}
          {Number.isFinite(totalEuros)
            ? `${totalEuros.toFixed(2)} €`
            : <span className="text-red-600">— falta precio —</span>}
        </p>

        <label className="flex items-start mb-4 text-sm text-gray-700">
          <input
            type="checkbox"
            className="mr-2 mt-1"
            checked={aceptaPoliticas}
            onChange={(e) => setAceptaPoliticas(e.target.checked)}
          />
          <span>He leído y acepto las condiciones de pago y políticas del taller.</span>
        </label>

        <button
          onClick={handleConfirmarPago}
          disabled={!aceptaPoliticas || cargando}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
            aceptaPoliticas && !cargando
              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {cargando ? "Conectando con el banco..." : "Confirmar y pagar"}
        </button>
      </div>
    </div>
  );
}
