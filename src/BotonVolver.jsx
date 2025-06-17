import React from "react";
import { useNavigate } from "react-router-dom";

export default function BotonVolver({ volverA }) {
  const navigate = useNavigate();

  const handleVolver = () => {
    if (volverA) {
      navigate(volverA);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleVolver}
      className="text-sm text-gray-700 hover:text-black underline mb-4"
    >
      ← Volver atrás
    </button>
  );
}

