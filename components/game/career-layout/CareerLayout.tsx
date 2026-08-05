"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { GameState, ShopItem, StepType } from "@/game/types";
import { GameStateDebug } from "../debug/GameStateDebug";
import { ShopModal } from "../shop/ShopModal";
import { CareerSummaryPanel } from "./CareerSummaryPanel";

type CareerLayoutProps = {
  children: ReactNode;
  currentStep: StepType;
  gameState: GameState;
  shopItems: readonly ShopItem[];
  onBuyShopItem: (itemId: string) => void;
  onJumpToChapter2?: () => void;
  onRetire: () => void;
};

export function CareerLayout({
  children,
  currentStep,
  gameState,
  shopItems,
  onBuyShopItem,
  onJumpToChapter2,
  onRetire,
}: CareerLayoutProps) {
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <main className="min-h-dvh w-full">
      <CareerSummaryPanel
        currentStep={currentStep}
        gameState={gameState}
        onOpenShop={() => setIsShopOpen(true)}
        onRetire={onRetire}
      />
      <section className="mx-auto flex w-full max-w-4xl flex-col px-6 py-10 sm:py-12">
        {children}
      </section>
      <GameStateDebug
        gameState={gameState}
        onJumpToChapter2={onJumpToChapter2}
      />
      <ShopModal
        gameState={gameState}
        isOpen={isShopOpen}
        items={shopItems}
        onClose={() => setIsShopOpen(false)}
        onPurchase={onBuyShopItem}
      />
    </main>
  );
}
