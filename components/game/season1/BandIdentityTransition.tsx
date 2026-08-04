import { InfoScene } from "../info/InfoScene";

type BandIdentityTransitionProps = {
  onContinue: () => void;
};

export function BandIdentityTransition({
  onContinue,
}: BandIdentityTransitionProps) {
  return (
    <InfoScene
      actionLabel="Seguir la historia"
      eyebrow="Capítulo I"
      title="La banda encuentra su identidad"
      tone="positive"
      onAction={onContinue}
    >
      <p>
        Todavía ensayan entre cables cruzados y amplificadores prestados, pero
        algo empieza a acomodarse. La banda ya tiene una personalidad propia y
        empieza a sonar mejor.
      </p>
    </InfoScene>
  );
}
