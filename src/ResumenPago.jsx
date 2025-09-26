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
    payMethod: payMethodFromState, // opcional: "card" | "bizum"
  } = state;

  // Precio seguro en €
  const precioFinal = useMemo(() => {
    const n = Number(String(precio).replace(/[^\d.,]/g, "").replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [precio]);

  // URLs absolutas (dev/prod)
  const ORIGIN =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://app.lapurisimaconchi.com";
  const URL_OK = new URL("/pago/exito", ORIGIN).toString();
  const URL_KO = new URL("/pago/error", ORIGIN).toString();
  const URL_NOTIFY = new URL("/api/notificacionTPV", ORIGIN).toString();

  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [cargando, setCargando] = useState(false);

  const plazasMostrar = Number(plazas) > 0 ? Number(plazas) : 1;

  // ---- Helper para crear orderId válido (4-12 dígitos, empieza por dígito) ----
  function makeOrderId(base) {
    let oid = String(base ?? Date.now());
    // Solo dígitos
    oid = oid.replace(/\D/g, "");
    // Si se queda corto, usamos timestamp
    if (oid.length < 4) oid = (Date.now() % 1e12).toString();
    // A 12 dígitos
    oid = oid.padStart(12, "0").slice(-12);
    // Asegurar que empieza por dígito (ya lo es)
    if (!/^\d/.test(oid)) oid = "9" + oid.slice(1);
    return oid;
  }

  // ---- Ir a Redsys (pide sesión a tu API y hace FORM POST) ----
  async function irAPasarela({ precio, orderId, payMethod = "card" }) {
    // 1) Importe en céntimos
    const amountCents = Math.max(1, Math.round(Number(precio) * 100));

    // 2) ORDER válido
    const oid = makeOrderId(orderId);

    // 3) Llamada a tu API (POST JSON)
    const resp = await fetch("/api/crear-sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: oid,
        amountCents,
        okUrl: URL_OK,
        koUrl: URL_KO,
        notifyUrl: URL_NOTIFY,
        payMethod, // "card" | "bizum"
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error("Error crear sesión TPV:", txt);
      throw new Error("No se pudo iniciar el pago");
    }

    const data = await resp.json(); // { endpoint, Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature }
    const { endpoint, Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = data || {};
    if (!endpoint || !Ds_SignatureVersion || !Ds_MerchantParameters || !Ds_Signature) {
      throw new Error("Respuesta de TPV incompleta");
    }

    // 4) FORM POST a Redsys (requisito del TPV)
    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoint;

    const campos = { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature };
    Object.entries(campos).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
console.log("endpoint que devuelve la API:", endpoint);


    document.body.appendChild(form);
    form.submit();
  }

  // ---- Click principal ----
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

      await irAPasarela({
        precio: precioFinal, // € → céntimos dentro de la función
        orderId: orderIdFromState,
        payMethod: payMethodFromState || "card", // o "bizum" si lo pasas por state
      });
    } catch (err) {
      console.error("Error al iniciar pago:", err);
      alert("Ocurrió un error al iniciar el pago. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6 text-[#333] text-center">
        <BotonVolver />

        <h1 className="text-[1.6rem] text-[#3b3025] font-semibold mb-4">
          Resumen del pago
        </h1>

        <p className="mb-2">
          <strong>Clase:</strong>{" "}
          {clase || (desdeTarjeta ? "Clase regalo" : "-")}
        </p>
        <p className="mb-2"><strong>Fecha:</strong> {fecha || "-"}</p>
        <p className="mb-2"><strong>Turno:</strong> {turno || "-"}</p>
        <p className="mb-2"><strong>Método:</strong> {metodo || "-"}</p>
        <p className="mb-2"><strong>Plazas:</strong> {plazasMostrar}</p>

        <p className="mb-4">
          <strong>Precio:</strong>{" "}
          {Number.isFinite(precioFinal) ? (
            `${precioFinal.toFixed(2)} €`
          ) : (
            <span className="text-red-600">— falta precio —</span>
          )}
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
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => navigate("/condiciones-pago")}
              >
                Condiciones de Uso
              </span>
              ,{" "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => navigate("/politica-cancelacion")}
              >
                Política de Cancelación
              </span>{" "}
              y{" "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => navigate("/politica-piezas")}
              >
                Política sobre roturas de piezas
              </span>
              .
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
