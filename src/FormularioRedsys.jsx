import React, { useEffect } from "react";
import CryptoJS from "crypto-js"; // ⚠️ Instálalo con: npm install crypto-js

const FormularioRedsys = () => {
  useEffect(() => {
    const claveSecreta = "Mk9m98IfEblmPfrpsawt7BmxObt98Jev"; // 🔐 Clave secreta de pruebas

    const merchantData = {
      DS_MERCHANT_AMOUNT: "4500", // en céntimos → 45.00 €
      DS_MERCHANT_ORDER: "000123456", // número único por transacción
      DS_MERCHANT_MERCHANTCODE: "999008881", // FUC de pruebas
      DS_MERCHANT_CURRENCY: "978", // EUR
      DS_MERCHANT_TRANSACTIONTYPE: "0",
      DS_MERCHANT_TERMINAL: "1",
      DS_MERCHANT_MERCHANTURL: "https://tudominio.com/notificacion", // URL notificación backend
      DS_MERCHANT_URLOK: "https://tudominio.com/pago-exitoso",
      DS_MERCHANT_URLKO: "https://tudominio.com/pago-fallido",
      DS_MERCHANT_PRODUCTDESCRIPTION: "Clase Creativo Plus"
    };

    const paramsBase64 = btoa(JSON.stringify(merchantData));
    const clave = CryptoJS.enc.Base64.parse(claveSecreta);
    const orderKey = CryptoJS.HmacSHA256(merchantData.DS_MERCHANT_ORDER, clave).toString(CryptoJS.enc.Base64);
    const signature = CryptoJS.HmacSHA256(paramsBase64, CryptoJS.enc.Base64.parse(orderKey)).toString(CryptoJS.enc.Base64);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sis-t.redsys.es:25443/sis/realizarPago"; // Entorno de pruebas

    const input1 = document.createElement("input");
    input1.type = "hidden";
    input1.name = "Ds_SignatureVersion";
    input1.value = "HMAC_SHA256_V1";

    const input2 = document.createElement("input");
    input2.type = "hidden";
    input2.name = "Ds_MerchantParameters";
    input2.value = paramsBase64;

    const input3 = document.createElement("input");
    input3.type = "hidden";
    input3.name = "Ds_Signature";
    input3.value = signature;

    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(input3);

    document.body.appendChild(form);
    form.submit();
  }, []);
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Redirigiendo a la pasarela de pago segura...</h2>
      <p>Por favor, espera unos segundos.</p>
    </div>
  );
};

export default FormularioRedsys;

