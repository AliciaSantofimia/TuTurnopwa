import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fffef4] font-sans">
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Mostrar footer en todas las páginas excepto /perfil */}
      {!["/perfil", "/dondereservar"].includes(location.pathname) && <Footer />}

    </div>
  );
}

