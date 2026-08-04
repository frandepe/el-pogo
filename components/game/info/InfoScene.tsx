import type { InfoTone } from "@/game/types";
import type { ReactNode } from "react";

type InfoSceneProps = {
  actionDisabled?: boolean;
  actionLabel?: string;
  children: ReactNode;
  eyebrow?: string;
  media?: ReactNode;
  mediaPosition?: "before" | "after";
  title?: string;
  tone: InfoTone;
  onAction?: () => void;
};

const toneStyles: Record<
  InfoTone,
  {
    accent: string;
    glow: string;
    line: string;
    title: string;
  }
> = {
  positive: {
    accent: "text-[#d8b45f]",
    glow: "bg-[#d8b45f]/[0.05]",
    line: "from-transparent via-[#d8b45f]/70 to-transparent",
    title: "text-[#f1e7cf]",
  },
  neutral: {
    accent: "text-stone-300",
    glow: "bg-white/[0.025]",
    line: "from-transparent via-stone-300/30 to-transparent",
    title: "text-foreground",
  },
  negative: {
    accent: "text-[#b85a4c]",
    glow: "bg-[#7a211e]/[0.06]",
    line: "from-transparent via-[#9b332f]/65 to-transparent",
    title: "text-[#ead8d2]",
  },
};

export function InfoScene({
  actionDisabled = false,
  actionLabel,
  children,
  eyebrow,
  media,
  mediaPosition = "after",
  title,
  tone,
  onAction,
}: InfoSceneProps) {
  const styles = toneStyles[tone];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 py-14 text-center">
      {media && mediaPosition === "before" ? media : null}

      <div className="relative w-full overflow-hidden rounded-lg px-1 py-6">
        <div
          aria-hidden="true"
          className={[
            "absolute inset-x-10 top-0 h-px bg-gradient-to-r",
            styles.line,
          ].join(" ")}
        />
        <div
          aria-hidden="true"
          className={[
            "absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full blur-3xl",
            styles.glow,
          ].join(" ")}
        />

        <div className="relative flex flex-col items-center gap-4">
          {eyebrow ? (
            <p
              className={[
                "text-xs font-medium uppercase tracking-[0.18em]",
                styles.accent,
              ].join(" ")}
            >
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              className={[
                "font-heading text-4xl font-semibold sm:text-5xl",
                styles.title,
              ].join(" ")}
            >
              {title}
            </h2>
          ) : null}
          <div className="mx-auto flex max-w-2xl flex-col gap-4 text-balance text-xl leading-9 text-muted-foreground sm:text-2xl sm:leading-10">
            {children}
          </div>
        </div>
      </div>

      {media && mediaPosition === "after" ? media : null}

      {actionLabel && onAction ? (
        <button
          className="rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-[background-color,transform,opacity] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-colors motion-reduce:active:scale-100"
          disabled={actionDisabled}
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
