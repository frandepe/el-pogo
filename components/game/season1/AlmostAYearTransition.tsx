import { CinematicTransition } from "../cinematic/CinematicTransition";
import { calculateTimePassesResult } from "@/game/timePasses";
import type { GameState, TimePasses, TimePassesResult } from "@/game/types";

type AlmostAYearTransitionProps = {
  gameState: GameState;
  onApplyTimePasses: (timePasses: TimePasses) => void;
  onContinue: () => void;
};

const almostAYearTimePasses = {
  months: 11,
  intensity: "active",
} satisfies TimePasses;

export function AlmostAYearTransition({
  gameState,
  onApplyTimePasses,
  onContinue,
}: AlmostAYearTransitionProps) {
  const { effects } = calculateTimePassesResult(
    gameState,
    almostAYearTimePasses,
  );

  function handleContinue() {
    onApplyTimePasses(almostAYearTimePasses);
    onContinue();
  }

  return (
    <CinematicTransition
      actionLabel="Continuar"
      alt="Musicos bajo la lluvia durante una etapa de recitales"
      imagePriority
      imageSrc="/pictures/musicians-in-the-rain.png"
      summary={<TimePassesSummary effects={effects} />}
      title="Pasó casi un año"
      onContinue={handleContinue}
    >
      <p>Tocaron donde los dejaron tocar.</p>
      <p>Algunos recitales salieron bien.</p>
      <p>Otros fueron un desastre.</p>
      <p>Pero la banda siguió adelante.</p>
    </CinematicTransition>
  );
}

function TimePassesSummary({
  effects,
}: {
  effects: TimePassesResult["effects"];
}) {
  const metrics = [
    { label: "Recitales", value: effects.concerts },
    { label: "Fans", value: effects.fans },
    { label: "Fama", value: effects.fame },
    { label: "Dinero", value: effects.money },
  ].filter((metric) => typeof metric.value === "number" && metric.value > 0);

  return (
    <dl className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#f1e7cf]/44">
            {metric.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-[#f7efe1]/82">
            +{formatMetricValue(metric.label, metric.value ?? 0)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function formatMetricValue(label: string, value: number) {
  if (label === "Dinero") {
    return `$${value.toLocaleString("es-AR")}`;
  }

  return value.toLocaleString("es-AR");
}
