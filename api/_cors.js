// api/_cors.js
export function applyCors(req, res) {
  const origin = req.headers.origin || req.headers.Origin || "";

  // Orígenes permitidos (localhost con cualquier puerto + tu dominio)
  const allowed = [
    /^https?:\/\/localhost(:\d+)?$/i,
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/i,
    /^https?:\/\/app\.lapurisimaconchi\.com$/i,
    /^https?:\/\/(www\.)?lapurisimaconchi\.com$/i,
  ];
  const isAllowed = allowed.some((re) => re.test(origin));

  // Si coincide, reflejamos el origen; si no, '*' (para pruebas sin credenciales)
  const allowOrigin = isAllowed && origin ? origin : "*";

  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Vary", "Origin");

  // Si el navegador envía Access-Control-Request-Headers, respóndelos tal cual.
  const reqHeaders =
    req.headers["access-control-request-headers"] ||
    "Content-Type, Authorization, X-Requested-With, Accept";
  res.setHeader("Access-Control-Allow-Headers", reqHeaders);

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Importante para Safari: responde 200 (no 204) y deja las cabeceras puestas
  if (req.method === "OPTIONS") {
    res.status(200).end(); // 200 con cabeceras → preflight OK
    return true;
  }
  return false;
}


