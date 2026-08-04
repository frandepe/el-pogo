import type { OptionRarity } from "@/game/types";

type ChoiceOptionCardProps = {
  badge: string;
  description: string;
  isSelected: boolean;
  rarity?: OptionRarity;
  rarityLabel?: string | null;
  title: string;
  onSelect: () => void;
};

export function ChoiceOptionCard({
  badge,
  description,
  isSelected,
  rarity = "common",
  rarityLabel,
  title,
  onSelect,
}: ChoiceOptionCardProps) {
  const isSpecial = rarity === "special";
  const isUncommon = rarity === "uncommon";

  return (
    <button
      aria-checked={isSelected}
      className={[
        "group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-lg border p-5 text-left outline-none",
        "transition-[transform,border-color,box-shadow,opacity,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-colors motion-reduce:hover:transform-none motion-reduce:active:scale-100",
        isSelected
          ? "border-[#d8b45f] bg-primary/[0.07] shadow-[0_0_0_1px_rgba(216,180,95,0.32),0_18px_55px_rgba(216,70,40,0.14)]"
          : isSpecial
            ? "border-[#d8b45f]/55 bg-card/[0.48] opacity-95 shadow-[0_0_0_1px_rgba(216,180,95,0.12),0_18px_52px_rgba(216,180,95,0.08)] hover:-translate-y-1 hover:border-[#f0d58a]/80 hover:bg-card/70 hover:shadow-[0_0_0_1px_rgba(216,180,95,0.18),0_18px_52px_rgba(216,180,95,0.12)]"
            : isUncommon
              ? "border-white/10 bg-card/[0.45] opacity-90 hover:-translate-y-1 hover:border-[#8f7640] hover:bg-card/70 hover:opacity-100 hover:shadow-[0_14px_40px_rgba(0,0,0,0.24)]"
              : "border-white/10 bg-card/[0.45] opacity-90 hover:-translate-y-1 hover:border-[#8f7640] hover:bg-card/70 hover:opacity-100 hover:shadow-[0_14px_40px_rgba(0,0,0,0.24)]",
      ].join(" ")}
      onClick={onSelect}
      role="radio"
      type="button"
    >
      <span
        className={[
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,180,95,0.16),transparent_54%)]",
          "transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        ].join(" ")}
      />
      <span
        className={[
          "pointer-events-none absolute inset-x-5 top-0 h-px bg-[#f0d58a]",
          "transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isSelected || isSpecial || isUncommon ? "opacity-80" : "opacity-0",
        ].join(" ")}
      />
      <span
        className={[
          "absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-[#d8b45f]",
          "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isSelected ? "scale-100 opacity-100" : "scale-75 opacity-0",
        ].join(" ")}
      />

      <span className="relative flex flex-col gap-3 pr-4">
        {rarityLabel ? (
          <span
            className={[
              "w-fit rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
              isSpecial
                ? "border-[#f0d58a]/55 bg-[#d8b45f]/12 text-[#f0d58a] shadow-[0_0_22px_rgba(216,180,95,0.12)]"
                : "border-[#d8b45f]/35 bg-[#d8b45f]/[0.08] text-[#d8b45f]",
            ].join(" ")}
          >
            {rarityLabel}
          </span>
        ) : null}
        <span className="font-heading text-2xl font-semibold">{title}</span>
        <span className="text-sm leading-6 text-muted-foreground">
          {description}
        </span>
      </span>

      <span className="relative mt-6 w-fit rounded-md border border-primary/20 bg-primary/[0.08] px-3 py-1.5 text-sm font-medium text-primary">
        {badge}
      </span>
    </button>
  );
}
