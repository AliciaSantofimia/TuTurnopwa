import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const handleregistro = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro (validación, Firebase, etc.)
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirmar contraseña:", confirmar);
  };

  return (
    <div className="bg-[#fdfaf5] min-h-screen flex flex-col items-center justify-center px-4 text-[#333]">
      <img
        src="/img/logoPCsin.png"
        alt="Logo La Purísima Conchi"
        className="w-40 mb-6"
      />

      <h1 className="text-2xl font-serif text-[#5c2e00] mb-4">Crear cuenta</h1>

      <form
        onSubmit={handleregistro}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
      >
        <div>
          <label htmlFor="nombre" className="block font-bold text-sm mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

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
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmar" className="block font-bold text-sm mb-1">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmar"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-base"
            placeholder="Repite la contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#b36a4a] hover:bg-[#9e5c3f] text-white font-bold text-lg py-3 rounded-xl"
        >
          Registrarse
        </button>

        <div className="text-sm text-center mt-2">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-blue-700 font-bold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Inicia sesión
          </span>
        </div>
      </form>
    </div>
  );
}
