import type { InfoTone, PersonalitySignal } from "@/game/types";

export type InterviewPublishedConsequence = {
  signal: PersonalitySignal;
  eyebrow: string;
  title: string;
  text: string;
  tone: InfoTone;
  cta: string;
};

export const firstInterviewPublishedConsequences = [
  {
    signal: "discipline",
    eyebrow: "La nota salió publicada",
    title: "Quedaron como una banda que trabaja",
    text: "La entrevista no explotó en redes, pero varios comentarios repitieron lo mismo: se notaba que no hablaban de suerte, sino de horas encerrados en una sala. Al periodista le gustó esa seriedad tranquila. En la banda hubo un silencio raro, de esos que aparecen cuando alguien de afuera ve el esfuerzo antes que el resultado.",
    tone: "positive",
    cta: "Volver a ensayar",
  },
  {
    signal: "humble",
    eyebrow: "La nota salió publicada",
    title: "La gente leyó una banda con los pies en el piso",
    text: "Los comentarios no fueron eufóricos, pero sí cercanos. Alguien escribió que daba gusto escuchar a una banda que todavía no se cree más grande que sus canciones. La frase circuló en el chat del grupo y nadie supo bien qué contestar. Por una vez, la modestia hizo más ruido que una pose.",
    tone: "positive",
    cta: "Seguir de cerca",
  },
  {
    signal: "ambition",
    eyebrow: "La nota salió publicada",
    title: "La frase grande empezó a circular",
    text: "El título eligió la parte más ambiciosa de la charla. Algunos lo tomaron como confianza; otros, como una banda apurada por ocupar un lugar que todavía no tenía. En el grupo hubo entusiasmo y un poco de vértigo. Habían querido sonar grandes. Ahora había que bancarse que alguien los leyera así.",
    tone: "neutral",
    cta: "Sostener la apuesta",
  },
  {
    signal: "rebellion",
    eyebrow: "La nota salió publicada",
    title: "Los comentarios se partieron en dos",
    text: "La nota salió con olor a provocación. Hubo gente que celebró la actitud y gente que preguntó quiénes se creían que eran. El periodista subió una historia diciendo que por fin una entrevista under no parecía escrita por un comunicado de prensa. A la banda le dio risa, pero también les dejó una certeza: llamar la atención siempre cobra entrada.",
    tone: "neutral",
    cta: "Dejar que hablen",
  },
  {
    signal: "authentic",
    eyebrow: "La nota salió publicada",
    title: "La entrevista sonó verdadera",
    text: "No hubo frases perfectas ni grandes titulares, pero la nota tenía algo difícil de fabricar. En redes, los comentarios más chicos fueron los mejores: gente diciendo que parecía una conversación real, no una banda vendiendo humo. El periodista mandó un mensaje corto: 'quedó honesta'. Para el under, eso ya era bastante.",
    tone: "positive",
    cta: "Quedarse ahí",
  },
  {
    signal: "pragmatic",
    eyebrow: "La nota salió publicada",
    title: "La banda pareció tener un plan",
    text: "La publicación dejó una imagen menos romántica y más concreta: una banda que entiende que tocar también es resolver problemas. Algunos extrañaron más mística. Otros valoraron que hablaran sin disfrazar la realidad. En la sala, la nota terminó pegada al lado de una lista de cosas por arreglar.",
    tone: "positive",
    cta: "Marcar lo pendiente",
  },
  {
    signal: "loyalty",
    eyebrow: "La nota salió publicada",
    title: "La banda quedó en primer plano",
    text: "La nota no construyó un héroe solista. Construyó una banda. Los comentarios rescataron esa forma de hablar en plural, incluso cuando la pregunta venía con trampa. En el ensayo siguiente alguien hizo un chiste sobre abrazarse. Nadie se abrazó. Pero tocaron más juntos.",
    tone: "positive",
    cta: "Entrar juntos",
  },
  {
    signal: "egocentric",
    eyebrow: "La nota salió publicada",
    title: "Tu nombre pesó más que la banda",
    text: "El periodista encontró un título fácil y lo usó. La nota puso tu voz adelante, tal vez demasiado. En redes hubo quien celebró la confianza y quien preguntó si la banda tenía más integrantes o era una excusa con amplificadores. El chat del grupo quedó activo hasta tarde. Nadie estaba furioso, pero todos habían leído lo mismo.",
    tone: "negative",
    cta: "Abrir el chat",
  },
  {
    signal: "resilient",
    eyebrow: "La nota salió publicada",
    title: "La historia de los golpes conectó",
    text: "La entrevista no vendió éxito: vendió insistencia. Y eso, por alguna razón, llegó. Varias respuestas hablaron de seguir tocando aunque salga mal, aunque paguen poco, aunque el bar cierre temprano. El periodista compartió la nota con una frase simple: 'estos pibes aguantan'. La banda la leyó como un elogio y una responsabilidad.",
    tone: "positive",
    cta: "Seguir igual",
  },
  {
    signal: "perfectionist",
    eyebrow: "La nota salió publicada",
    title: "La exigencia quedó expuesta",
    text: "La nota mostró una banda que no se conforma fácil. A algunos les pareció admirable; a otros, demasiado seria para alguien que todavía toca en escenarios chicos. En el ensayo siguiente, cada error sonó un poco más fuerte. La entrevista había instalado una vara, y ahora todos podían verla.",
    tone: "neutral",
    cta: "Afinar de nuevo",
  },
  {
    signal: "impulsive",
    eyebrow: "La nota salió publicada",
    title: "La frase apurada llegó al título",
    text: "El periodista no perdonó la respuesta más rápida. La puso arriba de todo y los comentarios hicieron el resto. Algunos se rieron con ustedes; otros leyeron una banda que habla antes de pensar. En el grupo hubo capturas, audios y una pregunta incómoda: si eso había sido carisma o falta de freno.",
    tone: "negative",
    cta: "Respirar antes",
  },
  {
    signal: "creativity",
    eyebrow: "La nota salió publicada",
    title: "La gente preguntó por las canciones",
    text: "La entrevista dejó menos frases de personaje y más curiosidad por lo que estaban armando. Dos personas pidieron grabaciones. Otra preguntó cuándo tocaban temas nuevos. El periodista remarcó que todavía parecían buscar su forma, pero que esa búsqueda tenía algo propio. A la banda le alcanzó para volver a la sala con ideas frescas.",
    tone: "positive",
    cta: "Probar algo nuevo",
  },
  {
    signal: "fearless",
    eyebrow: "La nota salió publicada",
    title: "La actitud empujó la nota",
    text: "La publicación los mostró seguros, incluso en las partes donde tal vez no convenía estarlo tanto. En redes hubo fuego chico: likes, dudas, algún comentario sobrador y varios curiosos. La banda sintió que la nota abría una puerta, pero también que del otro lado había gente esperando ver si se animaban de verdad.",
    tone: "neutral",
    cta: "Cruzar igual",
  },
  {
    signal: "leader",
    eyebrow: "La nota salió publicada",
    title: "Alguien pareció llevar el volante",
    text: "La nota ordenó la historia alrededor de una voz clara. Eso ayudó a que la banda pareciera enfocada, pero también dejó una sombra en el resto. En el ensayo, nadie lo dijo directo. Igual se notó en detalles chicos: quién elegía el primer tema, quién opinaba último, quién miraba antes de contestar.",
    tone: "neutral",
    cta: "Compartir la sala",
  },
] satisfies readonly InterviewPublishedConsequence[];
