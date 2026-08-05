# Capítulo II - Buscar un lugar

**Edad del capítulo:** 21 a 25 años
**Tema central:** pasar de banda under prometedora a banda que empieza a ocupar un lugar real en la escena.
**Estado inicial esperado:** el jugador viene de completar el Capítulo I con stats bajas o moderadas, un primer demo, primeras repercusiones, historia de decisiones y `personalitySignals` acumulados.

## Objetivo narrativo

El Capítulo II no trata de volverse famoso de golpe. Trata de empezar a pertenecer.

La banda ya no está solamente ensayando y esperando una oportunidad. Ahora aparecen propuestas, tensiones, pequeñas ventajas, costos concretos y decisiones donde no existe una opción perfecta.

## Sistemas que debería usar

- `GameState`: las decisiones deben apoyarse más en el estado real del jugador.
- `personalitySignals`: empiezan a importar para opciones visibles, tono narrativo y consecuencias.
- `personalityTraits`: se muestran por primera vez al inicio del capítulo.
- `history`: debe usarse para reaccionar al demo, entrevistas y decisiones fuertes del Capítulo I.
- `TimePasses`: varias escenas deben hacer avanzar meses o años.
- Producción: el primer EP usa la mecánica ya conocida del demo.

## Step 1 - Tus decisiones dejaron una marca

**Tipo:** Información
**Función:** presentar por primera vez cómo el Capítulo I moldeó al jugador.

### Contenido

Se recalculan los `personalityTraits`.

El jugador descubre cómo sus decisiones anteriores dejaron una marca. No se presenta como recompensa, sino como espejo.

### Notas de diseño

- No debe sentirse como pantalla de premios.
- Debe explicar poco y sugerir mucho.
- Puede mostrar traits desbloqueados si existen.
- Si no hay traits, debe igualmente reconocer la tendencia dominante de los `personalitySignals`.

## Step 2 — ¿Quién era?

**Tipo:** Pregunta

**Función:** resolver el final del Capítulo I y mostrar que el mundo empezó a reaccionar a la banda.

### Introducción

El teléfono que sonó al final del Capítulo I finalmente encuentra respuesta.

Quién está del otro lado depende directamente del resultado obtenido con el primer demo.

### Variantes según demo

- `bad`: llama el dueño de un bar y ofrece tocar por una pizza, cerveza y la gorra.
- `acceptable`: llama el organizador de un festival barrial porque quedó un lugar libre.
- `good`: llama un productor independiente que quiere ver a la banda en vivo.
- `excellent`: llama el manager de una banda conocida buscando un telonero de urgencia.

### La decisión

Cada llamada presenta una decisión distinta, adaptada a la oportunidad recibida.

Las opciones no dependen de los atributos del jugador.

Lo que cambia según la carrera construida son las consecuencias de cada elección.

Los atributos, la personalidad, la reputación y el historial modifican cómo responde el mundo, no qué puede intentar hacer el jugador.

### Intención

El jugador debe sentir dos cosas:

- que el resultado del primer demo tuvo consecuencias reales;
- que, a partir de este capítulo, el mundo empieza a responder de manera distinta a la banda según la carrera que fue construyendo.

## Step 3 - Así salió esa noche

**Tipo:** Información
**Función:** consecuencia narrativa.

### Enfoque

No importa solamente si la noche fue un éxito. Importa cómo fue.

La escena debe reflejar el tipo de decisión tomada en el step anterior: ambiciosa, humilde, improvisada, profesional, caótica o leal.

## Step 5 - El dueño del bar

**Tipo:** Pregunta / Humor
**Función:** dar color local y una decisión pequeña.

### Situación

> "Si meten un cover de Los Redondos les pago dos cervezas más."

### Opciones posibles

- aceptar;
- negarse;
- hacer un cover igual pero a tu manera;
- improvisar otra cosa.

### Consecuencias

Consecuencias pequeñas. Mucho color. Puede tocar:

- dinero mínimo;
- reputación;
- `personalitySignals`;
- humor interno de la banda.

## Step 6 - Pasaron varios meses

**Tipo:** Transición
**Función:** mostrar movimiento sostenido.

### Contenido

Muchos recitales. Muchos kilómetros. Poca plata, pero más oficio.

### Sistemas

Aplica `TimePasses`.

Stats que pueden subir:

- fans;
- fama;
- dinero;
- talento;
- creatividad;
- carisma;
- reputación.

## Step 7 - Buscar un lugar para ensayar

**Tipo:** Pregunta
**Función:** hacer que el dinero pese.

### Situación

Perdieron la sala de ensayo. Hay que decidir dónde y cómo seguir.

### Notas de diseño

- El dinero vuelve a tener peso.
- Algunas opciones pueden estar bloqueadas por plata.
- Algunas opciones baratas deberían tener costos narrativos o de salud.

