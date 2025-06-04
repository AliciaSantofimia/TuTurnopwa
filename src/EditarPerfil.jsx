import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  updateProfile,
  updateEmail,
  onAuthStateChanged
} from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database"; // ✅ Importar Realtime DB

export default function EditarPerfil() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setNombre(user.displayName || "");
        setEmail(user.email || "");
      } else {
        navigate("/login");
      }
      setCargando(false);
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nombre.trim()) return setError("El nombre no puede estar vacío.");
    if (!validarEmail(email)) return setError("El correo no es válido.");

    try {
      await updateProfile(usuario, { displayName: nombre });
      await updateEmail(usuario, email);

      // ✅ Actualizar también en Realtime Database
      const db = getDatabase();
      const userRef = ref(db, "usuarios/" + usuario.uid);
      await update(userRef, {
        nombre,
        email
      });

      setSuccess("Perfil actualizado correctamente.");
      setTimeout(() => navigate("/perfil"), 1200);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setError("Hubo un problema al actualizar tu perfil.");
    }
  };

  if (cargando) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Guardar cambios
          </button>
          <button
            type="button"
            onClick={() => navigate("/perfil")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}


