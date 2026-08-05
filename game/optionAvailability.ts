import type { Condition, Effect, GameState } from "./types";
import { validateConditions } from "./validateConditions";

type SelectableOption = {
  conditions?: readonly Condition[];
  effects: Effect;
};

type EmergencyOptionSet<TOption extends SelectableOption> = {
  emergencyOption?: TOption;
  options: readonly TOption[];
};

export type OptionAvailability =
  | {
      canSelect: true;
      reason?: undefined;
      missingMoney?: undefined;
      requiredMoney?: undefined;
    }
  | {
      canSelect: false;
      blockedBy: "conditions" | "insufficient-money";
      reason: string;
      missingMoney?: number;
      requiredMoney?: number;
    };

export function getOptionAvailability(
  gameState: GameState,
  option: SelectableOption,
): OptionAvailability {
  if (!validateConditions(gameState, option.conditions)) {
    return {
      blockedBy: "conditions",
      canSelect: false,
      reason: "No disponible",
    };
  }

  const requiredMoney = getRequiredMoney(option.effects);

  if (requiredMoney > gameState.money) {
    return {
      blockedBy: "insufficient-money",
      canSelect: false,
      missingMoney: requiredMoney - gameState.money,
      reason: `Te faltan $${(requiredMoney - gameState.money).toLocaleString(
        "es-AR",
      )}`,
      requiredMoney,
    };
  }

  return {
    canSelect: true,
  };
}

export function resolveEmergencyOptionSet<TOption extends SelectableOption>(
  gameState: GameState,
  optionSet: EmergencyOptionSet<TOption>,
  selectedOptions: readonly TOption[],
): readonly TOption[] {
  if (!optionSet.emergencyOption || selectedOptions.length === 0) {
    return selectedOptions;
  }

  const hasAnyMoneyCost = optionSet.options.some(
    (option) => getRequiredMoney(option.effects) > 0,
  );

  if (!hasAnyMoneyCost) {
    return selectedOptions;
  }

  const everySelectedOptionIsBlockedByMoney = selectedOptions.every((option) => {
    const availability = getOptionAvailability(gameState, option);

    return (
      !availability.canSelect &&
      availability.blockedBy === "insufficient-money"
    );
  });

  if (!everySelectedOptionIsBlockedByMoney) {
    return selectedOptions;
  }

  return [optionSet.emergencyOption, ...selectedOptions.slice(1)];
}

export function getFirstSelectableOption<TOption extends SelectableOption>(
  gameState: GameState,
  options: readonly TOption[],
): TOption | undefined {
  return options.find((option) => getOptionAvailability(gameState, option).canSelect);
}

export function getSelectableOptionById<
  TOption extends SelectableOption & { id: string },
>(
  gameState: GameState,
  options: readonly TOption[],
  optionId: string | undefined | null,
): TOption | undefined {
  return options.find(
    (option) =>
      option.id === optionId &&
      getOptionAvailability(gameState, option).canSelect,
  );
}

function getRequiredMoney(effects: Effect): number {
  return Math.abs(Math.min(effects.money ?? 0, 0));
}
