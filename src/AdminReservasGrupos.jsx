import React, { useEffect, useMemo, useState } from "react";
import { ref, get, push } from "firebase/database";
import { dbRealtime } from "./firebase";
import BotonVolver from "./BotonVolver";

const AdminReservasGrupos = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardandoNota, setGuardandoNota] = useState({});
  const [nuevasNotas, setNuevasNotas] = useState({});

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const [reservasSnap, notasSnap] = await Promise.all([
          get(ref(dbRealtime, "reservasGrupos")),
          get(ref(dbRealtime, "reservasNotas")),
        ]);

        const mapaNotas = {};

        if (notasSnap.exists()) {
          notasSnap.forEach((notaReservaSnap) => {
            const orderId = notaReservaSnap.key;
            const notasInternas = notaReservaSnap.child("notasInternas");

            if (notasInternas.exists()) {
              const listaNotas = [];

              notasInternas.forEach((notaSnap) => {
                const nota = notaSnap.val();
                if (nota) {
                  listaNotas.push(nota);
                }
              });

              mapaNotas[orderId] = listaNotas;
            }
          });
        }

        const datos = [];

        if (reservasSnap.exists()) {
          reservasSnap.forEach((reservaSnap) => {
            const r = reservaSnap.val();

            if (reservaSnap.key === "placeholder") return;
            if (!r || typeof r !== "object") return;

            datos.push({
              id: reservaSnap.key,
              ...r,
              notasInternas: mapaNotas[r.orderId] || [],
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
        console.error("Error al cargar reservas de grupo:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  const resumen = useMemo(() => {
    const totalReservas = reservas.length;

    const pendientes = reservas.filter(
      (r) =>
        (r.estado || "").toLowerCase() === "pendiente" ||
        (r.estadoPago || "").toLowerCase() === "pendiente"
    ).length;

    const pagadas = reservas.filter(
      (r) => (r.estadoPago || "").toLowerCase() === "pagado"
    ).length;

    const ingresosEstimados = reservas.reduce((acc, r) => {
      if ((r.estadoPago || "").toLowerCase() === "pagado") {
        return acc + Number(r.precioTotal || r.precio || 0);
      }
      return acc;
    }, 0);

    return {
      totalReservas,
      pendientes,
      pagadas,
      ingresosEstimados,
    };
  }, [reservas]);

  const handleChangeNota = (orderId, valor) => {
    setNuevasNotas((prev) => ({
      ...prev,
      [orderId]: valor,
    }));
  };

  const guardarNotaInterna = async (orderId) => {
    const texto = (nuevasNotas[orderId] || "").trim();

    if (!texto) {
      alert("Escribe una nota antes de guardar.");
      return;
    }

    try {
      setGuardandoNota((prev) => ({
        ...prev,
        [orderId]: true,
      }));

      const nuevaNota = {
        texto,
        fecha: new Date().toLocaleString("es-ES"),
      };

      await push(
        ref(dbRealtime, `reservasNotas/${orderId}/notasInternas`),
        nuevaNota
      );

      setReservas((prev) =>
        prev.map((r) =>
          r.orderId === orderId
            ? {
                ...r,
                notasInternas: [...(r.notasInternas || []), nuevaNota],
              }
            : r
        )
      );

      setNuevasNotas((prev) => ({
        ...prev,
        [orderId]: "",
      }));
    } catch (error) {
      console.error("Error al guardar nota interna:", error);
      alert("No se pudo guardar la nota interna.");
    } finally {
      setGuardandoNota((prev) => ({
        ...prev,
        [orderId]: false,
      }));
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <BotonVolver />

        <div style={styles.header}>
          <h1 style={styles.titulo}>Reservas de grupo</h1>
          <p style={styles.subtitulo}>
            Aquí puedes ver todas las reservas realizadas para grupos y anotar
            observaciones internas.
          </p>
        </div>

        {cargando ? (
          <p style={styles.mensaje}>Cargando...</p>
        ) : (
          <>
            <div style={styles.gridResumen}>
              <div style={styles.cardResumen}>
                <p style={styles.cardLabel}>Total reservas grupo</p>
                <p style={styles.cardValue}>{resumen.totalReservas}</p>
              </div>

              <div style={styles.cardResumen}>
                <p style={styles.cardLabel}>Pendientes</p>
                <p style={styles.cardValue}>{resumen.pendientes}</p>
              </div>

              <div style={styles.cardResumen}>
                <p style={styles.cardLabel}>Pagadas</p>
                <p style={styles.cardValue}>{resumen.pagadas}</p>
              </div>

              <div style={styles.cardResumen}>
                <p style={styles.cardLabel}>Ingresos estimados grupo</p>
                <p style={styles.cardValue}>{resumen.ingresosEstimados}€</p>
              </div>
            </div>

            {reservas.length === 0 ? (
              <p style={styles.mensaje}>No hay reservas de grupo.</p>
            ) : (
              <div style={styles.lista}>
                {reservas.map((r) => (
                  <div key={r.id} style={styles.card}>
                    <div style={styles.cardTop}>
                      <div>
                        <h2 style={styles.cardTitulo}>{r.clase || "Reserva de grupo"}</h2>
                        <p style={styles.cardSubtitulo}>
                          {r.fecha || "—"} · {r.turno || "—"}
                        </p>
                      </div>

                      <div style={styles.badges}>
                        <span style={styles.badgeEstado}>{r.estado || "—"}</span>
                        <span style={styles.badgePago}>{r.estadoPago || "—"}</span>
                      </div>
                    </div>

                    <div style={styles.infoGrid}>
                      <div style={styles.infoBox}>
                        <p><strong>Personas:</strong> {r.plazas}</p>
                        <p><strong>Total:</strong> {r.precioTotal}€</p>
                        <p><strong>OrderId:</strong> {r.orderId || "—"}</p>
                      </div>

                      <div style={styles.infoBox}>
                        <p><strong>Nombre:</strong> {r.nombreReserva}</p>
                        <p><strong>Teléfono:</strong> {r.telefono}</p>
                        <p><strong>Email:</strong> {r.email || "—"}</p>
                      </div>
                    </div>

                    {r.notas && (
                      <div style={styles.notasBox}>
                        <strong>Notas del cliente</strong>
                        <p style={styles.textoBloque}>{r.notas}</p>
                      </div>
                    )}

                    <div style={styles.notasBox}>
                      <strong>Notas internas de Berto</strong>

                      {r.notasInternas && r.notasInternas.length > 0 ? (
                        r.notasInternas.map((nota, index) => (
                          <div key={index} style={styles.notaInternaItem}>
                            <p style={styles.notaTexto}>{nota.texto}</p>
                            <p style={styles.notaFecha}>{nota.fecha}</p>
                          </div>
                        ))
                      ) : (
                        <p style={styles.vacio}>Aún no hay notas internas.</p>
                      )}
                    </div>

                    <div style={styles.notasBox}>
                      <strong>Añadir nota interna</strong>
                      <textarea
                        value={nuevasNotas[r.orderId] || ""}
                        onChange={(e) =>
                          handleChangeNota(r.orderId, e.target.value)
                        }
                        placeholder="Escribe aquí una nota para Berto..."
                        style={styles.textarea}
                        rows={3}
                      />
                      <button
                        onClick={() => guardarNotaInterna(r.orderId)}
                        style={styles.botonGuardar}
                        disabled={guardandoNota[r.orderId]}
                      >
                        {guardandoNota[r.orderId]
                          ? "Guardando..."
                          : "Guardar nota"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
  header: {
    textAlign: "center",
    marginBottom: 24,
  },
  titulo: {
    textAlign: "center",
    fontSize: "2rem",
    margin: 0,
    color: "#2f2f2f",
  },
  subtitulo: {
    textAlign: "center",
    color: "#7a7a7a",
    marginTop: 8,
    marginBottom: 0,
  },
  mensaje: {
    textAlign: "center",
    color: "#777",
    padding: 20,
  },
  gridResumen: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 28,
  },
  cardResumen: {
    backgroundColor: "#fff8da",
    border: "1px solid #f1e7c6",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  cardLabel: {
    margin: 0,
    color: "#7a6331",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  cardValue: {
    margin: "12px 0 0 0",
    color: "#333",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  lista: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    backgroundColor: "#fffdf7",
    border: "1px solid #f1e7c6",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  cardTitulo: {
    margin: 0,
    color: "#3d3126",
    fontSize: "1.2rem",
  },
  cardSubtitulo: {
    margin: "6px 0 0 0",
    color: "#7a7a7a",
    fontSize: "0.95rem",
  },
  badges: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  badgeEstado: {
    backgroundColor: "#fff8da",
    border: "1px solid #eadfbe",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: "0.85rem",
    color: "#5b4a2d",
    fontWeight: 600,
  },
  badgePago: {
    backgroundColor: "#f4f7ff",
    border: "1px solid #d8e1ff",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: "0.85rem",
    color: "#415a9c",
    fontWeight: 600,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 14,
    marginBottom: 14,
  },
  infoBox: {
    backgroundColor: "#fffaf0",
    border: "1px solid #f0e5cf",
    borderRadius: 14,
    padding: 14,
    color: "#333",
    lineHeight: 1.8,
  },
  notasBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    border: "1px solid #eee",
  },
  textoBloque: {
    marginTop: 8,
    marginBottom: 0,
    color: "#333",
    lineHeight: 1.6,
  },
  notaInternaItem: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1px solid #eee",
  },
  notaTexto: {
    margin: 0,
    color: "#333",
  },
  notaFecha: {
    margin: "4px 0 0 0",
    fontSize: "0.82rem",
    color: "#777",
  },
  vacio: {
    marginTop: 8,
    marginBottom: 0,
    color: "#777",
    fontStyle: "italic",
  },
  textarea: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    fontFamily: "'Segoe UI', sans-serif",
    resize: "vertical",
    boxSizing: "border-box",
  },
  botonGuardar: {
    marginTop: 10,
    padding: "10px 14px",
    border: "1px solid #e5d8b8",
    backgroundColor: "#fff8da",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    color: "#5b4a2d",
  },
};

export default AdminReservasGrupos;