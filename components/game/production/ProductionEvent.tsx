"use client";

import { useState } from "react";
import { gameEngine } from "@/game/gameEngine";
import { getOptionAvailability } from "@/game/optionAvailability";
import {
  resolveProductionOutcome,
  validateProductionEvent,
} from "@/game/productionEvents";
import type {
  ProductionEventDefinition,
  ProductionOption,
  ProductionOutcome,
  ProductionQuestion,
} from "@/game/productionEvents";
import type { Effect, GameState } from "@/game/types";
import { InfoScene } from "../info/InfoScene";

type ProductionEventProps = {
  gameState: GameState;
  production: ProductionEventDefinition;
  onChooseOption: (
    production: ProductionEventDefinition,
    question: ProductionQuestion,
    option: ProductionOption,
  ) => void;
  onResolveOutcome: (
    production: ProductionEventDefinition,
    outcome: ProductionOutcome,
  ) => void;
  onComplete: () => void;
};

const effectLabels: Record<string, string> = {
  fame: "Fama",
  fans: "Fans",
  money: "Dinero",
  talent: "Talento",
  creativity: "Creatividad",
  charisma: "Carisma",
  reputation: "Reputación",
  health: "Salud",
  albums: "Álbumes",
  concerts: "Conciertos",
  awards: "Premios",
  grammys: "Grammys",
  worldTours: "Giras",
  recordDeals: "Contratos",
  bandBreakups: "Rupturas",
};

export function ProductionEvent({
  gameState,
  production,
  onChooseOption,
  onResolveOutcome,
  onComplete,
}: ProductionEventProps) {
  validateProductionEvent(production);

  const [hasStarted, setHasStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [qualityTotal, setQualityTotal] = useState(0);
  const [resolvedOutcome, setResolvedOutcome] =
    useState<ProductionOutcome | null>(null);
  const question = gameEngine.getProductionQuestionWithVisibleOptions(
    gameState,
    production.questions[questionIndex],
  );

  if (!hasStarted) {
    return (
      <InfoScene
        actionLabel={production.startLabel}
        eyebrow={production.eyebrow}
        title={production.title}
        tone="neutral"
        onAction={() => setHasStarted(true)}
      >
        <p>{production.intro}</p>
      </InfoScene>
    );
  }

  if (resolvedOutcome) {
    return (
      <InfoScene
        actionLabel={resolvedOutcome.cta}
        eyebrow={resolvedOutcome.eyebrow}
        title={resolvedOutcome.title}
        tone={resolvedOutcome.tone}
        onAction={onComplete}
      >
        <p>{resolvedOutcome.text}</p>
        <div className="mx-auto mt-2 flex max-w-xl flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Resultado
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {formatEffects(resolvedOutcome.effects).map((effect) => (
              <li
                className={
                  effect.isPositive
                    ? "rounded-md border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-1 text-sm text-emerald-200"
                    : "rounded-md border border-primary/20 bg-primary/[0.08] px-2.5 py-1 text-sm text-primary/90"
                }
                key={effect.label}
              >
                {effect.label}
              </li>
            ))}
          </ul>
        </div>
      </InfoScene>
    );
  }

  function handleChoose(option: ProductionOption) {
    if (!getOptionAvailability(gameState, option).canSelect) {
      return;
    }

    setSelectedOptionId(option.id);
    onChooseOption(production, question, option);

    const nextQualityTotal = qualityTotal + option.productionQuality;
    setQualityTotal(nextQualityTotal);

    if (questionIndex === production.questions.length - 1) {
      const outcome = resolveProductionOutcome(production, nextQualityTotal);

      onResolveOutcome(production, outcome);
      setResolvedOutcome(outcome);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedOptionId(null);
  }

  return (
    <section className="production-event mx-auto flex w-full max-w-5xl flex-col gap-8 py-4">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {production.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-foreground">
            {production.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {question.text}
          </p>
        </div>

        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Decisión {questionIndex + 1} de {production.questions.length}
        </p>
      </div>

      <div className="production-event__panel" key={question.id}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="rounded-md border border-white/10 bg-background/35 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#d8b45f]">
              Sesión de producción
            </p>
            <h3 className="mt-3 font-heading text-3xl font-semibold">
              {question.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Cada decisión cambia el estado de la banda ahora. El resultado de
              la obra se entiende recién cuando terminan de grabar.
            </p>
          </aside>

          <div
            aria-label={question.title}
            className="grid gap-3 sm:grid-cols-2"
            role="radiogroup"
          >
            {question.options.map((option) => {
              const availability = getOptionAvailability(gameState, option);
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  aria-checked={isSelected}
                  className={[
                    "flex min-h-60 flex-col justify-between rounded-md border p-4 text-left outline-none",
                    "transition-[border-color,background-color,box-shadow,opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "enabled:active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-55 motion-reduce:transition-colors motion-reduce:enabled:active:scale-100",
                    isSelected
                      ? "border-[#d8b45f] bg-primary/[0.07] shadow-[0_0_0_1px_rgba(216,180,95,0.26)]"
                      : "border-white/10 bg-card/[0.42] enabled:hover:border-[#d8b45f]/45 enabled:hover:bg-card/70",
                  ].join(" ")}
                  disabled={!availability.canSelect}
                  key={option.id}
                  role="radio"
                  type="button"
                  onClick={() => handleChoose(option)}
                >
                  <span>
                    <span className="block font-heading text-2xl font-semibold text-foreground">
                      {option.title}
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-muted-foreground">
                      {option.text}
                    </span>
                  </span>

                  <span className="mt-5 flex flex-wrap gap-2">
                    {formatEffects(option.effects).map((effect) => (
                      <span
                        className={
                          effect.isPositive
                            ? "rounded-md border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-1 text-xs text-emerald-200"
                            : "rounded-md border border-primary/20 bg-primary/[0.08] px-2 py-1 text-xs text-primary/90"
                        }
                        key={effect.label}
                      >
                        {effect.label}
                      </span>
                    ))}
                    {!availability.canSelect ? (
                      <span className="rounded-md border border-white/10 bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                        {availability.reason}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatEffects(effects: Effect) {
  return Object.entries(effects).map(([field, value]) => {
    const label = effectLabels[field] ?? field;
    const prefix = value > 0 ? "+" : "";

    return {
      isPositive: value >= 0,
      label: `${prefix}${value} ${label}`,
    };
  });
}
