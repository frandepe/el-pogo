"use client";

import { useEffect, useRef, useState } from "react";
import type {
  InterviewAnswerOption,
  InterviewDefinition,
  InterviewQuestion,
} from "@/game/interviews";
import {
  selectInterviewQuestions,
  validateInterviewDefinition,
} from "@/game/interviews";

type InterviewEventProps = {
  interview: InterviewDefinition;
  onAnswer: (
    interview: InterviewDefinition,
    questionId: string,
    optionId: string,
  ) => void;
  onComplete: () => void;
};

const transitionMs = 220;

export function InterviewEvent({
  interview,
  onAnswer,
  onComplete,
}: InterviewEventProps) {
  validateInterviewDefinition(interview);

  const [selectedQuestions] = useState<
    readonly [InterviewQuestion, InterviewQuestion, InterviewQuestion]
  >(() => selectInterviewQuestions(interview));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const question = selectedQuestions[questionIndex];
  const progress = questionIndex + 1;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleAnswer(option: InterviewAnswerOption) {
    if (isTransitioning) {
      return;
    }

    setSelectedOptionId(option.id);
    setIsTransitioning(true);
    onAnswer(interview, question.id, option.id);

    timeoutRef.current = setTimeout(() => {
      if (questionIndex === selectedQuestions.length - 1) {
        onComplete();
        return;
      }

      setQuestionIndex((currentIndex) => currentIndex + 1);
      setSelectedOptionId(null);
      setIsTransitioning(false);
    }, transitionMs);
  }

  return (
    <section className="interview-event mx-auto flex w-full max-w-5xl flex-col gap-8 py-4">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {interview.eyebrow ?? "Entrevista"}
          </p>
          <h2 className="mt-2 font-heading text-4xl font-semibold text-foreground">
            {interview.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            {interview.intro}
          </p>
        </div>

        <div className="min-w-36 text-left sm:text-right">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Pregunta {progress} de {selectedQuestions.length}
          </p>
          <div
            aria-hidden="true"
            className="mt-3 grid grid-cols-3 gap-1.5"
          >
            {selectedQuestions.map((item, index) => (
              <span
                className={[
                  "h-1 rounded-full transition-[background-color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  index <= questionIndex
                    ? "bg-primary opacity-100"
                    : "bg-white/12 opacity-70",
                ].join(" ")}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="interview-event__panel"
        data-state={isTransitioning ? "leaving" : "entered"}
        key={question.id}
      >
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-card/[0.42] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b45f]/55 to-transparent"
          />
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <aside className="border-b border-white/10 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#d8b45f]">
                {interview.interviewer}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Grabador sobre la mesa. Una pregunta por vez. Afuera sigue el
                ruido del bar.
              </p>
            </aside>

            <div className="flex flex-col gap-6">
              <blockquote className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                <span aria-hidden="true" className="text-primary">
                  &ldquo;
                </span>
                {question.question}
                <span aria-hidden="true" className="text-primary">
                  &rdquo;
                </span>
              </blockquote>

              <div
                aria-label={question.question}
                className="grid gap-3"
                role="radiogroup"
              >
                {question.options.map((option) => (
                  <button
                    aria-checked={selectedOptionId === option.id}
                    className={[
                      "interview-event__answer rounded-md border px-4 py-4 text-left text-base leading-7 outline-none",
                      "transition-[background-color,border-color,color,opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "active:scale-[0.99] motion-reduce:transition-colors motion-reduce:active:scale-100",
                      selectedOptionId === option.id
                        ? "border-[#d8b45f]/70 bg-[#d8b45f]/[0.08] text-foreground"
                        : "border-white/10 bg-background/30 text-muted-foreground hover:border-[#d8b45f]/45 hover:bg-secondary/60 hover:text-foreground",
                    ].join(" ")}
                    disabled={isTransitioning}
                    key={option.id}
                    role="radio"
                    type="button"
                    onClick={() => handleAnswer(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
