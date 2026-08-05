"use client";

import { CinematicTransition } from "../cinematic/CinematicTransition";

type PhoneCallTransitionProps = {
  onContinue: () => void;
};

export function PhoneCallTransition({ onContinue }: PhoneCallTransitionProps) {
  return (
    <CinematicTransition
      actionLabel="Atender"
      alt="Grabador y teléfono durante las primeras repercusiones del demo"
      imageSrc="/pictures/rec.png"
      title="El teléfono sonó"
      onContinue={onContinue}
    >
      <p>El demo siguió pasando de mano en mano.</p>
      <p>Durante algunos días no pasó nada.</p>
      <p>Una tarde cualquiera, el teléfono empezó a sonar.</p>
      <p>Nadie conocía el número.</p>
    </CinematicTransition>
  );
}
