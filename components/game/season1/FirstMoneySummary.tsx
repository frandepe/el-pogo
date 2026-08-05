"use client";

import { getLatestNarrativeConsequence } from "@/game/narrativeConsequences";
import { formatNarrativeText } from "@/game/narrativeText";
import type { GameState } from "@/game/types";
import { InfoScene } from "../info/InfoScene";
import { firstMoneyConsequences } from "./firstMoneyConsequences";

type FirstMoneySummaryProps = {
  gameState: GameState;
  onContinue: () => void;
};

const fallbackConsequence = {
  eyebrow: "Después del primer cachet",
  title: "La plata dejó una marca",
  text: "No fue mucha plata, pero alcanzó para que la noche no quedara solamente en aplausos, cables enrollados y olor a bar cerrado. Algo de esa decisión siguió dando vueltas en la banda.",
  tone: "neutral",
  cta: "Seguir la carrera",
} as const;

export function FirstMoneySummary({
  gameState,
  onContinue,
}: FirstMoneySummaryProps) {
  const consequence =
    getLatestNarrativeConsequence(gameState, firstMoneyConsequences) ??
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
          `first-money-summary:${consequence.title}`,
        )}
      </p>
    </InfoScene>
  );
}
