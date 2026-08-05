import type { SeasonDecisionEvent } from "./firstSeriousRehearsal";

export const firstMoneyEvent = {
  id: "first-money",
  stepType: "Choice",
  text: "¿Qué hacemos con la plata?",
  description:
    "Después de repartir la plata entre los cuatro, te quedaron $45. ¿Qué hacés con tu parte?",
  emergencyOption: {
    id: "keep-the-coins",
    title: "No mover un peso",
    text: "No alcanza para nada de lo que imaginabas. Guardás lo poco que queda y aceptás que esta vez la decisión la tomó la billetera.",
    badge: "-1 Reputación / +1 Salud",
    effects: {
      reputation: -1,
      health: 1,
    },
    personalitySignals: ["pragmatic", "resilient"],
  },
  options: [
    {
      id: "buy-working-cables",
      title: "Poner para cables que anden",
      text: "No te hace mejor músico. Pero capaz el próximo ensayo no se corta cada dos temas.",
      badge: "+2 Salud / +1 Creatividad / -$35",
      effects: {
        health: 2,
        creativity: 1,
        money: -35,
      },
      personalitySignals: ["discipline", "pragmatic"],
    },
    {
      id: "print-flyers",
      title: "Pagar unos afiches",
      text: "Tu parte alcanza para una tanda chica. Si nadie sabe que existen, el próximo show va a ser para las mismas cuarenta caras.",
      badge: "+2 Fama / -$25",
      effects: {
        fame: 2,
        money: -25,
      },
      personalitySignals: ["ambition"],
    },
    {
      id: "split-and-go-home",
      title: "Guardar tu parte y volver a casa",
      text: "Cada uno se lleva lo suyo. No hay épica, pero por primera vez volvés con plata ganada arriba de un escenario.",
      badge: "+1 Salud / +1 Reputación",
      effects: {
        health: 1,
        reputation: 1,
      },
      personalitySignals: ["pragmatic", "discipline"],
    },
    {
      id: "make-tshirts",
      title: "Aportar para las primeras remeras",
      text: "Todavía no llenan lugares, pero ya pueden tener algo que alguien quiera ponerse.",
      badge: "+2 Fama / +1 Carisma / -$45",
      effects: {
        fame: 2,
        charisma: 1,
        money: -45,
      },
      personalitySignals: ["ambition", "creativity"],
    },
    {
      id: "buy-beer",
      title: "Patinarse todo en la barra",
      text: "La historia del rock puede esperar. Esta noche se festeja.",
      badge: "+2 Carisma / -$45",
      effects: {
        charisma: 2,
        money: -45,
      },
      personalitySignals: ["fearless", "rebellion"],
    },
    {
      id: "first-date",
      title: "Invitar a salir a esa persona",
      text: "No sabés si va a decir que sí. Pero si esperás a llenar estadios, capaz ya es tarde.",
      badge: "+2 Salud / +1 Carisma / -$30",
      effects: {
        health: 2,
        charisma: 1,
        money: -30,
      },
      personalitySignals: ["fearless", "humble"],
    },
    {
      id: "supporters-asado",
      title: "Poner para un asado de agradecimiento",
      text: "El técnico, el amigo del flete, la piba que prestó el micrófono. Tu parte ayuda a que la primera plata vuelva a la mesa correcta.",
      badge: "+3 Reputación / +1 Carisma / -$25",
      effects: {
        reputation: 3,
        charisma: 1,
        money: -25,
      },
      personalitySignals: ["loyalty", "humble"],
    },
    {
      id: "buy-stage-clothes",
      title: "Comprarte algo para tocar",
      text: "La música importa, pero cuando se prende la luz también hay que parecer parte de una banda.",
      badge: "+2 Carisma / +1 Fama / -$30",
      effects: {
        charisma: 2,
        fame: 1,
        money: -30,
      },
      personalitySignals: ["ambition"],
    },
    {
      id: "fix-drummers-van",
      title: "Ayudar con la camioneta del baterista",
      text: "No es glamoroso, pero si esa camioneta muere, la banda también se queda tirada.",
      badge: "+2 Reputación / +1 Salud / -$30",
      effects: {
        reputation: 2,
        health: 1,
        money: -30,
      },
      personalitySignals: ["loyalty", "discipline"],
    },
    {
      id: "family-dinner",
      title: "Llevar a cenar a la familia",
      text: "Cuando nadie apostaba por la banda, ellos ya estaban ahí. Que esta noche también sea un poco de ellos.",
      badge: "+2 Salud / +2 Reputación / -$45",
      effects: {
        health: 2,
        reputation: 2,
        money: -45,
      },
      personalitySignals: ["humble", "loyalty"],
    },
  ],
} satisfies SeasonDecisionEvent;
