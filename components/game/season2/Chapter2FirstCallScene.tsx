"use client";

import { useMemo, useState } from "react";
import { gameEngine } from "@/game/gameEngine";
import { replaceBandMemberMentions } from "@/game/bandMembers";
import {
  getNarrativeOpportunityOptionAvailability,
  type NarrativeOpportunityResolution,
} from "@/game/narrativeOpportunity";
import type { GameState } from "@/game/types";
import { ChoiceOptionCard } from "../choices/ChoiceOptionCard";
import { InfoScene } from "../info/InfoScene";
import { chapter2FirstCallOpportunity } from "./chapter2FirstCall";

type Chapter2FirstCallSceneProps = {
  gameState: GameState;
  onChoose: (
    variantId: string,
    optionId: string,
  ) => NarrativeOpportunityResolution | undefined;
  onComplete: () => void;
};

export function Chapter2FirstCallScene({
  gameState,
  onChoose,
  onComplete,
}: Chapter2FirstCallSceneProps) {
  const variant = useMemo(
    () =>
      gameEngine.getNarrativeOpportunityVariant(
        gameState,
        chapter2FirstCallOpportunity,
      ),
    [gameState],
  );
  const [visibleOptions] = useState(() =>
    gameEngine.getVisibleNarrativeOpportunityOptions(variant),
  );
  const [selectedOptionId, setSelectedOptionId] = useState(
    visibleOptions.find(
      (option) =>
        getNarrativeOpportunityOptionAvailability(gameState, option).canSelect,
    )?.id,
  );
  const [resolution, setResolution] =
    useState<NarrativeOpportunityResolution>();
  const selectedOption = visibleOptions.find(
    (option) =>
      option.id === selectedOptionId &&
      getNarrativeOpportunityOptionAvailability(gameState, option).canSelect,
  );

  function handleConfirm() {
    if (!selectedOption) {
      return;
    }

    setResolution(onChoose(variant.id, selectedOption.id));
  }

  if (resolution) {
    const outcomeText = replaceBandMemberMentions(
      resolution.outcome.text,
      gameState.role,
      `${resolution.opportunity.id}:${resolution.variant.id}:${resolution.option.id}:${resolution.outcome.id}`,
    );

    return (
      <InfoScene
        actionLabel={resolution.outcome.cta}
        eyebrow={resolution.outcome.eyebrow}
        title={resolution.outcome.title}
        tone={resolution.outcome.tone}
        onAction={onComplete}
      >
        <p>{outcomeText}</p>
      </InfoScene>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-4">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          {variant.eyebrow}
        </p>
        <h2 className="mt-2 font-heading text-4xl font-semibold">
          {variant.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {variant.text}
        </p>
      </div>

      <div
        aria-label={variant.title}
        className="grid gap-3 lg:grid-cols-3"
        role="radiogroup"
      >
        {visibleOptions.map((option) => {
          const availability = getNarrativeOpportunityOptionAvailability(
            gameState,
            option,
          );

          return (
            <ChoiceOptionCard
              description={option.text}
              disabledReason={
                availability.canSelect ? undefined : availability.reason
              }
              isSelected={selectedOptionId === option.id}
              key={option.id}
              rarity={option.rarity}
              title={option.title}
              onSelect={() => setSelectedOptionId(option.id)}
            />
          );
        })}
      </div>

      <button
        className="w-fit rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-colors motion-reduce:active:scale-100"
        disabled={!selectedOption}
        type="button"
        onClick={handleConfirm}
      >
        Atender la llamada
      </button>
    </section>
  );
}
