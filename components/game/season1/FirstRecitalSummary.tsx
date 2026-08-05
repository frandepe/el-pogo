"use client";

import { getLatestNarrativeConsequence } from "@/game/narrativeConsequences";
import { formatNarrativeText } from "@/game/narrativeText";
import type { GameState } from "@/game/types";
import { InfoScene } from "../info/InfoScene";
import { firstRecitalConsequences } from "./firstRecitalConsequences";

type FirstRecitalSummaryProps = {
  gameState: GameState;
  onContinue: () => void;
};

const fallbackConsequence = {
  eyebrow: "Después del recital",
  title: "La noche queda resonando",
  text: "El bar empieza a vaciarse, pero algo de la banda queda flotando entre los cables, los vasos y los amplificadores calientes. Todavía es temprano para entender qué significó esta noche.",
  tone: "neutral",
  cta: "Bajar del escenario",
} as const;

export function FirstRecitalSummary({
  gameState,
  onContinue,
}: FirstRecitalSummaryProps) {
  const consequence =
    getLatestNarrativeConsequence(gameState, firstRecitalConsequences) ??
    fallbackConsequence;

  return (
    <InfoScene
      actionLabel={consequence.cta}
      eyebrow={consequence.eyebrow}
      title={consequence.title}
      tone={consequence.tone}
      onAction={onContinue}
    >
      <p>
        {formatNarrativeText(
          consequence.text,
          gameState,
          `first-recital-summary:${consequence.title}`,
        )}
      </p>
    </InfoScene>
  );
}
