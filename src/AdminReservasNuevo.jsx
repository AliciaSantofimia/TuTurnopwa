import React, { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { useNavigate, useSearchParams } from "react-router-dom";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminReservasNuevo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const claseInicial = searchParams.get("clase") || "";

  const [reservas, setReservas] = useState([]);
  const [tarjetasRegalo, setTarjetasRegalo] = useState([]);
  const [clasesValidas, setClasesValidas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroClase, setFiltroClase] = useState(claseInicial);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroEstadoPago, setFiltroEstadoPago] = useState("");

  useEffect(() => {
    if (claseInicial) {
      setFiltroClase(claseInicial);
    }
  }, [claseInicial]);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);

      try {
        const clasesSnap = await get(ref(dbRealtime, "clases"));

        const mapaClases = {};
        const listaClases = [];

        if (clasesSnap.exists()) {
          clasesSnap.forEach((claseSnap) => {
            const claseId = claseSnap.key;
            const claseData = claseSnap.val() || {};
            const nombre = claseData.nombre || claseId;
            const orden = Number(claseData.orden || 9999);

            mapaClases[claseId] = { nombre, orden };

            listaClases.push({
              id: claseId,
              nombre,
              orden,
            });
          });
        }

        // Opción fija para admin
        listaClases.push({
          id: "tarjeta_regalo",
          nombre: "Tarjeta regalo",
          orden: 9998,
        });

        setClasesValidas(
          listaClases.sort((a, b) => {
            if (a.orden !== b.orden) return a.orden - b.orden;
            return a.nombre.localeCompare(b.nombre, "es");
          })
        );

        // ---------- RESERVAS NORMALES ----------
        try {
          const reservasSnap = await get(ref(dbRealtime, "reservas"));
          const datosReservas = [];

          if (reservasSnap.exists()) {
            reservasSnap.forEach((claseSnap) => {
              const claseKey = claseSnap.key;

              claseSnap.forEach((fechaSnap) => {
                const fechaKey = fechaSnap.key;

                fechaSnap.forEach((turnoSnap) => {
                  const turnoKey = turnoSnap.key;

                  turnoSnap.forEach((nivelSnap) => {
                    const nivelKey = nivelSnap.key;
                    const nivelVal = nivelSnap.val();

                    if (!nivelVal || typeof nivelVal !== "object") return;

                    const pareceReservaDirecta =
                      "fecha" in nivelVal ||
                      "estado" in nivelVal ||
                      "estadoPago" in nivelVal ||
                      "uid" in nivelVal ||
                      "orderId" in nivelVal;

                    const construirReserva = (
                      reserva,
                      idReserva,
                      metodoFallback = "—"
                    ) => {
                      const claseIdReal = reserva.claseId || claseKey;
                      const claseInfo = mapaClases[claseIdReal];

                      return {
                        id: idReserva,
                        tipoRegistro: "reserva",
                        claseId: claseIdReal,
                        clase:
                          reserva.clase ||
                          claseInfo?.nombre ||
                          claseIdReal ||
                          "Clase sin nombre",
                        fecha: reserva.fecha || fechaKey,
                        turno: reserva.turno || turnoKey,
                        metodo:
                          reserva.metodo ||
                          reserva.tipoClase ||
                          metodoFallback,
                        plazas: Number(reserva.plazas || 1),
                        estado: reserva.estado || "—",
                        estadoPago: reserva.estadoPago || "—",
                        precioTotal: Number(
                          reserva.precioTotal ||
                            reserva.precioUnitario ||
                            reserva.precio ||
                            0
                        ),
                        uid: reserva.uid || "",
                        orderId: reserva.orderId || "",
                        procesado: reserva.procesado ?? false,
                      };
                    };

                    if (pareceReservaDirecta) {
                      const reservaConstruida = construirReserva(
                        nivelVal,
                        nivelKey,
                        nivelKey
                      );
                      datosReservas.push(reservaConstruida);
                      return;
                    }

                    nivelSnap.forEach((reservaSnap) => {
                      const reserva = reservaSnap.val();
                      if (!reserva || typeof reserva !== "object") return;

                      const reservaConstruida = construirReserva(
                        reserva,
                        reservaSnap.key,
                        nivelKey
                      );

                      datosReservas.push(reservaConstruida);
                    });
                  });
                });
              });
            });
          }

          datosReservas.sort((a, b) => {
            const fechaA = new Date(`${a.fecha}T00:00:00`);
            const fechaB = new Date(`${b.fecha}T00:00:00`);
            if (fechaA - fechaB !== 0) return fechaA - fechaB;
            return (a.turno || "").localeCompare(b.turno || "", "es");
          });

          setReservas(datosReservas);
        } catch (error) {
          console.error("Error al cargar reservas normales:", error);
          setReservas([]);
        }

        // ---------- TARJETAS REGALO ----------
        try {
          const tarjetasSnap = await get(ref(dbRealtime, "tarjetasRegalo"));
          const datosTarjetas = [];

          if (tarjetasSnap.exists()) {
            tarjetasSnap.forEach((tarjetaSnap) => {
              const tarjeta = tarjetaSnap.val() || {};

              datosTarjetas.push({
                id: tarjetaSnap.key,
                tipoRegistro: "tarjeta_regalo",
                claseId: "tarjeta_regalo",
                clase: tarjeta.clase || "Tarjeta regalo",
                fecha:
                  typeof tarjeta.fechaCompra === "string" &&
                  tarjeta.fechaCompra.length >= 10
                    ? tarjeta.fechaCompra.slice(0, 10)
                    : "—",
                turno: "—",
                metodo: tarjeta.codigo || "—",
                plazas: Number(tarjeta.plazas || 1),
                estado: tarjeta.estadoCanje || "pendiente",
                estadoPago: tarjeta.estadoPago || "—",
                precioTotal: Number(tarjeta.precioTotal || 0),
                uid: tarjeta.uidComprador || "",
                orderId: tarjeta.orderId || tarjetaSnap.key,
                procesado: tarjeta.procesado ?? false,
                codigo: tarjeta.codigo || "",
                nombreDestinatario: tarjeta.nombreDestinatario || "",
                emailDestinatario: tarjeta.emailDestinatario || "",
              });
            });
          }

          datosTarjetas.sort((a, b) => {
            const fechaA = new Date(
              a.fecha === "—" ? 0 : `${a.fecha}T00:00:00`
            );
            const fechaB = new Date(
              b.fecha === "—" ? 0 : `${b.fecha}T00:00:00`
            );
            return fechaB - fechaA;
          });

          setTarjetasRegalo(datosTarjetas);
        } catch (error) {
          console.error("Error al cargar tarjetas regalo:", error);
          setTarjetasRegalo([]);
        }
      } catch (error) {
        console.error("Error al cargar datos del admin:", error);
        setReservas([]);
        setTarjetasRegalo([]);
        setClasesValidas([]);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const datosActivos = useMemo(() => {
    if (filtroClase === "tarjeta_regalo") {
      return tarjetasRegalo;
    }
    return reservas;
  }, [filtroClase, reservas, tarjetasRegalo]);

  const reservasFiltradas = useMemo(() => {
    return datosActivos.filter((r) => {
      const cumpleFecha = !filtroFecha || r.fecha === filtroFecha;
      const cumpleClase = !filtroClase || r.claseId === filtroClase;
      const cumpleEstado = !filtroEstado || r.estado === filtroEstado;
      const cumpleEstadoPago =
        !filtroEstadoPago || r.estadoPago === filtroEstadoPago;

      return cumpleFecha && cumpleClase && cumpleEstado && cumpleEstadoPago;
    });
  }, [datosActivos, filtroFecha, filtroClase, filtroEstado, filtroEstadoPago]);

  const limpiarFiltros = () => {
    setFiltroFecha("");
    setFiltroClase("");
    setFiltroEstado("");
    setFiltroEstadoPago("");
  };

  const mostrandoTarjetas = filtroClase === "tarjeta_regalo";

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h1 style={styles.titulo}>Reservas</h1>
        <p style={styles.subtitulo}>
          Vista general de todas las reservas guardadas en la app.
        </p>

        <div style={styles.filtrosBox}>
          <div style={styles.filtrosGrid}>
            <div style={styles.campo}>
              <label style={styles.label}>Fecha</label>
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Clase</label>
              <select
                value={filtroClase}
                onChange={(e) => setFiltroClase(e.target.value)}
                style={styles.input}
              >
                <option value="">Todas</option>
                {clasesValidas.map((clase) => (
                  <option key={clase.id} value={clase.id}>
                    {clase.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>
                {mostrandoTarjetas ? "Estado canje" : "Estado reserva"}
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                style={styles.input}
              >
                <option value="">Todos</option>
                {mostrandoTarjetas ? (
                  <>
                    <option value="pendiente">Pendiente</option>
                    <option value="canjeada">Canjeada</option>
                    <option value="caducada">Caducada</option>
                  </>
                ) : (
                  <>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Cancelada">Cancelada</option>
                  </>
                )}
              </select>
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Estado pago</label>
              <select
                value={filtroEstadoPago}
                onChange={(e) => setFiltroEstadoPago(e.target.value)}
                style={styles.input}
              >
                <option value="">Todos</option>
                <option value="pagado">Pagado</option>
                <option value="pendiente">Pendiente</option>
                <option value="fallido">Fallido</option>
                <option value="rechazado">Rechazado</option>
              </select>
            </div>
          </div>

          <button onClick={limpiarFiltros} style={styles.botonSecundario}>
            Limpiar filtros
          </button>
        </div>

        <div style={styles.resumen}>
          <span style={styles.resumenTexto}>
            Total mostradas: <strong>{reservasFiltradas.length}</strong>
          </span>
        </div>

        {cargando ? (
          <p style={styles.mensaje}>Cargando reservas...</p>
        ) : reservasFiltradas.length === 0 ? (
          <p style={styles.mensaje}>No hay reservas para mostrar.</p>
        ) : (
          <div style={styles.tablaWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>
                    {mostrandoTarjetas ? "Código" : "Turno"}
                  </th>
                  <th style={styles.th}>Clase</th>
                  <th style={styles.th}>
                    {mostrandoTarjetas ? "Destinatario / Info" : "Método"}
                  </th>
                  <th style={styles.th}>Plazas</th>
                  <th style={styles.th}>
                    {mostrandoTarjetas ? "Estado canje" : "Estado"}
                  </th>
                  <th style={styles.th}>Pago</th>
                  <th style={styles.th}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {reservasFiltradas.map((r) => (
                  <tr
                    key={`${r.claseId}-${r.fecha}-${r.orderId}-${r.id}`}
                    onClick={() =>
                      navigate(`/admin-detalle-reserva?id=${r.orderId}`)
                    }
                    style={styles.trClickable}
                  >
                    <td style={styles.td}>{r.fecha}</td>
                    <td style={styles.td}>
                      {mostrandoTarjetas ? r.codigo || "—" : r.turno}
                    </td>
                    <td style={styles.td}>{r.clase}</td>
                    <td style={styles.td}>
                      {mostrandoTarjetas
                        ? r.nombreDestinatario || r.emailDestinatario || "—"
                        : r.metodo}
                    </td>
                    <td style={styles.td}>{r.plazas}</td>
                    <td style={styles.td}>{r.estado}</td>
                    <td style={styles.td}>{r.estadoPago}</td>
                    <td style={styles.td}>{r.precioTotal}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
    maxWidth: 1200,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
  },
  titulo: {
    margin: 0,
    textAlign: "center",
    color: "#2f2f2f",
    fontSize: "2rem",
  },
  subtitulo: {
    textAlign: "center",
    color: "#7a7a7a",
    marginTop: 8,
    marginBottom: 24,
  },
  filtrosBox: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  filtrosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    marginBottom: 14,
  },
  campo: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: "0.92rem",
    fontWeight: 600,
    color: "#5b4a2d",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5d8b8",
    fontSize: "0.95rem",
    backgroundColor: "#fffaf0",
  },
  botonSecundario: {
    padding: "10px 14px",
    border: "1px solid #e5d8b8",
    backgroundColor: "#fff8da",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    color: "#5b4a2d",
  },
  resumen: {
    marginBottom: 14,
  },
  resumenTexto: {
    color: "#4b3a2a",
    fontSize: "0.96rem",
  },
  mensaje: {
    textAlign: "center",
    color: "#7a7a7a",
    padding: 20,
  },
  tablaWrapper: {
    overflowX: "auto",
    borderRadius: 18,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fffdf7",
    overflow: "hidden",
  },
  th: {
    textAlign: "left",
    padding: 14,
    backgroundColor: "#fff8da",
    color: "#5b4a2d",
    borderBottom: "1px solid #f0e5cf",
    fontSize: "0.95rem",
  },
  td: {
    padding: 14,
    borderBottom: "1px solid #f3ead7",
    color: "#333",
    fontSize: "0.95rem",
  },
  trClickable: {
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default AdminReservasNuevo;