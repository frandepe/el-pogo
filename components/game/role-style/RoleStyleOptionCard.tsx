import { getOptionRarity, getOptionRarityLabel } from "@/game/optionRarity";
import type { RoleStyleOption } from "./roleStyleOptions";
import { ChoiceOptionCard } from "../choices/ChoiceOptionCard";

type RoleStyleOptionCardProps = {
  isSelected: boolean;
  option: RoleStyleOption;
  onSelect: () => void;
};

export function RoleStyleOptionCard({
  isSelected,
  option,
  onSelect,
}: RoleStyleOptionCardProps) {
  return (
    <ChoiceOptionCard
      badge={option.badge}
      description={option.text}
      isSelected={isSelected}
      rarity={getOptionRarity(option)}
      rarityLabel={getOptionRarityLabel(option)}
      title={option.title}
      onSelect={onSelect}
    />
  );
}
