import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";


export default function ResumenPago() {
  const location = useLocation();
  const navigate = useNavigate();
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);

  const { desdeTarjeta, tipo, clase, precio, fecha, turno, metodo, plazas } = location.state || {};

  const handleConfirmarPago = async () => {
    if (!aceptaPoliticas) return;

    if (desdeTarjeta) {
      // Tarjeta regalo → ir a generar código
      navigate("/generarcodigotarjetaregalo", {
        state: { tipo, clase, precio }
      });
    } else {
      // 🧾 Reserva normal → guardar en Firebase y luego ir al perfil
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("Debes iniciar sesión.");
          return;
        }

        const reservaRef = ref(
          dbRealtime,
          `reservas/${clase}/${fecha}/${turno}/${metodo}`
        );

        await push(reservaRef, {
          uid: user.uid,
          nombre: user.displayName || "Usuario",
          tipo: metodo,
          plazas: plazas || 1,
          estado: "Confirmada",
          fechaReserva: new Date().toISOString()
        });

        navigate("/perfil");
      } catch (error) {
        console.error("Error al guardar reserva:", error);
        alert("Ocurrió un error al guardar la reserva.");
      }
    }
  };

  return (
    <div className="bg-[#fffef4] min-h-screen flex items-center justify-center px-4 py-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-6 text-[#333] text-center">

       <BotonVolver />

        <h1 className="text-[1.6rem] text-[#3b3025] font-semibold mb-4">Resumen del pago</h1>

        <p className="mb-2"><strong>Clase:</strong> {clase || "Clase regalo"}</p>
        <p className="mb-2"><strong>Fecha:</strong> {fecha}</p>
        <p className="mb-2"><strong>Turno:</strong> {turno}</p>
        <p className="mb-2"><strong>Método:</strong> {metodo}</p>
        <p className="mb-4"><strong>Precio:</strong> {precio ? `${precio}€` : "70€"}</p>

        {/* ✅ Checkbox para aceptar todas las políticas */}
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
              </span>.
            </span>
          </label>
        </div>

        {/* Botón de confirmación */}
        <button
          onClick={handleConfirmarPago}
          disabled={!aceptaPoliticas}
          className={`w-full py-2 px-4 rounded-xl font-bold mb-4 ${
            aceptaPoliticas
              ? "bg-yellow-600 hover:bg-yellow-500 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Confirmar pago
        </button>
      </div>
    </div>
  );
}







