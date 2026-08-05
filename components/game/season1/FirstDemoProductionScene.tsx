"use client";

import type {
  ProductionEventDefinition,
  ProductionOption,
  ProductionOutcome,
  ProductionQuestion,
} from "@/game/productionEvents";
import type { GameState } from "@/game/types";
import { ProductionEvent } from "../production/ProductionEvent";
import { firstDemoProduction } from "./firstDemoProduction";

type FirstDemoProductionSceneProps = {
  gameState: GameState;
  onChooseOption: (
    production: ProductionEventDefinition,
    question: ProductionQuestion,
    option: ProductionOption,
  ) => void;
  onResolveOutcome: (
    production: ProductionEventDefinition,
    outcome: ProductionOutcome,
  ) => void;
  onComplete: () => void;
};

export function FirstDemoProductionScene({
  gameState,
  onChooseOption,
  onResolveOutcome,
  onComplete,
}: FirstDemoProductionSceneProps) {
  return (
    <ProductionEvent
      gameState={gameState}
      production={firstDemoProduction}
      onChooseOption={onChooseOption}
      onResolveOutcome={onResolveOutcome}
      onComplete={onComplete}
    />
  );
}
