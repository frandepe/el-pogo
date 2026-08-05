import type { GameState } from "./types";

export function createInitialGameState(): GameState {
  return {
    artistName: "",
    bandName: "",
    role: "",
    currentStep: 0,
    age: 18,
    fame: 0,
    fans: 0,
    money: 300,
    talent: 25,
    creativity: 25,
    charisma: 25,
    reputation: 0,
    health: 100,
    albums: 0,
    concerts: 0,
    awards: 0,
    grammys: 0,
    worldTours: 0,
    recordDeals: 0,
    bandBreakups: 0,
    personalitySignals: {},
    personalityTraits: [],
    completedShopItemIds: [],
    activeContractIds: [],
    shopCooldowns: [],
    history: [],
  };
}
