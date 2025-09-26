const functions = require("firebase-functions");
const crypto = require("crypto");

// Variables (TEST). Las guardamos en config segura:
const SECRET_B64 = functions.config().redsys.secret; // base64 de la clave TEST
const FUC = functions.config().redsys.fuc || "368564464";
const TERMINAL = "001";
const CURRENCY = "978"; // EUR

const b64 = (s) => Buffer.from(s, "utf8").toString("base64");
const b64json = (obj) => b64(JSON.stringify(obj));
const b64url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

function deriveKey(order) {
  const key = Buffer.from(SECRET_B64, "base64");
  const cipher = crypto.createCipheriv("des-ede3", key, null);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(order, "utf8"), cipher.final()]);
}
function sign(merchantParamsB64, order) {
  const key = deriveKey(order);
  const h = crypto.createHmac("sha256", key).update(merchantParamsB64).digest();
  return b64url(h);
}

// 1) Crear sesión de pago (firma)
exports.crearSesionTPV = functions.https.onRequest(async (req, res) => {
  try {
    const { orderId, amountCents, okUrl, koUrl, notifyUrl, payMethod } = req.body;
    if (!orderId || !amountCents || !okUrl || !koUrl || !notifyUrl) {
      return res.status(400).json({ error: "Parámetros incompletos" });
    }
    const params = {
      DS_MERCHANT_AMOUNT: String(amountCents), // céntimos
      DS_MERCHANT_ORDER: orderId,              // 4–12 chars
      DS_MERCHANT_MERCHANTCODE: FUC,
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: "0",
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_URLOK: okUrl,
      DS_MERCHANT_URLKO: koUrl,
      DS_MERCHANT_MERCHANTURL: notifyUrl,
    };
    if (payMethod === "bizum") params.Ds_Merchant_PayMethods = "z";

    const mpB64 = b64json(params);
    const signature = sign(mpB64, orderId);

    res.json({
      endpoint: "https://sis-t.redsys.es:25443/sis/realizarPago", // TEST
      Ds_SignatureVersion: "HMAC_SHA256_V1",
      Ds_MerchantParameters: mpB64,
      Ds_Signature: signature,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error creando sesión TPV" });
  }
});

// 2) Notificación online (Redsys -> servidor)
exports.notificacionTPV = functions.https.onRequest(async (req, res) => {
  try {
    const { Ds_MerchantParameters, Ds_Signature } = req.body || req.query || {};
    if (!Ds_MerchantParameters || !Ds_Signature) return res.status(400).send("KO");

    const decoded = JSON.parse(Buffer.from(Ds_MerchantParameters, "base64").toString("utf8"));
    const order = decoded.Ds_Order || decoded.DS_ORDER || decoded.DS_MERCHANT_ORDER;
    const localSig = sign(Ds_MerchantParameters, order);
    const firmaOk = localSig === Ds_Signature;
    const autorizada = Number(decoded.Ds_Response) < 100;

    if (firmaOk && autorizada) {
      // TODO: aquí marcas la reserva como CONFIRMADA en tu Realtime DB
      // usando los datos de 'decoded' (order, amount, authCode, etc.)
      return res.status(200).send("OK");
    }
    return res.status(400).send("KO");
  } catch (e) {
    console.error(e);
    res.status(500).send("KO");
  }
});

