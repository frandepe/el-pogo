import { InfoScene } from "../info/InfoScene";

type ChapterTransitionProps = {
  onContinue: () => void;
};

export function ChapterTransition({ onContinue }: ChapterTransitionProps) {
  return (
    <InfoScene
      actionLabel="Seguir ensayando"
      eyebrow="Capítulo I"
      title="Pasaron algunos meses..."
      tone="neutral"
      onAction={onContinue}
    >
      <p>
        Hace meses que ensayan juntos. Todavía nadie los conoce, pero la banda
        empieza a sonar mejor.
      </p>
    </InfoScene>
  );
}
