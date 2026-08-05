import type { EventOption, GameEvent } from "@/game/types";

export type SeasonDecisionOption = EventOption & {
  badge: string;
  title: string;
};

export type SeasonDecisionEvent = Omit<GameEvent, "options"> & {
  description: string;
  emergencyOption?: SeasonDecisionOption;
  options: readonly SeasonDecisionOption[];
};

export const firstSeriousRehearsalEvent = {
  id: "first-serious-rehearsal",
  stepType: "Choice",
  text: "Primer ensayo serio",
  description:
    "Después de varias semanas tocando juntos, alguien tira la propuesta: ensayar todos los días durante un mes. Se hace un silencio. Nadie parece estar del todo convencido.",
  options: [
    {
      id: "rehearse-every-day",
      title: "Hay que ensayar todos los días.",
      text: "Si quieren sonar como una banda de verdad, hay que tratarlo como algo serio.",
      badge: "+3 Talento",
      effects: {
        talent: 3,
      },
      personalitySignals: ["discipline"],
    },
    {
      id: "three-times-a-week",
      title: "Tres veces por semana alcanza.",
      text: "Mejor sostener un ritmo posible que quemarse antes del primer recital.",
      badge: "+3 Salud",
      effects: {
        health: 3,
      },
      personalitySignals: ["pragmatic"],
    },
    {
      id: "songs-need-time",
      title: "Prefiero que las canciones salgan cuando tengan que salir.",
      text: "La presión puede ordenar una banda, pero también puede matar una canción antes de que nazca.",
      badge: "+3 Creatividad",
      effects: {
        creativity: 3,
      },
      personalitySignals: ["creativity"],
    },
  ],
} satisfies SeasonDecisionEvent;
