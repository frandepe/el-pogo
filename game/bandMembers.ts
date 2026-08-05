const bandMembers = ["Cantante", "Guitarrista", "Bajista", "Baterista"] as const;

type BandMember = (typeof bandMembers)[number];

export function replaceBandMemberMentions(
  text: string,
  playerRole: string,
  seed: string,
): string {
  const usedMembers = new Set<BandMember>();

  return text
    .replace(/\b([Ee])l (cantante|guitarrista|bajista|baterista|batero)\b/g, (
      _match,
      articleCase: string,
    ) => {
      const member = getRandomBandMember(playerRole, seed, usedMembers);
      const article = articleCase === "E" ? "El" : "el";

      return `${article} ${member.toLowerCase()}`;
    })
    .replace(
      /\bdel (cantante|guitarrista|bajista|baterista|batero)\b/g,
      () => {
        const member = getRandomBandMember(playerRole, seed, usedMembers);

        return `del ${member.toLowerCase()}`;
      },
    );
}

function getRandomBandMember(
  playerRole: string,
  seed: string,
  usedMembers: Set<BandMember>,
): BandMember {
  const availableMembers = bandMembers.filter((member) => member !== playerRole);
  const unusedMembers = availableMembers.filter((member) => !usedMembers.has(member));
  const candidatePool = unusedMembers.length > 0 ? unusedMembers : availableMembers;
  const member =
    candidatePool[getStableIndex(`${seed}:${usedMembers.size}`, candidatePool.length)];

  usedMembers.add(member);

  return member;
}

function getStableIndex(seed: string, length: number): number {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return hash % length;
}
