import type { GameState, ShopItem } from "@/game/types";
import { ShopItemCard } from "./ShopItemCard";

type ShopCategorySectionProps = {
  description: string;
  gameState: GameState;
  items: readonly ShopItem[];
  title: string;
  onPurchase: (itemId: string) => void;
};

export function ShopCategorySection({
  description,
  gameState,
  items,
  title,
  onPurchase,
}: ShopCategorySectionProps) {
  return (
    <section className="grid gap-3">
      <div>
        <h3 className="font-heading text-xl font-medium">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <ShopItemCard
            gameState={gameState}
            item={item}
            key={item.id}
            onPurchase={onPurchase}
          />
        ))}
      </div>
    </section>
  );
}
