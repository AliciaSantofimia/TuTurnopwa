import React, { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminTarjetasRegalo = () => {
  const [tarjetasRegalo, setTarjetasRegalo] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroEstadoCanje, setFiltroEstadoCanje] = useState("");
  const [filtroEstadoPago, setFiltroEstadoPago] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);

      try {
        const datosTarjetas = [];

        const tarjetasSnap = await get(ref(dbRealtime, "tarjetasRegalo"));

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
              mensajePersonalizado: tarjeta.mensajePersonalizado || "",
              subtipo: tarjeta.subtipo || "",
              tipo: tarjeta.tipo || "",
              numeroClases: Number(tarjeta.numeroClases || 0),
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
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const tarjetasFiltradas = useMemo(() => {
    return tarjetasRegalo.filter((t) => {
      const cumpleFecha = !filtroFecha || t.fecha === filtroFecha;
      const cumpleEstadoCanje =
        !filtroEstadoCanje || t.estado === filtroEstadoCanje;
      const cumpleEstadoPago =
        !filtroEstadoPago || t.estadoPago === filtroEstadoPago;

      return cumpleFecha && cumpleEstadoCanje && cumpleEstadoPago;
    });
  }, [tarjetasRegalo, filtroFecha, filtroEstadoCanje, filtroEstadoPago]);

  const totalTarjetas = tarjetasRegalo.length;

  const totalPagadas = tarjetasRegalo.filter(
    (t) => String(t.estadoPago).toLowerCase() === "pagado"
  ).length;

  const totalCanjeadas = tarjetasRegalo.filter(
    (t) => String(t.estado).toLowerCase() === "canjeada"
  ).length;

  const ingresosEstimados = tarjetasRegalo.reduce((acc, t) => {
    if (String(t.estadoPago).toLowerCase() === "pagado") {
      return acc + Number(t.precioTotal || 0);
    }
    return acc;
  }, 0);

  const limpiarFiltros = () => {
    setFiltroFecha("");
    setFiltroEstadoCanje("");
    setFiltroEstadoPago("");
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h1 style={styles.titulo}>Tarjetas regalo</h1>
        <p style={styles.subtitulo}>
          Vista general de todas las tarjetas regalo compradas.
        </p>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total tarjetas</p>
            <p style={styles.statValue}>{cargando ? "..." : totalTarjetas}</p>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Pagadas</p>
            <p style={styles.statValue}>{cargando ? "..." : totalPagadas}</p>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Canjeadas</p>
            <p style={styles.statValue}>{cargando ? "..." : totalCanjeadas}</p>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Ingresos estimados</p>
            <p style={styles.statValue}>
              {cargando ? "..." : `${ingresosEstimados}€`}
            </p>
          </div>
        </div>

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
              <label style={styles.label}>Estado canje</label>
              <select
                value={filtroEstadoCanje}
                onChange={(e) => setFiltroEstadoCanje(e.target.value)}
                style={styles.input}
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="canjeada">Canjeada</option>
                <option value="caducada">Caducada</option>
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
            Total mostradas: <strong>{tarjetasFiltradas.length}</strong>
          </span>
        </div>

        {cargando ? (
          <p style={styles.mensaje}>Cargando tarjetas regalo...</p>
        ) : tarjetasFiltradas.length === 0 ? (
          <p style={styles.mensaje}>No hay tarjetas regalo para mostrar.</p>
        ) : (
          <div style={styles.tablaWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Código</th>
                  <th style={styles.th}>Clase</th>
                  <th style={styles.th}>Destinatario / Info</th>
                  <th style={styles.th}>Plazas</th>
                  <th style={styles.th}>Estado canje</th>
                  <th style={styles.th}>Pago</th>
                  <th style={styles.th}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {tarjetasFiltradas.map((t) => (
                  <tr key={`${t.orderId}-${t.id}`} style={styles.tr}>
                    <td style={styles.td}>{t.fecha}</td>
                    <td style={styles.td}>{t.codigo || "—"}</td>
                    <td style={styles.td}>{t.clase}</td>
                    <td style={styles.td}>
                      {t.nombreDestinatario || t.emailDestinatario || "—"}
                    </td>
                    <td style={styles.td}>{t.plazas}</td>
                    <td style={styles.td}>{t.estado}</td>
                    <td style={styles.td}>{t.estadoPago}</td>
                    <td style={styles.td}>{t.precioTotal}€</td>
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#fff8da",
    border: "1px solid #f1e7c6",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  statLabel: {
    margin: 0,
    color: "#7a6331",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  statValue: {
    margin: "12px 0 0 0",
    color: "#333",
    fontSize: "2rem",
    fontWeight: "bold",
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
  tr: {
    transition: "0.2s",
  },
};

export default AdminTarjetasRegalo;