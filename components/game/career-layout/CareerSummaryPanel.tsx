import { ShoppingCart } from "lucide-react";
import type { GameState, StepType } from "@/game/types";

const careerChapters = [
  {
    ageFrom: 18,
    ageTo: 20,
    label: "Capítulo 1: Los primeros acordes",
  },
  {
    ageFrom: 21,
    ageTo: 25,
    label: "Capítulo 2: Buscar un lugar",
  },
  {
    ageFrom: 26,
    ageTo: 35,
    label: "Capítulo 3: El momento de la verdad",
  },
  {
    ageFrom: 36,
    ageTo: 45,
    label: "Capítulo 4: Vivir de la música",
  },
  {
    ageFrom: 46,
    ageTo: 55,
    label: "Capítulo 5: El peso del nombre",
  },
  {
    ageFrom: 56,
    ageTo: 60,
    label: "Capítulo 6: El legado",
  },
] as const;

type CareerSummaryPanelProps = {
  currentStep: StepType;
  gameState: GameState;
  onOpenShop: () => void;
  onRetire: () => void;
};

export function CareerSummaryPanel({
  currentStep,
  gameState,
  onOpenShop,
  onRetire,
}: CareerSummaryPanelProps) {
  const currentChapter = getCurrentChapter(gameState.age);
  const primaryStats = [
    { label: "Fama", value: gameState.fame },
    { label: "Fans", value: formatNumber(gameState.fans) },
    { label: "Dinero", value: `$${formatNumber(gameState.money)}` },
  ];
  const attributes = [
    { label: "Talento", value: gameState.talent },
    { label: "Creatividad", value: gameState.creativity },
    { label: "Carisma", value: gameState.charisma },
    { label: "Reputación", value: gameState.reputation },
    { label: "Salud", value: gameState.health },
  ];
  const achievements = [
    { label: "Álbumes", value: gameState.albums },
    { label: "Conciertos", value: gameState.concerts },
    { label: "Grammys", value: gameState.grammys },
    { label: "Giras", value: gameState.worldTours },
  ].filter((achievement) => achievement.value > 0);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/[0.92] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 lg:w-72">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Carrera
          </p>
          <h1 className="mt-1 truncate font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {gameState.bandName || gameState.artistName}
          </h1>
          {gameState.bandName ? (
            <p className="mt-1 truncate text-sm text-muted-foreground">
              {gameState.artistName}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{gameState.role}</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span>{gameState.age} Años</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span>{currentChapter.label}</span>
          </div>
        </div>

        <dl className="grid flex-1 grid-cols-3 gap-2 sm:gap-3 lg:max-w-xl">
          {primaryStats.map((stat) => (
            <SummaryMetric
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </dl>

        <dl className="grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-5 lg:max-w-md">
          {attributes.map((stat) => (
            <AttributeMetric
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </dl>

        <div className="flex flex-col gap-3 lg:w-72 lg:items-end">
          {achievements.length > 0 ? (
            <dl className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
              {achievements.map((achievement) => (
                <AchievementCounter
                  key={achievement.label}
                  label={achievement.label}
                  value={achievement.value}
                />
              ))}
            </dl>
          ) : null}

          <div className="flex min-h-9 justify-end gap-2">
            <button
              aria-label="Abrir tienda"
              className="rounded-md border border-white/10 p-2 text-muted-foreground transition-[border-color,color,background-color,transform] duration-150 ease-out hover:border-primary/40 hover:bg-primary/[0.08] hover:text-foreground active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100"
              type="button"
              onClick={onOpenShop}
            >
              <ShoppingCart aria-hidden="true" size={18} />
            </button>
            <button
              className="rounded-md border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-[border-color,color,background-color,transform] duration-150 ease-out hover:border-primary/40 hover:bg-primary/[0.08] hover:text-foreground active:scale-[0.98] motion-reduce:transition-colors motion-reduce:active:scale-100"
              disabled={currentStep === "Final"}
              type="button"
              onClick={onRetire}
            >
              Retirarse
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

type SummaryMetricProps = {
  label: string;
  value: number | string;
};

function SummaryMetric({ label, value }: SummaryMetricProps) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/[0.08] px-3 py-2">
      <dt className="text-[11px] font-medium uppercase text-primary/80">
        {label}
      </dt>
      <dd className="mt-1 truncate text-lg font-semibold text-foreground">
        <span className="summary-metric-value inline-block" key={String(value)}>
          {value}
        </span>
      </dd>
    </div>
  );
}

type AttributeMetricProps = {
  label: string;
  value: number;
};

function AttributeMetric({ label, value }: AttributeMetricProps) {
  return (
    <div>
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

type AchievementCounterProps = {
  label: string;
  value: number;
};

function AchievementCounter({ label, value }: AchievementCounterProps) {
  return (
    <div className="text-right">
      <dt className="text-[10px] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function formatNumber(value: number) {
  return value.toLocaleString("es-AR");
}

function getCurrentChapter(age: number) {
  return (
    careerChapters.find(
      (chapter) => age >= chapter.ageFrom && age <= chapter.ageTo,
    ) ?? careerChapters[careerChapters.length - 1]
  );
}
