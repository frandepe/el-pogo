import { applyEffects } from "./applyEffects";
import type {
  Effect,
  GameState,
  TimePasses,
  TimePassesIntensity,
  TimePassesResult,
} from "./types";

type IntensityConfig = {
  concertsPerMonth: number;
  fanMultiplier: number;
  moneyMultiplier: number;
  healthPerSixMonths: number;
};

const intensityConfigs = {
  quiet: {
    concertsPerMonth: 0.35,
    fanMultiplier: 0.65,
    moneyMultiplier: 0.7,
    healthPerSixMonths: 1,
  },
  active: {
    concertsPerMonth: 0.9,
    fanMultiplier: 1,
    moneyMultiplier: 1,
    healthPerSixMonths: 0,
  },
  intense: {
    concertsPerMonth: 1.35,
    fanMultiplier: 1.35,
    moneyMultiplier: 1.2,
    healthPerSixMonths: -2,
  },
} satisfies Record<TimePassesIntensity, IntensityConfig>;

export function calculateTimePassesResult(
  gameState: GameState,
  timePasses: TimePasses,
): TimePassesResult {
  const months = Math.max(0, Math.floor(timePasses.months));
  const config = intensityConfigs[timePasses.intensity];

  const concertsGained = calculateConcertsGained(gameState, months, config);
  const fanReach =
    concertsGained *
      (8 + gameState.fame * 1.8 + gameState.reputation * 0.8 + gameState.charisma * 0.6) +
    months * (1 + gameState.fame * 0.25);
  const fansGained = Math.max(0, Math.round(fanReach * config.fanMultiplier));
  const fameGained = Math.max(
    0,
    Math.floor((concertsGained + gameState.reputation / 18 + fansGained / 180) / 4),
  );
  const moneyGained = Math.max(
    0,
    Math.round(
      concertsGained *
        (18 + gameState.fame * 1.4 + gameState.reputation * 0.6) *
        config.moneyMultiplier,
    ),
  );
  const talentGained = Math.max(
    0,
    Math.floor(months / 5) + Math.floor(concertsGained / 7),
  );
  const creativityGained = Math.max(
    0,
    Math.floor(months / 6) + Math.floor(concertsGained / 10),
  );
  const ageGained = Math.floor(months / 12);
  const healthDelta = Math.trunc((months / 6) * config.healthPerSixMonths);

  const effects: Effect = removeZeroEffects({
    age: ageGained,
    concerts: concertsGained,
    fans: fansGained,
    fame: fameGained,
    money: moneyGained,
    talent: talentGained,
    creativity: creativityGained,
    health: healthDelta,
  });

  return { effects };
}

export function applyTimePasses(
  gameState: GameState,
  timePasses: TimePasses,
): GameState {
  return applyEffects(gameState, calculateTimePassesResult(gameState, timePasses).effects);
}

function calculateConcertsGained(
  gameState: GameState,
  months: number,
  config: IntensityConfig,
) {
  const careerMomentum =
    gameState.fame * 0.04 +
    gameState.reputation * 0.06 +
    gameState.charisma * 0.03 +
    gameState.concerts * 0.015 +
    Math.floor(gameState.fans / 250) * 0.08;

  return Math.max(0, Math.round(months * config.concertsPerMonth + careerMomentum));
}

function removeZeroEffects(effects: Effect): Effect {
  return Object.fromEntries(
    Object.entries(effects).filter(([, value]) => value !== 0),
  ) as Effect;
}
