import { useNavigate } from "react-router-dom";

const BotonReserva = ({ destino }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(destino)}
      className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full mt-6 transition"
    >
      Reservar ahora
    </button>
  );
};

export default BotonReserva;
