import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, push } from "firebase/database";
import { dbRealtime } from "./firebase";

export default function ResumenPago() {
  const location = useLocation();
  const navigate = useNavigate();

  const { desdeTarjeta, tipo, clase, precio, fecha, turno, metodo, plazas } = location.state || {};

  const handleConfirmarPago = async () => {
    if (desdeTarjeta) {
      //  Tarjeta regalo → ir a generar código
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

        {/* 🔙 Botón Volver */}
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/perfil");
            }
          }}
          className="text-blue-700 underline mb-4 text-left"
        >
          ← Volver
        </button>

        <h1 className="text-[1.6rem] text-[#3b3025] font-semibold mb-4">Resumen del pago</h1>

        <p className="mb-2"><strong>Clase:</strong> {clase || "Clase regalo"}</p>
        <p className="mb-2"><strong>Fecha:</strong> {fecha}</p>
        <p className="mb-2"><strong>Turno:</strong> {turno}</p>
        <p className="mb-2"><strong>Método:</strong> {metodo}</p>
        <p className="mb-4"><strong>Precio:</strong> {precio ? `${precio}€` : "70€"}</p>

        <p className="text-sm text-[#666] mb-4">
          Al confirmar el pago, aceptas nuestra{" "}
          <span
            className="text-red-500 underline cursor-pointer"
            onClick={() => navigate("/condiciones-pago")}
          >
            Política de Pagos
          </span>{" "}
          y{" "}
          <span
            className="text-red-500 underline cursor-pointer"
            onClick={() => navigate("/politica-privacidad")}
          >
            Política de Privacidad
          </span>.
        </p>

        <button
          onClick={handleConfirmarPago}
          className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-xl w-full mb-4"
        >
          Confirmar pago
        </button>
      </div>
    </div>
  );
}






