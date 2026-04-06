import React, { useMemo, useState } from "react";
import BotonVolver from "./BotonVolver";
import { faqData } from "./faqData";

const MENSAJE_BIENVENIDA =
  " Soy Junquillo, el asistente de ayuda de La Purísima Conchi. Si tienes alguna duda sobre tus reservas, tus piezas o cómo funciona el taller, escríbeme y te echo una mano.";

const MENSAJE_NO_ENCONTRADO =
  "No he encontrado una respuesta exacta para esa duda. Para evitar darte información incorrecta, lo mejor es contactar directamente con Berto por WhatsApp en el 644 67 16 64.";

const WHATSAPP_LINK = "https://wa.me/34644671664";

const normalizarTexto = (texto = "") =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:/()"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const dividirEnPalabras = (texto = "") => {
  const limpio = normalizarTexto(texto);
  if (!limpio) return [];
  return limpio.split(" ").filter(Boolean);
};

const quitarPalabrasVacias = (palabras = []) => {
  const stopWords = new Set([
    "de",
    "la",
    "el",
    "los",
    "las",
    "un",
    "una",
    "unos",
    "unas",
    "y",
    "o",
    "que",
    "como",
    "con",
    "sin",
    "para",
    "por",
    "del",
    "al",
    "se",
    "es",
    "hay",
    "qué",
    "que",
    "cuál",
    "cual",
    "cuánto",
    "cuanto",
    "cuándo",
    "cuando",
    "puedo",
    "quiero",
    "tengo",
    "mi",
    "me",
    "a",
    "en"
  ]);

  return palabras.filter((p) => p.length >= 3 && !stopWords.has(p));
};

const tieneFraseExacta = (consulta, texto) => {
  if (!consulta || !texto) return false;
  return normalizarTexto(texto).includes(normalizarTexto(consulta));
};

const contarCoincidenciasPalabras = (palabrasConsulta, textoObjetivo) => {
  if (!palabrasConsulta.length || !textoObjetivo) return 0;
  const texto = normalizarTexto(textoObjetivo);
  let total = 0;

  palabrasConsulta.forEach((palabra) => {
    if (texto.includes(palabra)) total += 1;
  });

  return total;
};

const calcularCoincidencia = (consulta, item) => {
  const consultaNormalizada = normalizarTexto(consulta);
  if (!consultaNormalizada) return 0;

  const pregunta = item.pregunta || "";
  const respuesta = item.respuesta || "";
  const categoria = item.categoria || "";
  const variantes = item.variantes || [];
  const keywords = item.keywords || [];

  const palabrasConsulta = quitarPalabrasVacias(
    dividirEnPalabras(consultaNormalizada)
  );

  let puntuacion = 0;

  // Coincidencia exacta / muy fuerte
  if (tieneFraseExacta(consultaNormalizada, pregunta)) puntuacion += 40;
  if (tieneFraseExacta(consultaNormalizada, categoria)) puntuacion += 20;

  variantes.forEach((variante) => {
    if (tieneFraseExacta(consultaNormalizada, variante)) {
      puntuacion += 35;
    }
    if (
      normalizarTexto(consultaNormalizada).includes(normalizarTexto(variante)) &&
      normalizarTexto(variante).length > 5
    ) {
      puntuacion += 20;
    }
  });

  keywords.forEach((kw) => {
    const kwNorm = normalizarTexto(kw);
    if (!kwNorm) return;

    if (consultaNormalizada.includes(kwNorm)) puntuacion += 18;
    if (kwNorm.includes(consultaNormalizada) && consultaNormalizada.length > 4) {
      puntuacion += 10;
    }
  });

  // Coincidencia por palabras en pregunta / variantes / categoría
  const coincidenciasPregunta = contarCoincidenciasPalabras(
    palabrasConsulta,
    pregunta
  );
  const coincidenciasRespuesta = contarCoincidenciasPalabras(
    palabrasConsulta,
    respuesta
  );
  const coincidenciasCategoria = contarCoincidenciasPalabras(
    palabrasConsulta,
    categoria
  );

  puntuacion += coincidenciasPregunta * 8;
  puntuacion += coincidenciasRespuesta * 2;
  puntuacion += coincidenciasCategoria * 5;

  variantes.forEach((variante) => {
    puntuacion += contarCoincidenciasPalabras(palabrasConsulta, variante) * 6;
  });

  keywords.forEach((kw) => {
    puntuacion += contarCoincidenciasPalabras(palabrasConsulta, kw) * 10;
  });

  // Bonus si varias palabras importantes aparecen juntas
  if (palabrasConsulta.length >= 2) {
    let coincidenciasFuertes = 0;

    palabrasConsulta.forEach((palabra) => {
      const estaEnPregunta = normalizarTexto(pregunta).includes(palabra);
      const estaEnVariantes = variantes.some((v) =>
        normalizarTexto(v).includes(palabra)
      );
      const estaEnKeywords = keywords.some((k) =>
        normalizarTexto(k).includes(palabra)
      );

      if (estaEnPregunta || estaEnVariantes || estaEnKeywords) {
        coincidenciasFuertes += 1;
      }
    });

    if (coincidenciasFuertes >= 2) puntuacion += 15;
    if (coincidenciasFuertes >= 3) puntuacion += 15;
  }

  return puntuacion;
};

