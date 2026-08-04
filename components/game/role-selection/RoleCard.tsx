import Image from "next/image";

type RoleCardProps = {
  description: string;
  image: string;
  isSelected: boolean;
  name: string;
  onSelect: () => void;
};

export function RoleCard({
  description,
  image,
  isSelected,
  name,
  onSelect,
}: RoleCardProps) {
  return (
    <button
      aria-checked={isSelected}
      className={[
        "group relative overflow-hidden rounded-lg border p-3 text-left outline-none",
        "transition-[transform,border-color,box-shadow,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none motion-reduce:hover:transform-none",
        isSelected
          ? "border-[#d8b45f] shadow-[0_0_0_1px_rgba(216,180,95,0.32),0_18px_55px_rgba(216,70,40,0.14)]"
          : "border-border opacity-85 hover:border-[#8f7640] hover:opacity-100 hover:shadow-[0_14px_40px_rgba(0,0,0,0.24)]",
        "hover:-translate-y-1 hover:scale-[1.015]",
      ].join(" ")}
      onClick={onSelect}
      role="radio"
      type="button"
    >
      <span
        className={[
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,180,95,0.18),transparent_52%)]",
          "transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        ].join(" ")}
      />
      <span
        className={[
          "pointer-events-none absolute inset-x-5 top-0 h-px bg-[#f0d58a]",
          "transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isSelected ? "opacity-80" : "opacity-0",
        ].join(" ")}
      />

      <span className="relative flex min-h-48 flex-col justify-between gap-3">
        <span className="relative flex h-36 items-end justify-center">
          <Image
            alt=""
            className={[
              "object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]",
              "transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              isSelected
                ? "scale-[1.04] opacity-100"
                : "opacity-75 group-hover:scale-[1.03] group-hover:opacity-95",
            ].join(" ")}
            fill
            sizes="(max-width: 768px) 50vw, 180px"
            src={image}
          />
        </span>

        <span className="flex flex-col gap-1">
          <span className="flex items-center justify-between gap-2">
            <span className="font-heading text-xl font-medium">{name}</span>
            <span
              className={[
                "h-2 w-2 rounded-full bg-[#d8b45f]",
                "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isSelected ? "scale-100 opacity-100" : "scale-75 opacity-0",
              ].join(" ")}
            />
          </span>
          <span className="text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        </span>
      </span>
    </button>
  );
}
