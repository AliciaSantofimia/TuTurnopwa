import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import PantallaConVolver from "./PantallaConVolver";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dondereservar");
    } catch (error) {
      setError("No se ha podido iniciar sesión. Revisa el correo y la contraseña.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <PantallaConVolver>
      <div className="bg-[#fdfaf5] min-h-screen flex items-center justify-center px-4 py-8 text-[#333]">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/img/logoPCsin.png"
              alt="Logo La Purísima Conchi"
              className="w-28 sm:w-36 md:w-40 mb-4"
            />

            <h1 className="text-2xl sm:text-3xl font-serif text-[#5c2e00] text-center">
              Iniciar sesión
            </h1>

            <p className="text-sm sm:text-base text-[#7a6a58] text-center mt-2">
              Accede a tu cuenta para gestionar tus reservas.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded-2xl p-5 sm:p-6 w-full flex flex-col gap-4"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block font-bold text-sm mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-xl px-3 py-3 text-base outline-none focus:border-[#b36a4a]"
                placeholder="tucorreo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-bold text-sm mb-1">
                Contraseña
              </label>

              <div className="relative">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  id="password"
                  className="w-full border border-gray-300 rounded-xl px-3 py-3 pr-20 text-base outline-none focus:border-[#b36a4a]"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setMostrarPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#8a5a44]"
                >
                  {mostrarPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="bg-[#b36a4a] hover:bg-[#9e5c3f] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-base sm:text-lg py-3 rounded-xl transition"
            >
              {cargando ? "Entrando..." : "Entrar"}
            </button>

            <div className="text-sm text-center mt-1">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="text-blue-700 font-bold"
                onClick={() => navigate("/registro")}
              >
                Regístrate aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </PantallaConVolver>
  );
}