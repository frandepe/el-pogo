import type { GameState, InfoTone } from "./types";

export type NarrativeConsequence = {
  eventId: string;
  optionId: string;
  eyebrow: string;
  title: string;
  text: string;
  tone: InfoTone;
  cta: string;
};

export function getLatestNarrativeConsequence(
  gameState: GameState,
  consequences: readonly NarrativeConsequence[],
): NarrativeConsequence | undefined {
  for (let index = gameState.history.length - 1; index >= 0; index -= 1) {
    const historyEntry = gameState.history[index];
    const consequence = consequences.find(
      (candidate) =>
        candidate.eventId === historyEntry.eventId &&
        candidate.optionId === historyEntry.optionId,
    );

    if (consequence) {
      return consequence;
    }
  }

  return undefined;
}
