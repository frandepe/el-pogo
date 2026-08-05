import { applyEffects } from "./applyEffects";
import { applyPersonalitySignals } from "./personality";
import { selectWeightedWithoutReplacement } from "./selectWeightedWithoutReplacement";
import type {
  Effect,
  GameState,
  InfoTone,
  NumericGameStateKey,
  PersonalitySignal,
} from "./types";

export type NarrativeOpportunityScoreRule = {
  difficulty?: "easy" | "normal" | "hard";
  favors?: readonly NarrativeOpportunityScoreFactor[];
  hurts?: readonly NarrativeOpportunityScoreFactor[];
};

export type NarrativeOpportunityScoreFactor =
  | {
      type: "stat";
      field: NumericGameStateKey;
    }
  | {
      type: "personalitySignal";
      signal: PersonalitySignal;
    };

export type NarrativeOpportunityOutcome = {
  id: string;
  minScore: number;
  eyebrow: string;
  title: string;
  text: string;
  tone: InfoTone;
  cta: string;
  effects: Effect;
};

export type NarrativeOpportunityOption = {
  id: string;
  title: string;
  text: string;
  intent: string;
  moneyCost?: number;
  personalitySignals?: readonly PersonalitySignal[];
  rarity?: "common" | "uncommon" | "special";
  score: NarrativeOpportunityScoreRule;
  outcomes: readonly NarrativeOpportunityOutcome[];
  weight?: number;
};

export type NarrativeOpportunityVariant = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  options: readonly NarrativeOpportunityOption[];
};

export type NarrativeOpportunityDefinition = {
  id: string;
  selectVariantId: (gameState: GameState) => string;
  variants: readonly NarrativeOpportunityVariant[];
};

export type NarrativeOpportunityOptionAvailability =
  | {
      canSelect: true;
      reason?: undefined;
      missingMoney?: undefined;
      requiredMoney?: undefined;
    }
  | {
      canSelect: false;
      blockedBy: "insufficient-money";
      reason: string;
      missingMoney: number;
      requiredMoney: number;
    };

export type NarrativeOpportunityResolution = {
  gameState: GameState;
  opportunity: NarrativeOpportunityDefinition;
  variant: NarrativeOpportunityVariant;
  option: NarrativeOpportunityOption;
  outcome: NarrativeOpportunityOutcome;
  score: number;
};

const VISIBLE_NARRATIVE_OPPORTUNITY_OPTIONS_COUNT = 3;
const REQUIRED_VARIANT_OPTION_COUNT = 6;

export function getNarrativeOpportunityVariant(
  gameState: GameState,
  opportunity: NarrativeOpportunityDefinition,
): NarrativeOpportunityVariant {
  validateNarrativeOpportunity(opportunity);

  const variantId = opportunity.selectVariantId(gameState);
  const variant = opportunity.variants.find(
    (candidate) => candidate.id === variantId,
  );

  if (!variant) {
    throw new Error(
      `Narrative opportunity variant not found: ${opportunity.id}/${variantId}`,
    );
  }

  return variant;
}

export function getVisibleNarrativeOpportunityOptions(
  variant: NarrativeOpportunityVariant,
): readonly NarrativeOpportunityOption[] {
  return selectWeightedWithoutReplacement(
    variant.options,
    VISIBLE_NARRATIVE_OPPORTUNITY_OPTIONS_COUNT,
    (option) => option.weight ?? 1,
  );
}

export function getNarrativeOpportunityOptionAvailability(
  gameState: GameState,
  option: NarrativeOpportunityOption,
): NarrativeOpportunityOptionAvailability {
  const requiredMoney = option.moneyCost ?? 0;

  if (requiredMoney > gameState.money) {
    return {
      blockedBy: "insufficient-money",
      canSelect: false,
      missingMoney: requiredMoney - gameState.money,
      reason: `Te faltan $${(requiredMoney - gameState.money).toLocaleString(
        "es-AR",
      )}`,
      requiredMoney,
    };
  }

  return {
    canSelect: true,
  };
}

