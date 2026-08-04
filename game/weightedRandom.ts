export type WeightedCandidate = {
  weight?: number;
};

export function weightedRandom<TCandidate extends WeightedCandidate>(
  candidates: readonly TCandidate[],
): TCandidate | undefined {
  if (candidates.length === 0) {
    return undefined;
  }

  const totalWeight = candidates.reduce(
    (total, candidate) => total + getCandidateWeight(candidate),
    0,
  );

  let threshold = Math.random() * totalWeight;

  for (const candidate of candidates) {
    threshold -= getCandidateWeight(candidate);

    if (threshold <= 0) {
      return candidate;
    }
  }

  return candidates[candidates.length - 1];
}

function getCandidateWeight(candidate: WeightedCandidate): number {
  return Math.max(candidate.weight ?? 1, 0);
}
