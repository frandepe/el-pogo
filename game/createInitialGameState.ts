import type { GameState } from "./types";

export function createInitialGameState(): GameState {
  return {
    artistName: "",
    bandName: "",
    role: "",
    currentStep: 0,
    age: 18,
    fame: 10,
    fans: 0,
    money: 500,
    talent: 40,
    creativity: 50,
    charisma: 35,
    reputation: 20,
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
