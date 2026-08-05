import type { ProductionEventDefinition } from "@/game/productionEvents";

export const firstDemoProduction = {
  id: "first-demo-production",
  eyebrow: "Capítulo I",
  title: "Grabar el primer demo",
  intro:
    "La banda ya tiene canciones, algo de público y una entrevista dando vueltas. Falta una cosa más difícil de evitar: dejar algo grabado. No alcanza con tocar fuerte. Ahora hay que decidir cómo suena la primera prueba de que existen.",
  startLabel: "Entrar a grabar",
  questions: [
    {
      id: "recording-place",
      title: "Dónde grabar",
      text: "La primera discusión aparece antes de enchufar nada: cuánto gastar en el lugar donde van a grabar.",
      emergencyOption: {
        id: "improvise-with-what-is-left",
        title: "Improvisar con lo que hay",
        text: "No queda plata para elegir cómo grabar. Juntan cables prestados, una placa dudosa y un par de micrófonos prestados. Nadie lo llama plan: lo llaman no rendirse",
        effects: {
          reputation: -2,
          health: -1,
        },
        personalitySignals: ["resilient", "pragmatic"],
        productionQuality: 1,
      },
      options: [
        {
          id: "neighborhood-studio",
          title: "Alquilar un estudio chico",
          text: "No es lujoso, pero tiene una consola decente, alguien que sabe microfonear una batería y paredes que no devuelven todo como baño de estación.",
          effects: {
            money: -220,
            reputation: 2,
            health: -1,
          },
          personalitySignals: ["discipline", "ambition"],
          productionQuality: 5,
        },
        {
          id: "rehearsal-room",
          title: "Grabar en la sala de ensayo",
          text: "Es barato, conocido y nadie los mira raro si repiten veinte veces. También es el mismo lugar donde una persiana vibra en cada estribillo.",
          effects: {
            money: -60,
            creativity: 1,
            reputation: -1,
          },
          personalitySignals: ["pragmatic", "authentic"],
          productionQuality: 3,
        },
        {
          id: "friend-home-setup",
          title: "Usar el home studio de un amigo",
          text: "Tiene placas, plugins y paciencia. Además, se ofrece a dar una mano con la mezcla. Lo malo es que el living no fue pensado para una banda completa ni para vecinos sensibles.",
          effects: {
            money: -120,
            creativity: 2,
            health: -1,
          },
          personalitySignals: ["creativity", "loyalty"],
          productionQuality: 4,
        },
        {
          id: "single-live-take",
          title: "Hacer una toma en vivo",
          text: "Ponen micrófonos, cuentan cuatro y graban todo junto. Puede no ser el mejor sonido, pero si la banda prende fuego la sala, ningún estudio compra esa energía.",
          effects: {
            money: -30,
            charisma: 2,
            talent: -1,
          },
          personalitySignals: ["fearless", "rebellion"],
          productionQuality: 3,
        },
      ],
    },
    {
      id: "recording-method",
      title: "Cómo encarar las tomas",
      text: "Con el lugar elegido, aparece la segunda pelea: buscar precisión, energía o algo más raro.",
      emergencyOption: {
        id: "minimum-resources",
        title: "Resolverlo con lo mínimo",
        text: "No hay margen para repetir ni experimentar. Graban lo que sale, bajan la cabeza y aceptan que esta vez el demo manda más que la banda.",
        effects: {
          talent: -1,
          reputation: -1,
          health: 1,
        },
        personalitySignals: ["pragmatic", "resilient"],
        productionQuality: 1,
      },
      options: [
        {
          id: "repeat-until-tight",
          title: "Repetir hasta que cierre",
          text: "Cada error vuelve al principio. La toma mejora, la paciencia baja y la banda empieza a mirar el reloj como si fuera otro productor.",
          effects: {
            talent: 2,
            health: -2,
          },
          personalitySignals: ["perfectionist", "discipline"],
          productionQuality: 5,
        },
        {
          id: "keep-first-energy",
          title: "Quedarse con la primera energía",
          text: "Prefieren una toma viva antes que una prolija y muerta. Hay pifies, pero también hay algo que no se puede fabricar después.",
          effects: {
            charisma: 2,
            reputation: -1,
          },
          personalitySignals: ["authentic", "impulsive"],
          productionQuality: 3,
        },
        {
          id: "experiment-with-arrangements",
          title: "Probar arreglos nuevos",
          text: "Cambian una intro, doblan una voz, meten una textura que nadie tenía en mente. El tema crece, aunque por momentos nadie sabe hacia dónde.",
          effects: {
            creativity: 3,
            health: -1,
          },
          personalitySignals: ["creativity", "fearless"],
          productionQuality: 4,
        },
        {
          id: "record-fast",
          title: "Grabar rápido y salir",
          text: "Tres temas, pocas vueltas, cero discusión eterna. La banda cuida energía y plata, pero algunas decisiones quedan tomadas por cansancio más que por criterio.",
          effects: {
            health: 2,
            talent: -1,
          },
          personalitySignals: ["pragmatic", "impulsive"],
          productionQuality: 1,
        },
      ],
    },
    {
      id: "song-selection",
      title: "Qué canciones entran",
      text: "Con las tomas sobre la mesa, falta una decisión que puede pudrir cualquier ensayo: qué parte de la banda van a mostrar primero.",
      options: [
        {
          id: "three-best-songs",
          title: "Elegir solo las tres mejores",
          text: "El demo queda corto, directo y sin relleno. También deja afuera canciones que algunos sienten propias, aunque todavía no estén del todo listas.",
          effects: {
            reputation: 2,
            creativity: -1,
          },
          personalitySignals: ["discipline", "pragmatic"],
          productionQuality: 5,
        },
        {
          id: "all-six-songs",
          title: "Meter las seis que tienen",
          text: "Quieren mostrar todo el repertorio. Hay variedad, hay ganas y también momentos que tal vez necesitaban más sala antes de quedar grabados.",
          effects: {
            creativity: 1,
            health: -1,
            reputation: -1,
          },
          personalitySignals: ["ambition", "loyalty"],
          productionQuality: 2,
        },
        {
          id: "include-weird-song",
          title: "Meter ese tema raro",
          text: "No es el más pegadizo ni el más fácil de explicar, pero tiene una identidad que la banda no encuentra en otro lado.",
          effects: {
            creativity: 2,
            fame: -1,
          },
          personalitySignals: ["creativity", "authentic"],
          productionQuality: 4,
        },
        {
          id: "drop-commercial-song",
          title: "Sacar el tema más comercial",
          text: "El que todos tararean queda afuera. La banda gana coherencia, pero también renuncia a la canción que podía entrar más rápido en cualquier oído.",
          effects: {
            reputation: 1,
            creativity: 1,
            charisma: -1,
          },
          personalitySignals: ["rebellion", "authentic"],
          productionQuality: 4,
        },
      ],
    },
  ],
  outcomes: [
    {
      id: "bad",
      minQuality: 0,
      eyebrow: "El demo ya existe",
      title: "Todavía suena más a ensayo que a banda",
      text: "Las canciones están ahí. Todavía no encontraron la forma de salir. Hay momentos buenos, pedazos que empujan, alguna idea que sobrevive al ruido. Pero el demo queda como una promesa mal enfocada: algo que la banda entiende mejor que cualquiera que lo escuche de afuera.",
      effects: {
        fame: 0,
        fans: 5,
        reputation: -1,
      },
      tone: "negative",
      cta: "Aceptar la toma",
    },
    {
      id: "acceptable",
      minQuality: 7,
      eyebrow: "El demo ya existe",
      title: "Alcanza para mostrar la banda",
      text: "No va a ganar discusiones de sonido, pero cumple. Las canciones se entienden, la energía aparece de a ratos y algunos errores tienen más personalidad que vergüenza. No es el demo que soñaban. Es el demo que pudieron hacer, y eso todavía vale.",
      effects: {
        fame: 1,
        fans: 20,
        reputation: 1,
      },
      tone: "neutral",
      cta: "Guardarlo cerca",
    },
    {
      id: "good",
      minQuality: 12,
      eyebrow: "El demo ya existe",
      title: "Hay algo que vuelve a sonar",
      text: "Cuando termina, alguien pide escucharlo de nuevo. No porque esté perfecto, sino porque por primera vez la banda aparece completa fuera del escenario. Las canciones tienen forma, los defectos no tapan la intención y el demo empieza a sentirse como una puerta.",
      effects: {
        fame: 3,
        fans: 50,
        reputation: 3,
      },
      tone: "positive",
      cta: "Pasarlo de mano",
    },
    {
      id: "excellent",
      minQuality: 14,
      eyebrow: "El demo ya existe",
      title: "El demo encuentra a la banda",
      text: "No suena caro. Suena enfocado. Cada decisión dejó una marca y, por una vez, esas marcas parecen empujar para el mismo lado. Cuando el archivo termina de exportarse, nadie grita. No hace falta. Todos entienden que ahora tienen algo que puede viajar más lejos que ellos.",
      effects: {
        fame: 6,
        fans: 100,
        reputation: 6,
      },
      tone: "positive",
      cta: "Hacerlo circular",
    },
  ],
} satisfies ProductionEventDefinition;

// Umbral de posibilidades de cada outcome según la calidad de producción:

// 🔴 Bad (3%) → Muy raro. Solo si el jugador toma casi todas las peores decisiones.
// 🟡 Acceptable (58%) → Es el resultado más común. Tiene sentido para el primer demo de una banda under.
// 🟢 Good (31%) → Bastante alcanzable si el jugador toma buenas decisiones.
// ⭐ Excellent (8%) → Se siente especial sin ser imposible.
