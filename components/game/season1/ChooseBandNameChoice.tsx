"use client";

import { useMemo, useState } from "react";
import { gameEngine } from "@/game/gameEngine";
import { getOptionRarity, getOptionRarityLabel } from "@/game/optionRarity";
import type { EventOption, GameEvent, GameState } from "@/game/types";
import { ChoiceOptionCard } from "../choices/ChoiceOptionCard";
import { bandNameCatalog } from "./bandNameCatalog";
import { createChooseBandNameEvent } from "./chooseBandName";

type ChooseBandNameChoiceProps = {
  gameState: GameState;
  onChoose: (event: GameEvent, option: EventOption) => void;
};

export function ChooseBandNameChoice({
  gameState,
  onChoose,
}: ChooseBandNameChoiceProps) {
  const chooseBandNameEvent = useMemo(
    () =>
      gameEngine.getEventWithVisibleOptions(
        gameState,
        createChooseBandNameEvent(bandNameCatalog),
      ),
    [gameState],
  );
  const [selectedOptionId, setSelectedOptionId] = useState(
    chooseBandNameEvent.options[0]?.id,
  );
  const selectedOption = chooseBandNameEvent.options.find(
    (option) => option.id === selectedOptionId,
  );

  function handleConfirm() {
    if (!selectedOption) {
      return;
    }

    onChoose(chooseBandNameEvent, selectedOption);
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-4">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Capítulo I
        </p>
        <h2 className="mt-2 font-heading text-4xl font-semibold">
          {chooseBandNameEvent.text}
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {chooseBandNameEvent.description}
        </p>
      </div>

      <div
        aria-label={chooseBandNameEvent.text}
        className="grid gap-3 lg:grid-cols-3"
        role="radiogroup"
      >
        {chooseBandNameEvent.options.map((option) => (
          <ChoiceOptionCard
            badge={option.badge}
            description={option.text}
            isSelected={selectedOptionId === option.id}
            key={option.id}
            rarityLabel={getOptionRarityLabel(option)}
            rarity={getOptionRarity(option)}
            title={option.title}
            onSelect={() => setSelectedOptionId(option.id)}
          />
        ))}
      </div>

      <button
        className="w-fit rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
        type="button"
        onClick={handleConfirm}
      >
        Confirmar nombre
      </button>
    </section>
  );
}