export function resolveNarrativeOpportunityOption(
  gameState: GameState,
  opportunity: NarrativeOpportunityDefinition,
  variantId: string,
  optionId: string,
): NarrativeOpportunityResolution {
  validateNarrativeOpportunity(opportunity);

  const variant = opportunity.variants.find(
    (candidate) => candidate.id === variantId,
  );

  if (!variant) {
    throw new Error(
      `Narrative opportunity variant not found: ${opportunity.id}/${variantId}`,
    );
  }

  const option = variant.options.find((candidate) => candidate.id === optionId);

  if (!option) {
    throw new Error(
      `Narrative opportunity option not found: ${opportunity.id}/${variant.id}/${optionId}`,
    );
  }

  const availability = getNarrativeOpportunityOptionAvailability(
    gameState,
    option,
  );

  if (!availability.canSelect) {
    throw new Error(
      `Narrative opportunity option is not available: ${opportunity.id}/${variant.id}/${option.id}`,
    );
  }

  const score = calculateNarrativeOpportunityScore(gameState, option.score);
  const outcome = resolveNarrativeOpportunityOutcome(option, score);
  const effectedState = applyEffects(gameState, {
    ...outcome.effects,
    money: (outcome.effects.money ?? 0) - (option.moneyCost ?? 0),
  });
  const nextState = applyPersonalitySignals(
    effectedState,
    option.personalitySignals,
  );

  return {
    gameState: {
      ...nextState,
      history: [
        ...nextState.history,
        {
          eventId: opportunity.id,
          optionId: option.id,
          outcomeId: outcome.id,
          personalitySignals: option.personalitySignals,
          variantId: variant.id,
        },
      ],
    },
    opportunity,
    outcome,
    option,
    score,
    variant,
  };
}

export function validateNarrativeOpportunity(
  opportunity: NarrativeOpportunityDefinition,
): void {
  for (const variant of opportunity.variants) {
    if (variant.options.length !== REQUIRED_VARIANT_OPTION_COUNT) {
      throw new Error(
        `Narrative opportunity variant must have exactly 6 options: ${opportunity.id}/${variant.id}`,
      );
    }

    for (const option of variant.options) {
      if (option.outcomes.length === 0) {
        throw new Error(
          `Narrative opportunity option must have outcomes: ${opportunity.id}/${variant.id}/${option.id}`,
        );
      }

      const sortedOutcomes = [...option.outcomes].sort(
        (left, right) => left.minScore - right.minScore,
      );

      for (let index = 0; index < option.outcomes.length; index += 1) {
        if (option.outcomes[index] !== sortedOutcomes[index]) {
          throw new Error(
            `Narrative opportunity outcomes must be sorted by minScore: ${opportunity.id}/${variant.id}/${option.id}`,
          );
        }
      }
    }
  }
}

function calculateNarrativeOpportunityScore(
  gameState: GameState,
  scoreRule: NarrativeOpportunityScoreRule,
): number {
  const baseScore = getBaseScore(scoreRule.difficulty ?? "normal");
  const favorScore = (scoreRule.favors ?? []).filter((factor) =>
    matchesScoreFactor(gameState, factor),
  ).length;
  const hurtScore = (scoreRule.hurts ?? []).filter((factor) =>
    matchesScoreFactor(gameState, factor),
  ).length;

  return baseScore + favorScore - hurtScore;
}

function resolveNarrativeOpportunityOutcome(
  option: NarrativeOpportunityOption,
  score: number,
): NarrativeOpportunityOutcome {
  const outcome = [...option.outcomes]
    .reverse()
    .find((candidate) => score >= candidate.minScore);

  if (!outcome) {
    throw new Error(`Narrative opportunity option has no matching outcome: ${option.id}`);
  }

  return outcome;
}

function getBaseScore(difficulty: NonNullable<NarrativeOpportunityScoreRule["difficulty"]>) {
  switch (difficulty) {
    case "easy":
      return 2;
    case "normal":
      return 1;
    case "hard":
      return 0;
  }
}

function matchesScoreFactor(
  gameState: GameState,
  factor: NarrativeOpportunityScoreFactor,
): boolean {
  if (factor.type === "personalitySignal") {
    return (gameState.personalitySignals[factor.signal] ?? 0) >= 3;
  }

  switch (factor.field) {
    case "fame":
      return gameState.fame >= 8;
    case "fans":
      return gameState.fans >= 400;
    case "money":
      return gameState.money >= 300;
    case "talent":
    case "creativity":
    case "charisma":
      return gameState[factor.field] >= 32;
    case "reputation":
      return gameState.reputation >= 8;
    case "health":
      return gameState.health >= 75;
    default:
      return gameState[factor.field] > 0;
  }
}
