import type {
  NarrativeOpportunityDefinition,
  NarrativeOpportunityOption,
  NarrativeOpportunityScoreFactor,
  NarrativeOpportunityScoreRule,
} from "@/game/narrativeOpportunity";
import type { GameState, PersonalitySignal } from "@/game/types";

type DemoOutcomeId = "bad" | "acceptable" | "good" | "excellent";

const defaultDemoOutcome: DemoOutcomeId = "acceptable";

const firstCallOptions = [
  {
    id: "accept",
    title: "Aceptar",
    text: "Sí. Tocamos.",
    intent: "aceptar",
    personalitySignals: ["discipline", "humble"],
    score: score({
      difficulty: "easy",
      favors: [stat("reputation"), stat("charisma"), signal("discipline")],
    }),
    outcomes: [
      {
        id: "poor",
        minScore: 0,
        eyebrow: "La llamada encontró respuesta",
        title: "Ni el sonido quiso ayudar",
        text: "A mitad del segundo tema el amplificador dijo basta y nadie encontró otro. Terminaron compartiendo uno prestado mientras un borracho seguía pidiendo 'la que hace pum pum' como si conociera el repertorio. El recital salió desprolijo, pero nadie se fue antes de que terminaran.",
        tone: "neutral",
        cta: "Seguir",
        effects: { concerts: 1, fans: 30 },
      },
      {
        id: "normal",
        minScore: 2,
        eyebrow: "La llamada encontró respuesta",
        title: "Una noche de esas que suman",
        text: "El lugar estaba medio vacío, el sonidista desapareció antes del último tema y cobraron menos de lo prometido. Igual, cuando guardaban los equipos, un pibe se acercó a preguntar dónde podía volver a verlos. La noche ya había valido la pena.",
        tone: "positive",
        cta: "Seguir",
        effects: { concerts: 1, fans: 90, money: 180 },
      },
      {
        id: "great",
        minScore: 4,
        eyebrow: "La llamada encontró respuesta",
        title: "La fecha empezó a hacer ruido",
        text: "La banda principal llegó tarde y el público empezó a pedir que ustedes siguieran tocando. No tenían más temas. Repitieron uno cambiándole el final y nadie pareció darse cuenta. Cuando bajaron del escenario ya había gente preguntando cuándo volvían.",
        tone: "positive",
        cta: "Seguir",
        effects: { concerts: 1, fans: 150, fame: 1, money: 240 },
      },
    ],
  },
  {
    id: "negotiate",
    title: "Negociar",
    text: "Antes de decir que sí, querés hablar de plata, horario y condiciones.",
    intent: "negociar",
    personalitySignals: ["pragmatic", "ambition"],
    score: score({
      difficulty: "normal",
      favors: [stat("reputation"), stat("charisma"), signal("ambition")],
      hurts: [stat("fame")],
    }),
    outcomes: [
      {
        id: "poor",
        minScore: 0,
        eyebrow: "La llamada encontró respuesta",
        title: "Se les fue la mano",
        text: "Pidieron más plata, mejor horario y un camarín que en realidad era un depósito con escobas. Del otro lado hubo un silencio corto y un 'dejá, ya conseguí otra banda'. Cortaron el teléfono sin tocar una sola nota.",
        tone: "negative",
        cta: "Seguir",
        effects: { reputation: -1, health: -1 },
      },
      {
        id: "normal",
        minScore: 2,
        eyebrow: "La llamada encontró respuesta",
        title: "Rascaron un poco más",
        text: "La negociación duró más que el recital. Consiguieron algunos pesos extra y un horario menos ingrato. El dueño del bar resopló antes de cortar, pero cuando llegaron esa noche les tenía una mesa reservada al lado del escenario. No era lujo. Era respeto.",
        tone: "positive",
        cta: "Seguir",
        effects: { concerts: 1, money: 320, reputation: 1 },
      },
      {
        id: "great",
        minScore: 4,
        eyebrow: "La llamada encontró respuesta",
        title: "Supieron cuánto valían",
        text: "No discutieron por discutir. Explicaron por qué la banda valía más de lo que ofrecían. Del otro lado aceptaron sin dar demasiadas vueltas. Cuando llegaron al recital descubrieron que hasta el nombre del grupo estaba escrito correctamente en el afiche. Era una pavada, pero por primera vez sintieron que alguien los estaba esperando.",
        tone: "positive",
        cta: "Seguir",
        effects: { money: 480, reputation: 2 },
      },
    ],
  },
  {
    id: "reject",
    title: "Rechazar",
    text: "No todo escenario sirve. Esta vez preferís decir que no.",
    intent: "rechazar",
    personalitySignals: ["authentic", "discipline"],
    score: score({
      difficulty: "hard",
      favors: [stat("reputation"), signal("authentic"), signal("discipline")],
    }),
    outcomes: [
      {
        id: "poor",
        minScore: 0,
        eyebrow: "La llamada encontró respuesta",
        title: "La oportunidad pasó de largo",
        text: "Del otro lado no insistieron. A la semana siguiente vieron una foto del recital: otra banda ocupaba ese escenario. El baterista hizo un chiste diciendo que al menos no tuvieron que cargar los equipos. Nadie se rió demasiado.",
        tone: "negative",
        cta: "Seguir",
        effects: { reputation: -1 },
      },
      {
        id: "normal",
        minScore: 2,
        eyebrow: "La llamada encontró respuesta",
        title: "No todo vale la pena",
        text: "La banda decidió seguir esperando una fecha que los representara un poco más. Esa noche igual hubo ensayo. La mamá del guitarrista apareció con una fuente de empanadas y el bajista se comió nueve.",
        tone: "neutral",
        cta: "Seguir",
        effects: { health: 1, reputation: 1 },
      },
      {
        id: "great",
        minScore: 4,
        eyebrow: "La llamada encontró respuesta",
        title: "A veces decir que no también abre puertas",
        text: "El rechazo llegó con respeto. Días después volvió a sonar el teléfono. 'Me dijeron que ustedes no aceptan cualquier cosa', dijo una voz antes de hacer una propuesta bastante mejor. Por primera vez, elegir también empezó a tener valor.",
        tone: "positive",
        cta: "Seguir",
        effects: { reputation: 3 },
      },
    ],
  },
  {
    id: "accept-with-conditions",
    title: "Aceptar con condiciones",
    text: "Aceptan, pero no de cualquier manera.",
    intent: "aceptar con condiciones",
    personalitySignals: ["leader", "pragmatic"],
    score: score({
      difficulty: "normal",
      favors: [stat("reputation"), signal("leader"), signal("pragmatic")],
    }),
    outcomes: [
      {
        id: "poor",
        minScore: 0,
        eyebrow: "La llamada encontró respuesta",
        title: "Las condiciones quedaron en el aire",
        text: "Habían pedido probar sonido con tiempo, un enchufe que funcionara y agua ligeramente gasificada para la banda. Cuando llegaron, el escenario seguía ocupado por un mago haciendo globos para un cumpleaños. Arrancaron cuarenta minutos tarde y nadie parecía recordar lo que habían hablado por teléfono.",
        tone: "neutral",
        cta: "Seguir",
        effects: { concerts: 1, fans: 35 },
      },
      {
        id: "normal",
        minScore: 2,
        eyebrow: "La llamada encontró respuesta",
        title: "Esta vez los escucharon",
        text: "No consiguieron todo, pero sí lo importante. El sonidista los recibió por el nombre, les dejaron probar antes de abrir las puertas y, por primera vez, nadie les pidió bajar el volumen antes del primer tema.",
        tone: "positive",
        cta: "Seguir",
        effects: { concerts: 1, fans: 80, reputation: 1 },
      },
      {
        id: "great",
        minScore: 4,
        eyebrow: "La llamada encontró respuesta",
        title: "Empezaron a tratarlos distinto",
        text: "Cuando llegaron había un cartel escrito a mano pegado en la puerta del camarín: 'Reservado para la banda'. El camarín seguía siendo un cuartito con dos sillas de plástico y olor a humedad, pero alguien se había tomado el trabajo de escribir ese cartel. Nadie dijo nada. Todos sonrieron igual.",
        tone: "positive",
        cta: "Seguir",
        effects: { fans: 120, fame: 1, reputation: 2 },
      },
    ],
  },
  {
    id: "ask-for-time",
    title: "Pedir tiempo",
    text: "No decidís solo. Primero querés hablarlo con la banda.",
    intent: "pedir tiempo",
    personalitySignals: ["loyalty", "humble"],
    score: score({
      difficulty: "normal",
      favors: [signal("loyalty"), stat("reputation"), stat("health")],
    }),
    outcomes: [
      {
        id: "poor",
        minScore: 0,
        eyebrow: "La llamada encontró respuesta",
        title: "Llegaron tarde a la decisión",
        text: "Entre mensajes, audios de cinco minutos y un integrante que nunca contestaba el grupo, la oportunidad se fue apagando. Cuando finalmente devolvieron la llamada, ya había otra banda cargando los equipos.",
        tone: "neutral",
        cta: "Seguir",
        effects: { health: 1 },
      },
      {
        id: "normal",
        minScore: 2,
        eyebrow: "La llamada encontró respuesta",
        title: "La decisión fue de todos",
        text: "Se juntaron a hablarlo en la sala. La conversación duró más que el ensayo y terminaron votando levantando la mano como si fueran el congreso nacional. Nadie quedó del todo conforme, pero todos sintieron que la decisión también les pertenecía.",
        tone: "positive",
        cta: "Seguir",
        effects: { concerts: 1, fans: 60, health: 1 },
      },
      {
        id: "great",
        minScore: 4,
        eyebrow: "La llamada encontró respuesta",
        title: "Eso también une una banda",
        text: 'La discusión duró tanto que el dueño del bar volvió a llamar tres veces. A la cuarta, el batero atendió haciéndose pasar por el manager porque le daba vergüenza decir que seguían decidiendo. El "manager" confirmó la fecha.',
        tone: "positive",
        cta: "Seguir",
        effects: { fans: 100, reputation: 2 },
      },
    ],
  },
  {
    id: "propose-alternative",
    title: "Proponer otra cosa",
    text: "En vez de aceptar el molde, proponés una jugada distinta.",
    intent: "proponer alternativa",
    personalitySignals: ["creativity", "fearless"],
    score: score({
      difficulty: "hard",
      favors: [stat("creativity"), stat("charisma"), signal("creativity")],
    }),
    outcomes: [
      {
        id: "poor",
        minScore: 0,
        eyebrow: "La llamada encontró respuesta",
        title: "La idea no encontró lugar",
        text: "La propuesta suena interesante, pero del otro lado están apagando incendios y no tienen paciencia para inventos.",
        tone: "neutral",
        cta: "Seguir",
        effects: { creativity: 1 },
      },
      {
        id: "normal",
        minScore: 2,
        eyebrow: "La llamada encontró respuesta",
        title: "La alternativa dejó una puerta",
        text: "No cambia todo, pero deja una conversación abierta. A veces proponer también es sembrar.",
        tone: "positive",
        cta: "Seguir",
        effects: { fans: 50, reputation: 1 },
      },
      {
        id: "great",
        minScore: 4,
        eyebrow: "La llamada encontró respuesta",
        title: "La jugada salió mejor que la oferta",
        text: "La alternativa entusiasma. Lo que empezó como una llamada ajena termina pareciéndose más a una oportunidad propia.",
        tone: "positive",
        cta: "Seguir",
        effects: { fans: 110, fame: 1, creativity: 1 },
      },
    ],
  },
] satisfies readonly [
  NarrativeOpportunityOption,
  NarrativeOpportunityOption,
  NarrativeOpportunityOption,
  NarrativeOpportunityOption,
  NarrativeOpportunityOption,
  NarrativeOpportunityOption,
];

