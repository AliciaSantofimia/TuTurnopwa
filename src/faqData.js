export const faqData = [
  // =========================
  // REGISTRO Y PERFIL
  // =========================
  {
    id: "registro_necesario",
    categoria: "Registro y perfil",
    pregunta: "¿Tengo que registrarme para reservar?",
    variantes: [
      "tengo que registrarme",
      "necesito cuenta para reservar",
      "puedo reservar sin registrarme",
      "hay que crear cuenta",
      "necesito usuario"
    ],
    keywords: ["registro", "registrarme", "cuenta", "usuario", "reservar"],
    respuesta:
      "Sí. Para reservar una clase o experiencia necesitas registrarte, crear tu perfil y completar el proceso de reserva y pago desde la app o la web."
  },
  {
    id: "crear_perfil",
    categoria: "Registro y perfil",
    pregunta: "¿Para qué sirve mi perfil?",
    variantes: [
      "para qué sirve mi perfil",
      "qué puedo ver en mi perfil",
      "qué aparece en mi cuenta",
      "qué hay en mi perfil"
    ],
    keywords: ["perfil", "cuenta", "reservas", "bonos", "tarjetas"],
    respuesta:
      "En tu perfil puedes consultar tu reserva actual, tus próximas reservas, el historial de reservas, tus bonos, tus tarjetas regalo, el acceso a 'Recoger mi pieza' y los datos de contacto del taller."
  },
  {
    id: "donde_ver_reserva_actual",
    categoria: "Registro y perfil",
    pregunta: "¿Dónde veo mi reserva actual?",
    variantes: [
      "dónde veo mi reserva",
      "ver mi reserva actual",
      "qué tengo reservado",
      "dónde aparece mi clase"
    ],
    keywords: ["perfil", "reserva", "actual", "clase"],
    respuesta:
      "Tu reserva actual aparece dentro de tu perfil. Ahí podrás ver la clase, la fecha, el turno y, si corresponde, si ha sido reprogramada."
  },
  {
    id: "donde_ver_proximas_reservas",
    categoria: "Registro y perfil",
    pregunta: "¿Dónde veo mis próximas reservas?",
    variantes: [
      "próximas reservas",
      "dónde veo mis próximas clases",
      "ver reservas futuras",
      "mis siguientes reservas"
    ],
    keywords: ["proximas", "reservas", "futuras", "perfil"],
    respuesta:
      "Puedes verlas dentro de tu perfil, en el apartado 'Próximas reservas'."
  },
  {
    id: "donde_ver_historial_reservas",
    categoria: "Registro y perfil",
    pregunta: "¿Dónde veo mis reservas antiguas?",
    variantes: [
      "historial de reservas",
      "reservas antiguas",
      "reservas pasadas",
      "clases anteriores"
    ],
    keywords: ["historial", "reservas", "pasadas", "antiguas"],
    respuesta:
      "Puedes verlas en tu perfil, dentro del apartado 'Historial de reservas'."
  },
  {
    id: "donde_ver_bonos",
    categoria: "Registro y perfil",
    pregunta: "¿Dónde veo mis bonos?",
    variantes: [
      "dónde veo mis bonos",
      "ver mis bonos",
      "bonos en mi perfil",
      "dónde está mi bono"
    ],
    keywords: ["bonos", "perfil", "bono", "clases restantes"],
    respuesta:
      "Puedes ver tus bonos dentro de tu perfil, en el apartado 'Mis bonos'. Ahí aparecen los datos del bono, las clases consumidas, las restantes y su estado."
  },
  {
    id: "donde_ver_tarjetas_regalo",
    categoria: "Registro y perfil",
    pregunta: "¿Dónde veo mis tarjetas regalo?",
    variantes: [
      "dónde veo mis tarjetas regalo",
      "ver mis tarjetas regalo",
      "dónde está mi código regalo",
      "mis regalos"
    ],
    keywords: ["tarjetas regalo", "regalo", "codigo", "perfil"],
    respuesta:
      "Puedes verlas dentro de tu perfil, en el apartado 'Mis tarjetas regalo'."
  },

  // =========================
  // RESERVAS
  // =========================
  {
    id: "como_reservar",
    categoria: "Reservas",
    pregunta: "¿Cómo puedo reservar una clase o taller?",
    variantes: [
      "cómo reservar",
      "quiero reservar",
      "hacer una reserva",
      "reservar clase",
      "reservar taller",
      "cómo hago una reserva",
      "cómo reservo",
      "reservar plaza",
      "cómo me apunto"
    ],
    keywords: ["reservar", "reserva", "plaza", "clase", "taller", "apuntarme"],
    respuesta:
      "Para reservar, primero debes registrarte y acceder a tu perfil. Después eliges la clase o experiencia, seleccionas la fecha, el turno y las plazas disponibles, y completas el pago. La reserva solo queda confirmada cuando el pago se realiza correctamente."
  },
  {
    id: "confirmacion_reserva",
    categoria: "Reservas",
    pregunta: "¿Cuándo queda confirmada mi reserva?",
    variantes: [
      "cuándo se confirma mi reserva",
      "reserva confirmada",
      "cómo sé si está confirmada",
      "ya está confirmada mi reserva",
      "cuándo queda guardada"
    ],
    keywords: ["confirmada", "confirmar", "pago", "reserva", "guardada"],
    respuesta:
      "Tu reserva queda confirmada únicamente cuando el pago se completa correctamente. Antes de eso, la plaza no queda guardada como reserva final."
  },
  {
    id: "reserva_solo_tras_pago",
    categoria: "Reservas",
    pregunta: "¿La reserva se guarda antes de pagar?",
    variantes: [
      "se guarda antes de pagar",
      "sin pagar se guarda",
      "si no pago se guarda",
      "la plaza queda apartada sin pagar",
      "antes del pago ya está reservada"
    ],
    keywords: ["guardar", "pago", "reserva", "plaza", "confirmar"],
    respuesta:
      "No. La reserva no queda confirmada ni guardada definitivamente hasta que el pago se realiza correctamente."
  },
  {
    id: "he_pagado_no_veo_reserva",
    categoria: "Reservas",
    pregunta: "He pagado pero no veo mi reserva, ¿qué hago?",
    variantes: [
      "he pagado y no veo mi reserva",
      "pagué y no aparece",
      "no me sale la reserva",
      "he hecho el pago y no está",
      "no veo mi clase en el perfil"
    ],
    keywords: ["pagado", "reserva", "perfil", "no aparece", "no veo"],
    respuesta:
      "Si crees que has completado el pago pero no ves la reserva en tu perfil, lo mejor es contactar con el taller por WhatsApp para que puedan revisarlo contigo."
  },
  {
    id: "reservar_varias_plazas",
    categoria: "Reservas",
    pregunta: "¿Puedo reservar varias plazas?",
    variantes: [
      "reservar para varias personas",
      "reservar varias personas",
      "reservar más de una plaza",
      "puedo ir con más gente",
      "puedo reservar para dos"
    ],
    keywords: ["varias", "plazas", "personas", "grupo", "acompañante"],
    respuesta:
      "Sí, siempre que haya disponibilidad en la actividad elegida. Durante el proceso de reserva podrás seleccionar varias plazas si esa experiencia lo permite."
  },
  {
    id: "reservar_para_otra_persona",
    categoria: "Reservas",
    pregunta: "¿Puedo reservar para otra persona?",
    variantes: [
      "reservar para otra persona",
      "hacer una reserva para alguien",
      "reservar a nombre de otra persona",
      "puedo regalar una clase"
    ],
    keywords: ["otra persona", "regalar", "reserva", "plaza"],
    respuesta:
      "Sí, dependiendo del caso. Puedes reservar varias plazas o regalar una experiencia mediante tarjeta regalo. Si tienes una situación concreta, consulta con el taller para hacerlo de la forma más adecuada."
  },
  {
    id: "sin_experiencia",
    categoria: "Reservas",
    pregunta: "¿Puedo ir sin experiencia previa?",
    variantes: [
      "no tengo experiencia",
      "soy principiante",
      "nunca he hecho cerámica",
      "sirve para principiantes",
      "es para novatos"
    ],
    keywords: ["experiencia", "principiante", "novato", "cerámica", "empezar"],
    respuesta:
      "Sí. Muchas experiencias del taller están pensadas para personas que empiezan desde cero y quieren disfrutar del proceso aunque sea su primera vez."
  },
  {
    id: "puedo_ir_sola",
    categoria: "Reservas",
    pregunta: "¿Puedo ir sola o solo?",
    variantes: [
      "puedo ir sola",
      "puedo ir solo",
      "tengo que ir con alguien",
      "puedo asistir sin grupo"
    ],
    keywords: ["sola", "solo", "grupo", "individual"],
    respuesta:
      "Sí. Puedes asistir aunque vengas sola o solo. No hace falta venir en grupo para disfrutar de la experiencia."
  },
  {
    id: "sin_plazas",
    categoria: "Reservas",
    pregunta: "¿Qué pasa si no quedan plazas?",
    variantes: [
      "no hay plazas",
      "completo",
      "sin sitio",
      "sin hueco",
      "no me deja reservar",
      "no hay disponibilidad"
    ],
    keywords: ["plazas", "completo", "disponibilidad", "hueco"],
    respuesta:
      "Si una fecha o un turno están completos, tendrás que elegir otra opción disponible. Si no encuentras hueco, puedes consultar con el taller por WhatsApp."
  },

  // =========================
  // HORARIOS
  // =========================
  {
    id: "horario_clases_habituales",
    categoria: "Horarios",
    pregunta: "¿Cuál es el horario habitual de las clases del taller?",
    variantes: [
      "horario de clases",
      "qué horario tienen las clases",
      "a qué hora son las clases",
      "horario habitual",
      "qué días hay clase"
    ],
    keywords: ["horario", "clases", "martes", "miercoles", "jueves", "17:30", "20:30"],
    respuesta:
      "El horario habitual de las clases del taller es martes, miércoles y jueves de 17:30 a 20:30."
  },
  {
    id: "horario_grupos",
    categoria: "Horarios",
    pregunta: "¿Qué horario hay para grupos?",
    variantes: [
      "horarios grupos",
      "qué días hay grupos",
      "horario para grupo",
      "grupos fin de semana",
      "cuándo son los grupos"
    ],
    keywords: ["grupo", "horarios", "viernes", "sábado", "domingo"],
    respuesta:
      "Los viernes, sábados y domingos se reservan principalmente para grupos, eventos especiales y experiencias concertadas con el taller."
  },
  {
    id: "horario_atencion_whatsapp",
    categoria: "Horarios",
    pregunta: "¿Cuál es el horario de atención por WhatsApp?",
    variantes: [
      "horario whatsapp",
      "cuándo respondéis por whatsapp",
      "a qué hora contestáis",
      "horario de atención",
      "cuándo puedo escribir"
    ],
    keywords: ["whatsapp", "atención", "responder", "mensaje", "contacto"],
    respuesta:
      "No hay un horario fijo cerrado de atención por WhatsApp. Puedes escribir cuando quieras y el taller responderá lo antes posible, normalmente dentro de un horario comercial razonable."
  },
  {
    id: "evento_horario_especial",
    categoria: "Horarios",
    pregunta: "¿Puedo organizar un evento o una actividad en otro horario?",
    variantes: [
      "otro horario",
      "horario especial",
      "evento privado",
      "cumpleaños en otro horario",
      "actividad especial"
    ],
    keywords: ["evento", "grupo", "horario especial", "otro horario", "privado"],
    respuesta:
      "Sí, puede ser posible, pero depende de la disponibilidad del taller. Si quieres organizar algo especial en otro día u horario, lo mejor es consultarlo directamente por WhatsApp."
  },

  // =========================
  // CLASES Y TALLERES
  // =========================
  {
    id: "crear_desde_cero",
    categoria: "Clases y talleres",
    pregunta: "¿Tenéis talleres para crear piezas desde cero?",
    variantes: [
      "crear desde cero",
      "hacer una pieza",
      "taller para crear pieza",
      "modelar pieza",
      "piezas desde cero"
    ],
    keywords: ["crear", "pieza", "cero", "modelar"],
    respuesta:
      "Sí. En la app hay varios talleres para crear piezas desde cero, incluyendo opciones de una sesión y también algunas experiencias de dos sesiones."
  },
  {
    id: "taller_una_sesion",
    categoria: "Clases y talleres",
    pregunta: "¿Hay talleres de una sola sesión?",
    variantes: [
      "una sola sesión",
      "taller de una sesión",
      "taller de un día",
      "experiencia puntual"
    ],
    keywords: ["sesion", "una sesion", "taller", "día"],
    respuesta:
      "Sí. Hay varios talleres pensados para realizarse en una sola sesión, ideales para una experiencia puntual o para probar por primera vez."
  },
  {
    id: "taller_dos_sesiones",
    categoria: "Clases y talleres",
    pregunta: "¿Hay talleres de dos sesiones?",
    variantes: [
      "dos sesiones",
      "taller de dos sesiones",
      "dos clases",
      "experiencia de dos sesiones"
    ],
    keywords: ["dos sesiones", "segunda sesion", "dos clases"],
    respuesta:
      "Sí. Algunas experiencias del taller se realizan en dos sesiones: una primera para crear la pieza y una segunda más adelante para continuar el proceso cuando la pieza ya está lista."
  },
  {
    id: "dos_sesiones_como_funciona",
    categoria: "Clases y talleres",
    pregunta: "¿Cómo funcionan los talleres de dos sesiones?",
    variantes: [
      "cómo funciona dos sesiones",
      "qué significa dos sesiones",
      "cómo va la segunda sesión",
      "dos sesiones cómo va"
    ],
    keywords: ["dos sesiones", "segunda sesión", "pieza", "continuar"],
    respuesta:
      "En los talleres de dos sesiones primero haces la pieza en la primera sesión. Después, cuando la pieza ya está lista para continuar, se gestiona la segunda sesión con el taller."
  },
  {
    id: "segunda_sesion_reserva",
    categoria: "Clases y talleres",
    pregunta: "¿Cómo se reserva la segunda sesión?",
    variantes: [
      "reservar segunda sesión",
      "cómo reservo la segunda clase",
      "segunda sesión",
      "segunda clase"
    ],
    keywords: ["segunda sesión", "segunda clase", "reservar"],
    respuesta:
      "La segunda sesión no suele reservarse automáticamente al principio. Antes de hacerla, debes contactar con el taller para confirmar que tu pieza ya está lista."
  },
  {
    id: "segunda_sesion_tiempo",
    categoria: "Clases y talleres",
    pregunta: "¿Cuánto tarda en estar lista la pieza para la segunda sesión?",
    variantes: [
      "cuánto tarda segunda sesión",
      "cuándo puedo hacer la segunda sesión",
      "tiempo entre sesiones",
      "cuánto tarda la pieza"
    ],
    keywords: ["segunda sesión", "tiempo", "pieza", "semanas"],
    respuesta:
      "No hay un plazo exacto cerrado. Depende del secado, la cocción y de la organización del taller. Antes de reservar la segunda sesión, debes consultar con el taller si tu pieza ya está lista."
  },
  {
    id: "hay_torno",
    categoria: "Clases y talleres",
    pregunta: "¿Tenéis clases de torno?",
    variantes: [
      "clases de torno",
      "torno alfarero",
      "puedo hacer torno",
      "hay torno"
    ],
    keywords: ["torno", "alfarero"],
    respuesta:
      "Sí. Hay actividades y experiencias que incluyen torno alfarero."
  },
  {
    id: "diferencia_torno_modelado_decoracion",
    categoria: "Clases y talleres",
    pregunta: "¿Qué diferencia hay entre torno, modelado y decoración?",
    variantes: [
      "diferencia entre torno y modelado",
      "qué es torno",
      "qué es modelado",
      "qué es decoración",
      "torno o modelado"
    ],
    keywords: ["torno", "modelado", "decoración", "diferencia"],
    respuesta:
      "De forma general, el torno consiste en dar forma al barro en movimiento sobre el torno alfarero. El modelado se hace a mano, sin torno. La decoración se centra más en pintar, esmaltar o personalizar una pieza ya creada o preparada para ello."
  },
  {
    id: "incluye_esmalte",
    categoria: "Clases y talleres",
    pregunta: "¿Las clases incluyen esmalte?",
    variantes: [
      "incluye esmalte",
      "esmaltado incluido",
      "la clase incluye pintar",
      "incluye decoración"
    ],
    keywords: ["esmalte", "esmaltado", "decoración", "incluye"],
    respuesta:
      "Depende del tipo de clase o experiencia. Algunas actividades incluyen decoración o parte del acabado y otras se centran más en la creación de la pieza. Si dudas sobre una actividad concreta, consulta con el taller."
  },
  {
    id: "varias_clases_mismo_mes",
    categoria: "Clases y talleres",
    pregunta: "¿Puedo reservar varias clases en el mismo mes?",
    variantes: [
      "varias clases al mes",
      "puedo ir varias veces",
      "reservar más de una clase",
      "puedo repetir en el mismo mes"
    ],
    keywords: ["varias clases", "mismo mes", "reservar", "repetir"],
    respuesta:
      "Sí, en principio puedes reservar varias clases o experiencias siempre que haya disponibilidad y completes correctamente cada reserva."
  },

  // =========================
  // PRECIOS
  // =========================
  {
    id: "precio_pinta_tu_pieza",
    categoria: "Precios",
    pregunta: "¿Cuánto cuesta 'Pinta tu pieza de cerámica'?",
    variantes: [
      "precio pinta tu pieza",
      "cuánto vale pintar una pieza",
      "cuánto cuesta pintar cerámica",
      "precio pintar pieza"
    ],
    keywords: ["precio", "pinta", "pieza", "25"],
    respuesta:
      "Actualmente 'Pinta tu pieza de cerámica' tiene un precio de 25€."
  },
  {
    id: "precio_especial_pinta",
    categoria: "Precios",
    pregunta: "¿Cuánto cuesta 'Especial pinta tu pieza de cerámica'?",
    variantes: [
      "precio especial pinta tu pieza",
      "cuánto vale especial pinta tu pieza",
      "especial pintar pieza precio"
    ],
    keywords: ["especial", "pinta", "pieza", "35", "precio"],
    respuesta:
      "Actualmente 'Especial pinta tu pieza de cerámica' tiene un precio de 35€."
  },
  {
    id: "precio_crear_piezas",
    categoria: "Precios",
    pregunta: "¿Cuánto cuestan los talleres para crear piezas desde cero?",
    variantes: [
      "precio crear pieza",
      "cuánto cuesta crear una pieza",
      "precio talleres de piezas",
      "cuánto vale hacer una pieza"
    ],
    keywords: ["precio", "crear", "pieza", "55", "65", "75"],
    respuesta:
      "Los talleres para crear piezas desde cero suelen tener precios desde 55€, aunque algunas piezas especiales pueden costar 65€ o 75€ según el formato elegido."
  },
  {
    id: "precio_dos_sesiones",
    categoria: "Precios",
    pregunta: "¿Qué precio tienen los talleres de dos sesiones?",
    variantes: [
      "precio dos sesiones",
      "cuánto vale un taller de dos sesiones",
      "precio segunda sesión"
    ],
    keywords: ["precio", "dos sesiones", "58", "60"],
    respuesta:
      "Los talleres de dos sesiones suelen moverse aproximadamente entre 58€ y 60€, aunque puede variar según la experiencia concreta."
  },

  // =========================
  // CAMBIOS Y CANCELACIONES
  // =========================
  {
    id: "cancelar_reserva",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Puedo cancelar mi reserva?",
    variantes: [
      "cancelar reserva",
      "quiero cancelar",
      "anular reserva",
      "devolver reserva"
    ],
    keywords: ["cancelar", "anular", "devolver", "reserva"],
    respuesta:
      "La app no permite cancelar o modificar directamente una reserva ya hecha. Si no puedes asistir, debes contactar con el taller para valorar tu caso. Según la situación, pueden indicarte si es posible reprogramar la clase o ceder la plaza a otra persona."
  },
  {
    id: "cambiar_fecha",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Cómo puedo cambiar la fecha de una reserva que ya tengo hecha?",
    variantes: [
      "cambiar fecha",
      "cambiar reserva",
      "quiero cambiar mi reserva",
      "quiero cambiarla de dia",
      "quiero cambiarla de día",
      "cambiar de dia",
      "cambiar de día",
      "mover reserva",
      "reprogramar clase",
      "reprogramar reserva",
      "pasarlo a otro día",
      "pasarlo a otro dia",
      "ya tengo una reserva y quiero cambiarla",
      "tengo una reserva y quiero cambiarla de día",
      "he hecho una reserva y quiero cambiarla",
      "modificar reserva"
    ],
    keywords: [
      "cambiar",
      "cambio",
      "fecha",
      "dia",
      "día",
      "mover",
      "reprogramar",
      "modificar",
      "reserva"
    ],
    respuesta:
      "Si ya has hecho tu reserva y necesitas cambiarla de día, debes contactar directamente con el taller. Desde la app el usuario no puede modificar la fecha, pero el taller puede revisar tu caso y, si es posible, reprogramar la clase. Si se realiza el cambio, después podrás verlo reflejado en tu perfil."
  },
  {
    id: "no_puedo_ir",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Qué puedo hacer si no puedo asistir?",
    variantes: [
      "no puedo ir",
      "no puedo asistir",
      "no me viene bien",
      "no puedo ir ese día",
      "me ha surgido un imprevisto"
    ],
    keywords: ["no puedo ir", "asistir", "imprevisto", "cambiar", "ceder"],
    respuesta:
      "Si no puedes asistir, lo mejor es que contactes cuanto antes con el taller. Dependiendo del caso, pueden valorar contigo si es posible reprogramar la clase o ceder la plaza a otra persona."
  },
  {
    id: "ceder_plaza",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Puedo ceder mi plaza a otra persona?",
    variantes: [
      "ceder plaza",
      "dar mi plaza a otra persona",
      "puede ir otra persona por mí",
      "que vaya otra persona",
      "cambiar el nombre de la reserva"
    ],
    keywords: ["ceder", "otra persona", "plaza", "cambio de nombre"],
    respuesta:
      "Sí, puede ser posible ceder la plaza a otra persona. Lo importante es avisar y gestionarlo con el taller directamente."
  },
  {
    id: "reprogramada_en_perfil",
    categoria: "Cambios y cancelaciones",
    pregunta: "Si me reprograman la clase, ¿la veré en mi perfil?",
    variantes: [
      "aparecerá en mi perfil",
      "dónde veo la reprogramación",
      "se actualiza en la app",
      "se verá la nueva fecha"
    ],
    keywords: ["reprogramada", "perfil", "nueva fecha", "reserva"],
    respuesta:
      "Sí. Si el taller te reprograma la clase, la información actualizada puede aparecer reflejada en tu perfil."
  },
  {
    id: "no_aviso",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Qué pasa si no aviso con tiempo y no voy?",
    variantes: [
      "si no voy",
      "si falto",
      "si no me presento",
      "si no aviso"
    ],
    keywords: ["falto", "no voy", "no aviso", "pierdo", "reserva"],
    respuesta:
      "Si no avisas con suficiente antelación y no acudes, la reserva podrá considerarse utilizada."
  },
  {
    id: "llego_tarde",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Qué pasa si llego tarde?",
    variantes: [
      "llego tarde",
      "voy con retraso",
      "qué pasa si me retraso",
      "puedo entrar tarde"
    ],
    keywords: ["tarde", "retraso", "llego tarde"],
    respuesta:
      "Si crees que vas a llegar tarde, lo mejor es avisar cuanto antes al taller por WhatsApp para que puedan indicarte cómo gestionarlo."
  },

  // =========================
  // PAGOS
  // =========================
  {
    id: "pago_obligatorio",
    categoria: "Pagos",
    pregunta: "¿Tengo que pagar al hacer la reserva?",
    variantes: [
      "hay que pagar al reservar",
      "se paga antes",
      "pagar para reservar",
      "tengo que pagar ya",
      "se paga en el momento"
    ],
    keywords: ["pagar", "reserva", "precio", "pago"],
    respuesta:
      "Sí. Para garantizar tu plaza, el pago debe completarse durante el proceso de reserva."
  },
  {
    id: "pago_seguro",
    categoria: "Pagos",
    pregunta: "¿Cómo se realiza el pago?",
    variantes: [
      "cómo se paga",
      "forma de pago",
      "pago online",
      "pagar reserva"
    ],
    keywords: ["pago", "pagar", "redsys", "tarjeta"],
    respuesta:
      "El pago se realiza online a través de una pasarela de pago segura."
  },
  {
    id: "datos_tarjeta",
    categoria: "Pagos",
    pregunta: "¿La app guarda mis datos de tarjeta?",
    variantes: [
      "guardáis mi tarjeta",
      "datos bancarios",
      "guardáis mis datos",
      "seguridad pago"
    ],
    keywords: ["tarjeta", "datos", "seguridad", "banco"],
    respuesta:
      "No. La app no almacena tus datos de tarjeta. El pago se realiza mediante una pasarela externa segura."
  },
  {
    id: "problema_pago",
    categoria: "Pagos",
    pregunta: "¿Qué hago si tengo un problema con el pago?",
    variantes: [
      "error en el pago",
      "problema pagando",
      "me ha fallado el pago",
      "cobro duplicado",
      "pago rechazado"
    ],
    keywords: ["error", "pago", "fallo", "cobro", "rechazado"],
    respuesta:
      "Si has tenido un problema durante el pago, lo mejor es contactar con el taller para revisarlo contigo."
  },

  // =========================
  // BONOS
  // =========================
  {
    id: "que_es_bono",
    categoria: "Bonos",
    pregunta: "¿Qué es un bono?",
    variantes: [
      "qué es un bono",
      "cómo funciona el bono",
      "bono mensual",
      "curso mensual"
    ],
    keywords: ["bono", "mensual", "curso"],
    respuesta:
      "Un bono es una opción pensada para personas que quieren asistir varias veces al taller dentro de una modalidad concreta."
  },
  {
    id: "ver_info_bono",
    categoria: "Bonos",
    pregunta: "¿Qué información aparece en mis bonos?",
    variantes: [
      "qué sale en mis bonos",
      "qué veo en el bono",
      "información del bono",
      "datos del bono"
    ],
    keywords: ["bono", "clases", "restantes", "caduca", "estado"],
    respuesta:
      "En 'Mis bonos' puedes ver el nombre del bono, las clases incluidas, las consumidas, las restantes, la fecha de inicio, la fecha de caducidad y el estado del bono."
  },
  {
    id: "cuantas_clases_quedan_bono",
    categoria: "Bonos",
    pregunta: "¿Cómo veo cuántas clases me quedan de mi bono?",
    variantes: [
      "cuántas clases me quedan",
      "clases restantes del bono",
      "qué me queda del bono",
      "sesiones restantes"
    ],
    keywords: ["bono", "restantes", "clases", "sesiones"],
    respuesta:
      "Puedes verlo en tu perfil, dentro de 'Mis bonos', donde aparece cuántas clases has consumido y cuántas te quedan."
  },
  {
    id: "usar_bono",
    categoria: "Bonos",
    pregunta: "¿Cómo reservo usando un bono?",
    variantes: [
      "usar bono",
      "reservar con bono",
      "cómo gasto una clase del bono",
      "usar mis sesiones"
    ],
    keywords: ["bono", "reservar", "usar", "sesion"],
    respuesta:
      "Si tienes un bono activo, desde tu perfil podrás acceder a la opción correspondiente para reservar una sesión con ese bono, según la modalidad que tengas."
  },
  {
    id: "caducidad_bono",
    categoria: "Bonos",
    pregunta: "¿Los bonos caducan?",
    variantes: [
      "caduca el bono",
      "cuánto dura el bono",
      "validez del bono",
      "hasta cuándo vale"
    ],
    keywords: ["bono", "caducidad", "validez", "duración"],
    respuesta:
      "La validez del bono depende de sus condiciones. En tu perfil podrás ver la fecha de caducidad de tu bono en el apartado 'Mis bonos'."
  },
  {
    id: "bono_compartible",
    categoria: "Bonos",
    pregunta: "¿Los bonos se pueden compartir?",
    variantes: [
      "compartir bono",
      "usar bono entre dos",
      "puede usarlo otra persona",
      "el bono es personal"
    ],
    keywords: ["bono", "compartir", "otra persona", "personal"],
    respuesta:
      "Si quieres saber si un bono concreto puede compartirlo otra persona, lo mejor es consultarlo directamente con el taller antes de usarlo."
  },

  // =========================
  // TARJETAS REGALO
  // =========================
  {
    id: "tarjeta_regalo",
    categoria: "Tarjetas regalo",
    pregunta: "¿Puedo comprar una tarjeta regalo?",
    variantes: [
      "comprar regalo",
      "regalar clase",
      "hacer un regalo",
      "tarjeta regalo"
    ],
    keywords: ["tarjeta", "regalo", "regalar", "código"],
    respuesta:
      "Sí. Puedes comprar una tarjeta regalo para regalar una experiencia del taller."
  },
  {
    id: "usar_tarjeta_regalo",
    categoria: "Tarjetas regalo",
    pregunta: "¿Cómo funciona una tarjeta regalo?",
    variantes: [
      "cómo usar tarjeta regalo",
      "cómo canjear tarjeta regalo",
      "cómo funciona el código regalo",
      "usar código regalo"
    ],
    keywords: ["tarjeta regalo", "código", "canjear", "regalo"],
    respuesta:
      "Primero se compra la experiencia y se genera un código. Después, la persona que la recibe puede introducir ese código en la app para acceder a su reserva."
  },
  {
    id: "canjear_tarjeta_regalo",
    categoria: "Tarjetas regalo",
    pregunta: "¿Dónde canjeo una tarjeta regalo?",
    variantes: [
      "dónde canjeo la tarjeta regalo",
      "dónde pongo el código",
      "canjear regalo",
      "activar tarjeta regalo"
    ],
    keywords: ["canjear", "codigo", "tarjeta regalo", "perfil"],
    respuesta:
      "Puedes canjearla desde la opción 'Canjear tarjeta regalo' que aparece en la app o en tu perfil."
  },
  {
    id: "ver_tarjeta_regalo",
    categoria: "Tarjetas regalo",
    pregunta: "¿Qué información aparece en mis tarjetas regalo?",
    variantes: [
      "qué sale en mis tarjetas regalo",
      "ver código regalo",
      "qué datos aparecen en el regalo"
    ],
    keywords: ["tarjetas regalo", "codigo", "estado", "producto", "precio"],
    respuesta:
      "En 'Mis tarjetas regalo' puedes ver información como el producto, el precio, el código y el estado de cada tarjeta."
  },
  {
    id: "caducidad_tarjeta_regalo",
    categoria: "Tarjetas regalo",
    pregunta: "¿Las tarjetas regalo caducan?",
    variantes: [
      "caduca la tarjeta regalo",
      "cuánto dura la tarjeta regalo",
      "validez del regalo",
      "hasta cuándo puedo usarla"
    ],
    keywords: ["tarjeta regalo", "caducidad", "validez", "regalo"],
    respuesta:
      "Si tienes dudas sobre la validez o posible caducidad de una tarjeta regalo concreta, lo mejor es consultarlo directamente con el taller."
  },

  // =========================
  // GRUPOS
  // =========================
  {
    id: "grupo_reserva",
    categoria: "Grupos",
    pregunta: "¿Se pueden hacer reservas para grupos?",
    variantes: [
      "reserva para grupo",
      "cumpleaños",
      "despedida",
      "grupo de amigos",
      "actividad en grupo"
    ],
    keywords: ["grupo", "cumpleaños", "despedida", "celebración"],
    respuesta:
      "Sí. La Purísima Conchi ofrece actividades y experiencias para grupos."
  },
  {
    id: "grupo_como_reservar",
    categoria: "Grupos",
    pregunta: "¿Cómo reservo una actividad para grupo?",
    variantes: [
      "cómo reservar grupo",
      "quiero reservar para grupo",
      "grupo whatsapp",
      "reserva de grupo"
    ],
    keywords: ["grupo", "whatsapp", "reserva", "contactar"],
    respuesta:
      "Antes de cerrar una reserva de grupo, lo mejor es contactar directamente con el taller por WhatsApp para concretar todos los detalles."
  },
  {
    id: "grupo_otro_horario",
    categoria: "Grupos",
    pregunta: "¿Se puede hacer un grupo en otro día u horario?",
    variantes: [
      "otro horario para grupo",
      "otro día para grupo",
      "grupo en otra fecha",
      "grupo especial"
    ],
    keywords: ["grupo", "otro horario", "otro día", "fecha", "especial"],
    respuesta:
      "Sí, puede ser posible, pero depende de la disponibilidad del taller. Si necesitáis un día u horario especial, debéis consultarlo antes directamente."
  },

  // =========================
  // PIEZAS / RECOGIDA / ENVÍOS
  // =========================
  {
    id: "pieza_lista",
    categoria: "Piezas",
    pregunta: "¿Cuándo estará lista mi pieza?",
    variantes: [
      "cuándo recojo mi pieza",
      "cuándo está lista",
      "cuánto tarda mi pieza",
      "cuándo sale del horno"
    ],
    keywords: ["pieza", "lista", "recoger", "tarda", "horno"],
    respuesta:
      "Las piezas necesitan secado, cocción y, en algunos casos, otros procesos como esmaltado. Por eso, los tiempos son orientativos y no se puede garantizar una fecha exacta."
  },
  {
    id: "consultar_pieza",
    categoria: "Piezas",
    pregunta: "¿Cómo sé si mi pieza ya está lista?",
    variantes: [
      "mi pieza está lista",
      "dónde ver mi pieza",
      "cómo consultar mi pieza",
      "cómo sé si ya puedo recogerla"
    ],
    keywords: ["pieza", "lista", "consultar", "recoger", "drive"],
    respuesta:
      "Cuando las piezas están listas, puedes consultarlo desde tu perfil, en el apartado 'Recoger mi pieza', donde encontrarás el enlace a la carpeta correspondiente."
  },
  {
    id: "donde_recoger_pieza",
    categoria: "Piezas",
    pregunta: "¿Dónde veo el enlace para recoger mi pieza?",
    variantes: [
      "dónde está recoger mi pieza",
      "enlace para ver mi pieza",
      "drive de las piezas",
      "carpeta de piezas listas"
    ],
    keywords: ["recoger mi pieza", "drive", "perfil", "carpeta"],
    respuesta:
      "El acceso aparece dentro de tu perfil, en el apartado 'Recoger mi pieza'."
  },
  {
    id: "cada_cuanto_mirar_pieza",
    categoria: "Piezas",
    pregunta: "¿Cada cuánto debería mirar si mi pieza está lista?",
    variantes: [
      "cada cuánto miro mi pieza",
      "cuándo revisar el drive",
      "frecuencia para mirar mi pieza"
    ],
    keywords: ["pieza", "lista", "mirar", "frecuencia", "drive"],
    respuesta:
      "Lo más práctico es revisarlo periódicamente desde tu perfil, ya que el proceso puede variar según el secado, la cocción y la carga de trabajo del taller."
  },
  {
    id: "envio_pieza",
    categoria: "Piezas",
    pregunta: "¿Se puede enviar mi pieza a otra ciudad?",
    variantes: [
      "enviar pieza",
      "mandar mi pieza",
      "envío de pieza",
      "mensajería",
      "me la mandáis a casa"
    ],
    keywords: ["enviar", "pieza", "mensajería", "transporte"],
    respuesta:
      "Sí, pero el taller no organiza ni contrata el envío. Puede facilitar el embalaje, las medidas, el peso del paquete y la dirección de recogida. La contratación y el pago del transporte corren por cuenta de cada persona."
  },
  {
    id: "rotura_pieza",
    categoria: "Piezas",
    pregunta: "¿Puede romperse mi pieza?",
    variantes: [
      "se puede romper",
      "pieza rota",
      "si se rompe mi pieza",
      "roturas",
      "puede agrietarse"
    ],
    keywords: ["romper", "rota", "rotura", "grieta", "deformarse"],
    respuesta:
      "Sí. En cerámica, las piezas pueden romperse, agrietarse o deformarse durante el proceso. Aunque el taller cuida cada creación, hay factores fuera de control que forman parte natural del trabajo con barro y esmaltes."
  },
  {
    id: "resultado_final_pieza",
    categoria: "Piezas",
    pregunta: "¿Se garantiza el resultado final de la pieza?",
    variantes: [
      "resultado final",
      "garantizáis la pieza",
      "queda igual siempre",
      "resultado exacto"
    ],
    keywords: ["resultado", "pieza", "garantía", "exacto"],
    respuesta:
      "No se puede garantizar el resultado final exacto de cada pieza, especialmente si tiene formas complejas o delicadas. Lo importante también es disfrutar del proceso creativo."
  },

  // =========================
  // FAQ EXTRA ÚTILES
  // =========================
  {
    id: "edad_minima",
    categoria: "Preguntas frecuentes",
    pregunta: "¿Hay una edad mínima para asistir?",
    variantes: [
      "edad mínima",
      "a partir de qué edad",
      "niños pueden ir",
      "hay límite de edad"
    ],
    keywords: ["edad", "menores", "niños", "mínima"],
    respuesta:
      "La edad mínima puede depender del tipo de taller o experiencia. Si quieres reservar para un menor, lo mejor es consultar antes directamente con el taller."
  },
  {
    id: "menores_acompanados",
    categoria: "Preguntas frecuentes",
    pregunta: "¿Pueden asistir menores de edad?",
    variantes: [
      "pueden ir menores",
      "pueden ir niños",
      "puedo llevar a mi hijo",
      "menor de edad"
    ],
    keywords: ["menores", "niños", "acompañados", "edad"],
    respuesta:
      "Sí puede ser posible en algunos casos, pero depende del tipo de actividad y de la edad del menor. Lo mejor es consultarlo antes con el taller."
  },
  {
    id: "ropa_recomendada",
    categoria: "Preguntas frecuentes",
    pregunta: "¿Qué ropa conviene llevar?",
    variantes: [
      "qué ropa llevo",
      "cómo tengo que ir vestida",
      "ropa recomendable",
      "cómo ir al taller"
    ],
    keywords: ["ropa", "vestida", "cómoda", "barro"],
    respuesta:
      "Lo más recomendable es venir con ropa cómoda, con la que te sientas a gusto para trabajar con barro y materiales cerámicos."
  },
  {
    id: "ropa_se_ensucia",
    categoria: "Preguntas frecuentes",
    pregunta: "¿La ropa se ensucia?",
    variantes: [
      "se mancha la ropa",
      "me voy a ensuciar",
      "barro en la ropa",
      "se ensucia mucho"
    ],
    keywords: ["ropa", "ensucia", "barro", "mancha"],
    respuesta:
      "Sí, puede ensuciarse un poco durante la actividad, ya que se trabaja con barro, agua, esmaltes y otros materiales del proceso cerámico."
  },
  {
    id: "aparcamiento",
    categoria: "Preguntas frecuentes",
    pregunta: "¿Hay aparcamiento cerca?",
    variantes: [
      "hay parking",
      "se aparca bien",
      "aparcamiento cerca",
      "dónde aparcar"
    ],
    keywords: ["parking", "aparcamiento", "aparcar"],
    respuesta:
      "La disponibilidad de aparcamiento puede variar según la zona y la hora. Si necesitas indicaciones más concretas, lo mejor es consultarlo directamente con el taller."
  },
  {
    id: "comer_beber",
    categoria: "Preguntas frecuentes",
    pregunta: "¿Se puede comer o beber durante la experiencia?",
    variantes: [
      "se puede comer",
      "se puede beber",
      "puedo llevar comida",
      "puedo llevar bebida"
    ],
    keywords: ["comer", "beber", "comida", "bebida"],
    respuesta:
      "Si tienes una necesidad concreta o vienes a una actividad especial o de grupo, lo mejor es consultarlo con el taller antes."
  },

  // =========================
  // CONTACTO
  // =========================
  {
    id: "contacto_taller",
    categoria: "Contacto",
    pregunta: "¿Cómo puedo contactar con el taller?",
    variantes: [
      "contacto",
      "teléfono",
      "whatsapp",
      "email del taller",
      "cómo hablar con vosotros"
    ],
    keywords: ["contacto", "whatsapp", "teléfono", "email"],
    respuesta:
      "Puedes contactar con el taller principalmente por WhatsApp o teléfono en el 644 67 16 64."
  },
  {
    id: "direccion_taller",
    categoria: "Contacto",
    pregunta: "¿Dónde está el taller?",
    variantes: [
      "dirección",
      "dónde está",
      "ubicación",
      "cómo llegar"
    ],
    keywords: ["dirección", "ubicación", "córdoba", "taller"],
    respuesta:
      "La Purísima Conchi está en C/ Israel, local 5, 14009, Córdoba (España)."
  },

  // =========================
  // FALLBACK / AYUDA HUMANA
  // =========================
  {
    id: "fallback_whatsapp",
    categoria: "Ayuda",
    pregunta: "No encuentro respuesta a mi duda",
    variantes: [
      "no encuentro respuesta",
      "tengo otra duda",
      "mi caso es distinto",
      "esto no me sirve",
      "necesito ayuda humana"
    ],
    keywords: ["duda", "ayuda", "whatsapp", "contactar"],
    respuesta:
      "Si no has encontrado una respuesta exacta o tu caso es más concreto, lo mejor es contactar directamente con el taller por WhatsApp al 644 67 16 64."
  }
];