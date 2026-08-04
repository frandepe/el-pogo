import type { GameState, StepType } from "./types";

export const careerFlow = [
  "CreateArtist",
  "Upgrade",
  "Choice",
  "Info",
  "Shop",
  "Final",
] satisfies readonly StepType[];

export function getCurrentStep(
  gameState: GameState,
  flow: readonly StepType[] = careerFlow,
): StepType {
  return flow[gameState.currentStep] ?? "Final";
}

export function advanceStep(
  gameState: GameState,
  flow: readonly StepType[] = careerFlow,
): GameState {
  return {
    ...gameState,
    currentStep: Math.min(gameState.currentStep + 1, flow.length - 1),
  };
}
