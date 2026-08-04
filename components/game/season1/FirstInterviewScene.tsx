"use client";

import type { InterviewDefinition } from "@/game/interviews";
import { InterviewEvent } from "../interview/InterviewEvent";
import { firstInterview } from "./firstInterview";

type FirstInterviewSceneProps = {
  onAnswer: (
    interview: InterviewDefinition,
    questionId: string,
    optionId: string,
  ) => void;
  onComplete: () => void;
};

export function FirstInterviewScene({
  onAnswer,
  onComplete,
}: FirstInterviewSceneProps) {
  return (
    <InterviewEvent
      interview={firstInterview}
      onAnswer={onAnswer}
      onComplete={onComplete}
    />
  );
}
