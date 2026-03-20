import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { useSearchParams } from "react-router-dom";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminDetalleClaseNuevo = () => {
  const [searchParams] = useSearchParams();
  const claseId = searchParams.get("clase");

  const [clase, setClase] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDetalleClase = async () => {
      try {
        if (!claseId) {
          setCargando(false);
          return;
        }

        const [claseSnap, reservasSnap] = await Promise.all([
          get(ref(dbRealtime, `clases/${claseId}`)),
          get(ref(dbRealtime, `reservas/${claseId}`)),
        ]);

        if (claseSnap.exists()) {
          const data = claseSnap.val() || {};
          setClase({
            id: claseId,
            nombre: data.nombre || claseId,
            categoria: data.categoria || "Sin categoría",
            precioDesde: data.precioDesde || "",
          });
        } else {
          setClase(null);
        }

        const datos = [];
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (reservasSnap.exists()) {
          reservasSnap.forEach((fechaSnap) => {
            const fechaKey = fechaSnap.key;

            fechaSnap.forEach((turnoSnap) => {
              const turnoKey = turnoSnap.key;

              turnoSnap.forEach((nivelSnap) => {
                const nivelVal = nivelSnap.val();
                if (!nivelVal || typeof nivelVal !== "object") return;

                const procesarReserva = (reserva, metodoPorDefecto = "—") => {
                  if (!reserva || typeof reserva !== "object") return;
                  if (reserva.estado !== "Confirmada") return;

                  const fecha = reserva.fecha || fechaKey;
                  const fechaObj = new Date(`${fecha}T00:00:00`);
                  if (fechaObj < hoy) return;

                  datos.push({
                    id:
                      reserva.orderId ||
                      `${claseId}-${fechaKey}-${turnoKey}-${Math.random()}`,
                    fecha,
                    turno: reserva.turno || turnoKey,
                    metodo: reserva.metodo || reserva.tipoClase || metodoPorDefecto,
                    plazas: Number(reserva.plazas || 1),
                    estadoPago: reserva.estadoPago || "—",
                    precioTotal: Number(reserva.precioTotal || reserva.precio || 0),
                  });
                };

                const pareceReservaDirecta =
                  "fecha" in nivelVal ||
                  "estado" in nivelVal ||
                  "estadoPago" in nivelVal ||
                  "uid" in nivelVal ||
                  "orderId" in nivelVal;

                if (pareceReservaDirecta) {
                  procesarReserva(nivelVal);
                  return;
                }

                nivelSnap.forEach((reservaSnap) => {
                  procesarReserva(reservaSnap.val(), nivelSnap.key);
                });
              });
            });
          });
        }

        datos.sort((a, b) => {
          const fechaA = new Date(`${a.fecha}T00:00:00`);
          const fechaB = new Date(`${b.fecha}T00:00:00`);
          if (fechaA - fechaB !== 0) return fechaA - fechaB;
          return (a.turno || "").localeCompare(b.turno || "", "es");
        });

        setReservas(datos);
      } catch (error) {
        console.error("Error al cargar detalle de clase:", error);
        setClase(null);
        setReservas([]);
      } finally {
        setCargando(false);
      }
    };

    cargarDetalleClase();
  }, [claseId]);

  if (cargando) {
    return <p style={styles.mensaje}>Cargando clase...</p>;
  }

  if (!clase) {
    return <p style={styles.mensaje}>Clase no encontrada.</p>;
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h1 style={styles.titulo}>Detalle de clase</h1>

        <div style={styles.card}>
          <p><strong>Nombre:</strong> {clase.nombre}</p>
          <p><strong>ID:</strong> {clase.id}</p>
          <p><strong>Categoría:</strong> {clase.categoria}</p>
          <p><strong>Precio base:</strong> {clase.precioDesde ? `${clase.precioDesde}€` : "—"}</p>
          <p><strong>Reservas futuras:</strong> {reservas.length}</p>
        </div>

        <div style={styles.bloque}>
          <h2 style={styles.subtitulo}>Próximas reservas de esta clase</h2>

          {reservas.length === 0 ? (
            <p style={styles.textoVacio}>No hay reservas futuras confirmadas.</p>
          ) : (
            <div style={styles.lista}>
              {reservas.map((r, index) => (
                <div key={`${r.id}-${index}`} style={styles.reservaItem}>
                  <p style={styles.linea}>
                    <strong>Fecha:</strong> {r.fecha}
                  </p>
                  <p style={styles.linea}>
                    <strong>Turno:</strong> {r.turno}
                  </p>
                  <p style={styles.linea}>
                    <strong>Método:</strong> {r.metodo}
                  </p>
                  <p style={styles.linea}>
                    <strong>Plazas:</strong> {r.plazas}
                  </p>
                  <p style={styles.linea}>
                    <strong>Estado pago:</strong> {r.estadoPago}
                  </p>
                  <p style={styles.linea}>
                    <strong>Precio total:</strong> {r.precioTotal}€
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#fdf8ee",
    minHeight: "100vh",
    padding: 30,
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 850,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
  },
  titulo: {
    textAlign: "center",
    margin: "0 0 20px 0",
    color: "#2f2f2f",
    fontSize: "2rem",
  },
  subtitulo: {
    margin: "0 0 14px 0",
    color: "#4b3a2a",
    fontSize: "1.2rem",
  },
  card: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    display: "grid",
    gap: 8,
  },
  bloque: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 20,
    padding: 20,
  },
  lista: {
    display: "grid",
    gap: 12,
  },
  reservaItem: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#fffaf0",
    border: "1px solid #eadfbe",
  },
  linea: {
    margin: "4px 0",
    color: "#333",
    fontSize: "0.94rem",
  },
  textoVacio: {
    margin: 0,
    color: "#7a7a7a",
  },
  mensaje: {
    textAlign: "center",
    padding: 40,
    color: "#7a7a7a",
  },
};

export default AdminDetalleClaseNuevo;