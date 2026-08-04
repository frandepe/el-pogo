export const roleOptions = [
  {
    id: "singer",
    name: "Cantante",
    image: "/rol/singer.png",
    description: "Presencia, carisma y una voz capaz de levantar a un muerto.",
  },
  {
    id: "guitarist",
    name: "Guitarrista",
    image: "/rol/guitarist.png",
    description:
      "Riffs filosos, solos eternos y el ego justo para robarse todos los aplausos.",
  },
  {
    id: "bassist",
    name: "Bajista",
    image: "/rol/bassist.png",
    description: "Groove, pulso y el peso que sostiene a toda la banda.",
  },
  {
    id: "drummer",
    name: "Baterista",
    image: "/rol/drummer.png",
    description:
      "Si perdés el ritmo, se va todo al carajo. La banda late con vos.",
  },
] as const;

export type RoleName = (typeof roleOptions)[number]["name"];
