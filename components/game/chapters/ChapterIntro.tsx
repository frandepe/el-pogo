import Image from "next/image";
import { InfoScene } from "../info/InfoScene";

type ChapterIntroProps = {
  onContinue: () => void;
};

export function ChapterIntro({ onContinue }: ChapterIntroProps) {
  return (
    <InfoScene
      actionLabel="Subir al escenario"
      media={
        <Image
          alt="Logo del capítulo Los primeros acordes"
          className="h-auto w-full max-w-md object-contain"
          height={420}
          priority
          src="/seasons/chapter1.png"
          width={420}
        />
      }
      mediaPosition="before"
      tone="neutral"
      onAction={onContinue}
    >
      <p>
        Hoy sos un pibe con una banda. Lo que pase de acá en adelante depende
        de vos.
      </p>
    </InfoScene>
  );
}
