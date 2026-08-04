import type { GameState, PersonalitySignal } from "./types";
import { applyPersonalitySignals } from "./personality";
import { weightedRandom } from "./weightedRandom";

export type InterviewAnswerOption = {
  id: string;
  text: string;
  personalitySignal: PersonalitySignal;
};

export type InterviewQuestion = {
  id: string;
  question: string;
  options: readonly [
    InterviewAnswerOption,
    InterviewAnswerOption,
    InterviewAnswerOption,
    InterviewAnswerOption,
  ];
  weight?: number;
};

export type InterviewDefinition = {
  id: string;
  eyebrow?: string;
  title: string;
  interviewer: string;
  intro: string;
  questions: readonly [
    InterviewQuestion,
    InterviewQuestion,
    InterviewQuestion,
    InterviewQuestion,
    InterviewQuestion,
    InterviewQuestion,
    InterviewQuestion,
    InterviewQuestion,
  ];
};

export function validateInterviewDefinition(
  interview: InterviewDefinition,
): void {
  if (interview.questions.length !== 8) {
    throw new Error(`Interview must have exactly 8 questions: ${interview.id}`);
  }

  for (const question of interview.questions) {
    if (question.options.length !== 4) {
      throw new Error(
        `Interview question must have exactly 4 options: ${interview.id}/${question.id}`,
      );
    }

    const questionSignals = new Set<PersonalitySignal>();

    for (const option of question.options) {
      if (questionSignals.has(option.personalitySignal)) {
        throw new Error(
          `Interview question cannot repeat personality signals: ${interview.id}/${question.id}/${option.personalitySignal}`,
        );
      }

      questionSignals.add(option.personalitySignal);
    }
  }
}

export function selectInterviewQuestions(
  interview: InterviewDefinition,
): readonly [InterviewQuestion, InterviewQuestion, InterviewQuestion] {
  validateInterviewDefinition(interview);

  const pool = [...interview.questions];
  const selected: InterviewQuestion[] = [];

  while (selected.length < 3 && pool.length > 0) {
    const candidates = pool.map((question, index) => ({
      index,
      question,
      weight: question.weight,
    }));

    const selectedCandidate = weightedRandom(candidates);

    if (!selectedCandidate) {
      break;
    }

    const [question] = pool.splice(selectedCandidate.index, 1);
    selected.push(question);
  }

  if (selected.length !== 3) {
    throw new Error(`Interview could not select 3 questions: ${interview.id}`);
  }

  return [selected[0], selected[1], selected[2]];
}

export function applyInterviewAnswer(
  gameState: GameState,
  interview: InterviewDefinition,
  questionId: string,
  optionId: string,
): GameState {
  validateInterviewDefinition(interview);

  const question = interview.questions.find(
    (candidate) => candidate.id === questionId,
  );

  if (!question) {
    throw new Error(`Interview question not found: ${interview.id}/${questionId}`);
  }

  const option = question.options.find((candidate) => candidate.id === optionId);

  if (!option) {
    throw new Error(
      `Interview option not found: ${interview.id}/${questionId}/${optionId}`,
    );
  }

  const nextState = applyPersonalitySignals(gameState, [
    option.personalitySignal,
  ]);

  return {
    ...nextState,
    history: [
      ...nextState.history,
      {
        eventId: interview.id,
        optionId: `${question.id}:${option.id}`,
        personalitySignals: [option.personalitySignal],
      },
    ],
  };
}
