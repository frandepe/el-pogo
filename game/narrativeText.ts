import {
  replaceBandMemberMentions,
  replaceBandMemberPlaceholders,
} from "./bandMembers";
import type { GameState } from "./types";

export function formatNarrativeText(
  text: string,
  gameState: Pick<GameState, "role">,
  seed: string,
): string {
  return replaceBandMemberPlaceholders(
    replaceBandMemberMentions(text, gameState.role, seed),
    gameState.role,
    seed,
  );
}
