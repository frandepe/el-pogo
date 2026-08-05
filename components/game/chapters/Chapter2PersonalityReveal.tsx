import { getPersonalityIdentity } from "@/game/personalityIdentity";
import type { GameState } from "@/game/types";

type Chapter2PersonalityRevealProps = {
  gameState: GameState;
  onContinue: () => void;
};

export function Chapter2PersonalityReveal({
  gameState,
  onContinue,
}: Chapter2PersonalityRevealProps) {
  const identity = getPersonalityIdentity(gameState);

  return (
    <section className="chapter-personality-reveal mx-auto flex min-h-[62dvh] w-full max-w-4xl flex-col items-center justify-center px-2 py-16 text-center">
      <div className="chapter-personality-reveal__card relative w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-card/[0.55] px-6 py-10 shadow-2xl shadow-black/30 sm:px-12 sm:py-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/[0.08] blur-3xl"
        />

        <div className="relative flex flex-col items-center gap-7">
          <p className="chapter-personality-reveal__eyebrow text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Tus decisiones dejaron una marca
          </p>

          <div className="chapter-personality-reveal__rule h-10 w-px bg-gradient-to-b from-primary/70 to-transparent" />

          <h2 className="chapter-personality-reveal__title text-balance font-heading text-5xl font-semibold text-foreground sm:text-7xl">
            {identity?.label ?? "En formación"}
          </h2>

          <p className="chapter-personality-reveal__copy max-w-xl text-balance text-xl leading-9 text-muted-foreground sm:text-2xl sm:leading-10">
            {identity?.copy ??
              "Todavía no hay una forma clara de nombrarlo. Pero algo de ustedes ya empezó a tomar forma."}
          </p>

          <button
            className="chapter-personality-reveal__action rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-[background-color,transform,opacity] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
            type="button"
            onClick={onContinue}
          >
            Seguir
          </button>
        </div>
      </div>
    </section>
  );
}