export const chapter2FirstCallOpportunity = {
  id: "chapter-2-first-call",
  selectVariantId: getLatestFirstDemoOutcome,
  variants: [
    {
      id: "bad",
      eyebrow: "La llamada pendiente",
      title: "Finalmente atendés",
      text: "Atendés y escuchás vasos, una cafetera cansada y una voz que no sabe pronunciar el nombre de la banda. Hay un bar que necesita música para un martes flojo. Paga con pizza, birra y la gorra.",
      options: firstCallOptions,
    },
    {
      id: "acceptable",
      eyebrow: "La llamada pendiente",
      title: "Finalmente atendés",
      text: "Del otro lado hay un organizador hablando rápido. Se bajó una banda del festival barrial del sábado y alguien le pasó el demo. No hay lujo, pero hay escenario, luces prestadas y gente que no fue solamente por ustedes.",
      options: firstCallOptions,
    },
    {
      id: "good",
      eyebrow: "La llamada pendiente",
      title: "Finalmente atendés",
      text: "La voz del teléfono no promete nada. Dice que escuchó el demo dos veces y quiere verlos en vivo antes de hablar de cualquier cosa. Suena a oportunidad; también a examen.",
      options: firstCallOptions,
    },
    {
      id: "excellent",
      eyebrow: "La llamada pendiente",
      title: "Finalmente atendés",
      text: "El manager de una banda conocida necesita un telonero para esta semana. Alguien le mandó el demo y el nombre quedó dando vueltas. La propuesta llega antes de que ustedes terminen de entender lo que significa.",
      options: firstCallOptions,
    },
  ],
} satisfies NarrativeOpportunityDefinition;

