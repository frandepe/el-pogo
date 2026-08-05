"use client";

import type { GameState } from "@/game/types";
import { InfoScene } from "../info/InfoScene";
import { getFirstDemoRepercussion } from "./firstDemoRepercussion";

type FirstDemoRepercussionSummaryProps = {
  gameState: GameState;
  onContinue: () => void;
};

export function FirstDemoRepercussionSummary({
  gameState,
  onContinue,
}: FirstDemoRepercussionSummaryProps) {
  const repercussion = getFirstDemoRepercussion(gameState);

  return (
    <InfoScene
      actionLabel={repercussion.cta}
      eyebrow={repercussion.eyebrow}
      title={repercussion.title}
      tone={repercussion.tone}
      onAction={onContinue}
    >
      <p>{repercussion.text}</p>
    </InfoScene>
  );
}
