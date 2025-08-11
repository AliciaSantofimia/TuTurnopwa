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
      className="text-lg text-blue-700 hover:text-blue-900 mb-4"
      aria-label="Volver"
    >
      ←
    </button>
  );
}



