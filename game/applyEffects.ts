import type { Effect, GameState, NumericGameStateKey } from "./types";

export function applyEffects(
  gameState: GameState,
  effects: Effect,
): GameState {
  const nextState: GameState = { ...gameState };

  for (const [field, amount] of Object.entries(effects) as Array<
    [NumericGameStateKey, number]
  >) {
    nextState[field] = gameState[field] + amount;
  }

  return nextState;
}
