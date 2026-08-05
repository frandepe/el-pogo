"use client";

import { formatNarrativeText } from "@/game/narrativeText";
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
      <p>
        {formatNarrativeText(
          repercussion.text,
          gameState,
          `first-demo-repercussion:${repercussion.title}`,
        )}
      </p>
    </InfoScene>
  );
}
