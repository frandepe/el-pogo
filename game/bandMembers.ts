const bandMembers = ["Cantante", "Guitarrista", "Bajista", "Baterista"] as const;

type BandMember = (typeof bandMembers)[number];

type BandMemberPlaceholder =
  | "randomBandMember"
  | "randomBandMemberPossessive"
  | "randomBandMemberWithArticle";

const bandMemberPlaceholderPattern =
  /\{(randomBandMember|randomBandMemberPossessive|randomBandMemberWithArticle)\}/g;

export function replaceBandMemberPlaceholders(
  text: string,
  playerRole: string,
  seed: string,
): string {
  const usedMembers = new Set<BandMember>();

  return text.replace(
    bandMemberPlaceholderPattern,
    (match, placeholder: BandMemberPlaceholder, offset: number) => {
      const member = getRandomBandMember(playerRole, seed, usedMembers);

      switch (placeholder) {
        case "randomBandMember":
          return member.toLowerCase();
        case "randomBandMemberPossessive":
          return `del ${member.toLowerCase()}`;
        case "randomBandMemberWithArticle": {
          const article = shouldCapitalizeArticle(text, offset) ? "El" : "el";

          return `${article} ${member.toLowerCase()}`;
        }
      }

      return match;
    },
  );
}

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
  const normalizedPlayerRole = normalizeBandMember(playerRole);
  const availableMembers = bandMembers.filter(
    (member) => member !== normalizedPlayerRole,
  );
  const unusedMembers = availableMembers.filter(
    (member) => !usedMembers.has(member),
  );
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

function normalizeBandMember(role: string): BandMember | undefined {
  const normalizedRole = role.trim().toLowerCase();

  if (normalizedRole === "batero") {
    return "Baterista";
  }

  return bandMembers.find((member) => member.toLowerCase() === normalizedRole);
}

function shouldCapitalizeArticle(text: string, offset: number): boolean {
  const prefix = text.slice(0, offset).trimEnd();

  return prefix.length === 0 || /[.!?¿¡]\s*$/.test(prefix);
}
