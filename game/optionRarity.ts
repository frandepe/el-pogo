import type { EventOption, OptionRarity } from "./types";

export const OPTION_RARITY_LABELS = {
  common: null,
  uncommon: "Poco común",
  special: "Especial",
} satisfies Record<OptionRarity, string | null>;

export const OPTION_RARITY_WEIGHTS = {
  common: 1,
  uncommon: 0.6,
  special: 0.35,
} satisfies Record<OptionRarity, number>;

export function getOptionRarity(option: EventOption): OptionRarity {
  return option.rarity ?? "common";
}

export function getOptionRarityLabel(option: EventOption): string | null {
  return OPTION_RARITY_LABELS[getOptionRarity(option)];
}

export function getOptionRarityWeight(option: EventOption): number {
  return OPTION_RARITY_WEIGHTS[getOptionRarity(option)];
}
