// src/PantallaConVolver.jsx
import React from "react";
import BotonVolver from "./BotonVolver";

export default function PantallaConVolver({ children }) {
  return (
    <div className="bg-[#fffef4] min-h-screen px-4 py-6">
      <div className="mb-4 px-2">
        <BotonVolver />
      </div>
      <div className="flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
