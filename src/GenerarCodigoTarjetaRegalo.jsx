import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { crearTarjetaRegalo } from "./crearTarjetaRegalo";
import BotonVolver from "./BotonVolver";

export default function GenerarCodigoTarjetaRegalo() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    clase,
    claseId,
    subtipo,
    tipoPieza,
    tipoTaller,
    rutaReserva,
    requiereMetodo,
    requiereTipoPieza,
    precio,
    precioBase,
    precioTotal,
    plazas,
    desdeCompraTarjeta,
    nombreRegalado,
    nombreComprador,
    mensaje,
    orderId,
  } = location.state || {};

  const [codigo, setCodigo] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const generar = async () => {
      if (!user) return;

      if (!desdeCompraTarjeta || !clase || !claseId || !precioTotal) {
        setError("Faltan datos para generar la tarjeta regalo.");
        return;
      }

      try {
        const codigoGenerado = await crearTarjetaRegalo({
          clase,
          claseId,
          subtipo: subtipo || "",
          tipoPieza: tipoPieza || "",
          tipoTaller: tipoTaller || "",
          rutaReserva: rutaReserva || "",
          requiereMetodo: !!requiereMetodo,
          requiereTipoPieza: !!requiereTipoPieza,
          precio: Number(precio || precioTotal || 0),
          precioBase: Number(precioBase || precioTotal || 0),
          precioTotal: Number(precioTotal || precio || 0),
          plazas: Number(plazas || 1),
          compradorUID: user.uid,
          nombreDestinatario: nombreRegalado || "",
          nombreComprador: nombreComprador || "",
          mensajePersonalizado: mensaje || "",
          orderId: orderId || "",
        });

        if (codigoGenerado) {
          setCodigo(codigoGenerado);
        } else {
          setError("No se pudo generar el código de la tarjeta regalo.");
        }
      } catch (e) {
        console.error(e);
        setError("Error al generar el código.");
      }
    };

    generar();
  }, [
    user,
    clase,
    claseId,
    subtipo,
    tipoPieza,
    tipoTaller,
    rutaReserva,
    requiereMetodo,
    requiereTipoPieza,
    precio,
    precioBase,
    precioTotal,
    plazas,
    desdeCompraTarjeta,
    nombreRegalado,
    nombreComprador,
    mensaje,
    orderId,
  ]);

  return (
    <div className="bg-[#fffef4] min-h-screen px-4 py-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <BotonVolver />

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-900 font-serif mb-2">
            ¡Tarjeta regalo generada!
          </h1>
          <p className="text-sm text-gray-600">
            Ya puedes compartir este código con la persona que recibirá el regalo.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-4">
            {error}
          </div>
        )}

        {codigo ? (
          <>
            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-5 text-center mb-5">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Clase regalo:</strong> {clase}
              </p>

              {subtipo && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Opción:</strong> {subtipo}
                </p>
              )}

              <p className="text-sm text-gray-700 mb-3">
                <strong>Importe:</strong> {precioTotal} €
              </p>

              <p className="text-sm text-gray-700 mb-3">
                <strong>Código único:</strong>
              </p>

              <div className="inline-block bg-[#f8f8f8] px-5 py-3 rounded-xl text-lg font-bold text-[#5c3c00] tracking-wide">
                {codigo}
              </div>
            </div>

            <div className="bg-[#fffaf0] border border-[#f1e7c6] rounded-xl p-4 mb-5 text-sm text-[#5c3c00]">
              {nombreRegalado && (
                <p className="mb-1">
                  <strong>Para:</strong> {nombreRegalado}
                </p>
              )}
              {nombreComprador && (
                <p className="mb-1">
                  <strong>De parte de:</strong> {nombreComprador}
                </p>
              )}
              {mensaje && (
                <p className="mt-2">
                  <strong>Mensaje:</strong> {mensaje}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-600 text-center mb-6">
              La persona que reciba este código podrá canjearlo en la app y reservar
              la experiencia concreta que le has regalado.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/tarjeta-regalo")}
                className="flex-1 px-6 py-3 rounded-full text-white font-semibold
                bg-gradient-to-b from-[#F6D66A] to-[#F4C542]
                shadow-md hover:shadow-lg
                hover:from-[#F4C542] hover:to-[#E5B92F]
                transition-all duration-200"
              >
                Finalizar
              </button>

              <button
                onClick={() => navigator.clipboard.writeText(codigo)}
                className="flex-1 px-6 py-3 rounded-full border border-[#F4C542] text-[#6b3700] font-semibold bg-white hover:bg-[#fffaf0] transition"
              >
                Copiar código
              </button>
            </div>
          </>
        ) : (
          !error && (
            <p className="text-center text-gray-600">Generando código...</p>
          )
        )}
      </div>
    </div>
  );
}