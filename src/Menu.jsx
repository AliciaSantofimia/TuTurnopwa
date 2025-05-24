import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const enlaces = [
    { texto: "Portada", ruta: "/" },
    { texto: "Iniciar sesión", ruta: "/login" },
    { texto: "Registro", ruta: "/registro" },
    { texto: "Clases disponibles", ruta: "/clases" },
    { texto: "Perfil de usuario", ruta: "/perfil" },

    // Clases
    { texto: "Edición Premium", ruta: "/edicion-premium" },
    { texto: "Creativo Plus", ruta: "/creativo-plus" },
    { texto: "Básico Esencial", ruta: "/basico-esencial" },
    { texto: "Pintar Cerámica", ruta: "/pintar-ceramica" },
    { texto: "Fundamental Mini", ruta: "/fundamental-mini" },
    { texto: "Exprés Continuo", ruta: "/exprescontinuo" },
    { texto: "Bono 2 Clases", ruta: "/bono-2-clases" },
    { texto: "Bono 4 Clases", ruta: "/bono-4-clases" },

    // Reservas
    { texto: "Reserva Edición Premium", ruta: "/reserva-edicion-premium" },
    { texto: "Reserva Creativo Plus", ruta: "/reserva-creativo-plus" },
    { texto: "Reserva Básico Esencial", ruta: "/reserva-basico-esencial" },
    { texto: "Reserva Pintar Cerámica", ruta: "/reserva-pintar-ceramica" },
    { texto: "Reserva Fundamental Mini", ruta: "/reserva-fundamental-mini" },
    { texto: "Reserva Bono 2 Clases", ruta: "/reserva-bono-2-clases" },
    { texto: "Reserva Bono 4 Clases", ruta: "/reserva-bono-4-clases" },
    { texto: "Reserva Exprés Continuo", ruta: "/reserva-exprescontinuo" },

    // Tarjeta regalo
    { texto: "Galería Tarjetas Regalo", ruta: "/tarjetaregalo-galeria" },
    { texto: "Funcionamiento Tarjeta Regalo", ruta: "/tarjetaregalo-info" },
    { texto: "Canjear Tarjeta Regalo", ruta: "/canjear-tarjeta" },

    // Detalles de Tarjetas Regalo
    { texto: "Tarjeta 2 Clases", ruta: "/detalle-tarjeta-2clases" },
    { texto: "Tarjeta 4 Clases", ruta: "/detalle-tarjeta-4clases" },
    { texto: "Tarjeta Crea tu pieza favorita", ruta: "/detalle-tarjeta-creapiezafavorita" },
    { texto: "Tarjeta Pinta tu pieza", ruta: "/detalle-tarjeta-pintatupieza" },
    { texto: "Tarjeta Torno intensivo", ruta: "/detalle-tarjeta-tornointensivo" },

    // Confirmaciones de pago
    { texto: "Confirmación de Pago", ruta: "/confirmacion-pago" },
    { texto: "Pago Fallido", ruta: "/pago-fallido" },

    // Panel de administración
    { texto: "Panel Admin", ruta: "/admin" },
    { texto: "Gestión Clases", ruta: "/admin/clases" },
    { texto: "Gestión Usuarios", ruta: "/admin/usuarios" },
    { texto: "Gestión Reservas", ruta: "/admin/reservas" },
    { texto: "Historiales", ruta: "/admin/historiales" },
    { texto: "Historial de Bonos", ruta: "/admin/historial/bonos" },
    { texto: "Historial de Reservas", ruta: "/admin/historial/reservas" },
    { texto: "Notificaciones", ruta: "/admin/notificaciones" },
  ];

  return (
    <div className="bg-[#fdfaf5] min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold text-[#5c3c00] mb-6">Menú de Navegación</h1>
      <div className="grid gap-3 max-w-md mx-auto">
        {enlaces.map((item, index) => (
          <Link
            key={index}
            to={item.ruta}
            className="block bg-[#f4a6b4] hover:bg-[#e78fa0] text-white font-semibold py-3 px-4 rounded-xl transition"
          >
            {item.texto}
          </Link>
        ))}
      </div>
    </div>
  );
}