## Step 8 - El vecino

**Tipo:** Información / Humor
**Función:** escena liviana de mundo.

### Situación

Un vecino llama a la policía por el ruido. Cuando llega el patrullero, uno de los policías pide una foto.

### Consecuencias

No modifica nada. Simplemente hace sonreír y refuerza que la banda empieza a ser reconocible.

## Step 9 - Segunda entrevista

**Tipo:** Entrevista
**Función:** cambiar el tono de las entrevistas.

### Enfoque

Ahora el periodista investiga. No pregunta sueños. Pregunta cosas incómodas.

### Estructura

Tres preguntas.

Las respuestas deberían sumar `personalitySignals`, no stats directas.

## Step 10 - La nota salió

**Tipo:** Información
**Función:** consecuencia de entrevista y personalidad.

### Enfoque

La nota depende de la personalidad dominante, no solamente de la respuesta puntual.

Debe sentirse como una lectura externa de la banda: cómo los empieza a ver la escena.

## Step 11 - Una banda quiere llevarse a uno de ustedes

**Tipo:** Pregunta
**Función:** decisión fuerte de identidad y lealtad.

### Situación

Otra banda quiere llevarse a uno de ustedes.

No necesariamente alguien se va, pero la posibilidad existe y debe sentirse real.

### Condiciones posibles

Las opciones deberían depender mucho de personalidad:

- un líder responde distinto que alguien humilde;
- un ambicioso puede ver oportunidad;
- alguien leal intenta cuidar al grupo;
- alguien impulsivo puede empeorar la situación.

## Step 12 - El ensayo siguiente

**Tipo:** Información
**Función:** mostrar consecuencia emocional.

### Enfoque

La banda cambió, aunque nadie lo diga.

Debe reflejar la decisión anterior sin resolver todo de forma perfecta.

## Step 13 - El primer EP

**Tipo:** Producción
**Función:** evolucionar la mecánica del demo.

### Estructura

Tres decisiones de producción.

Debe calcular calidad del EP con una lógica similar a la del primer demo, pero con más peso del estado actual:

- talento;
- creatividad;
- dinero;
- reputación;
- decisiones de producción;
- personalidad si corresponde.

## Step 14 - El borrachín

**Tipo:** Información / Humor
**Función:** presentar personaje recurrente.

### Situación

Hay un tipo. Nunca paga. Siempre está. Se canta todas las letras. Nadie sabe cómo entra.

Empieza a convertirse en un personaje recurrente del juego.

## Step 15 - El EP empieza a girar

**Tipo:** Información
**Función:** mostrar repercusión del EP.

### Variantes según calidad

- `bad`;
- `acceptable`;
- `good`;
- `excellent`.

### Enfoque

El EP no tiene que volverlos famosos de inmediato. Tiene que abrir o cerrar puertas proporcionales al resultado.

## Step 16 - Aparece una propuesta complicada

**Tipo:** Pregunta
**Función:** dilema sin respuesta perfecta.

### Ideas de propuesta

- tocar para un político;
- tocar gratis para mucha gente;
- vender entradas por cuenta propia;
- cambiar el horario a uno peor pero más visible;
- compartir escenario con una banda insoportable.

### Notas de diseño

Acá aparecen los "peros".

No existe la opción perfecta. Cada decisión debe tener costo, beneficio y una lectura de personalidad.

## Step 17 - La banda principal llega dos horas tarde

**Tipo:** Información / Humor
**Función:** escena absurda de escenario.

### Situación

El público empieza a pedir:

> "¡Otra!"

Problema: ustedes ya tocaron todo. No tienen más temas.

La escena debe ser absurda, incómoda y querible.

## Step 18 - Pasaron casi dos años

**Tipo:** Transición cinematográfica
**Función:** salto grande de carrera.

### Contenido

Muchos recitales. Más fans. Más fama. Más kilómetros.

El mundo ya empieza a conocer el nombre.

### Sistemas

Aplica `TimePasses` con una intensidad mayor que el Step 6.

## Step 19 - Primera gira

**Tipo:** Pregunta
**Función:** decisión importante de crecimiento y desgaste.

### Situación

No es una gira nacional. Son tres ciudades. Dormir donde se pueda. Poca plata. Mucho desgaste.

### Enfoque

La decisión debe cruzar ambición, salud, dinero y compromiso de banda.

## Step 20 - Fin del Capítulo II

**Tipo:** Información cinematográfica
**Función:** cierre temático.

### Cierre

No hay teléfono. No hay cliffhanger clásico.

Hace unos años esperaban que alguien fuera a verlos. Ahora había gente esperando que ustedes aparecieran.

Sin darse cuenta, habían encontrado un lugar.

El problema era que empezar a pertenecer también significaba empezar a perder cosas.
