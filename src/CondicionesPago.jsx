import React from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./BotonVolver";


export default function CondicionesPago() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6", backgroundColor: "#fffef4", minHeight: "100vh", color: "#333" }}>
      <BotonVolver />

      <h1 style={{ color: "#6b3700" }}>Condiciones del Servicio de Pago – TuTurnoApp</h1>

      <p>
        En <strong>TuTurnoApp</strong> los pagos se procesan a través de la plataforma segura
        <strong> Redsys</strong>, proveedor homologado que utiliza cifrado de extremo a extremo
        para garantizar la protección de tus datos personales y financieros.
      </p>

      <h3>🔐 Seguridad</h3>
      <p>
        Nuestra aplicación <strong>no almacena en ningún momento tus datos de tarjeta</strong>.
        Toda la operación de pago se realiza en la pasarela externa de Redsys con conexión
        cifrada y segura.
      </p>

      <h3>💳 Problemas con el pago</h3>
      <p>
        Si ocurre algún problema durante el proceso de pago (cobros duplicados, error en la
        operación, etc.), puedes contactar con nosotros escribiendo a:
        <br />
        <strong>pagos@tuturnoapp.es</strong>
      </p>

      <h3>❌ Reembolsos</h3>
      <p>
        Los pagos realizados <strong>no son reembolsables</strong>, salvo en los casos
        especificados en nuestra <strong>Política de Cancelación</strong>. Por favor, asegúrate de
        tu reserva antes de confirmar el pago.
      </p>

      <h3>📅 Última actualización</h3>
      <p>
        Este texto ha sido actualizado por última vez el <strong>27 de mayo de 2025</strong>.
      </p>
    </div>
  );
}