const buscarMejorRespuesta = (consulta) => {
  if (!consulta.trim()) return null;

  const resultados = faqData
    .map((item) => ({
      ...item,
      score: calcularCoincidencia(consulta, item),
    }))
    .sort((a, b) => b.score - a.score);

  const mejor = resultados[0];

  if (!mejor || mejor.score < 22) {
    return null;
  }

  const sugerencias = resultados
    .filter(
      (r) =>
        r.id !== mejor.id &&
        r.score >= 18 &&
        r.categoria === mejor.categoria
    )
    .slice(0, 3);

  return {
    mejor,
    sugerencias,
  };
};

const sugerenciasRapidas = [
  "Quiero cambiar mi reserva",
  "¿Cómo funciona una tarjeta regalo?",
  "¿Cómo funciona la segunda sesión?",
  "¿Qué horarios hay para grupos?",
  "¿Cuánto cuesta pintar una pieza?",
  "¿Cómo contacto con el taller?",
];

const ChatAyuda = () => {
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      tipo: "bot",
      texto: MENSAJE_BIENVENIDA,
      categoria: "¡Hola!",
      preguntaRelacionada: null,
      sugerencias: [],
    },
  ]);

  const hayMensajesUsuario = useMemo(
    () => mensajes.some((m) => m.tipo === "user"),
    [mensajes]
  );

  const enviarMensaje = (textoManual = null) => {
    const texto = (textoManual ?? input).trim();
    if (!texto) return;

    const ahora = Date.now();

    const mensajeUsuario = {
      id: ahora,
      tipo: "user",
      texto,
    };

    const resultado = buscarMejorRespuesta(texto);

    let mensajeBot;

    if (resultado?.mejor) {
      mensajeBot = {
        id: ahora + 1,
        tipo: "bot",
        texto: resultado.mejor.respuesta,
        categoria: resultado.mejor.categoria,
        preguntaRelacionada: resultado.mejor.pregunta,
        sugerencias: resultado.sugerencias || [],
      };
    } else {
      mensajeBot = {
        id: ahora + 1,
        tipo: "bot",
        texto: MENSAJE_NO_ENCONTRADO,
        categoria: "Contacto",
        preguntaRelacionada: null,
        sugerencias: [],
      };
    }

    setMensajes((prev) => [...prev, mensajeUsuario, mensajeBot]);
    setInput("");
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    enviarMensaje();
  };

  const reiniciarChat = () => {
    setMensajes([
      {
        id: 1,
        tipo: "bot",
        texto: MENSAJE_BIENVENIDA,
        categoria: "¡Hola!",
        preguntaRelacionada: null,
        sugerencias: [],
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <BotonVolver />
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#e6ddd0] bg-white shadow-sm">
          <div className="border-b border-[#efe7dc] bg-[#f7efe6] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d8b08c] text-xl text-white">
                  💬
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-[#5c3d2e]">
                    Soy Junquillo
                  </h1>
                  <p className="text-sm text-[#7a6254]">
                  Estoy aquí para ayudarte con tus dudas sobre reservas, talleres, piezas, bonos y más.
                  </p>
                </div>
              </div>

              <button
                onClick={reiniciarChat}
                className="rounded-full border border-[#dcc8b4] px-4 py-2 text-sm font-medium text-[#6b4f3f] transition hover:bg-[#fff8f2]"
              >
                Reiniciar chat
              </button>
            </div>
          </div>

          {!hayMensajesUsuario && (
            <div className="border-b border-[#f1ebe4] bg-[#fffaf5] px-5 py-4">
              <p className="mb-3 text-sm font-medium text-[#7a6254]">
                Te puedo ayudar con...
              </p>
              <div className="flex flex-wrap gap-2">
                {sugerenciasRapidas.map((sugerencia) => (
                  <button
                    key={sugerencia}
                    onClick={() => enviarMensaje(sugerencia)}
                    className="rounded-full border border-[#e8d8c8] bg-white px-3 py-2 text-sm text-[#6b4f3f] transition hover:bg-[#fdf5ee]"
                  >
                    {sugerencia}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="max-h-[60vh] overflow-y-auto bg-[#fcfaf7] px-4 py-5">
            <div className="flex flex-col gap-4">
              {mensajes.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className={`flex ${
                    mensaje.tipo === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-sm ${
                      mensaje.tipo === "user"
                        ? "bg-[#d8b08c] text-white"
                        : "border border-[#ece2d7] bg-white text-[#4e3a2f]"
                    }`}
                  >
                    {mensaje.tipo === "bot" && mensaje.categoria && (
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#b07f56]">
                        {mensaje.categoria}
                      </div>
                    )}

                    {mensaje.tipo === "bot" && mensaje.preguntaRelacionada && (
                      <p className="mb-2 text-sm font-semibold text-[#6b4f3f]">
                        {mensaje.preguntaRelacionada}
                      </p>
                    )}

                    <p className="whitespace-pre-line text-sm leading-6">
                      {mensaje.texto}
                    </p>

                    {mensaje.tipo === "bot" &&
                      mensaje.sugerencias &&
                      mensaje.sugerencias.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-xs font-medium text-[#8b6d58]">
                            También puede interesarte:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {mensaje.sugerencias.map((sug) => (
                              <button
                                key={sug.id}
                                onClick={() => enviarMensaje(sug.pregunta)}
                                className="rounded-full border border-[#eadccf] bg-[#fffaf6] px-3 py-1.5 text-xs text-[#6a5142] transition hover:bg-[#fdf2e8]"
                              >
                                {sug.pregunta}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                    {mensaje.tipo === "bot" &&
                      mensaje.texto === MENSAJE_NO_ENCONTRADO && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                          >
                            WhatsApp
                          </a>
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={manejarSubmit}
            className="border-t border-[#efe7dc] bg-white px-4 py-4"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-[#e7dbcf] bg-[#fcfaf7] px-4 py-3">
              <span className="text-lg text-[#a68a73]">🔍</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu duda aquí..."
                className="flex-1 bg-transparent text-sm text-[#4e3a2f] outline-none placeholder:text-[#b39b88]"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8b08c] text-white transition hover:opacity-90"
                aria-label="Enviar mensaje"
              >
                ➤
              </button>
            </div>

            <p className="mt-3 text-xs text-[#9b8574]">
              Consejo: escribe cosas como “quiero cambiar mi reserva”, “cuánto
              cuesta pintar una pieza”, “cómo funciona la segunda sesión” o
              “qué horario tiene el taller”.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatAyuda;