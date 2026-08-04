import type { GameEvent, GameState } from "./types";
import { validateConditions } from "./validateConditions";
import { weightedRandom } from "./weightedRandom";

export function selectNextEvent(
  gameState: GameState,
  events: readonly GameEvent[],
): GameEvent | undefined {
  const candidates = events.filter((event) =>
    validateConditions(gameState, event.conditions),
  );

  return weightedRandom(candidates);
}
