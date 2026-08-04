"use client";

import { getLatestNarrativeConsequence } from "@/game/narrativeConsequences";
import type { GameState } from "@/game/types";
import { InfoScene } from "../info/InfoScene";
import { firstReviewConsequences } from "./firstReviewConsequences";

type FirstReviewSummaryProps = {
  gameState: GameState;
  onContinue: () => void;
};

const fallbackConsequence = {
  eyebrow: "Después de la reseña",
  title: "La primera crítica quedó dando vueltas",
  text: "No fue una nota importante ni una sentencia definitiva. Fue apenas una publicación perdida en Instagram. Igual alcanzó para que la banda entendiera algo nuevo: desde ahora, cada recital también podía volver convertido en opinión ajena.",
  tone: "neutral",
  cta: "Seguir adelante",
} as const;

export function FirstReviewSummary({
  gameState,
  onContinue,
}: FirstReviewSummaryProps) {
  const consequence =
    getLatestNarrativeConsequence(gameState, firstReviewConsequences) ??
    fallbackConsequence;

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
