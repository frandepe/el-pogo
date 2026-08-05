"use client";

import { useMemo, useState } from "react";
import { gameEngine } from "@/game/gameEngine";
import { getOptionRarity, getOptionRarityLabel } from "@/game/optionRarity";
import {
  getFirstSelectableOption,
  getOptionAvailability,
  getSelectableOptionById,
} from "@/game/optionAvailability";
import type { EventOption, GameEvent, GameState } from "@/game/types";
import { ChoiceOptionCard } from "../choices/ChoiceOptionCard";
import { firstMoneyEvent } from "./firstMoney";

type FirstMoneyChoiceProps = {
  gameState: GameState;
  onChoose: (event: GameEvent, option: EventOption) => void;
};

export function FirstMoneyChoice({
  gameState,
  onChoose,
}: FirstMoneyChoiceProps) {
  const event = useMemo(
    () => gameEngine.getEventWithVisibleOptions(gameState, firstMoneyEvent),
    [gameState],
  );
  const [selectedOptionId, setSelectedOptionId] = useState(
    getFirstSelectableOption(gameState, event.options)?.id,
  );
  const selectedOption = getSelectableOptionById(
    gameState,
    event.options,
    selectedOptionId,
  );

  function handleConfirm() {
    if (!selectedOption) {
      return;
    }

    onChoose(event, selectedOption);
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-4">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Capítulo I
        </p>
        <h2 className="mt-2 font-heading text-4xl font-semibold">
          {event.text}
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {event.description}
        </p>
      </div>

      <div
        aria-label={event.text}
        className="grid gap-3 lg:grid-cols-3"
        role="radiogroup"
      >
        {event.options.map((option) => {
          const availability = getOptionAvailability(gameState, option);

          return (
            <ChoiceOptionCard
              badge={option.badge}
              description={option.text}
              disabledReason={
                availability.canSelect ? undefined : availability.reason
              }
              isSelected={selectedOptionId === option.id}
              key={option.id}
              rarity={getOptionRarity(option)}
              rarityLabel={getOptionRarityLabel(option)}
              title={option.title}
              onSelect={() => setSelectedOptionId(option.id)}
            />
          );
        })}
      </div>

      <button
        className="w-fit rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
        disabled={!selectedOption}
        type="button"
        onClick={handleConfirm}
      >
        Decidir qué hacer
      </button>
    </section>
  );
}
