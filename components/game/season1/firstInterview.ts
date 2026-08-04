import type { InterviewDefinition } from "@/game/interviews";

export const firstInterview = {
  id: "first-interview",
  eyebrow: "Capítulo I",
  title: "Primera entrevista",
  interviewer: "Revista de barrio",
  intro:
    "No hay camarín, ni fotógrafo, ni café caro. Hay una mesa chica, un grabador apoyado entre cables y alguien que quiere hablar de lo que viene pasando con la banda.",
  questions: [
    {
      id: "growing-crowds",
      question: "Cada vez va más gente a los recitales. ¿Cómo lo viven?",
      options: [
        {
          id: "earned",
          text: "Es lindo verlo, pero no pasó de un día para el otro. Cada fecha tuvo algo que ver.",
          personalitySignal: "discipline",
        },
        {
          id: "still-small",
          text: "Está buenísimo, pero tampoco somos una banda enorme. Todavía queda muchísimo camino.",
          personalitySignal: "humble",
        },
        {
          id: "beginning",
          text: "Es la primera señal de que esto puede llegar mucho más lejos.",
          personalitySignal: "ambition",
        },
        {
          id: "noise",
          text: "Mientras haya más gente haciendo ruido que mirando el celular, estamos felices.",
          personalitySignal: "rebellion",
        },
      ],
    },

    {
      id: "first-review",
      question:
        'Hace un tiempo una reseña los definió como "una banda más del montón". ¿Qué pensás hoy de eso?',
      options: [
        {
          id: "accept",
          text: "Capaz tenían razón en ese momento. Lo bueno es que las bandas también cambian.",
          personalitySignal: "authentic",
        },
        {
          id: "prove",
          text: "Me molestó. Pero también me dio más ganas de demostrar que estaban equivocados.",
          personalitySignal: "ambition",
        },
        {
          id: "just-opinion",
          text: "Es una opinión. Nosotros seguimos tocando y ellos siguieron escribiendo.",
          personalitySignal: "pragmatic",
        },
        {
          id: "thanks",
          text: "Por lo menos alguien se tomó el tiempo de escucharnos.",
          personalitySignal: "humble",
        },
      ],
    },

    {
      id: "under-hobby",
      question:
        "Hay gente que dice que las bandas under son un hobby con guitarras. ¿Qué les responderías?",
      options: [
        {
          id: "come-rehearse",
          text: "Que vengan un mes a ensayar con nosotros y después vemos si sigue siendo un hobby.",
          personalitySignal: "discipline",
        },
        {
          id: "time",
          text: "No hace falta convencer a nadie. El tiempo acomoda esas discusiones.",
          personalitySignal: "resilient",
        },
        {
          id: "every-band",
          text: "Todas las bandas grandes empezaron siendo un hobby para alguien.",
          personalitySignal: "ambition",
        },
        {
          id: "dont-care",
          text: "Si ellos creen eso, problema de ellos. Nosotros vamos a seguir tocando igual.",
          personalitySignal: "rebellion",
        },
      ],
    },

    {
      id: "first-money",
      question:
        "Cuando apareció la primera plata, ¿cambió algo dentro de la banda?",
      options: [
        {
          id: "tool",
          text: "La plata es una herramienta. Si ayuda a tocar más y mejor, bienvenida.",
          personalitySignal: "pragmatic",
        },
        {
          id: "for-band",
          text: "Sirvió para entender que, si entra algo, tiene que volver a la banda.",
          personalitySignal: "loyalty",
        },
        {
          id: "felt-good",
          text: "No voy a hacerme el profundo: estuvo bueno cobrar por hacer lo que nos gusta.",
          personalitySignal: "egocentric",
        },
        {
          id: "proof",
          text: "Por primera vez sentimos que esto podía dejar de ser solamente un sueño.",
          personalitySignal: "resilient",
        },
      ],
    },

    {
      id: "bad-show",
      question:
        "También tuvieron recitales desastrosos. ¿Qué hacés cuando una noche sale mal?",
      options: [
        {
          id: "fix",
          text: "La reviso hasta entender qué falló. Siempre hay una explicación.",
          personalitySignal: "perfectionist",
        },
        {
          id: "next-date",
          text: "Busco otra fecha enseguida. La peor idea es quedarse pensando demasiado.",
          personalitySignal: "impulsive",
        },
        {
          id: "protect",
          text: "Primero me fijo cómo quedó la banda. Después analizamos el recital.",
          personalitySignal: "loyalty",
        },
        {
          id: "stand-up",
          text: "Te pega un rato. Después volvés a cargar los equipos y seguís.",
          personalitySignal: "resilient",
        },
      ],
    },

    {
      id: "best-musician",
      question:
        "Si te pregunto quién es el mejor músico de la banda... ¿qué me contestás?",
      options: [
        {
          id: "all",
          text: "El día que uno solo sea más importante que la banda, estamos en problemas.",
          personalitySignal: "loyalty",
        },
        {
          id: "depends",
          text: "Depende para qué. Cada uno tiene algo que el otro no.",
          personalitySignal: "humble",
        },
        {
          id: "me",
          text: "Si no creyera que puedo ser el mejor, estaría haciendo otra cosa.",
          personalitySignal: "egocentric",
        },
        {
          id: "no-answer",
          text: "Esa pregunta sirve para vender revistas, no para hacer música.",
          personalitySignal: "pragmatic",
        },
      ],
    },

    {
      id: "on-stage",
      question:
        "Arriba del escenario se los ve muy seguros. ¿Abajo también son así?",
      options: [
        {
          id: "same",
          text: "Más o menos. Arriba hacemos ruido; abajo tratamos de resolver las cosas.",
          personalitySignal: "authentic",
        },
        {
          id: "leader",
          text: "Cuando hace falta, alguno da un paso adelante. Si no, no avanza nada.",
          personalitySignal: "leader",
        },
        {
          id: "cover",
          text: "Nos cubrimos bastante entre nosotros. Si uno está mal, los demás empujan.",
          personalitySignal: "loyalty",
        },
        {
          id: "talk-fast",
          text: "Depende del día. A veces hablo antes de pensar.",
          personalitySignal: "impulsive",
        },
      ],
    },

    {
      id: "different-band",
      question:
        "¿Qué hace distinta a esta banda de las otras cien que tocan todos los fines de semana?",
      options: [
        {
          id: "songs",
          text: "Todavía lo estamos descubriendo. Si ya lo supiéramos, sería demasiado fácil.",
          personalitySignal: "creativity",
        },
        {
          id: "ourselves",
          text: "No tratamos de parecernos a nadie. Si gusta, mejor.",
          personalitySignal: "authentic",
        },
        {
          id: "work",
          text: "No lo sé todavía. Pero vamos a seguir trabajando hasta encontrarlo.",
          personalitySignal: "discipline",
        },
        {
          id: "attitude",
          text: "Las canciones las juzgará la gente. La actitud ya la tenemos.",
          personalitySignal: "fearless",
        },
      ],
    },
  ],
} satisfies InterviewDefinition;
