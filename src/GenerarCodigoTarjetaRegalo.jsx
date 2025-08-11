import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { crearTarjetaRegalo } from "./crearTarjetaRegalo";
import BotonVolver from "./BotonVolver";


export default function GenerarCodigoTarjetaRegalo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tipo, desdeTarjeta } = location.state || {};

  const [codigo, setCodigo] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const generar = async () => {
      if (tipo && user && desdeTarjeta) {
        try {
          const codigoGenerado = await crearTarjetaRegalo(tipo, user.uid);
          if (codigoGenerado) {
            setCodigo(codigoGenerado);

            setTimeout(() => {
              if (tipo === "2clases") {
                navigate("/tarjeta-regalo/2clases");
              } else if (tipo === "pintatupieza") {
                navigate("/tarjeta-regalo/pintatupieza");
              } else if (tipo === "creapiezafavorita") {
                navigate("/tarjeta-regalo/creapiezafavorita");
              } else if (tipo === "tornointensivo") {
                navigate("/tarjeta-regalo/tornointensivo");
              } else if (tipo === "4clases") {
                navigate("/tarjeta-regalo/4clases");
              } else {
                navigate("/menu");
              }
            }, 4000);
          } else {
            setError("Error al generar el código de tarjeta.");
          }
        } catch (e) {
          setError("Error al generar el código.");
          console.error(e);
        }
      } else {
        setError("No se pudo generar el código. Faltan datos o acceso incorrecto.");
        setTimeout(() => {
          navigate("/menu");
        }, 3000);
      }
    };

    if (user) {
      generar();
    }
  }, [tipo, user, desdeTarjeta, navigate]);

  return (
    <div style={{ padding: 24 }}>
      <BotonVolver />

      <h2>¡Tarjeta regalo generada!</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {codigo ? (
        <>
          <p>Este es tu código único de tarjeta regalo:</p>
          <h3 style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            fontSize: "1.2rem",
            borderRadius: "6px",
            display: "inline-block"
          }}>
            {codigo}
          </h3>

          <p style={{ marginTop: "12px" }}>
            Puedes compartir este código con la persona que disfrutará de la clase.
          </p>

          <p style={{ fontSize: "0.9rem", color: "#777", marginTop: "8px" }}>
            Redirigiendo automáticamente en unos segundos...
          </p>

          <button
            onClick={() => navigate("/menu")}
            style={{
              marginTop: 16,
              backgroundColor: "#f4a6b4",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Finalizar
          </button>
        </>
      ) : (
        !error && <p>Generando código...</p>
      )}
    </div>
  );
}



