// api/diag-tpv.js
export const config = { runtime: "nodejs" };

// Lee la clave desde ENV en cualquier formato razonable
function getSecretRawBytes() {
  const b64 = (process.env.REDSYS_SECRET_B64 || "").trim();
  if (b64) {
    try {
      const raw = Buffer.from(b64, "base64");
      if (raw.length > 0) return { raw, source: "REDSYS_SECRET_B64(base64)" };
    } catch {}
  }
  const txt = (process.env.REDSYS_SECRET || "").trim();
  if (txt) {
    try {
      const asB64 = Buffer.from(txt, "base64");
      if (asB64.length > 0) return { raw: asB64, source: "REDSYS_SECRET(as base64)" };
    } catch {}
    if (/^[0-9a-fA-F]+$/.test(txt) && txt.length % 2 === 0) {
      const asHex = Buffer.from(txt, "hex");
      if (asHex.length > 0) return { raw: asHex, source: "REDSYS_SECRET(hex)" };
    }
    return { raw: Buffer.from(txt, "utf8"), source: "REDSYS_SECRET(utf8)" };
  }
  throw new Error("No hay REDSYS_SECRET_B64 ni REDSYS_SECRET");
}

function normalize3DESKey(raw) {
  let key = Buffer.from(raw);
  if (key.length === 16) {
    key = Buffer.concat([key, key.slice(0, 8)]);      // -> 24
  } else if (key.length > 24) {
    key = key.slice(0, 24);                            // recorta a 24
  } else if (key.length < 16) {
    const k16 = Buffer.concat([key, Buffer.alloc(16 - key.length, 0)]);
    key = Buffer.concat([k16, k16.slice(0, 8)]);       // -> 24
  } else if (key.length > 16 && key.length < 24) {
    key = Buffer.concat([key, Buffer.alloc(24 - key.length, 0)]);
  }
  return key;
}

export default function handler(req, res) {
  try {
    const { raw, source } = getSecretRawBytes();
    const key = normalize3DESKey(raw);
    res.status(200).json({
      ok: true,
      source,
      rawLen: raw.length,              // longitud leída desde ENV
      normalizedLen: key.length,       // debería ser 24
      hasFUC: Boolean(process.env.REDSYS_FUC),
      hasTerminal: Boolean(process.env.REDSYS_TERMINAL),
      env: process.env.VERCEL_ENV || "unknown",
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
}
