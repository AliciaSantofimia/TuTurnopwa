import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { crearTarjetaRegalo } from "./crearTarjetaRegalo";

export default function GenerarCodigoTarjetaRegalo() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const { tipo, desdeTarjeta } = location.state || {};

  const [codigo, setCodigo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const generar = async () => {
      if (tipo && user && desdeTarjeta) {

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
      } else {
        setError("No se pudo generar el código. Faltan datos o acceso incorrecto.");
        setTimeout(() => {
          navigate("/menu"); // 👈 redirección segura si no procede de compra regalo
        }, 3000);
      }
    };

    generar();
  }, [tipo, user, desdeTarjetaRegalo, navigate]);

  return (
    <div style={{ padding: 24 }}>
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

          <button onClick={() => navigate("/menu")} style={{ marginTop: 16 }}>
            Finalizar
          </button>
        </>
      ) : (
        !error && <p>Generando código...</p>
      )}
    </div>
  );
}



