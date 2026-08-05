import Image from "next/image";
import { InfoScene } from "../info/InfoScene";

type Chapter2IntroProps = {
  onContinue: () => void;
};

export function Chapter2Intro({ onContinue }: Chapter2IntroProps) {
  return (
    <InfoScene
      actionLabel="Continuar"
      media={
        <Image
          alt="Logo del capítulo 2"
          className="h-auto w-full max-w-md object-contain"
          height={420}
          priority
          src="/seasons/chapter2.png"
          width={420}
        />
      }
      mediaPosition="before"
      tone="neutral"
      onAction={onContinue}
    >
      <p>Todo camino parece lógico cuando ya quedó atrás.</p>
    </InfoScene>
  );
}
