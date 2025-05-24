import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/img/logoPCsin.png"
          alt="Logo La Purísima"
          className="h-12 w-auto"
        />
        <h1 className="text-xl md:text-2xl font-bold text-yellow-900 font-serif">
          La Purísima Taller Creativo
        </h1>
      </div>
      <nav className="mt-2 md:mt-0">
        <Link
          to="/"
          className="text-sm text-orange-700 font-medium hover:underline"
        >
          Volver al inicio
        </Link>
      </nav>
    </header>
  );
}
