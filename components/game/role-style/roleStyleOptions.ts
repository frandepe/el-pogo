import type { EventOption, GameEvent } from "@/game/types";
import type { RoleName } from "../data/roleOptions";

export type RoleStyleOption = EventOption & {
  badge: string;
  title: string;
};

export type RoleStyleEvent = Omit<GameEvent, "options"> & {
  description: string;
  options: readonly RoleStyleOption[];
};

export const roleStyleEvents = {
  Cantante: {
    id: "singer-style",
    stepType: "Upgrade",
    text: "¿Qué clase de cantante sos?",
    description:
      "No alcanza con cantar bien. Tarde o temprano la gente va a recordar algo de vos.",
    options: [
      {
        id: "frontman",
        title: "El Frontman",
        text: "Cuando subís al escenario, todas las miradas van hacia vos.",
        badge: "+3 Carisma",
        effects: {
          charisma: 3,
        },
        personalitySignals: ["ambition"],
      },
      {
        id: "voice",
        title: "La Voz",
        text: "No necesitás hacer un show. Tu voz habla por vos.",
        badge: "+3 Talento",
        effects: {
          talent: 3,
        },
        personalitySignals: ["discipline"],
      },
      {
        id: "poet",
        title: "El Poeta",
        text: "Algunos escriben canciones. Vos escribís cicatrices.",
        badge: "+3 Creatividad",
        effects: {
          creativity: 3,
        },
        personalitySignals: ["creativity"],
      },
    ],
  },
  Guitarrista: {
    id: "guitarist-style",
    stepType: "Upgrade",
    text: "¿Qué clase de guitarrista sos?",
    description:
      "Todos pueden tocar una guitarra. Muy pocos hacen que la gente los recuerde.",
    options: [
      {
        id: "virtuoso",
        title: "El Virtuoso",
        text: "Horas de ensayo. Técnica antes que cualquier otra cosa.",
        badge: "+3 Talento",
        effects: {
          talent: 3,
        },
        personalitySignals: ["discipline"],
      },
      {
        id: "creative",
        title: "El Creativo",
        text: "Nunca buscás el camino más corto. Buscás el sonido que nadie encontró.",
        badge: "+3 Creatividad",
        effects: {
          creativity: 3,
        },
        personalitySignals: ["creativity"],
      },
      {
        id: "stage-showman",
        title: "El Showman",
        text: "Si el solo no termina arriba de un monitor, sentís que faltó algo.",
        badge: "+3 Carisma",
        effects: {
          charisma: 3,
        },
        personalitySignals: ["ambition"],
      },
    ],
  },
  Bajista: {
    id: "bassist-style",
    stepType: "Upgrade",
    text: "¿Qué clase de bajista sos?",
    description: "Muchos no te miran. Todos te extrañan cuando no estás.",
    options: [
      {
        id: "pulse",
        title: "El Pulso",
        text: "Si el bajo se equivoca, toda la banda se cae.",
        badge: "+3 Talento",
        effects: {
          talent: 3,
        },
        personalitySignals: ["discipline"],
      },
      {
        id: "architect",
        title: "El Arquitecto",
        text: "Mientras otros buscan lucirse, vos hacés que todo funcione.",
        badge: "+3 Creatividad",
        effects: {
          creativity: 3,
        },
        personalitySignals: ["loyalty"],
      },
      {
        id: "wall",
        title: "El Muro",
        text: "No necesitás aplausos. Alcanzan cuatro notas bien puestas.",
        badge: "+3 Reputación",
        effects: {
          reputation: 3,
        },
        personalitySignals: ["humble"],
      },
    ],
  },
  Baterista: {
    id: "drummer-style",
    stepType: "Upgrade",
    text: "¿Qué clase de baterista sos?",
    description: "El ritmo puede sostener una banda... o hacerla explotar.",
    options: [
      {
        id: "metronome",
        title: "El Metrónomo",
        text: "El reloj aprende de vos.",
        badge: "+3 Talento",
        effects: {
          talent: 3,
        },
        personalitySignals: ["discipline"],
      },
      {
        id: "animal",
        title: "El Animal",
        text: "Cada show termina con un palo roto y alguien preguntando cómo seguís de pie.",
        badge: "+3 Carisma",
        effects: {
          charisma: 3,
        },
        personalitySignals: ["rebellion"],
      },
      {
        id: "inventor",
        title: "El Inventor",
        text: "No seguís el ritmo. Lo reinventás.",
        badge: "+3 Creatividad",
        effects: {
          creativity: 3,
        },
        personalitySignals: ["creativity"],
      },
    ],
  },
} satisfies Record<RoleName, RoleStyleEvent>;
