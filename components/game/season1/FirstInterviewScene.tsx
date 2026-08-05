"use client";

import type { InterviewDefinition } from "@/game/interviews";
import type { GameState } from "@/game/types";
import { InterviewEvent } from "../interview/InterviewEvent";
import { firstInterview } from "./firstInterview";

type FirstInterviewSceneProps = {
  gameState: GameState;
  onAnswer: (
    interview: InterviewDefinition,
    questionId: string,
    optionId: string,
  ) => void;
  onComplete: () => void;
};

export function FirstInterviewScene({
  gameState,
  onAnswer,
  onComplete,
}: FirstInterviewSceneProps) {
  return (
    <InterviewEvent
      gameState={gameState}
      interview={firstInterview}
      onAnswer={onAnswer}
      onComplete={onComplete}
    />
  );
}
