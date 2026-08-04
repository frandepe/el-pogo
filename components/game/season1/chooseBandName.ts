import type { EventOption, GameEvent } from "@/game/types";

export type BandNameOption = EventOption & {
  badge: string;
  title: string;
};

export type BandNameEvent = Omit<GameEvent, "options"> & {
  description: string;
  options: readonly BandNameOption[];
};

const chooseBandNameEventBase = {
  id: "choose-band-name",
  stepType: "Choice",
  text: "Elegir el nombre de la banda",
  description:
    "Ya no alcanza con decir 'la banda'. Si van a pegar afiches, subir demos y tocar en bares donde nadie pregunta dos veces, necesitan un nombre.",
} satisfies Omit<BandNameEvent, "options">;

export function createChooseBandNameEvent(
  options: readonly BandNameOption[],
): BandNameEvent {
  return {
    ...chooseBandNameEventBase,
    options,
  };
}
