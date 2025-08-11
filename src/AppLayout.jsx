// src/AppLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import PageContainer from "./PageContainer"; // 👈 importa el contenedor común

export default function AppLayout() {
  const location = useLocation();
  const ocultarFooterEn = ["/perfil", "/dondereservar"];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffef4] font-sans">
      {/* Si usas cabecera fija, déjala; si no, quítala */}
      {/* <Header /> */}

      <main className="flex-grow">
        {/* Aquí se centra y se limita el ancho de TODAS las páginas */}
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>

      {!ocultarFooterEn.includes(location.pathname) && <Footer />}
    </div>
  );
}


