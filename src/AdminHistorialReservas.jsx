import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminHistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "reservas"));
        const datos = [];

        if (snapshot.exists()) {
          snapshot.forEach((claseSnap) => {
            const claseKey = claseSnap.key;

            claseSnap.forEach((fechaSnap) => {
              const fecha = fechaSnap.key;

              fechaSnap.forEach((turnoSnap) => {
                const turno = turnoSnap.key;

                turnoSnap.forEach((metodoSnap) => {
                  const metodo = metodoSnap.key;

                  metodoSnap.forEach((reservaSnap) => {
                    const reserva = reservaSnap.val();

                    datos.push({
                      id: reservaSnap.key,
                      clase: reserva.clase || claseKey || "—",
                      usuario: reserva.nombre || reserva.email || reserva.uid || "—",
                      fecha: reserva.fecha || reserva.fechaInicio || fecha,
                      turno: reserva.turno || turno,
                      metodo: reserva.metodo || reserva.modalidad || metodo || "—",
                      estado: reserva.estadoPago || reserva.estado || "Activa",
                    });
                  });
                });
              });
            });
          });
        }

        datos.sort((a, b) => {
          const fechaA = new Date(a.fecha || 0);
          const fechaB = new Date(b.fecha || 0);
          return fechaB - fechaA;
        });

        setReservas(datos);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
        alert("No se pudieron cargar las reservas.");
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  const reservasFiltradas = reservas.filter(
    (r) => !fechaFiltro || r.fecha === fechaFiltro
  );

  return (
    <div style={styles.body}>
      <BotonVolver />

      <h2 style={styles.titulo}>📜 Historial de Reservas</h2>

      <div style={styles.filtro}>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
          style={styles.input}
        />
        <button style={styles.btn} onClick={() => setFechaFiltro("")}>
          Limpiar filtro
        </button>
      </div>

      {cargando ? (
        <p style={styles.mensaje}>Cargando reservas...</p>
      ) : reservasFiltradas.length === 0 ? (
        <p style={styles.mensaje}>No hay reservas para mostrar.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Clase</th>
              <th style={styles.th}>Usuario</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Turno</th>
              <th style={styles.th}>Método</th>
              <th style={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.map((r) => (
              <tr key={`${r.fecha}-${r.turno}-${r.id}`}>
                <td style={styles.td}>{r.clase}</td>
                <td style={styles.td}>{r.usuario}</td>
                <td style={styles.td}>{r.fecha}</td>
                <td style={styles.td}>{r.turno}</td>
                <td style={styles.td}>{r.metodo}</td>
                <td style={styles.td}>{r.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f1ec",
    fontFamily: "'Segoe UI', sans-serif",
    padding: 40,
    minHeight: "100vh",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  filtro: {
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: "1rem",
    marginRight: 10,
  },
  btn: {
    padding: "10px 20px",
    backgroundColor: "#b6e4d8",
    border: "none",
    borderRadius: 10,
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer",
  },
  mensaje: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  table: {
    width: "100%",
    maxWidth: 1000,
    margin: "auto",
    backgroundColor: "white",
    borderCollapse: "collapse",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#d0f0e8",
    padding: 12,
    textAlign: "left",
    color: "#333",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
    textAlign: "left",
    verticalAlign: "top",
  },
};

export default AdminHistorialReservas;