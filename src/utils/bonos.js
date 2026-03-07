import { ref, push, get, update } from "firebase/database";
import { dbRealtime } from "../firebase";

export const crearBonoActivo = async ({
  uid,
  clase,
  tipoTaller = "bono_mensual",
  subtipo,
  numeroClases,
  fechaInicio,
  fechaFinMes,
  fechaCaducidadBono,
  turno,
  orderId,
  datosExtra = {},
}) => {
  const bonosRef = ref(dbRealtime, `usuarios/${uid}/bonosActivos`);

  const nuevoBonoRef = await push(bonosRef, {
    clase,
    tipoTaller,
    subtipo,
    numeroClases,
    clasesConsumidas: 0,
    clasesRestantes: numeroClases,
    fechaInicio,
    fechaFinMes,
    fechaCaducidadBono,
    turno,
    estado: "activo",
    orderId,
    timestamp: new Date().toISOString(),
    ...datosExtra,
  });

  return nuevoBonoRef.key;
};

export const usarSesionDeBono = async ({
  uid,
  bonoId,
  fechaSesion,
  turno,
  taller,
}) => {
  const bonoRef = ref(dbRealtime, `usuarios/${uid}/bonosActivos/${bonoId}`);
  const snapshot = await get(bonoRef);

  if (!snapshot.exists()) {
    throw new Error("Bono no encontrado.");
  }

  const bono = snapshot.val();

  if (bono.estado !== "activo") {
    throw new Error("El bono no está activo.");
  }

  if ((bono.clasesRestantes || 0) <= 0) {
    throw new Error("No quedan clases disponibles en este bono.");
  }

  const nuevasConsumidas = (bono.clasesConsumidas || 0) + 1;
  const nuevasRestantes = (bono.clasesRestantes || 0) - 1;

  await update(bonoRef, {
    clasesConsumidas: nuevasConsumidas,
    clasesRestantes: nuevasRestantes,
    estado: nuevasRestantes === 0 ? "completado" : "activo",
    ultimaSesionReservada: fechaSesion,
  });

  const sesionesRef = ref(
    dbRealtime,
    `usuarios/${uid}/bonosActivos/${bonoId}/sesionesUsadas`
  );

  await push(sesionesRef, {
    fecha: fechaSesion,
    turno,
    taller,
    timestamp: new Date().toISOString(),
  });
};