import { useNavigate } from "react-router-dom";

const BotonReserva = ({ destino, className = "" }) => {
  const navigate = useNavigate();

  return (
      <button
        type="button"
        onClick={() => navigate(destino)}
        className={`w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full transition mb-5 ${className}`}
      >
        Reservar ahora
      </button>
  );
};

export default BotonReserva;
