import React, { useEffect, useMemo, useState } from "react";
import { ref, get } from "firebase/database";
import { useSearchParams } from "react-router-dom";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

function obtenerEstadoVisibleBono(bono) {
  if (!bono) return "—";

  const restantes = Number(bono.clasesRestantes || 0);
  const estadoGuardado = String(bono.estadoBono || "").toLowerCase();

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let fechaCaducidad = null;
  if (bono.fechaCaducidadBono) {
    fechaCaducidad = new Date(`${bono.fechaCaducidadBono}T00:00:00`);
  }

  const estaCaducado =
    fechaCaducidad instanceof Date &&
    !isNaN(fechaCaducidad.getTime()) &&
    hoy > fechaCaducidad;

  if (estadoGuardado === "caducado" || estaCaducado) {
    return "Caducado";
  }

  if (estadoGuardado === "agotado" || restantes <= 0) {
    return "Agotado";
  }

  return "Activo";
}

const AdminDetalleBonoNuevo = () => {
  const [searchParams] = useSearchParams();
  const bonoId = searchParams.get("id");
  const uid = searchParams.get("uid");

  const [bono, setBono] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDetalle = async () => {
      setCargando(true);

      try {
        if (!uid || !bonoId) {
          setBono(null);
          setUsuario(null);
          return;
        }

        const usuarioSnap = await get(ref(dbRealtime, `usuarios/${uid}`));

        if (!usuarioSnap.exists()) {
          setBono(null);
          setUsuario(null);
          return;
        }

        const usuarioData = usuarioSnap.val() || {};
        const bonoData = usuarioData?.bonos?.[bonoId] || null;

        setUsuario({
          uid,
          nombre: usuarioData.nombre || "",
          email: usuarioData.email || "",
          telefono: usuarioData.telefono || "",
        });

        if (!bonoData) {
          setBono(null);
          return;
        }

        setBono({
          bonoId,
          uid,
          clase: bonoData.clase || "Bono",
          claseId: bonoData.claseId || "",
          fechaInicio: bonoData.fechaInicio || "",
          fechaCaducidadBono: bonoData.fechaCaducidadBono || "",
          numeroClases: Number(bonoData.numeroClases || 0),
          clasesConsumidas: Number(bonoData.clasesConsumidas || 0),
          clasesRestantes: Number(bonoData.clasesRestantes || 0),
          estadoBono: bonoData.estadoBono || "activo",
          estadoPago: bonoData.estadoPago || "—",
          precioTotal: Number(bonoData.precioTotal || bonoData.precioBase || 0),
          creadoEn: bonoData.creadoEn || "",
          actualizadoEn: bonoData.actualizadoEn || "",
          orderId: bonoData.orderId || bonoId,
          tipoTaller: bonoData.tipoTaller || "",
          subtipo: bonoData.subtipo || "",
        });
      } catch (error) {
        console.error("Error al cargar detalle del bono:", error);
        setBono(null);
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };

    cargarDetalle();
  }, [uid, bonoId]);

  const estadoVisible = useMemo(() => obtenerEstadoVisibleBono(bono), [bono]);

  const porcentajeUso = useMemo(() => {
    if (!bono || !bono.numeroClases || bono.numeroClases <= 0) return 0;
    const porcentaje = (bono.clasesConsumidas / bono.numeroClases) * 100;
    return Math.min(100, Math.max(0, porcentaje));
  }, [bono]);

  const renderEstado = () => {
    if (estadoVisible === "Caducado") {
      return <span style={styles.badgeCaducado}>Caducado</span>;
    }

    if (estadoVisible === "Agotado") {
      return <span style={styles.badgeAgotado}>Agotado</span>;
    }

    return <span style={styles.badgeActivo}>Activo</span>;
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <h1 style={styles.titulo}>Detalle del bono</h1>
        <p style={styles.subtitulo}>
          Información completa del bono comprado por el usuario.
        </p>

        {cargando ? (
          <p style={styles.mensaje}>Cargando detalle del bono...</p>
        ) : !bono ? (
          <p style={styles.mensaje}>No se ha encontrado el bono.</p>
        ) : (
          <>
            <div style={styles.hero}>
              <div style={styles.heroTexto}>
                <p style={styles.heroEyebrow}>Bono</p>
                <h2 style={styles.heroTitulo}>{bono.clase || "—"}</h2>
                <p style={styles.heroSubtexto}>
                  Usuario: {usuario?.nombre || usuario?.email || usuario?.uid || "—"}
                </p>
              </div>

              <div style={styles.heroEstado}>
                {renderEstado()}
              </div>
            </div>

            <div style={styles.bloque}>
              <h2 style={styles.bloqueTitulo}>Resumen principal</h2>

              <div style={styles.gridResumen}>
                <div style={styles.cardResumen}>
                  <span style={styles.label}>Fecha inicio</span>
                  <span style={styles.valorGrande}>{bono.fechaInicio || "—"}</span>
                </div>

                <div style={styles.cardResumen}>
                  <span style={styles.label}>Caduca</span>
                  <span style={styles.valorGrande}>
                    {bono.fechaCaducidadBono || "—"}
                  </span>
                </div>

                <div style={styles.cardResumen}>
                  <span style={styles.label}>Precio</span>
                  <span style={styles.valorGrande}>{bono.precioTotal}€</span>
                </div>

                <div style={styles.cardResumen}>
                  <span style={styles.label}>Estado pago</span>
                  <span style={styles.valorGrande}>{bono.estadoPago || "—"}</span>
                </div>
              </div>
            </div>

            <div style={styles.bloque}>
              <h2 style={styles.bloqueTitulo}>Uso del bono</h2>

              <div style={styles.gridUso}>
                <div style={styles.cardUso}>
                  <span style={styles.label}>Incluidas</span>
                  <span style={styles.valorGrande}>{bono.numeroClases}</span>
                </div>

                <div style={styles.cardUso}>
                  <span style={styles.label}>Consumidas</span>
                  <span style={styles.valorGrande}>{bono.clasesConsumidas}</span>
                </div>

                <div style={styles.cardUso}>
                  <span style={styles.label}>Restantes</span>
                  <span style={styles.valorGrande}>{bono.clasesRestantes}</span>
                </div>
              </div>

              <div style={styles.progresoBox}>
                <div style={styles.progresoTextoFila}>
                  <span style={styles.progresoLabel}>Progreso</span>
                  <span style={styles.progresoValor}>
                    {bono.clasesConsumidas} de {bono.numeroClases} clases usadas
                  </span>
                </div>

                <div style={styles.progresoBarraFondo}>
                  <div
                    style={{
                      ...styles.progresoBarraRelleno,
                      width: `${porcentajeUso}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={styles.bloque}>
              <h2 style={styles.bloqueTitulo}>Datos técnicos del bono</h2>

              <div style={styles.listaDatos}>
                <div style={styles.filaDato}>
                  <span style={styles.filaLabel}>Order ID</span>
                  <span style={styles.filaValor}>{bono.orderId || "—"}</span>
                </div>

                <div style={styles.filaDato}>
                  <span style={styles.filaLabel}>Clase ID</span>
                  <span style={styles.filaValor}>{bono.claseId || "—"}</span>
                </div>

                <div style={styles.filaDato}>
                  <span style={styles.filaLabel}>Subtipo</span>
                  <span style={styles.filaValor}>{bono.subtipo || "—"}</span>
                </div>

                <div style={styles.filaDato}>
                  <span style={styles.filaLabel}>Tipo taller</span>
                  <span style={styles.filaValor}>{bono.tipoTaller || "—"}</span>
                </div>

                <div style={styles.filaDato}>
                  <span style={styles.filaLabel}>Creado en</span>
                  <span style={styles.filaValor}>{bono.creadoEn || "—"}</span>
                </div>

                <div style={styles.filaDato}>
                  <span style={styles.filaLabel}>Actualizado en</span>
                  <span style={styles.filaValor}>{bono.actualizadoEn || "—"}</span>
                </div>
              </div>
            </div>

            <div style={styles.bloque}>
              <h2 style={styles.bloqueTitulo}>Usuario</h2>

              <div style={styles.gridUsuario}>
                <div style={styles.cardUsuario}>
                  <span style={styles.label}>Nombre</span>
                  <span style={styles.valor}>{usuario?.nombre || "—"}</span>
                </div>

                <div style={styles.cardUsuario}>
                  <span style={styles.label}>Email</span>
                  <span style={styles.valor}>{usuario?.email || "—"}</span>
                </div>

                <div style={styles.cardUsuario}>
                  <span style={styles.label}>Teléfono</span>
                  <span style={styles.valor}>{usuario?.telefono || "—"}</span>
                </div>

                <div style={styles.cardUsuario}>
                  <span style={styles.label}>UID</span>
                  <span style={styles.valor}>{usuario?.uid || "—"}</span>
                </div>
              </div>
            </div>
          </>
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
    maxWidth: 1100,
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
  mensaje: {
    textAlign: "center",
    color: "#7a7a7a",
    padding: 20,
  },
  hero: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
  },
  heroTexto: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  heroEyebrow: {
    margin: 0,
    color: "#7a6331",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  heroTitulo: {
    margin: 0,
    color: "#2f2f2f",
    fontSize: "1.6rem",
    lineHeight: 1.2,
  },
  heroSubtexto: {
    margin: 0,
    color: "#7a7a7a",
    fontSize: "0.98rem",
  },
  heroEstado: {
    display: "flex",
    alignItems: "center",
  },
  bloque: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f0e5cf",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },
  bloqueTitulo: {
    margin: "0 0 16px 0",
    color: "#4b3a2a",
    fontSize: "1.2rem",
  },
  gridResumen: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 14,
  },
  cardResumen: {
    backgroundColor: "#fffaf0",
    border: "1px solid #eadfbe",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  gridUso: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14,
    marginBottom: 18,
  },
  cardUso: {
    backgroundColor: "#fffaf0",
    border: "1px solid #eadfbe",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    textAlign: "center",
  },
  progresoBox: {
    backgroundColor: "#fffaf0",
    border: "1px solid #eadfbe",
    borderRadius: 16,
    padding: 16,
  },
  progresoTextoFila: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  progresoLabel: {
    color: "#7a6331",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  progresoValor: {
    color: "#2f2f2f",
    fontSize: "0.95rem",
    fontWeight: 600,
  },
  progresoBarraFondo: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    backgroundColor: "#f1e7c9",
    overflow: "hidden",
  },
  progresoBarraRelleno: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#d8b65a",
    transition: "width 0.3s ease",
  },
  listaDatos: {
    display: "grid",
    gap: 10,
  },
  filaDato: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    gap: 14,
    alignItems: "start",
    padding: "10px 0",
    borderBottom: "1px solid #f3ead7",
  },
  filaLabel: {
    color: "#7a6331",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  filaValor: {
    color: "#2f2f2f",
    fontSize: "0.96rem",
    wordBreak: "break-word",
  },
  gridUsuario: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  cardUsuario: {
    backgroundColor: "#fffaf0",
    border: "1px solid #eadfbe",
    borderRadius: 16,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    color: "#7a6331",
    fontSize: "0.88rem",
    fontWeight: 600,
  },
  valor: {
    color: "#2f2f2f",
    fontSize: "0.96rem",
    wordBreak: "break-word",
  },
  valorGrande: {
    color: "#2f2f2f",
    fontSize: "1.1rem",
    fontWeight: 700,
    wordBreak: "break-word",
  },
  badgeActivo: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    backgroundColor: "#e7f7e7",
    border: "1px solid #b7dfb7",
    color: "#2f6b2f",
    fontSize: "0.85rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  badgeAgotado: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    backgroundColor: "#f1ece4",
    border: "1px solid #d8cbbb",
    color: "#6f5d47",
    fontSize: "0.85rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  badgeCaducado: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    backgroundColor: "#fbe1e1",
    border: "1px solid #e7b7b7",
    color: "#8a3b3b",
    fontSize: "0.85rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
};

export default AdminDetalleBonoNuevo;