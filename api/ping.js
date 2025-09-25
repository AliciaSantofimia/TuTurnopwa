// api/ping.js
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({
    ok: true,
    method: req.method,
    now: new Date().toISOString(),
    query: req.query || null
  });
}
