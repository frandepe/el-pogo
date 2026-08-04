import type { GameEvent } from "../types";

export const initialEvents = [
  {
    id: "free-afternoon",
    stepType: "Choice",
    text: "Tenés toda la tarde libre antes del próximo ensayo. La banda no contesta mensajes y tu guitarra te mira desde el rincón.",
    weight: 1,
    options: [
      {
        id: "practice-alone",
        text: "Te encerrás a practicar hasta que salga algo decente.",
        effects: {
          talent: 4,
          creativity: 1,
          health: -1,
        },
        personalitySignals: ["discipline"],
      },
      {
        id: "write-song",
        text: "Agarrás una libreta y bajás esa idea que venís pateando hace semanas.",
        effects: {
          creativity: 4,
          reputation: 1,
        },
        personalitySignals: ["discipline", "authentic"],
      },
      {
        id: "go-to-recital",
        text: "Te vas a un recital chico a ver si la ciudad todavía tiene pulso.",
        effects: {
          charisma: 2,
          reputation: 2,
          money: -80,
        },
        personalitySignals: ["fearless", "humble"],
      },
    ],
  },
  {
    id: "cerati-comparison",
    stepType: "Choice",
    text: "En una entrevista de radio, un periodista te compara con Cerati. La pregunta queda flotando y todos esperan que no digas una pavada.",
    conditions: [
      {
        field: "fame",
        operator: ">=",
        value: 10,
      },
    ],
    weight: 1,
    options: [
      {
        id: "respect-cerati",
        text: "Decís que Cerati fue único y que vos estás buscando tu propio camino.",
        effects: {
          reputation: 3,
          charisma: 1,
        },
        personalitySignals: ["humble", "authentic"],
      },
      {
        id: "accept-comparison",
        text: "Agradecés la comparación y prometés estar a la altura.",
        effects: {
          fame: 2,
          charisma: 2,
          reputation: -1,
        },
        personalitySignals: ["ambition", "egocentric"],
      },
      {
        id: "avoid-topic",
        text: "Te reís, esquivás la pregunta y hablás del próximo recital.",
        effects: {
          charisma: 1,
          fame: 1,
        },
        personalitySignals: ["authentic", "humble"],
      },
    ],
  },
  {
    id: "suspended-rehearsal",
    stepType: "Choice",
    text: "Tu banda quiere suspender un ensayo porque el bajista apareció con una excusa muy elaborada y cero convincente.",
    weight: 1,
    options: [
      {
        id: "push-rehearsal",
        text: "Insistís en ensayar igual, aunque sean tres y un ampli prestado.",
        effects: {
          talent: 2,
          reputation: 2,
          charisma: -1,
        },
        personalitySignals: ["discipline", "impulsive"],
      },
      {
        id: "reschedule",
        text: "Reprogramás sin hacer quilombo, pero dejás claro que no puede pasar siempre.",
        effects: {
          charisma: 2,
          reputation: 1,
        },
        personalitySignals: ["loyalty", "discipline"],
      },
      {
        id: "solo-demo",
        text: "Usás la noche para grabar un demo casero y mandarlo al grupo.",
        effects: {
          creativity: 3,
          talent: 1,
          health: -1,
        },
        personalitySignals: ["discipline", "loyalty"],
      },
    ],
  },
] satisfies readonly GameEvent[];
