import { formatNarrativeText } from "@/game/narrativeText";
import { getShopItemStatus } from "@/game/shop";
import type { Effect, GameState, ShopItem } from "@/game/types";

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

type ShopItemCardProps = {
  gameState: GameState;
  item: ShopItem;
  onPurchase: (itemId: string) => void;
};

export function ShopItemCard({
  gameState,
  item,
  onPurchase,
}: ShopItemCardProps) {
  const status = getShopItemStatus(gameState, item);

  return (
    <article className={getCardClassName(status.type)}>
      <div>
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-heading text-lg font-medium">{item.name}</h4>
          <div className="grid shrink-0 justify-items-end gap-1">
            <p className="text-sm font-semibold text-primary">
              ${item.price.toLocaleString("es-AR")}
            </p>
            {status.type !== "available" &&
            status.type !== "insufficient-funds" ? (
              <span className="rounded-md border border-white/10 px-2 py-0.5 text-[11px] text-muted-foreground">
                {status.label}
              </span>
            ) : null}
          </div>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {formatNarrativeText(item.text, gameState, `shop:${item.id}`)}
        </p>
      </div>

      <div className="grid gap-3">
        <ul className="flex flex-wrap gap-2">
          {formatEffects(item.effects).map((effect) => (
            <li
              className={
                effect.isPositive
                  ? "rounded-md border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-1 text-xs text-emerald-200"
                  : "rounded-md border border-primary/20 bg-primary/[0.08] px-2 py-1 text-xs text-primary/90"
              }
              key={effect.label}
            >
              {effect.label}
            </li>
          ))}
        </ul>

        <button
          className="rounded-md border border-white/10 px-3 py-2 text-sm font-medium transition-[border-color,color,background-color,transform] duration-150 ease-out enabled:hover:border-primary/40 enabled:hover:bg-primary/[0.08] enabled:hover:text-foreground enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:text-muted-foreground/60 motion-reduce:transition-colors motion-reduce:enabled:active:scale-100"
          disabled={!status.canPurchase}
          type="button"
          onClick={() => onPurchase(item.id)}
        >
          {status.canPurchase ? "Comprar" : status.label}
        </button>
      </div>
    </article>
  );
}

function getCardClassName(statusType: ReturnType<typeof getShopItemStatus>["type"]) {
  const base =
    "flex min-h-56 flex-col justify-between gap-4 rounded-md border p-4";

  if (statusType === "completed") {
    return `${base} border-emerald-400/20 bg-emerald-400/[0.04]`;
  }

  if (statusType === "active") {
    return `${base} border-primary/30 bg-primary/[0.06]`;
  }

  if (statusType === "cooldown") {
    return `${base} border-amber-300/20 bg-amber-300/[0.04]`;
  }

  return `${base} border-white/10 bg-background/50`;
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
