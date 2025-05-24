import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-600 py-6 mt-10">
      <p>
        Al continuar navegando, aceptas nuestras
        <Link
          to="/condicionesuso"
          className="text-orange-700 underline font-semibold hover:text-orange-900 mx-1"
        >
          Condiciones de Uso
        </Link>
        y nuestra
        <Link
          to="/politicacancelacion"
          className="text-orange-700 underline font-semibold hover:text-orange-900 mx-1"
        >
          Política de Cancelación
        </Link>
        .
      </p>
    </footer>
  );
}
