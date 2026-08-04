import type { SeasonDecisionEvent } from "./firstSeriousRehearsal";

export const firstInternalConflictEvent = {
  id: "first-internal-conflict",
  stepType: "Choice",
  text: "Siempre llega tarde",
  description:
    'Al principio causaba gracia. Después empezó a molestar. Ahora cada ensayo arranca con la misma pregunta: "¿Esperamos un rato más o empezamos sin él?"',
  options: [
    {
      id: "start-without-him",
      title: "Empezar sin él",
      text: "La banda no puede depender de una persona que nunca mira el reloj. Cuando llegue, que se suba al tren andando.",
      badge: "+2 Talento / -1 Reputación",
      effects: {
        talent: 2,
        reputation: -1,
      },
      personalitySignals: ["discipline", "pragmatic"],
    },
    {
      id: "wait-and-talk",
      title: "Esperarlo y hablarlo bien",
      text: "No querés armar un juicio en ausencia. Lo esperan, pero esta vez la charla no se patea para otro día.",
      badge: "+2 Reputación / +1 Salud",
      effects: {
        reputation: 2,
        health: 1,
      },
      personalitySignals: ["loyalty", "humble"],
    },
    {
      id: "set-fifteen-minute-rule",
      title: "Poner la regla de los quince minutos",
      text: "Si pasaron quince minutos, el ensayo arranca. No hay gritos, no hay drama, no hay asamblea eterna.",
      badge: "+2 Talento / +1 Salud",
      effects: {
        talent: 2,
        health: 1,
      },
      personalitySignals: ["discipline", "pragmatic"],
    },
    {
      id: "call-him-out",
      title: "Decírselo de frente",
      text: "Apenas cruza la puerta, se lo decís sin anestesia. Si quiere una banda, que venga a una banda.",
      badge: "+2 Liderazgo / -2 Salud",
      effects: {
        reputation: 1,
        health: -2,
      },
      personalitySignals: ["leader", "rebellion"],
    },
    {
      id: "make-a-joke",
      title: "Convertirlo en chiste",
      text: "Le reciben la entrada con aplausos irónicos y una ovación como si volviera de una gira mundial. Capaz entiende. Capaz no.",
      badge: "+2 Carisma / -1 Talento",
      effects: {
        charisma: 2,
        talent: -1,
      },
      personalitySignals: ["charismatic", "rebellion"],
    },
    {
      id: "ask-what-is-going-on",
      title: "Preguntar qué le pasa",
      text: "Antes de tratarlo como un irresponsable, querés saber si hay algo atrás. A veces una llegada tarde es apenas la parte visible.",
      badge: "+3 Reputación",
      effects: {
        reputation: 3,
      },
      personalitySignals: ["loyalty", "humble"],
    },
    {
      id: "move-rehearsal-time",
      title: "Cambiar el horario",
      text: "No es romántico, pero si todos llegan mejor una hora más tarde, quizás el problema no era moral: era logística.",
      badge: "+2 Salud / +1 Reputación",
      effects: {
        health: 2,
        reputation: 1,
      },
      personalitySignals: ["pragmatic"],
    },
    {
      id: "record-without-him",
      title: "Grabar el ensayo sin él",
      text: "Dejan todo registrado. Cuando escuche lo que se perdió, capaz entiende que la banda sigue sonando aunque él no esté.",
      badge: "+2 Talento / +1 Creatividad",
      effects: {
        talent: 2,
        creativity: 1,
      },
      personalitySignals: ["discipline", "creativity"],
      rarity: "uncommon",
    },
    {
      id: "change-time-for-him",
      title: "Cambiar la hora... solo para él",
      text: "A partir de ahora, a él siempre le dicen que el ensayo empieza una hora antes.",
      badge: "+2 Salud / +1 Creatividad",
      effects: {
        health: 2,
        creativity: 1,
      },
      personalitySignals: ["creativity", "pragmatic"],
      rarity: "special",
    },
    {
      id: "threaten-replacement",
      title: "Tirar la palabra reemplazo",
      text: "No decís que ya buscaron a alguien. Pero la palabra queda flotando en la sala como un amplificador acoplado.",
      badge: "+2 Talento / -3 Reputación",
      effects: {
        talent: 2,
        reputation: -3,
      },
      personalitySignals: ["ambition", "leader"],
      rarity: "uncommon",
    },
    {
      id: "make-him-open-room",
      title: "Darle la llave de la sala",
      text: "Si llega tarde, llegan tarde todos. La responsabilidad deja de ser una idea y se vuelve una llave fría en el bolsillo.",
      badge: "+2 Disciplina / +1 Reputación",
      effects: {
        talent: 1,
        reputation: 2,
      },
      personalitySignals: ["leader", "discipline"],
    },
    {
      id: "split-rehearsal-cost",
      title: "Cobrarle la hora perdida",
      text: "La sala no espera gratis. Si su demora cuesta plata, que por lo menos el costo no lo pague toda la banda.",
      badge: "+1 Dinero / -2 Carisma",
      effects: {
        money: 20,
        charisma: -2,
      },
      personalitySignals: ["pragmatic", "discipline"],
    },
    {
      id: "let-it-pass",
      title: "Dejarlo pasar una vez más",
      text: "No querés pudrirla. Tocan poco, hablan menos y todos fingen que el silencio no dice nada.",
      badge: "+1 Salud / -2 Talento",
      effects: {
        health: 1,
        talent: -2,
      },
      personalitySignals: ["humble"],
    },
    {
      id: "band-meeting",
      title: "Hacer reunión de banda",
      text: "Sin instrumentos, sin ruido, sin excusas. Una mesa, cuatro sillas y la pregunta incómoda: ¿queremos lo mismo?",
      badge: "+2 Reputación / +1 Talento",
      effects: {
        reputation: 2,
        talent: 1,
      },
      personalitySignals: ["leader", "loyalty"],
    },
    {
      id: "turn-late-entry-into-show",
      title: "Usarlo como parte del show",
      text: "Si siempre entra tarde, que entre tarde con estilo. Lo convierten en una intro absurda que el público empieza a esperar.",
      badge: "+2 Fama / +2 Carisma / -1 Reputación",
      effects: {
        fame: 2,
        charisma: 2,
        reputation: -1,
      },
      personalitySignals: ["charismatic", "creativity"],
      rarity: "special",
    },
  ],
} satisfies SeasonDecisionEvent;
