"use client";

import { useMemo, useState } from "react";
import { gameEngine } from "@/game/gameEngine";
import { formatNarrativeText } from "@/game/narrativeText";
import { getOptionRarity, getOptionRarityLabel } from "@/game/optionRarity";
import {
  getFirstSelectableOption,
  getOptionAvailability,
  getSelectableOptionById,
} from "@/game/optionAvailability";
import type { EventOption, GameEvent, GameState } from "@/game/types";
import { ChoiceOptionCard } from "../choices/ChoiceOptionCard";
import { firstRecitalEvent } from "./firstRecital";

type FirstRecitalChoiceProps = {
  gameState: GameState;
  onChoose: (event: GameEvent, option: EventOption) => void;
};

export function FirstRecitalChoice({
  gameState,
  onChoose,
}: FirstRecitalChoiceProps) {
  const event = useMemo(
    () => gameEngine.getEventWithVisibleOptions(gameState, firstRecitalEvent),
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
          {formatNarrativeText(event.text, gameState, `${event.id}:text`)}
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {formatNarrativeText(
            event.description,
            gameState,
            `${event.id}:description`,
          )}
        </p>
      </div>

      <div
        aria-label={formatNarrativeText(
          event.text,
          gameState,
          `${event.id}:text`,
        )}
        className="grid gap-3 lg:grid-cols-3"
        role="radiogroup"
      >
        {event.options.map((option) => {
          const availability = getOptionAvailability(gameState, option);

          return (
            <ChoiceOptionCard
              badge={option.badge}
              description={formatNarrativeText(
                option.text,
                gameState,
                `${event.id}:option:${option.id}`,
              )}
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
        Salir a tocar
      </button>
    </section>
  );
}
