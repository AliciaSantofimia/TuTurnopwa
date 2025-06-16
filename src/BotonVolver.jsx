// src/BotonVolver.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BotonVolver() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-sm text-gray-700 hover:text-black underline mb-4"
    >
      ← Volver atrás
    </button>
  );
}
