import type { CareerEnding, CareerResult, GameState } from "./types";
import { recalculatePersonalityTraits } from "./personality";

export function finishCareer(gameState: GameState): CareerResult {
  const finalState = recalculatePersonalityTraits(gameState);
  const score = calculateCareerScore(finalState);

  return {
    artistName: finalState.artistName,
    score,
    ending: getCareerEnding(score),
    stats: {
      fame: finalState.fame,
      fans: finalState.fans,
      money: finalState.money,
      talent: finalState.talent,
      creativity: finalState.creativity,
      charisma: finalState.charisma,
      reputation: finalState.reputation,
      health: finalState.health,
      albums: finalState.albums,
      concerts: finalState.concerts,
      awards: finalState.awards,
      grammys: finalState.grammys,
      worldTours: finalState.worldTours,
      recordDeals: finalState.recordDeals,
      bandBreakups: finalState.bandBreakups,
    },
    personalityTraits: finalState.personalityTraits,
    history: finalState.history,
  };
}

function calculateCareerScore(gameState: GameState): number {
  return Math.max(
    0,
    gameState.fame * 120 +
      gameState.fans +
      gameState.money +
      gameState.talent * 80 +
      gameState.creativity * 80 +
      gameState.charisma * 60 +
      gameState.reputation * 100 +
      gameState.health * 20 +
      gameState.albums * 500 +
      gameState.concerts * 120 +
      gameState.awards * 800 +
      gameState.grammys * 2000 +
      gameState.worldTours * 3000 +
      gameState.recordDeals * 1500 -
      gameState.bandBreakups * 600,
  );
}

function getCareerEnding(score: number): CareerEnding {
  if (score >= 25000) {
    return "Leyenda del rock";
  }

  if (score >= 12000) {
    return "Rockstar nacional";
  }

  if (score >= 6000) {
    return "Figura de culto";
  }

  return "Promesa de garage";
}
