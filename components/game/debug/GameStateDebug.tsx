import { careerFlow } from "@/game/flow";
import { useGameStore } from "@/game/store";
import type { GameState } from "@/game/types";

type GameStateDebugProps = {
  gameState: GameState;
  onJumpToChapter2?: () => void;
};

export function GameStateDebug({
  gameState,
  onJumpToChapter2,
}: GameStateDebugProps) {
  const setDebugCurrentStep = useGameStore(
    (state) => state.setDebugCurrentStep,
  );
  const setDebugChapter2GameState = useGameStore(
    (state) => state.setDebugChapter2GameState,
  );

  function handleJumpToChapter2() {
    setDebugChapter2GameState();
    onJumpToChapter2?.();
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-6 pb-8">
      <details className="rounded-md border border-white/10 bg-card/[0.45]">
        <summary className="cursor-pointer px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Debug GameState JSON
        </summary>
        <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row sm:items-end">
          <label className="flex max-w-xs flex-1 flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              currentStep
            </span>
            <input
              className="rounded-md border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-ring"
              max={careerFlow.length - 1}
              min={0}
              type="number"
              value={gameState.currentStep}
              onChange={(event) => {
                const nextStep = Number(event.target.value);

                if (Number.isNaN(nextStep)) {
                  return;
                }

                setDebugCurrentStep(
                  Math.max(0, Math.min(nextStep, careerFlow.length - 1)),
                );
              }}
            />
          </label>
          <p className="text-xs text-muted-foreground">
            {careerFlow[gameState.currentStep] ?? "Final"}
          </p>
          <button
            className="rounded-md border border-primary/30 bg-primary/[0.08] px-3 py-2 text-sm font-medium text-primary transition-[border-color,background-color,transform] duration-150 ease-out hover:border-primary/50 hover:bg-primary/[0.14] active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
            type="button"
            onClick={handleJumpToChapter2}
          >
            Saltar a capítulo 2
          </button>
        </div>
        <pre className="max-h-96 overflow-auto border-t border-white/10 p-4 text-xs leading-5 text-muted-foreground">
          {JSON.stringify(gameState, null, 2)}
        </pre>
      </details>
    </section>
  );
}
