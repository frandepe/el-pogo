"use client";

import { create } from "zustand";
import { createInitialGameState } from "./createInitialGameState";
import { gameEngine, type StartCareerInput } from "./gameEngine";
import type { InterviewDefinition } from "./interviews";
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
  buyShopItem: (itemId: string) => void;
  purchaseShopItem: (itemId: string) => void;
  receiveFirstCachet: () => void;
  applyTimePasses: (timePasses: TimePasses) => void;
  advanceStep: () => void;
  finishCareer: () => void;
  resetCareer: () => void;
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
  setDebugCurrentStep: (currentStep) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        currentStep,
      },
    })),
}));
