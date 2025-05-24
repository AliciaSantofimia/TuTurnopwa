import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fffef4] font-sans">

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
