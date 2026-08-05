"use client";

import { useMemo, useState } from "react";
import { gameEngine } from "@/game/gameEngine";
import { formatNarrativeText } from "@/game/narrativeText";
import { getOptionAvailability } from "@/game/optionAvailability";
import type { EventOption, GameEvent, GameState } from "@/game/types";
import type { RoleName } from "../data/roleOptions";
import { RoleStyleOptionCard } from "./RoleStyleOptionCard";
import { roleStyleEvents } from "./roleStyleOptions";

type RoleStyleChoiceProps = {
  gameState: GameState;
  role: string;
  onChoose: (event: GameEvent, option: EventOption) => void;
};

export function RoleStyleChoice({
  gameState,
  role,
  onChoose,
}: RoleStyleChoiceProps) {
  const event = useMemo(
    () =>
      gameEngine.getEventWithVisibleOptions(
        gameState,
        roleStyleEvents[toKnownRole(role)],
      ),
    [gameState, role],
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    event.options.find(
      (option) => getOptionAvailability(gameState, option).canSelect,
    )?.id,
  );
  const selectedOption = event.options.find(
    (option) =>
      option.id === selectedOptionId &&
      getOptionAvailability(gameState, option).canSelect,
  );

  function handleConfirm() {
    if (!selectedOption) {
      return;
    }

    onChoose(event, selectedOption);
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-4">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Estilo artístico
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
        {event.options.map((option) => (
          <RoleStyleOptionCard
            isSelected={selectedOptionId === option.id}
            key={option.id}
            option={option}
            gameState={gameState}
            onSelect={() => setSelectedOptionId(option.id)}
          />
        ))}
      </div>

      <button
        className="w-fit rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
        disabled={!selectedOption}
        type="button"
        onClick={handleConfirm}
      >
        Confirmar estilo
      </button>
    </section>
  );
}

function toKnownRole(role: string): RoleName {
  if (
    role === "Cantante" ||
    role === "Guitarrista" ||
    role === "Bajista" ||
    role === "Baterista"
  ) {
    return role;
  }

  return "Cantante";
}
