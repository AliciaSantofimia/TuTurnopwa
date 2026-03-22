import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { useNavigate, useSearchParams } from "react-router-dom";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminDetalleReservaNuevo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("id");

  const [reserva, setReserva] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const buscarReserva = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "reservas"));

        if (!snapshot.exists()) {
          setReserva(null);
          return;
        }

        let encontrada = null;

        snapshot.forEach((claseSnap) => {
          const claseKey = claseSnap.key;

          claseSnap.forEach((fechaSnap) => {
            const fechaKey = fechaSnap.key;

            fechaSnap.forEach((turnoSnap) => {
              const turnoKey = turnoSnap.key;

              turnoSnap.forEach((nivelSnap) => {
                const nivelKey = nivelSnap.key;
                const nivelVal = nivelSnap.val();

                if (!nivelVal || typeof nivelVal !== "object") return;

                const construirReserva = (r) => {
                  if (!r || typeof r !== "object") return null;

                  return {
                    ...r,
                    claseId: r.claseId || claseKey,
                    clase: r.clase || claseKey,
                    fecha: r.fecha || fechaKey,
                    turno: r.turno || turnoKey,
                    metodo: r.metodo || r.tipoClase || nivelKey || "—",
                    plazas: Number(r.plazas || 1),
                    estado: r.estado || "—",
                    estadoPago: r.estadoPago || "—",
                    precioUnitario: Number(
                      r.precioUnitario || r.precio || 0
                    ),
                    precioTotal: Number(
                      r.precioTotal || r.precioUnitario || r.precio || 0
                    ),
                    uid: r.uid || "",
                    orderId: r.orderId || "",
                    desdeTarjeta: r.desdeTarjeta ?? false,
                    timestamp: r.timestamp || r.creadoEn || "—",
                    procesado: r.procesado ?? false,
                  };
                };

                const comprobarReserva = (r) => {
                  if (!r || typeof r !== "object") return;

                  if (r.orderId === orderId) {
                    encontrada = construirReserva(r);
                  }
                };

                const pareceReservaDirecta =
                  "orderId" in nivelVal ||
                  "fecha" in nivelVal ||
                  "estado" in nivelVal ||
                  "estadoPago" in nivelVal;

                if (pareceReservaDirecta) {
                  comprobarReserva(nivelVal);
                  return;
                }

                nivelSnap.forEach((reservaSnap) => {
                  comprobarReserva(reservaSnap.val());
                });
              });
            });
          });
        });

        setReserva(encontrada);
      } catch (error) {
        console.error("Error al buscar reserva:", error);
        setReserva(null);
      } finally {
        setCargando(false);
      }
    };

    buscarReserva();
  }, [orderId]);

  if (cargando) {
    return <p style={styles.mensaje}>Cargando reserva...</p>;
  }

  if (!reserva) {
    return <p style={styles.mensaje}>Reserva no encontrada.</p>;
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h1 style={styles.titulo}>Detalle de reserva</h1>

        <div style={styles.card}>
          <p>
            <strong>Clase:</strong>{" "}
            <span
              style={styles.linkClase}
              onClick={() =>
  navigate(
    `/admin-detalle-clase?clase=${encodeURIComponent(
      reserva.claseId || ""
    )}&nombre=${encodeURIComponent(reserva.clase || "")}`
  )
}
            >
              {reserva.clase}
            </span>
          </p>

          <p><strong>Fecha:</strong> {reserva.fecha}</p>
          <p><strong>Turno:</strong> {reserva.turno}</p>
          <p><strong>Método:</strong> {reserva.metodo}</p>
          <p><strong>Plazas:</strong> {reserva.plazas}</p>

          <hr style={styles.hr} />

          <p><strong>Estado:</strong> {reserva.estado}</p>
          <p><strong>Estado pago:</strong> {reserva.estadoPago}</p>

          <hr style={styles.hr} />

          <p><strong>Precio unitario:</strong> {reserva.precioUnitario}€</p>
          <p><strong>Precio total:</strong> {reserva.precioTotal}€</p>

          <hr style={styles.hr} />

          <p>
            <strong>UID:</strong>{" "}
            <span
              style={styles.uidLink}
              onClick={() =>
                navigate(`/admin-detalle-usuario?uid=${reserva.uid}`)
              }
            >
              {reserva.uid}
            </span>
          </p>

          <p><strong>Order ID:</strong> {reserva.orderId}</p>
          <p><strong>Desde tarjeta:</strong> {reserva.desdeTarjeta ? "Sí" : "No"}</p>

          <hr style={styles.hr} />

          <p><strong>Creado:</strong> {reserva.timestamp}</p>
          <p><strong>Procesado:</strong> {reserva.procesado ? "Sí" : "No"}</p>
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
  },
  container: {
    maxWidth: 600,
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: "0.95rem",
  },
  hr: {
    margin: "10px 0",
    border: "none",
    borderTop: "1px solid #eee",
  },
  uidLink: {
    color: "#7c5c2e",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: 500,
  },
  mensaje: {
    textAlign: "center",
    padding: 40,
  },
  linkClase: {
    color: "#7c5c2e",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: 500,
  },
};

export default AdminDetalleReservaNuevo;