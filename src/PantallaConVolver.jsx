// src/PantallaConVolver.jsx
import React from "react";
import BotonVolver from "./BotonVolver";

export default function PantallaConVolver({ children }) {
  return (
    <div className="bg-[#fffef4] min-h-screen w-full px-4 py-6 overflow-x-hidden">
      
      <div className="mb-4">
        <BotonVolver />
      </div>

      {children}

    </div>
  );
}