import { getOptionRarityLabel } from "@/game/optionRarity";
import type {
  CareerResult,
  GameEvent,
  GameState,
  ShopCategory,
  ShopItem,
  StepType,
} from "@/game/types";
import { InfoScene } from "./info/InfoScene";
import { StatCard } from "./StatCard";
import { ShopCategorySection } from "./shop/ShopCategorySection";

const shopCategoryLabels: Record<ShopCategory, string> = {
  career: "Mejoran el juego",
  contract: "Contratos",
  luxury: "Lujos",
};

const shopCategoryDescriptions: Record<ShopCategory, string> = {
  career: "Inversiones permanentes para fortalecer tu carrera.",
  contract: "Servicios temporales con reglas propias de disponibilidad.",
  luxury: "Caprichos caros que también cuentan tu historia.",
};

const shopCategoryOrder: readonly ShopCategory[] = [
  "career",
  "contract",
  "luxury",
];

type CareerStepContentProps = {
  careerResult: CareerResult;
  currentEvent: GameEvent | undefined;
  currentStep: StepType;
  gameState: GameState;
  shopItems: readonly ShopItem[];
  onAdvanceStep: () => void;
  onChooseOption: (eventId: string, optionId: string) => void;
  onFinishCareer: () => void;
  onPurchaseShopItem: (itemId: string) => void;
  onResetCareer: () => void;
};

export function CareerStepContent({
  careerResult,
  currentEvent,
  currentStep,
  gameState,
  shopItems,
  onAdvanceStep,
  onChooseOption,
  onFinishCareer,
  onPurchaseShopItem,
  onResetCareer,
}: CareerStepContentProps) {
  if (currentStep === "Upgrade") {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-3xl font-medium">Ensayo</h2>
        <p className="max-w-2xl text-muted-foreground">
          La sala está libre y todavía queda algo de energía.
        </p>
        <button
          className="w-fit rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
          type="button"
          onClick={onAdvanceStep}
        >
          Continuar
        </button>
      </section>
    );
  }

  if (currentStep === "Choice") {
    return (
      <section className="flex flex-col gap-6">
        {currentEvent ? (
          <>
            <p className="max-w-3xl text-xl leading-9 text-foreground">
              {currentEvent.text}
            </p>
            <div className="grid gap-3">
              {currentEvent.options.map((option) => {
                const rarityLabel = getOptionRarityLabel(option);
                const isSpecial = option.rarity === "special";

                return (
                  <button
                    className={[
                      "rounded-md border bg-card/[0.45] px-4 py-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.99] motion-reduce:transition-colors motion-reduce:active:scale-100",
                      isSpecial
                        ? "border-[#d8b45f]/55 shadow-[0_0_0_1px_rgba(216,180,95,0.12),0_18px_52px_rgba(216,180,95,0.08)] hover:border-[#f0d58a]/80 hover:bg-secondary"
                        : "border-white/10 hover:border-primary/30 hover:bg-secondary",
                    ].join(" ")}
                    key={option.id}
                    type="button"
                    onClick={() => onChooseOption(currentEvent.id, option.id)}
                  >
                    {rarityLabel ? (
                      <span className="mb-2 inline-flex rounded-full border border-[#d8b45f]/35 bg-[#d8b45f]/[0.08] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d8b45f]">
                        {rarityLabel}
                      </span>
                    ) : null}
                    <span className="block">{option.text}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <button
            className="w-fit rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
            type="button"
            onClick={onAdvanceStep}
          >
            Continuar
          </button>
        )}
      </section>
    );
  }

  if (currentStep === "Info") {
    return (
      <InfoScene
        actionLabel="Continuar"
        eyebrow="Capítulo I"
        title="La carrera sigue"
        tone="neutral"
        onAction={onAdvanceStep}
      >
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <StatCard label="Fama" value={gameState.fame} />
          <StatCard label="Dinero" value={gameState.money} />
          <StatCard label="Talento" value={gameState.talent} />
          <StatCard label="Creatividad" value={gameState.creativity} />
          <StatCard label="Reputación" value={gameState.reputation} />
        </dl>
      </InfoScene>
    );
  }

  if (currentStep === "Shop") {
    return (
      <section className="flex flex-col gap-5">
        <div>
          <h2 className="font-heading text-3xl font-medium">Tienda</h2>
          <p className="text-muted-foreground">
            Dinero disponible: ${gameState.money}
          </p>
        </div>

        {shopItems.length > 0 ? (
          <div className="grid gap-6">
            {shopCategoryOrder.map((category) => {
              const categoryItems = shopItems.filter(
                (item) => item.category === category,
              );

              if (categoryItems.length === 0) {
                return null;
              }

              return (
                <ShopCategorySection
                  description={shopCategoryDescriptions[category]}
                  gameState={gameState}
                  items={categoryItems}
                  key={category}
                  title={shopCategoryLabels[category]}
                  onPurchase={onPurchaseShopItem}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No hay compras disponibles con tu estado actual.
          </p>
        )}

        <button
          className="w-fit rounded-md border border-white/10 px-4 py-2 transition-[border-color,background-color,transform] duration-150 ease-out hover:border-primary/30 hover:bg-secondary active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
          type="button"
          onClick={onAdvanceStep}
        >
          Seguir sin comprar
        </button>
      </section>
    );
  }

  if (currentStep === "Final") {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-3xl font-medium">Final</h2>
        <p className="text-xl font-semibold">{careerResult.ending}</p>
        <p className="text-muted-foreground">
          Puntaje final: {careerResult.score}
        </p>
        <p className="text-muted-foreground">
          Decisiones tomadas: {gameState.history.length}
        </p>
        <div className="flex gap-3">
          <button
            className="rounded-md border border-white/10 px-4 py-2 transition-[border-color,background-color,transform] duration-150 ease-out hover:border-primary/30 hover:bg-secondary active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
            type="button"
            onClick={onResetCareer}
          >
            Nueva carrera
          </button>
          <button
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
            type="button"
            onClick={onFinishCareer}
          >
            Cerrar carrera
          </button>
        </div>
      </section>
    );
  }

  return null;
}
