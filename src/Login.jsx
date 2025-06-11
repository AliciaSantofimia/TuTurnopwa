import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dondereservar");
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="bg-[#fdfaf5] min-h-screen flex flex-col items-center justify-center px-4 text-[#333]">
      <img
        src="/img/logoPCsin.png"
        alt="Logo La Purísima Conchi"
        className="w-40 mb-6"
      />

      <h1 className="text-2xl font-serif text-[#5c2e00] mb-4">Iniciar sesión</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
      >
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <div>
          <label htmlFor="email" className="block font-bold text-sm mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base"
            placeholder="tucorreo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-bold text-sm mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#b36a4a] hover:bg-[#9e5c3f] text-white font-bold text-lg py-3 rounded-xl"
        >
          Entrar
        </button>

        <div className="text-sm text-center mt-2">
          ¿No tienes cuenta?{" "}
          <span
            className="text-blue-700 font-bold cursor-pointer"
            onClick={() => navigate("/registro")}
          >
            Regístrate aquí
          </span>
        </div>
      </form>
    </div>
  );
}
