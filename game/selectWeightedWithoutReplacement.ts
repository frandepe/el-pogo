import { weightedRandom } from "./weightedRandom";

export function selectWeightedWithoutReplacement<TItem>(
  items: readonly TItem[],
  amount: number,
  getWeight: (item: TItem) => number,
  getConflictKey?: (item: TItem) => string,
): readonly TItem[] {
  const pool = [...items];
  const selected: TItem[] = [];

  while (selected.length < amount && pool.length > 0) {
    const candidates = pool.map((item, index) => ({
      index,
      item,
      weight: getWeight(item),
    }));
    const selectedCandidate = weightedRandom(candidates);

    if (!selectedCandidate) {
      break;
    }

    const [item] = pool.splice(selectedCandidate.index, 1);

    selected.push(item);

    if (getConflictKey) {
      const conflictKey = getConflictKey(item);

      for (let index = pool.length - 1; index >= 0; index -= 1) {
        if (getConflictKey(pool[index]) === conflictKey) {
          pool.splice(index, 1);
        }
      }
    }
  }

  return selected;
}
