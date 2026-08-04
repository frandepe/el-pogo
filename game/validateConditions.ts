import type { Condition, GameState } from "./types";

export function validateConditions(
  gameState: GameState,
  conditions: readonly Condition[] = [],
): boolean {
  return conditions.every((condition) => {
    if (condition.type === "trait") {
      const hasTrait = gameState.personalityTraits.includes(condition.trait);

      return condition.operator === "has" ? hasTrait : !hasTrait;
    }

    const currentValue = gameState[condition.field];

    switch (condition.operator) {
      case ">=":
        return currentValue >= condition.value;
      case "<=":
        return currentValue <= condition.value;
      case ">":
        return currentValue > condition.value;
      case "<":
        return currentValue < condition.value;
      case "=":
        return currentValue === condition.value;
    }
  });
}
