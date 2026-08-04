import type {
  GameState,
  PersonalitySignal,
  PersonalityTrait,
} from "./types";

type PersonalitySignalRequirement = {
  field: PersonalitySignal;
  operator: ">=" | "<=" | ">" | "<" | "=";
  value: number;
};

type PersonalityTraitRule = {
  trait: PersonalityTrait;
  requires: readonly PersonalitySignalRequirement[];
};

const personalityTraitRules: readonly PersonalityTraitRule[] = [
  {
    trait: "Rebelde",
    requires: [{ field: "rebellion", operator: ">=", value: 3 }],
  },
  {
    trait: "Perfeccionista",
    requires: [{ field: "discipline", operator: ">=", value: 4 }],
  },
  {
    trait: "Humilde",
    requires: [
      { field: "humble", operator: ">=", value: 3 },
      { field: "egocentric", operator: "<=", value: 1 },
    ],
  },
  {
    trait: "Ambicioso",
    requires: [
      { field: "ambition", operator: ">=", value: 3 },
      { field: "humble", operator: "<=", value: 1 },
    ],
  },
  {
    trait: "Impulsivo",
    requires: [
      { field: "fearless", operator: ">=", value: 2 },
      { field: "discipline", operator: "<=", value: 1 },
    ],
  },
  {
    trait: "Diplomático",
    requires: [
      { field: "authentic", operator: ">=", value: 2 },
      { field: "impulsive", operator: "<=", value: 1 },
    ],
  },
  {
    trait: "Temerario",
    requires: [{ field: "fearless", operator: ">=", value: 4 }],
  },
  {
    trait: "Leal",
    requires: [{ field: "loyalty", operator: ">=", value: 4 }],
  },
];

export function applyPersonalitySignals(
  gameState: GameState,
  signals: readonly PersonalitySignal[] = [],
): GameState {
  if (signals.length === 0) {
    return gameState;
  }

  const personalitySignals = { ...gameState.personalitySignals };

  for (const signal of signals) {
    personalitySignals[signal] = (personalitySignals[signal] ?? 0) + 1;
  }

  return {
    ...gameState,
    personalitySignals,
    personalityTraits: getUnlockedPersonalityTraits({
      ...gameState,
      personalitySignals,
    }),
  };
}

function getUnlockedPersonalityTraits(
  gameState: GameState,
): readonly PersonalityTrait[] {
  const traits = [...gameState.personalityTraits];

  for (const rule of personalityTraitRules) {
    if (traits.includes(rule.trait)) {
      continue;
    }

    if (matchesTraitRule(gameState, rule)) {
      traits.push(rule.trait);
    }
  }

  return traits;
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
