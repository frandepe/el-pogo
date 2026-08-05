"use client";

import { create } from "zustand";
import { createDebugChapter2GameState } from "./createDebugChapter2GameState";
import { createInitialGameState } from "./createInitialGameState";
import { gameEngine, type StartCareerInput } from "./gameEngine";
import type { InterviewDefinition } from "./interviews";
import type {
  NarrativeOpportunityDefinition,
  NarrativeOpportunityResolution,
} from "./narrativeOpportunity";
import type {
  ProductionEventDefinition,
  ProductionOption,
  ProductionOutcome,
  ProductionQuestion,
} from "./productionEvents";
import type { EventOption, GameEvent, GameState, TimePasses } from "./types";

type GameStore = {
  gameState: GameState;
  startCareer: (input?: StartCareerInput) => void;
  chooseOption: (eventId: string, optionId: string) => void;
  applyEventOption: (event: GameEvent, option: EventOption) => void;
  applyInterviewAnswer: (
    interview: InterviewDefinition,
    questionId: string,
    optionId: string,
  ) => void;
  applyProductionOption: (
    production: ProductionEventDefinition,
    question: ProductionQuestion,
    option: ProductionOption,
  ) => void;
  applyProductionOutcome: (
    production: ProductionEventDefinition,
    outcome: ProductionOutcome,
  ) => void;
  chooseNarrativeOpportunityOption: (
    opportunity: NarrativeOpportunityDefinition,
    variantId: string,
    optionId: string,
  ) => NarrativeOpportunityResolution | undefined;
  buyShopItem: (itemId: string) => void;
  purchaseShopItem: (itemId: string) => void;
  receiveFirstCachet: () => void;
  applyTimePasses: (timePasses: TimePasses) => void;
  startChapter2: () => void;
  advanceStep: () => void;
  finishCareer: () => void;
  resetCareer: () => void;
  setDebugChapter2GameState: () => void;
  setDebugCurrentStep: (currentStep: number) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: createInitialGameState(),
  startCareer: (input) =>
    set(() => ({
      gameState: gameEngine.startCareer(input),
    })),
  chooseOption: (eventId, optionId) =>
    set((state) => ({
      gameState: gameEngine.chooseOption(state.gameState, eventId, optionId),
    })),
  applyEventOption: (event, option) =>
    set((state) => ({
      gameState: gameEngine.applyOption(state.gameState, event, option),
    })),
  applyInterviewAnswer: (interview, questionId, optionId) =>
    set((state) => ({
      gameState: gameEngine.applyInterviewAnswer(
        state.gameState,
        interview,
        questionId,
        optionId,
      ),
    })),
  applyProductionOption: (production, question, option) =>
    set((state) => ({
      gameState: gameEngine.applyProductionOption(
        state.gameState,
        production,
        question,
        option,
      ),
    })),
  applyProductionOutcome: (production, outcome) =>
    set((state) => ({
      gameState: gameEngine.applyProductionOutcome(
        state.gameState,
        production,
        outcome,
      ),
    })),
  chooseNarrativeOpportunityOption: (opportunity, variantId, optionId) => {
    let resolution: NarrativeOpportunityResolution | undefined;

    set((state) => {
      resolution = gameEngine.chooseNarrativeOpportunityOption(
        state.gameState,
        opportunity,
        variantId,
        optionId,
      );

      return {
        gameState: resolution.gameState,
      };
    });

    return resolution;
  },
  buyShopItem: (itemId) =>
    set((state) => ({
      gameState: gameEngine.buyShopItem(state.gameState, itemId),
    })),
  purchaseShopItem: (itemId) =>
    set((state) => ({
      gameState: gameEngine.purchaseShopItem(state.gameState, itemId),
    })),
  receiveFirstCachet: () =>
    set((state) => ({
      gameState: gameEngine.receiveFirstCachet(state.gameState),
    })),
  applyTimePasses: (timePasses) =>
    set((state) => ({
      gameState: gameEngine.applyTimePasses(state.gameState, timePasses),
    })),
  startChapter2: () =>
    set((state) => ({
      gameState: gameEngine.startChapter2(state.gameState),
    })),
  advanceStep: () =>
    set((state) => ({
      gameState: gameEngine.advanceStep(state.gameState),
    })),
  finishCareer: () =>
    set((state) => ({
      gameState: gameEngine.completeCareer(state.gameState),
    })),
  resetCareer: () =>
    set(() => ({
      gameState: createInitialGameState(),
    })),
  setDebugChapter2GameState: () =>
    set((state) => ({
      gameState: createDebugChapter2GameState(state.gameState),
    })),
  setDebugCurrentStep: (currentStep) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        currentStep,
      },
    })),
}));
