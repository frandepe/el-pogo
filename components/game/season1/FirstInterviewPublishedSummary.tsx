"use client";

import { personalitySignals } from "@/game/personalitySignals";
import type { GameState, PersonalitySignal } from "@/game/types";
import { InfoScene } from "../info/InfoScene";
import { firstInterviewPublishedConsequences } from "./firstInterviewPublishedConsequences";

type FirstInterviewPublishedSummaryProps = {
  gameState: GameState;
  onContinue: () => void;
};

const fallbackConsequence = {
  eyebrow: "La nota salió publicada",
  title: "La entrevista empezó a moverse",
  text: "No fue una tapa ni un fenómeno viral. Fue una publicación chica, compartida por gente que conoce bares, salas y bandas con más ganas que presupuesto. Pero el nombre empezó a aparecer en conversaciones donde antes no estaba. La banda leyó la nota en silencio, cada uno buscando una frase distinta.",
  tone: "neutral",
  cta: "Seguir adelante",
} as const;

export function FirstInterviewPublishedSummary({
  gameState,
  onContinue,
}: FirstInterviewPublishedSummaryProps) {
  const signal = getDominantInterviewSignal(gameState);
  const consequence =
    firstInterviewPublishedConsequences.find(
      (candidate) => candidate.signal === signal,
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

function getDominantInterviewSignal(
  gameState: GameState,
): PersonalitySignal | undefined {
  const interviewSignals = gameState.history
    .filter((entry) => entry.eventId === "first-interview")
    .flatMap((entry) => entry.personalitySignals ?? []);

  if (interviewSignals.length === 0) {
    return undefined;
  }

  return [...personalitySignals]
    .filter((signal) => interviewSignals.includes(signal))
    .sort((left, right) => {
      const leftValue = interviewSignals.filter((signal) => signal === left).length;
      const rightValue = interviewSignals.filter(
        (signal) => signal === right,
      ).length;

      if (rightValue !== leftValue) {
        return rightValue - leftValue;
      }

      return (
        interviewSignals.lastIndexOf(right) - interviewSignals.lastIndexOf(left)
      );
    })[0];
}
