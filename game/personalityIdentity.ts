import { personalitySignals } from "./personalitySignals";
import type { GameState, PersonalitySignal } from "./types";

type PersonalityIdentity = {
  copy: string;
  label: string;
  signal?: PersonalitySignal;
};

export function getPersonalityIdentity(
  gameState: GameState,
): PersonalityIdentity | undefined {
  const signal = getDominantSignal(gameState);

  if (!signal) {
    return undefined;
  }

  return {
    ...signalIdentityCopy[signal],
    signal,
  };
}

function getDominantSignal(gameState: GameState) {
  return [...personalitySignals]
    .filter((signal) => (gameState.personalitySignals[signal] ?? 0) > 0)
    .sort((left, right) => {
      const leftValue = gameState.personalitySignals[left] ?? 0;
      const rightValue = gameState.personalitySignals[right] ?? 0;

      if (rightValue !== leftValue) {
        return rightValue - leftValue;
      }

      return (
        personalitySignals.indexOf(left) - personalitySignals.indexOf(right)
      );
    })[0];
}

const signalIdentityCopy = {
  ambition: {
    label: "Ambicioso",
    copy: "No esperaste a que el mundo te hiciera lugar. Cada oportunidad la miraste como una puerta que había que empujar.",
  },
  authentic: {
    label: "Auténtico",
    copy: "Cuando convenía disfrazarse de otra cosa, elegiste sonar como ustedes. Aunque eso hiciera el camino más lento.",
  },
  charismatic: {
    label: "Carismático",
    copy: "Hubo noches torpes, salas vacías y preguntas incómodas. Igual, la gente empezó a quedarse mirando.",
  },
  creativity: {
    label: "Creativo",
    copy: "No buscaste repetir una fórmula. Cada decisión dejó una marca propia, incluso cuando nadie sabía si iba a funcionar.",
  },
  discipline: {
    label: "Disciplinado",
    copy: "Cuando el entusiasmo no alcanzaba, apareció la constancia. Volviste a la sala aunque nadie estuviera mirando.",
  },
  egocentric: {
    label: "Egocéntrico",
    copy: "No te dio miedo ocupar el centro. A veces eso encendió la banda; otras, obligó al resto a correrse.",
  },
  fearless: {
    label: "Intrépido",
    copy: "Elegiste el camino que podía salir mal. No porque fuera seguro, sino porque era el único que parecía vivo.",
  },
  humble: {
    label: "Humilde",
    copy: "No te interesa parecer más grande de lo que sos. Por eso cada paso chico todavía pesa.",
  },
  impulsive: {
    label: "Impulsivo",
    copy: "Cuando había que pensarlo dos veces, muchas veces ya estabas arriba del escenario. A veces el instinto también escribe canciones.",
  },
  leader: {
    label: "Líder",
    copy: "Cuando nadie sabía bien qué hacer, alguien tenía que mover la primera pieza. Más de una vez, fuiste vos.",
  },
  loyalty: {
    label: "Leal",
    copy: "Cuando las cosas se complicaron, elegiste cuidar a la banda antes que salvarte solo.",
  },
  perfectionist: {
    label: "Perfeccionista",
    copy: "No te alcanzó con que sonara bien. Volviste sobre cada detalle como si ahí se jugara algo más grande.",
  },
  pragmatic: {
    label: "Pragmático",
    copy: "No todas las decisiones fueron románticas. Algunas simplemente mantuvieron viva a la banda.",
  },
  rebellion: {
    label: "Rebelde",
    copy: "Cuando apareció una regla, tu primer impulso fue probar cuánto ruido hacía romperla.",
  },
  resilient: {
    label: "Resiliente",
    copy: "El primer golpe no te definió. Lo que empezó a definirte fue volver después del golpe.",
  },
} satisfies Record<PersonalitySignal, Pick<PersonalityIdentity, "copy" | "label">>;
