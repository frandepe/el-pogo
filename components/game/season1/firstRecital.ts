import type { SeasonDecisionEvent } from "./firstSeriousRehearsal";

export const firstRecitalEvent = {
  id: "first-recital",
  stepType: "Choice",
  text: "Primer recital",
  description:
    "Después de meses de ensayo llega el día. Hay unas cuarenta personas esperando. Algunos son amigos, otros familiares y unos pocos simplemente estaban en el bar. Las luces se apagan. Alguien cuenta cuatro...",
  options: [
    {
      id: "open-with-everything",
      title: "Abrir con todo",
      text: "Arranquemos con el tema más fuerte. Si la gente vino a escuchar una banda, más vale que se acuerde del primer minuto.",
      badge: "+3 Carisma",
      effects: {
        charisma: 3,
      },
      personalitySignals: ["ambition"],
    },
    {
      id: "build-the-show",
      title: "Ir de menor a mayor",
      text: "Primero ganémonos al público. No hace falta explotar de entrada. Mejor hacer que el show crezca canción tras canción.",
      badge: "+3 Reputación",
      effects: {
        reputation: 3,
      },
      personalitySignals: ["discipline", "pragmatic"],
    },
    {
      id: "improvise",
      title: "Improvisar",
      text: "Subamos y veamos qué pasa. Las mejores noches nunca estuvieron demasiado planificadas.",
      badge: "+3 Creatividad",
      effects: {
        creativity: 3,
      },
      personalitySignals: ["creativity", "fearless"],
    },
    {
      id: "introduce-the-band",
      title: "Presentar a la banda",
      text: "Antes de tocar, quiero presentar a todos. Si algún día llenamos estadios, quiero que recuerden quién estuvo desde el principio.",
      badge: "+3 Reputación",
      effects: {
        reputation: 3,
      },
      personalitySignals: ["loyalty", "humble"],
    },
    {
      id: "play-known-cover",
      title: "Hacer un cover conocido",
      text: "Primero un tema que todos conozcan. Si logramos que canten con nosotros, después nos van a escuchar de verdad.",
      badge: "+3 Fama",
      effects: {
        fame: 3,
      },
      personalitySignals: ["pragmatic"],
    },
    {
      id: "say-nothing",
      title: "No decir una sola palabra",
      text: "Que hablen las canciones. Si tenemos algo para decir, mejor hacerlo con los instrumentos que con un discurso.",
      badge: "+3 Talento",
      effects: {
        talent: 3,
      },
      personalitySignals: ["humble", "discipline"],
    },
    {
      id: "look-at-bandmates",
      title: "Mirar a los compañeros antes de empezar",
      text: "Pase lo que pase... lo disfrutemos. Capaz somos un desastre. Pero este momento no vuelve nunca más.",
      badge: "+3 Salud",
      effects: {
        health: 3,
      },
      personalitySignals: ["loyalty"],
    },
    {
      id: "bring-crowd-forward",
      title: "Invitar al público a acercarse",
      text: "¡Vengan para adelante! Si vamos a tocar para cuarenta personas, hagamos que parezcan cuatrocientas.",
      badge: "+3 Carisma",
      effects: {
        charisma: 3,
      },
      personalitySignals: ["ambition"],
    },
    {
      id: "tune-once-more",
      title: "Afinar una vez más",
      text: "Esperen un segundo... Prefiero hacerlos esperar treinta segundos antes que pasarme todo el recital desafinando.",
      badge: "+3 Talento",
      effects: {
        talent: 3,
      },
      personalitySignals: ["perfectionist", "discipline"],
    },
    {
      id: "dedicate-first-song",
      title: "Dedicar el primer tema",
      text: "Este va para los que siempre nos bancaron. Capaz hoy somos cuatro arriba del escenario gracias a veinte personas abajo.",
      badge: "+3 Reputación",
      effects: {
        reputation: 3,
      },
      personalitySignals: ["humble", "loyalty"],
    },
  ],
} satisfies SeasonDecisionEvent;
