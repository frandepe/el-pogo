import type { CareerEnding, CareerResult, GameState } from "./types";

export function finishCareer(gameState: GameState): CareerResult {
  const score = calculateCareerScore(gameState);

  return {
    artistName: gameState.artistName,
    score,
    ending: getCareerEnding(score),
    stats: {
      fame: gameState.fame,
      fans: gameState.fans,
      money: gameState.money,
      talent: gameState.talent,
      creativity: gameState.creativity,
      charisma: gameState.charisma,
      reputation: gameState.reputation,
      health: gameState.health,
      albums: gameState.albums,
      concerts: gameState.concerts,
      awards: gameState.awards,
      grammys: gameState.grammys,
      worldTours: gameState.worldTours,
      recordDeals: gameState.recordDeals,
      bandBreakups: gameState.bandBreakups,
    },
    personalityTraits: gameState.personalityTraits,
    history: gameState.history,
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
