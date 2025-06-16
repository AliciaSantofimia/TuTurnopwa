import React from "react";
import { useNavigate } from "react-router-dom";

export default function PoliticaPrivacidad() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Volver
      </button>
      <h1>Política de Privacidad – TuTurnoApp</h1>

      <p>
        En <strong>TuTurnoApp</strong> nos tomamos muy en serio tu privacidad. A continuación, te explicamos qué datos recogemos, para qué los usamos y cómo puedes ejercer tus derechos.
      </p>

      <h3>📌 ¿Qué datos recogemos?</h3>
      <p>Cuando usas TuTurno, podemos recoger y guardar:</p>
      <ul>
        <li>Tu nombre y dirección de correo electrónico (cuando te registras)</li>
        <li>Las clases que reservas</li>
        <li>Los bonos o tarjetas regalo que compras o canjeas</li>
        <li>Tu historial de reservas</li>
      </ul>

      <h3>🔐 ¿Dónde se almacenan tus datos?</h3>
      <p>
        Tus datos se guardan de forma segura en <strong>Firebase</strong> (servicio de Google), que cumple con los requisitos del Reglamento General de Protección de Datos (RGPD).
      </p>

      <h3>🎯 ¿Para qué usamos tus datos?</h3>
      <p>Usamos tus datos para:</p>
      <ul>
        <li>Gestionar tus reservas</li>
        <li>Enviarte notificaciones importantes</li>
        <li>Permitirte ver tu historial y datos desde tu perfil</li>
      </ul>
      <p><strong>Nunca vendemos ni compartimos tus datos con terceros.</strong></p>

      <h3>🗑️ ¿Puedes borrar o modificar tus datos?</h3>
      <p>Sí. Desde tu perfil puedes editar tus datos o consultar tu historial.</p>
      <p>Si deseas eliminar completamente tu cuenta y todos tus datos, escríbenos a: <strong>privacidad@tuturnoapp.es</strong></p>

      <h3>📅 Última actualización</h3>
      <p>Esta política ha sido actualizada por última vez el <strong>27 de mayo de 2025</strong>.</p>
    </div>
  );
}
