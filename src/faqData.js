export const faqData = [
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
      "Puedes reservar directamente desde la web o la app de La Purísima Conchi. Solo tienes que elegir tu actividad, seleccionar una fecha o consultar disponibilidad si corresponde, y completar el proceso para confirmar tu plaza."
  },
  {
    id: "confirmacion_reserva",
    categoria: "Reservas",
    pregunta: "¿Cuándo queda confirmada mi reserva?",
    variantes: [
      "cuándo se confirma",
      "reserva confirmada",
      "cómo sé si está confirmada",
      "ya está confirmada mi reserva"
    ],
    keywords: ["confirmada", "confirmar", "pago", "reserva"],
    respuesta:
      "Tu reserva queda confirmada una vez se completa correctamente el proceso de reserva y pago."
  },
  {
    id: "pago_obligatorio",
    categoria: "Reservas",
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
      "Sí. Para garantizar tu plaza, es necesario abonar el importe correspondiente en el momento de la reserva."
  },
  {
    id: "reservar_varias_plazas",
    categoria: "Reservas",
    pregunta: "¿Puedo reservar varias plazas?",
    variantes: [
      "reservar para varias personas",
      "reservar varias personas",
      "ir con alguien",
      "reservar más de una plaza",
      "puedo ir acompañada"
    ],
    keywords: ["varias", "plazas", "personas", "grupo", "acompañante"],
    respuesta:
      "Sí, en algunas actividades puedes reservar varias plazas si hay disponibilidad. Si sois varias personas y tienes dudas, puedes escribir al taller por WhatsApp al 644 67 16 64."
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
      "Sí. Muchas de las experiencias están pensadas tanto para personas que empiezan desde cero como para quienes ya han tenido contacto con la cerámica."
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
      "Si una fecha o turno está completo, tendrás que elegir otra opción disponible. Si no encuentras hueco, puedes consultar con el taller por WhatsApp al 644 67 16 64."
  },
  {
    id: "consultar_disponibilidad",
    categoria: "Reservas",
    pregunta: "¿Qué significa 'Consultar disponibilidad'?",
    variantes: [
      "consultar disponibilidad",
      "qué significa consultar disponibilidad",
      "no sale fecha",
      "no sale horario",
      "no aparece turno"
    ],
    keywords: ["consultar", "disponibilidad", "fecha", "horario", "turno"],
    respuesta:
      "Significa que esa actividad no tiene un turno cerrado visible o depende de la organización interna del taller. En esos casos, lo mejor es escribir por WhatsApp al 644 67 16 64 para confirmar qué fechas están disponibles."
  },

  // =========================
  // HORARIOS
  // =========================
  {
    id: "horario_taller",
    categoria: "Horarios",
    pregunta: "¿Cuál es el horario habitual del taller?",
    variantes: [
      "horario del taller",
      "a qué hora abrís",
      "cuándo está abierto",
      "horario general",
      "horario de apertura"
    ],
    keywords: ["horario", "taller", "abierto", "abrís"],
    respuesta:
      "El horario habitual del taller es aproximadamente de 11:30 a 20:30."
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
      "No hay un horario fijo cerrado de atención por WhatsApp. Puedes escribir cuando quieras y se te responderá en cuanto sea posible, normalmente dentro del horario habitual del taller."
  },
  {
    id: "horario_formacion_general",
    categoria: "Horarios",
    pregunta: "¿Cuál es el horario habitual de las clases entre semana?",
    variantes: [
      "horario de clases",
      "qué horario tienen las clases",
      "a qué hora son las clases",
      "horario entre semana",
      "horario formación"
    ],
    keywords: ["horario", "clases", "formación", "semana"],
    respuesta:
      "La formación presencial habitual suele impartirse los martes, miércoles y jueves de 17:30 a 20:30, y los sábados de 11:30 a 14:30."
  },
  {
    id: "horario_pinta_tu_pieza",
    categoria: "Horarios",
    pregunta: "¿Qué horario tiene 'Pinta tu pieza de cerámica'?",
    variantes: [
      "horario pinta tu pieza",
      "cuándo se puede pintar una pieza",
      "qué días hay pinta tu pieza",
      "a qué hora es pinta tu pieza"
    ],
    keywords: ["pinta", "pieza", "horario", "pintar", "cerámica"],
    respuesta:
      "El horario de 'Pinta tu pieza de cerámica' puede variar según la disponibilidad. Si no aparece una fecha concreta al reservar, lo mejor es consultar directamente por WhatsApp al 644 67 16 64."
  },

  // =========================
  // PRECIOS Y ACTIVIDADES
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
    id: "diferencia_pinta",
    categoria: "Clases",
    pregunta: "¿Qué diferencia hay entre 'Pinta tu pieza' y 'Especial pinta tu pieza'?",
    variantes: [
      "diferencia pinta tu pieza",
      "qué cambia entre pinta tu pieza y especial",
      "cuál es mejor",
      "qué incluye la especial"
    ],
    keywords: ["diferencia", "pinta", "especial", "pieza"],
    respuesta:
      "La opción estándar 'Pinta tu pieza de cerámica' tiene un formato más básico y su precio actual es de 25€. La opción 'Especial pinta tu pieza de cerámica' tiene un formato especial o ampliado y actualmente cuesta 35€."
  },
  {
    id: "clase_suelta_continuidad",
    categoria: "Clases",
    pregunta: "¿Qué es la clase suelta con continuidad?",
    variantes: [
      "clase suelta continuidad",
      "qué es continuidad",
      "clase suelta",
      "seguir aprendiendo"
    ],
    keywords: ["clase suelta", "continuidad", "seguir", "aprender"],
    respuesta:
      "Es una clase pensada para seguir aprendiendo y practicando en el taller sin necesidad de comprar un bono mensual."
  },
  {
    id: "precio_clase_suelta_continuidad",
    categoria: "Precios",
    pregunta: "¿Cuánto cuesta la clase suelta con continuidad?",
    variantes: [
      "precio clase suelta continuidad",
      "cuánto vale la clase suelta",
      "precio continuidad"
    ],
    keywords: ["precio", "clase suelta", "continuidad", "27", "32"],
    respuesta:
      "Actualmente la clase suelta con continuidad parte desde 27€ para modelado o decoración, y 32€ si eliges torno."
  },
  {
    id: "crear_desde_cero",
    categoria: "Clases",
    pregunta: "¿Tenéis talleres para crear piezas desde cero?",
    variantes: [
      "crear desde cero",
      "hacer una pieza",
      "taller para crear pieza",
      "modelar pieza"
    ],
    keywords: ["crear", "pieza", "cero", "modelar"],
    respuesta:
      "Sí. Hay varios talleres para crear piezas desde cero, como brunch bowl, cuenco para ramen, bandeja de hogar, taza favorita, maceta, jarra o jarrón grande, entre otros."
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
      "Los precios actuales suelen partir desde 55€, aunque algunas piezas especiales pueden costar 65€ o 75€ según el formato o tamaño."
  },
  {
    id: "crea_tu_pieza_favorita",
    categoria: "Clases",
    pregunta: "¿Qué es 'Crea tu pieza favorita'?",
    variantes: [
      "crea tu pieza favorita",
      "qué incluye crea tu pieza favorita",
      "cómo funciona crea tu pieza favorita"
    ],
    keywords: ["pieza favorita", "crear", "pieza"],
    respuesta:
      "Es una actividad donde puedes elegir una pieza concreta para crearla en el taller. El precio puede variar según la pieza seleccionada."
  },
  {
    id: "precio_crea_tu_pieza_favorita",
    categoria: "Precios",
    pregunta: "¿Cuánto cuesta 'Crea tu pieza favorita'?",
    variantes: [
      "precio crea tu pieza favorita",
      "cuánto vale crea tu pieza favorita"
    ],
    keywords: ["precio", "pieza favorita", "55", "65", "75"],
    respuesta:
      "Actualmente 'Crea tu pieza favorita' tiene precios que pueden variar según la pieza elegida: desde 55€, 65€ o 75€."
  },

  // =========================
  // DOS SESIONES
  // =========================
  {
    id: "dos_sesiones_que_es",
    categoria: "Talleres de dos sesiones",
    pregunta: "¿Cómo funcionan los talleres de dos sesiones?",
    variantes: [
      "taller de dos sesiones",
      "cómo funciona dos sesiones",
      "qué significa dos sesiones",
      "dos clases"
    ],
    keywords: ["dos sesiones", "segunda sesión", "dos clases"],
    respuesta:
      "En los talleres de dos sesiones primero reservas la primera sesión, donde se crea la pieza. La segunda sesión se realiza más adelante, cuando la pieza ya está lista para continuar o decorar."
  },
  {
    id: "segunda_sesion_reserva",
    categoria: "Talleres de dos sesiones",
    pregunta: "¿Cómo se reserva la segunda sesión?",
    variantes: [
      "reservar segunda sesión",
      "cómo reservo la segunda clase",
      "segunda sesión",
      "segunda clase"
    ],
    keywords: ["segunda sesión", "segunda clase", "reservar"],
    respuesta:
      "La segunda sesión no se reserva directamente al principio. Antes de reservarla, debes contactar con el taller para confirmar que tu pieza ya está lista."
  },
  {
    id: "segunda_sesion_tiempo",
    categoria: "Talleres de dos sesiones",
    pregunta: "¿Cuánto tarda en estar lista la pieza para la segunda sesión?",
    variantes: [
      "cuánto tarda segunda sesión",
      "cuándo puedo hacer la segunda sesión",
      "tiempo entre sesiones",
      "cuánto tarda la pieza"
    ],
    keywords: ["segunda sesión", "tiempo", "pieza", "3 semanas"],
    respuesta:
      "Normalmente la pieza suele tardar unas 3 semanas aproximadamente en estar lista para la segunda sesión, aunque puede variar según el secado, la cocción y la organización del taller."
  },
  {
    id: "contactar_segunda_sesion",
    categoria: "Talleres de dos sesiones",
    pregunta: "¿Tengo que contactar con el taller antes de la segunda sesión?",
    variantes: [
      "tengo que escribir antes de la segunda sesión",
      "contactar para segunda sesión",
      "avisar segunda sesión"
    ],
    keywords: ["contactar", "segunda sesión", "whatsapp"],
    respuesta:
      "Sí. Antes de reservar la segunda sesión, debes contactar con el taller para confirmar que tu pieza ya está lista. Puedes escribir por WhatsApp al 644 67 16 64."
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
      "Actualmente los talleres de dos sesiones suelen tener precios aproximados entre 58€ y 60€, aunque puede variar según el taller concreto."
  },

  // =========================
  // BONOS
  // =========================
  {
    id: "que_es_bono",
    categoria: "Bonos",
    pregunta: "¿Qué es un bono o curso mensual?",
    variantes: [
      "qué es un bono",
      "cómo funciona el bono",
      "curso mensual",
      "bono mensual"
    ],
    keywords: ["bono", "mensual", "curso"],
    respuesta:
      "Un bono o curso mensual es una opción pensada para personas que quieren asistir varias veces al taller de forma continua, en lugar de reservar una sola sesión."
  },
  {
    id: "bonos_disponibles",
    categoria: "Bonos",
    pregunta: "¿Qué bonos o cursos mensuales tenéis?",
    variantes: [
      "qué bonos hay",
      "bonos disponibles",
      "qué cursos mensuales hay"
    ],
    keywords: ["bonos", "cursos", "mensuales"],
    respuesta:
      "Actualmente hay varias opciones de bonos o cursos mensuales, como modelado a mano y decoración, torno con decoración o torno desde cero."
  },
  {
    id: "precio_bonos",
    categoria: "Precios",
    pregunta: "¿Qué precio tienen los bonos mensuales?",
    variantes: [
      "precio bonos",
      "cuánto cuesta un bono",
      "precio curso mensual"
    ],
    keywords: ["precio", "bono", "79", "99", "120", "145"],
    respuesta:
      "Actualmente los bonos y cursos mensuales tienen precios aproximados desde 79€, 99€, 120€ o 145€, dependiendo de la modalidad."
  },

  // =========================
  // TORNO / MODELADO
  // =========================
  {
    id: "hay_torno",
    categoria: "Clases",
    pregunta: "¿Tenéis clases de torno?",
    variantes: [
      "clases de torno",
      "torno alfarero",
      "puedo hacer torno",
      "hay torno"
    ],
    keywords: ["torno", "alfarero"],
    respuesta:
      "Sí. Hay opciones con torno tanto en clases sueltas como en algunos talleres y bonos."
  },
  {
    id: "elegir_torno_modelado",
    categoria: "Clases",
    pregunta: "¿Puedo elegir entre torno y modelado a mano?",
    variantes: [
      "elegir torno o modelado",
      "torno o modelado",
      "qué diferencia hay entre torno y modelado"
    ],
    keywords: ["torno", "modelado", "decoración", "elegir"],
    respuesta:
      "En varias actividades sí. Algunas clases permiten elegir entre torno, modelado a mano o decoración, mientras que otras ya vienen definidas por el tipo de taller."
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
      "No se realizan devoluciones de dinero una vez hecha la reserva. Si no puedes asistir, puedes reprogramar tu clase o ceder tu plaza a otra persona."
  },
  {
    id: "no_puedo_ir",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Qué puedo hacer si no puedo asistir?",
    variantes: [
      "no puedo ir",
      "no puedo asistir",
      "no me viene bien",
      "no puedo ir ese día"
    ],
    keywords: ["no puedo ir", "asistir", "cambiar", "ceder"],
    respuesta:
      "Si no puedes asistir, puedes reprogramar tu clase a otra fecha disponible o ceder tu plaza a otra persona sin coste adicional."
  },
  {
    id: "cambiar_fecha",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Con cuánto tiempo tengo que avisar para cambiar la fecha?",
    variantes: [
      "cambiar fecha",
      "mover reserva",
      "reprogramar clase",
      "pasarlo a otro día",
      "quiero cambiar mi reserva"
    ],
    keywords: ["cambiar", "mover", "reprogramar", "fecha", "72 horas"],
    respuesta:
      "Debes avisar con al menos 72 horas de antelación para poder reprogramar tu reserva a otra fecha disponible."
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
    keywords: ["falto", "no voy", "no aviso", "pierdo"],
    respuesta:
      "Si no avisas con suficiente antelación y no acudes, la reserva se considerará utilizada."
  },
  {
    id: "ceder_plaza",
    categoria: "Cambios y cancelaciones",
    pregunta: "¿Puedo ceder mi plaza a otra persona?",
    variantes: [
      "ceder plaza",
      "dar mi plaza a otra persona",
      "puede ir otra persona por mí"
    ],
    keywords: ["ceder", "otra persona", "plaza"],
    respuesta:
      "Sí. Puedes ceder tu plaza a otra persona sin coste adicional. Solo debes avisar al taller."
  },

  // =========================
  // PAGOS
  // =========================
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
      "Los pagos se realizan de forma segura a través de la pasarela de pago correspondiente."
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
      "No. La app no almacena en ningún momento tus datos de tarjeta. El pago se realiza en una pasarela externa segura."
  },
  {
    id: "problema_pago",
    categoria: "Pagos",
    pregunta: "¿Qué hago si tengo un problema con el pago?",
    variantes: [
      "error en el pago",
      "problema pagando",
      "me ha fallado el pago",
      "cobro duplicado"
    ],
    keywords: ["error", "pago", "fallo", "cobro"],
    respuesta:
      "Si has tenido un problema durante el pago, puedes contactar con nosotros para revisarlo. Si lo prefieres, también puedes escribir directamente al taller por WhatsApp al 644 67 16 64."
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
      "Sí. Puedes comprar una tarjeta regalo para regalar una experiencia en el taller."
  },
  {
    id: "usar_tarjeta_regalo",
    categoria: "Tarjetas regalo",
    pregunta: "¿Cómo funciona una tarjeta regalo?",
    variantes: [
      "cómo usar tarjeta regalo",
      "cómo canjear tarjeta regalo",
      "cómo funciona el código regalo"
    ],
    keywords: ["tarjeta regalo", "código", "canjear", "regalo"],
    respuesta:
      "Primero se compra la experiencia, luego se genera un código y la persona que la recibe podrá usarlo para hacer su reserva."
  },
  {
    id: "caducidad_bono_regalo",
    categoria: "Tarjetas regalo y bonos",
    pregunta: "¿Cuánto tiempo dura un bono o regalo?",
    variantes: [
      "caducidad bono",
      "cuánto dura",
      "hasta cuándo vale",
      "caduca"
    ],
    keywords: ["bono", "caducidad", "validez", "regalo"],
    respuesta:
      "La validez puede depender del tipo de bono o experiencia. Si tienes dudas sobre un caso concreto, consulta directamente con el taller por WhatsApp al 644 67 16 64."
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
      "Sí. Si sois un grupo y queréis celebrar una experiencia especial, podéis reservar una actividad para grupo."
  },
  {
    id: "grupo_como_reservar",
    categoria: "Grupos",
    pregunta: "¿Cómo reservo una actividad para grupo?",
    variantes: [
      "cómo reservar grupo",
      "quiero reservar para grupo",
      "grupo whatsapp"
    ],
    keywords: ["grupo", "whatsapp", "reserva", "contactar"],
    respuesta:
      "Antes de realizar el pago, es importante contactar primero con el taller por WhatsApp para concretar todos los detalles. WhatsApp: 644 67 16 64."
  },
  {
    id: "grupo_horarios",
    categoria: "Grupos",
    pregunta: "¿Qué horarios hay para grupos?",
    variantes: [
      "horarios grupos",
      "qué días hay grupos",
      "horario para grupo"
    ],
    keywords: ["grupo", "horarios", "viernes", "sábado", "domingo"],
    respuesta:
      "Los horarios disponibles para grupos son: viernes y sábados de 17:30 a 20:30, y domingos de 11:30 a 14:30."
  },
  {
    id: "grupo_otro_horario",
    categoria: "Grupos",
    pregunta: "¿Se puede hacer un grupo en otro día u horario?",
    variantes: [
      "otro horario para grupo",
      "otro día para grupo",
      "grupo en otra fecha"
    ],
    keywords: ["grupo", "otro horario", "otro día", "fecha"],
    respuesta:
      "Sí, pero depende de disponibilidad. Si necesitáis otro día u otro horario, debéis consultarlo antes directamente con el taller por WhatsApp al 644 67 16 64."
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
      "cuánto tarda mi pieza"
    ],
    keywords: ["pieza", "lista", "recoger", "tarda"],
    respuesta:
      "El proceso cerámico requiere tiempo, secado, cocción y esmaltado en muchos casos. Por eso, los tiempos de entrega son orientativos y no exactos."
  },
  {
    id: "consultar_pieza",
    categoria: "Piezas",
    pregunta: "¿Cómo sé si mi pieza ya está lista?",
    variantes: [
      "mi pieza está lista",
      "dónde ver mi pieza",
      "cómo consultar mi pieza"
    ],
    keywords: ["pieza", "lista", "consultar"],
    respuesta:
      "Cuando las piezas están listas, el taller las sube al sistema o espacio de consulta correspondiente para que puedas comprobar si ya están disponibles para recoger."
  },
  {
    id: "tiempo_proceso_pieza",
    categoria: "Piezas",
    pregunta: "¿Por qué tarda tanto una pieza?",
    variantes: [
      "por qué tarda tanto",
      "por qué tarda la pieza",
      "tiempo de la pieza",
      "cuánto tarda la cerámica"
    ],
    keywords: ["tarda", "pieza", "proceso", "cerámica"],
    respuesta:
      "Porque la cerámica necesita varias fases: secado, posibles retoques, cocción, esmaltado y en muchos casos una segunda cocción. Es un proceso artesanal y delicado."
  },
  {
    id: "envio_pieza",
    categoria: "Piezas",
    pregunta: "¿Se puede enviar mi pieza a otra ciudad?",
    variantes: [
      "enviar pieza",
      "mandar mi pieza",
      "envío de pieza",
      "mensajería"
    ],
    keywords: ["enviar", "pieza", "mensajería", "transporte"],
    respuesta:
      "Sí, pero el taller no organiza ni contrata el envío. Solo puede facilitar el embalaje, las medidas, el peso del paquete y la dirección de recogida. La contratación y el pago del transporte corren por cuenta de cada persona."
  },
  {
    id: "rotura_pieza",
    categoria: "Piezas",
    pregunta: "¿Puede romperse mi pieza?",
    variantes: [
      "se puede romper",
      "pieza rota",
      "si se rompe mi pieza",
      "roturas"
    ],
    keywords: ["romper", "rota", "rotura", "grieta"],
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
      "queda igual siempre"
    ],
    keywords: ["resultado", "pieza", "garantía"],
    respuesta:
      "No se puede garantizar el resultado final exacto de cada pieza, especialmente si tiene formas complejas o delicadas. Lo importante también es disfrutar del proceso creativo."
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
      "Puedes contactar con el taller por WhatsApp o teléfono en el 644 67 16 64."
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
      "esto no me sirve"
    ],
    keywords: ["duda", "ayuda", "whatsapp", "contactar"],
    respuesta:
      "Si no has encontrado una respuesta exacta o tu caso es concreto, lo mejor es contactar directamente con Berto por WhatsApp al 644 67 16 64."
  }
];