function getLatestFirstDemoOutcome(gameState: GameState): DemoOutcomeId {
  for (let index = gameState.history.length - 1; index >= 0; index -= 1) {
    const entry = gameState.history[index];

    if (entry.eventId !== "first-demo-production") {
      continue;
    }

    if (entry.optionId === "outcome:bad") {
      return "bad";
    }

    if (entry.optionId === "outcome:acceptable") {
      return "acceptable";
    }

    if (entry.optionId === "outcome:good") {
      return "good";
    }

    if (entry.optionId === "outcome:excellent") {
      return "excellent";
    }
  }

  return defaultDemoOutcome;
}

function score(scoreRule: NarrativeOpportunityScoreRule) {
  return scoreRule;
}

function stat(
  field: Extract<NarrativeOpportunityScoreFactor, { type: "stat" }>["field"],
): NarrativeOpportunityScoreFactor {
  return {
    field,
    type: "stat",
  };
}

function signal(
  signalName: PersonalitySignal,
): NarrativeOpportunityScoreFactor {
  return {
    signal: signalName,
    type: "personalitySignal",
  };
}

// - Aceptar
//       - poor: concerts +1, fans +30
//       - normal: concerts +1, fans +90, money +180
//       - great: concerts +1, fans +150, fame +1

//   - Negociar
//       - poor: reputation -1, money +80
//       - normal: concerts +1, money +320, reputation +1
//       - great: money +480, reputation +2

//   - Rechazar
//       - poor: reputation -1
//       - normal: health +1, reputation +1
//       - great: reputation +2
