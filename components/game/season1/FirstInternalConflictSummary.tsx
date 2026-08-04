"use client";

import { getLatestNarrativeConsequence } from "@/game/narrativeConsequences";
import type { GameState } from "@/game/types";
import { InfoScene } from "../info/InfoScene";
import { firstInternalConflictConsequences } from "./firstInternalConflictConsequences";

type FirstInternalConflictSummaryProps = {
  gameState: GameState;
  onContinue: () => void;
};

const fallbackConsequence = {
  eyebrow: "Después del primer conflicto",
  title: "Las cosas ya no son iguales",
  text: "No fue una separación ni una gran tragedia. Fue algo más chico y más difícil de explicar: una forma nueva de mirarse dentro de la sala. La banda siguió, pero ya no era exactamente la misma.",
  tone: "neutral",
  cta: "Seguir adelante",
} as const;

export function FirstInternalConflictSummary({
  gameState,
  onContinue,
}: FirstInternalConflictSummaryProps) {
  const consequence =
    getLatestNarrativeConsequence(
      gameState,
      firstInternalConflictConsequences,
    ) ?? fallbackConsequence;

  return (
    <InfoScene
      actionLabel={consequence.cta}
      eyebrow={consequence.eyebrow}
      title={consequence.title}
      tone={consequence.tone}
      onAction={onContinue}
    >
      <p>{consequence.text}</p>
    </InfoScene>
  );
}
