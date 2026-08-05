import { careerFlow } from "./flow";
import { personalitySignals } from "./personalitySignals";
import { recalculatePersonalityTraits } from "./personality";
import type {
  CareerHistoryEntry,
  GameState,
  PersonalitySignal,
} from "./types";

export function createDebugChapter2GameState(gameState: GameState): GameState {
  const personalitySignalCounts = createRandomPersonalitySignals();
  const chapter2StartStep = Math.max(1, careerFlow.indexOf("Upgrade"));
  const history = createChapter1History(personalitySignalCounts);

  return recalculatePersonalityTraits({
    ...gameState,
    artistName: gameState.artistName || "Artista Dev",
    bandName: gameState.bandName || randomFrom(bandNames),
    role: gameState.role || randomFrom(roles),
    currentStep: chapter2StartStep,
    age: 21,
    fame: randomInt(4, 10),
    fans: randomInt(180, 650),
    money: randomInt(120, 950),
    talent: randomInt(28, 36),
    creativity: randomInt(28, 38),
    charisma: randomInt(24, 34),
    reputation: randomInt(2, 11),
    health: randomInt(88, 100),
    albums: 0,
    concerts: randomInt(6, 13),
    awards: 0,
    grammys: 0,
    worldTours: 0,
    recordDeals: 0,
    bandBreakups: 0,
    personalitySignals: personalitySignalCounts,
    history,
  });
}

function createRandomPersonalitySignals() {
  const shuffledSignals = shuffle([...personalitySignals]);
  const selectedSignals = shuffledSignals.slice(0, randomInt(7, 10));

  return selectedSignals.reduce<Partial<Record<PersonalitySignal, number>>>(
    (counts, signal, index) => ({
      ...counts,
      [signal]: randomInt(index < 4 ? 2 : 1, index < 4 ? 3 : 2),
    }),
    {},
  );
}

function createChapter1History(
  personalitySignalCounts: Partial<Record<PersonalitySignal, number>>,
): readonly CareerHistoryEntry[] {
  const dominantSignals = [...personalitySignals]
    .filter((signal) => (personalitySignalCounts[signal] ?? 0) > 0)
    .sort(
      (left, right) =>
        (personalitySignalCounts[right] ?? 0) -
        (personalitySignalCounts[left] ?? 0),
    );

  return [
    {
      eventId: "debug-chapter-1",
      optionId: "completed",
      personalitySignals: dominantSignals.slice(0, 3),
    },
    {
      eventId: "first-demo-production",
      optionId: `outcome:${randomFrom(["acceptable", "good", "excellent"])}`,
    },
  ];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

const bandNames = [
  "Los Subsuelo",
  "Ruta de Escape",
  "La Fiebre del Garage",
  "Cable Pelado",
  "Noche de Ensayo",
] as const;

const roles = ["Cantante", "Guitarrista", "Bajista", "Baterista"] as const;
