import type { Effect } from "./types";

export function getEffectSignature(effects: Effect): string {
  return Object.entries(effects)
    .filter(([, value]) => value !== undefined && value !== 0)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
}
