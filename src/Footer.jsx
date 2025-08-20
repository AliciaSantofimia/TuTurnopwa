// src/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#fffef4] text-center text-gray-600 text-sm py-6 px-4 border-t">
      <p className="mb-2">
        Desarrollado con <span className="text-red-500">♥</span> por{" "}
        <a
          href="https://tuturnoapp.es"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#b36a4a] hover:underline"
        >
          TuTurnoapp.es
        </a>
      </p>

      <div className="flex justify-center gap-4 flex-wrap text-xs">
        <Link to="/politica-privacidad" className="hover:underline">
          Política de Privacidad
        </Link>
        <Link to="/condiciones-uso" className="hover:underline">
          Condiciones de Uso
        </Link>
        <Link to="/politica-cancelacion" className="hover:underline">
          Política de Cancelación
        </Link>
        <Link to="/politica-roturas" className="hover:underline">
          Política sobre Roturas de Piezas
        </Link>
        <Link to="/aviso-legal" className="hover:underline">
          Aviso Legal
        </Link>
      </div>
    </footer>
  );
}



