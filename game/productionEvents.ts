import type { Effect, InfoTone, PersonalitySignal } from "./types";

export type ProductionOption = {
  id: string;
  title: string;
  text: string;
  effects: Effect;
  personalitySignals?: readonly PersonalitySignal[];
  productionQuality: number;
};

export type ProductionQuestion = {
  id: string;
  title: string;
  text: string;
  emergencyOption?: ProductionOption;
  options: readonly [
    ProductionOption,
    ProductionOption,
    ProductionOption,
    ProductionOption,
  ];
};

export type ProductionOutcome = {
  id: string;
  minQuality: number;
  eyebrow: string;
  title: string;
  text: string;
  effects: Effect;
  tone: InfoTone;
  cta: string;
};

export type ProductionEventDefinition = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  startLabel: string;
  questions: readonly [
    ProductionQuestion,
    ProductionQuestion,
    ProductionQuestion,
  ];
  outcomes: readonly [
    ProductionOutcome,
    ProductionOutcome,
    ProductionOutcome,
    ProductionOutcome,
  ];
};

export function validateProductionEvent(
  production: ProductionEventDefinition,
): void {
  if (production.questions.length !== 3) {
    throw new Error(`Production event must have exactly 3 questions: ${production.id}`);
  }

  for (const question of production.questions) {
    if (question.options.length !== 4) {
      throw new Error(
        `Production question must have exactly 4 options: ${production.id}/${question.id}`,
      );
    }

    if ((question.emergencyOption?.effects.money ?? 0) < 0) {
      throw new Error(
        `Production emergency option cannot cost money: ${production.id}/${question.id}`,
      );
    }
  }

  const sortedOutcomes = [...production.outcomes].sort(
    (left, right) => left.minQuality - right.minQuality,
  );

  for (let index = 0; index < production.outcomes.length; index += 1) {
    if (production.outcomes[index] !== sortedOutcomes[index]) {
      throw new Error(`Production outcomes must be sorted by minQuality: ${production.id}`);
    }
  }
}

export function resolveProductionOutcome(
  production: ProductionEventDefinition,
  qualityTotal: number,
): ProductionOutcome {
  validateProductionEvent(production);

  const outcome = [...production.outcomes]
    .reverse()
    .find((candidate) => qualityTotal >= candidate.minQuality);

  if (!outcome) {
    throw new Error(`Production event has no matching outcome: ${production.id}`);
  }

  return outcome;
}
