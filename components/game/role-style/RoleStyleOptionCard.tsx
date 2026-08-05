import { getOptionRarity, getOptionRarityLabel } from "@/game/optionRarity";
import { getOptionAvailability } from "@/game/optionAvailability";
import type { GameState } from "@/game/types";
import type { RoleStyleOption } from "./roleStyleOptions";
import { ChoiceOptionCard } from "../choices/ChoiceOptionCard";

type RoleStyleOptionCardProps = {
  gameState: GameState;
  isSelected: boolean;
  option: RoleStyleOption;
  onSelect: () => void;
};

export function RoleStyleOptionCard({
  gameState,
  isSelected,
  option,
  onSelect,
}: RoleStyleOptionCardProps) {
  const availability = getOptionAvailability(gameState, option);

  return (
    <ChoiceOptionCard
      badge={option.badge}
      description={option.text}
      disabledReason={availability.canSelect ? undefined : availability.reason}
      isSelected={isSelected}
      rarity={getOptionRarity(option)}
      rarityLabel={getOptionRarityLabel(option)}
      title={option.title}
      onSelect={onSelect}
    />
  );
}
