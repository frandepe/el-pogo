import { personalitySignals as personalitySignalOrder } from "./personalitySignals";
import {
  personalityTraitRules,
  type PersonalityTraitRule,
} from "./personalityTraitRules";
import type {
  GameState,
  PersonalitySignal,
  PersonalityTrait,
} from "./types";

type ApplyPersonalitySignalsOptions = {
  unlockTraits?: boolean;
};

export function applyPersonalitySignals(
  gameState: GameState,
  signals: readonly PersonalitySignal[] = [],
  options: ApplyPersonalitySignalsOptions = {},
): GameState {
  if (signals.length === 0) {
    return gameState;
  }

  const personalitySignals = { ...gameState.personalitySignals };

  for (const signal of signals) {
    personalitySignals[signal] = (personalitySignals[signal] ?? 0) + 1;
  }

  const nextState = {
    ...gameState,
    personalitySignals,
  };

  return options.unlockTraits ? recalculatePersonalityTraits(nextState) : nextState;
}

export function recalculatePersonalityTraits(gameState: GameState): GameState {
  return {
    ...gameState,
    personalityTraits: getUnlockedPersonalityTraits(gameState),
  };
}

export function getUnlockedPersonalityTraits(
  gameState: GameState,
): readonly PersonalityTrait[] {
  const traits: PersonalityTrait[] = [];

  for (const rule of personalityTraitRules) {
    if (matchesTraitRule(gameState, rule)) {
      traits.push(rule.trait);
    }
  }

  return traits;
}

export function getDominantPersonalitySignals(
  gameState: GameState,
  limit = personalitySignalOrder.length,
): readonly PersonalitySignal[] {
  return personalitySignalOrder
    .filter((signal) => (gameState.personalitySignals[signal] ?? 0) > 0)
    .sort((left, right) => {
      const leftValue = gameState.personalitySignals[left] ?? 0;
      const rightValue = gameState.personalitySignals[right] ?? 0;

      if (rightValue !== leftValue) {
        return rightValue - leftValue;
      }

      return (
        personalitySignalOrder.indexOf(left) -
        personalitySignalOrder.indexOf(right)
      );
    })
    .slice(0, limit);
}

function matchesTraitRule(
  gameState: GameState,
  rule: PersonalityTraitRule,
): boolean {
  return rule.requires.every((requirement) => {
    const currentValue = gameState.personalitySignals[requirement.field] ?? 0;

    switch (requirement.operator) {
      case ">=":
        return currentValue >= requirement.value;
      case "<=":
        return currentValue <= requirement.value;
      case ">":
        return currentValue > requirement.value;
      case "<":
        return currentValue < requirement.value;
      case "=":
        return currentValue === requirement.value;
    }
  });
}
