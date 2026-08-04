import type { SeasonDecisionEvent } from "./firstSeriousRehearsal";

export const firstReviewEvent = {
  id: "first-review",
  stepType: "Choice",
  text: "La primera crítica",
  description:
    'Una cuenta de Instagram dedicada a recomendar bandas emergentes publicó una reseña del recital. No tiene miles de seguidores, pero es la primera vez que alguien que no conoce a la banda opina públicamente sobre su música. El titular dice: "Una banda más del montón"',
  options: [
    {
      id: "prove-them-wrong",
      title: "Demostrarles que están equivocados",
      text: "No respondés nada. Cerrás Instagram y pensás una sola cosa: en el próximo recital le tapamos la boca.",
      badge: "+2 Talento / +1 Disciplina",
      effects: {
        talent: 2,
        health: -1,
      },
      personalitySignals: ["discipline", "ambition"],
    },
    {
      id: "share-and-thank",
      title: "Agradecer la sinceridad",
      text: "No era la crítica que querían leer, pero alguien se tomó el tiempo de escucharlos. Eso ya vale algo.",
      badge: "+2 Reputación / +1 Carisma",
      effects: {
        reputation: 2,
        charisma: 1,
      },
      personalitySignals: ["humble", "charismatic"],
    },
    {
      id: "reply-publicly",
      title: "Responder públicamente",
      text: "Si ellos tienen una opinión, nosotros también. La discusión queda abierta para que la vea todo el mundo.",
      badge: "+2 Carisma / -2 Reputación",
      effects: {
        charisma: 2,
        reputation: -2,
      },
      personalitySignals: ["rebellion", "egocentric"],
    },
    {
      id: "pretend-not-to-care",
      title: "Hacer como que no importa",
      text: "Decís que ni la leíste. La leíste. Pero preferís gastar la energía ensayando antes que discutiendo con desconocidos.",
      badge: "+2 Salud / +1 Talento",
      effects: {
        health: 2,
        talent: 1,
      },
      personalitySignals: ["authentic", "pragmatic"],
    },
    {
      id: "ask-for-feedback",
      title: "Pedir más detalles",
      text: "Les escribís por privado. Si te van a pegar, por lo menos que te expliquen dónde.",
      badge: "+2 Talento / +1 Creatividad",
      effects: {
        talent: 2,
        creativity: 1,
      },
      personalitySignals: ["perfectionist", "pragmatic"],
    },
    {
      id: "ignore-review",
      title: "Seguir como si nada",
      text: "Una opinión no cambia una banda. El próximo ensayo sigue siendo mañana.",
      badge: "+2 Salud / +1 Reputación",
      effects: {
        health: 2,
        reputation: 1,
      },
      personalitySignals: ["pragmatic"],
    },
    {
      id: "make-fun",
      title: "Tomárselo para la joda",
      text: "Subís la captura con la frase 'Una banda más del montón' y escribís: 'Por ahora'.",
      badge: "+2 Fama / -1 Reputación",
      effects: {
        fame: 2,
        reputation: -1,
      },
      personalitySignals: ["rebellion", "charismatic"],
      rarity: "uncommon",
    },
    {
      id: "invite-reviewer",
      title: "Invitarlo al próximo recital",
      text: "Le mandás un mensaje: 'Vení de nuevo. Si seguís pensando lo mismo, te invito una cerveza'.",
      badge: "+2 Reputación / +1 Fama",
      effects: {
        reputation: 2,
        fame: 1,
      },
      personalitySignals: ["ambition", "charismatic"],
      rarity: "uncommon",
    },
    {
      id: "read-with-band",
      title: "Leerla entre todos",
      text: "La llevan al ensayo. Nadie habla durante un rato. Después empiezan a discutir qué parte tiene razón.",
      badge: "+3 Reputación",
      effects: {
        reputation: 3,
      },
      personalitySignals: ["loyalty", "discipline"],
    },
    {
      id: "write-a-song",
      title: "Escribir una canción",
      text: "Cada palabra de esa crítica termina en una hoja. Si nos van a pegar, que por lo menos nos inspiren",
      badge: "+3 Creatividad",
      effects: {
        creativity: 3,
      },
      personalitySignals: ["authentic", "resilient"],
      rarity: "special",
    },
  ],
} satisfies SeasonDecisionEvent;
