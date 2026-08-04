import { applyEffects } from "./applyEffects";
import { FIRST_CACHET_PERSONAL_SHARE } from "./careerRewards";
import { createInitialGameState } from "./createInitialGameState";
import { getEffectSignature } from "./effectSignature";
import { initialEvents } from "./events/initialEvents";
import {
  advanceStep as advanceFlowStep,
  careerFlow,
  getCurrentStep as getFlowCurrentStep,
} from "./flow";
import { finishCareer as createCareerResult } from "./finishCareer";
import { selectNextEvent } from "./selectNextEvent";
import {
  completeShopPurchase,
  getAvailableShopItems,
  getShopItemStatus,
  getVisibleShopItems,
  initialShopItems,
} from "./shop";
import { getOptionRarityWeight } from "./optionRarity";
import { applyPersonalitySignals } from "./personality";
import { selectWeightedWithoutReplacement } from "./selectWeightedWithoutReplacement";
import type {
  EventOption,
  GameEvent,
  GameState,
  ShopItem,
  StepType,
  CareerResult,
} from "./types";
import { validateConditions } from "./validateConditions";

export type StartCareerInput = {
  artistName?: string;
  role?: string;
};

export const gameEngine = {
  startCareer,
  chooseOption,
  applyOption,
  finishCareer,
  completeCareer,
  getCurrentStep,
  advanceStep,
  getCurrentEvent,
  getVisibleEventOptions,
  getEventWithVisibleOptions,
  getVisibleShopItems,
  getAvailableShopItems,
  buyShopItem,
  purchaseShopItem,
  receiveFirstCachet,
};

const VISIBLE_EVENT_OPTIONS_COUNT = 3;

export function startCareer(input: StartCareerInput = {}): GameState {
  return {
    ...createInitialGameState(),
    artistName: input.artistName ?? "",
    role: input.role ?? "",
  };
}

export function chooseOption(
  gameState: GameState,
  eventId: string,
  optionId: string,
  events: readonly GameEvent[] = initialEvents,
): GameState {
  const event = events.find((candidate) => candidate.id === eventId);

  if (!event) {
    throw new Error(`Event not found: ${eventId}`);
  }

  const option = event.options.find((candidate) => candidate.id === optionId);

  if (!option) {
    throw new Error(`Option not found: ${optionId}`);
  }

  return applyOption(gameState, event, option);
}

export function applyOption(
  gameState: GameState,
  event: GameEvent,
  option: EventOption,
): GameState {
  if (!validateConditions(gameState, event.conditions)) {
    throw new Error(`Event is not available: ${event.id}`);
  }

  if (!validateConditions(gameState, option.conditions)) {
    throw new Error(`Option is not available: ${option.id}`);
  }

  const effectedState = applyEffects(gameState, option.effects);
  const nextState = applyPersonalitySignals(
    option.bandName
      ? {
          ...effectedState,
          bandName: option.bandName,
        }
      : effectedState,
    option.personalitySignals,
  );

  return advanceFlowStep({
    ...nextState,
    history: [
      ...nextState.history,
      {
        eventId: event.id,
        optionId: option.id,
        personalitySignals: option.personalitySignals,
      },
    ],
  });
}

export function completeCareer(gameState: GameState): GameState {
  return {
    ...gameState,
    currentStep: careerFlow.length - 1,
  };
}

export function finishCareer(gameState: GameState): CareerResult {
  return createCareerResult(gameState);
}

export function getCurrentStep(gameState: GameState): StepType {
  return getFlowCurrentStep(gameState);
}

export function advanceStep(gameState: GameState): GameState {
  return advanceFlowStep(gameState);
}

export function receiveFirstCachet(gameState: GameState): GameState {
  return applyEffects(gameState, {
    money: FIRST_CACHET_PERSONAL_SHARE,
  });
}

export function getCurrentEvent(
  gameState: GameState,
  events: readonly GameEvent[] = initialEvents,
): GameEvent | undefined {
  const currentStep = getCurrentStep(gameState);
  const stepEvents = events.filter((event) => event.stepType === currentStep);

  const event = selectNextEvent(gameState, stepEvents);

  if (!event) {
    return undefined;
  }

  return getEventWithVisibleOptions(gameState, event);
}

export function getEventWithVisibleOptions<TEvent extends GameEvent>(
  gameState: GameState,
  event: TEvent,
): TEvent {
  return {
    ...event,
    options: getVisibleEventOptions(gameState, event),
  };
}

export function getVisibleEventOptions<TOption extends EventOption>(
  gameState: GameState,
  event: { options: readonly TOption[] },
): readonly TOption[] {
  const availableOptions = event.options.filter((option) =>
    validateConditions(gameState, option.conditions),
  );

  return selectWeightedWithoutReplacement(
    availableOptions,
    VISIBLE_EVENT_OPTIONS_COUNT,
    getOptionRarityWeight,
    (option) => getEffectSignature(option.effects),
  );
}

export function purchaseShopItem(
  gameState: GameState,
  itemId: string,
  items: readonly ShopItem[] = initialShopItems,
): GameState {
  return advanceFlowStep(buyShopItem(gameState, itemId, items));
}

export function buyShopItem(
  gameState: GameState,
  itemId: string,
  items: readonly ShopItem[] = initialShopItems,
): GameState {
  const item = items.find((candidate) => candidate.id === itemId);

  if (!item) {
    throw new Error(`Shop item not found: ${itemId}`);
  }

  if (gameState.money < item.price) {
    throw new Error(`Not enough money for shop item: ${item.id}`);
  }

  if (!validateConditions(gameState, item.conditions)) {
    throw new Error(`Shop item is not available: ${item.id}`);
  }

  const status = getShopItemStatus(gameState, item);

  if (!status.canPurchase) {
    throw new Error(`Shop item is not purchasable: ${item.id}`);
  }

  const nextState = applyEffects(gameState, {
    ...item.effects,
    money: (item.effects.money ?? 0) - item.price,
  });
  const shopState = completeShopPurchase(gameState, item);

  return {
    ...nextState,
    ...shopState,
    history: [
      ...nextState.history,
      {
        eventId: "shop",
        optionId: item.id,
      },
    ],
  };
}
