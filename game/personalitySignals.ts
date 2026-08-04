export const personalitySignalDefinitions = {
  impulsive: {
    label: "Impulsivo",
    description:
      "Actúa antes de pensar demasiado. Confía en el instinto y rara vez deja pasar una oportunidad.",
  },
  humble: {
    label: "Humilde",
    description:
      "Reconoce sus limites, valora el camino de aprendizaje y evita ponerse por encima del resto.",
  },
  fearless: {
    label: "Intrépido",
    description:
      "Se anima a decisiones inciertas, apuestas fuertes y movimientos que pueden salir muy bien o muy mal.",
  },
  discipline: {
    label: "Disciplinado",
    description:
      "Prioriza la práctica, la constancia y el trabajo sostenido incluso cuando no hay recompensa inmediata.",
  },
  pragmatic: {
    label: "Pragmático",
    description:
      "Elige lo que funciona, negocia con la realidad y toma decisiones utiles aunque no sean las mas romanticas.",
  },
  loyalty: {
    label: "Leal",
    description:
      "Cuida a la banda, respeta los vínculos y suele elegir el compromiso colectivo antes que la ventaja personal.",
  },
  egocentric: {
    label: "Egocéntrico",
    description:
      "Disfruta el reconocimiento, se afirma desde la confianza personal y puede priorizar su propia imágen.",
  },
  ambition: {
    label: "Ambicioso",
    description:
      "Apunta a crecer, ganar visibilidad y transformar cada oportunidad en un salto de carrera.",
  },
  authentic: {
    label: "Auténtico",
    description:
      "Sostiene una identidad propia, evita vender una imágen falsa y prefiere sonar verdadero antes que conveniente.",
  },
  creativity: {
    label: "Creativo",
    description:
      "Busca ideas propias, soluciones expresivas y caminos artisticos menos previsibles.",
  },
  perfectionist: {
    label: "Perfeccionista",
    description:
      "Persigue un resultado muy pulido, corrige detalles y puede exigirse de más para que todo salga bien.",
  },
  rebellion: {
    label: "Rebelde",
    description:
      "Desconfia de las reglas establecidas, abraza la incomodidad y prefiere hacer ruido antes que encajar.",
  },
  leader: {
    label: "Líder",
    description:
      "Tiende a tomar decisiones, asumir responsabilidades y conducir a la banda incluso cuando nadie se lo pide.",
  },
  charismatic: {
    label: "Carismático",
    description:
      "Genera cercania, arrastra al grupo desde la presencia personal y puede volverse una figura querida por sus decisiones.",
  },
  resilient: {
    label: "Resiliente",
    description:
      "Se levanta después de los fracasos, aprende de los golpes y sigue adelante incluso cuando todo parece salir mal.",
  },
} as const;

export type PersonalitySignal = keyof typeof personalitySignalDefinitions;

export const personalitySignals = Object.keys(
  personalitySignalDefinitions,
) as readonly PersonalitySignal[];
