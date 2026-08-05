import type { GameState, InfoTone } from "@/game/types";

type DemoOutcomeId = "bad" | "acceptable" | "good" | "excellent";

export type FirstDemoRepercussion = {
  eyebrow: string;
  title: string;
  text: string;
  tone: InfoTone;
  cta: string;
};

const defaultOutcome: DemoOutcomeId = "acceptable";

const firstDemoRepercussions = {
  bad: {
    eyebrow: "Primeras repercusiones",
    title: "El demo existe, pero casi no circula",
    text: "Mandaron el demo a varios lugares. La mayoría nunca respondió. Un bar del centro les ofreció tocar un martes por la noche. No era el salto que imaginaban, pero después de tantos ensayos, cualquier escenario seguía siendo un escenario.",
    tone: "negative",
    cta: "Aceptar la realidad",
  },
  acceptable: {
    eyebrow: "Primeras repercusiones",
    title: "El demo empieza a moverse dentro del under",
    text: "El demo empezó a pasar de mano en mano. Otra banda les escribió para compartir una fecha y un festival barrial los sumó al cierre de una de sus jornadas. Por primera vez, algunas invitaciones llegaron sin que ustedes las fueran a buscar.",
    tone: "neutral",
    cta: "Seguir el movimiento",
  },
  good: {
    eyebrow: "Primeras repercusiones",
    title: "Una puerta empezó a abrirse",
    text: "El demo llegó más lejos de lo que esperaban. Un productor independiente pidió una copia y les propuso juntarse a charlar después de verlos en vivo. No prometió nada. Pero por primera vez alguien que trabajaba con bandas estaba prestando atención.",
    tone: "positive",
    cta: "Mirar esa puerta",
  },
  excellent: {
    eyebrow: "Primeras repercusiones",
    title: "Las cosas se aceleraron",
    text: "En menos de una semana el demo ya estaba circulando fuera del circuito donde solían tocar. Empezaron a llegar mensajes, propuestas y fechas para abrir recitales de bandas más conocidas. De golpe apareció un problema nuevo: ya no podían aceptar todo lo que les ofrecían.",
    tone: "positive",
    cta: "Ordenar el ruido",
  },
} satisfies Record<DemoOutcomeId, FirstDemoRepercussion>;

export function getFirstDemoRepercussion(
  gameState: GameState,
): FirstDemoRepercussion {
  return firstDemoRepercussions[getLatestFirstDemoOutcome(gameState)];
}

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

  return defaultOutcome;
}
