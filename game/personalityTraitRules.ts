import type { PersonalitySignal, PersonalityTrait } from "./types";

export type PersonalitySignalRequirement = {
  field: PersonalitySignal;
  operator: ">=" | "<=" | ">" | "<" | "=";
  value: number;
};

export type PersonalityTraitRule = {
  trait: PersonalityTrait;
  requires: readonly PersonalitySignalRequirement[];
};

export const personalityTraitRules = [
  {
    trait: "Rebelde",
    requires: [{ field: "rebellion", operator: ">=", value: 6 }],
  },
  {
    trait: "Perfeccionista",
    requires: [
      { field: "perfectionist", operator: ">=", value: 3 },
      { field: "discipline", operator: ">=", value: 4 },
    ],
  },
  {
    trait: "Humilde",
    requires: [
      { field: "humble", operator: ">=", value: 6 },
      { field: "egocentric", operator: "<=", value: 2 },
    ],
  },
  {
    trait: "Ambicioso",
    requires: [
      { field: "ambition", operator: ">=", value: 6 },
      { field: "humble", operator: "<=", value: 3 },
    ],
  },
  {
    trait: "Impulsivo",
    requires: [
      { field: "impulsive", operator: ">=", value: 4 },
      { field: "discipline", operator: "<=", value: 3 },
    ],
  },
  {
    trait: "Leal",
    requires: [{ field: "loyalty", operator: ">=", value: 6 }],
  },
  {
    trait: "Creativo",
    requires: [{ field: "creativity", operator: ">=", value: 6 }],
  },
  {
    trait: "Líder",
    requires: [
      { field: "leader", operator: ">=", value: 4 },
      { field: "loyalty", operator: ">=", value: 2 },
    ],
  },
  {
    trait: "Pragmático",
    requires: [
      { field: "pragmatic", operator: ">=", value: 5 },
      { field: "impulsive", operator: "<=", value: 2 },
    ],
  },
  {
    trait: "Egocéntrico",
    requires: [
      { field: "egocentric", operator: ">=", value: 3 },
      { field: "humble", operator: "<=", value: 2 },
    ],
  },
] satisfies readonly PersonalityTraitRule[];
