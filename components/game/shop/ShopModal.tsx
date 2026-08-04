"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import type { GameState, ShopCategory, ShopItem } from "@/game/types";
import { ShopCategorySection } from "./ShopCategorySection";

const categoryLabels: Record<ShopCategory, string> = {
  career: "Mejoran el juego",
  contract: "Contratos",
  luxury: "Lujos",
};

const categoryDescriptions: Record<ShopCategory, string> = {
  career: "Inversiones que empujan tu carrera y cambian cómo venís creciendo.",
  contract: "Servicios temporales para resolver objetivos concretos de la carrera.",
  luxury: "Caprichos de rockstar: pueden sumar mística, quilombo o las dos cosas.",
};

const categoryOrder: readonly ShopCategory[] = ["career", "contract", "luxury"];

type ShopModalProps = {
  gameState: GameState;
  isOpen: boolean;
  items: readonly ShopItem[];
  onClose: () => void;
  onPurchase: (itemId: string) => void;
};

export function ShopModal({
  gameState,
  isOpen,
  items,
  onClose,
  onPurchase,
}: ShopModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="career-shop-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
    >
      <button
        aria-label="Cerrar tienda"
        className="absolute inset-0 cursor-default"
        type="button"
        onClick={onClose}
      />
      <div className="relative flex max-h-[88dvh] w-full max-w-5xl flex-col overflow-hidden rounded-md border border-white/10 bg-card shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Tienda
            </p>
            <h2
              className="mt-1 font-heading text-2xl font-semibold"
              id="career-shop-title"
            >
              Compras de carrera
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Dinero disponible: ${gameState.money.toLocaleString("es-AR")}
            </p>
          </div>
          <button
            aria-label="Cerrar tienda"
            className="rounded-md border border-white/10 p-2 text-muted-foreground transition-[border-color,color,background-color,transform] duration-150 ease-out hover:border-primary/40 hover:bg-primary/[0.08] hover:text-foreground active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">
          <div className="grid gap-6">
            {categoryOrder.map((category) => {
              const categoryItems = items.filter(
                (item) => item.category === category,
              );

              if (categoryItems.length === 0) {
                return null;
              }

              return (
                <ShopCategorySection
                  description={categoryDescriptions[category]}
                  gameState={gameState}
                  items={categoryItems}
                  key={category}
                  title={categoryLabels[category]}
                  onPurchase={onPurchase}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
