// api/diag-tpv.js
export const config = { runtime: "nodejs" };

export default function handler(req, res) {
  const txt = (process.env.REDSYS_SECRET_TXT || "").trim();
  const b64 = (process.env.REDSYS_SECRET_B64 || "").trim();
  const sigVer = (process.env.REDSYS_SIG_VERSION || "").toUpperCase();

  res.status(200).json({
    ok: true,
    sigVersion: sigVer || "(no definida)",
    hasSecretV2: Boolean(txt),
    secretV2_len: txt ? txt.length : 0,
    hasSecretV1: Boolean(b64),
    secretV1_lenB64: b64 ? b64.length : 0,
    hasFUC: Boolean(process.env.REDSYS_FUC),
    FUC: process.env.REDSYS_FUC || null,
    terminal: process.env.REDSYS_TERMINAL || null,
    env: process.env.VERCEL_ENV || "unknown",
  });
}
