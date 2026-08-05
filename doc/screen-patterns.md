# Catálogo de pantallas

Este archivo nombra los tipos de pantalla reutilizables del juego para poder
pedir implementaciones de forma precisa.

Ejemplo de uso:

```text
Implementá una Narrative Opportunity Screen para el Step 2 del Capítulo II.
```

---

## Chapter Intro Screen

Pantalla de presentación de capítulo.

Usar cuando empieza un capítulo o una etapa grande de la carrera.

Componentes actuales:

- `ChapterIntro`
- `Chapter2Intro`

Contenido mínimo:

- imagen o logo del capítulo;
- frase breve;
- botón para continuar.

---

## Personality Reveal Screen

Pantalla cinematográfica para revelar el rasgo dominante del jugador.

Usar en hitos donde el juego le muestra al jugador qué personalidad construyó.

Componente actual:

- `Chapter2PersonalityReveal`

Contenido mínimo:

- nombre del rasgo;
- una frase narrativa;
- botón para continuar.

Documentación relacionada:

- `doc/personality-system.md`

---

## Narrative Opportunity Screen

Pantalla de oportunidad narrativa con variantes y resolución contextual.

Usar cuando el jugador elige qué intenta hacer, pero el resultado depende del
estado de la carrera.

Ejemplo actual:

- `Chapter2FirstCallScene`

Contenido mínimo:

- variante de escena;
- 6 opciones posibles;
- 3 opciones visibles seleccionadas por el motor;
- outcome posterior según `GameState`.

Documentación relacionada:

- `doc/narrative-opportunity-system.md`

---

## Choice Screen

Pantalla clásica de decisión narrativa.

Usar cuando hay una pregunta directa y el jugador elige una respuesta entre
opciones visibles.

Componentes actuales:

- `ChoiceOptionCard`
- pantallas específicas como `FirstMoneyChoice`, `FirstReviewChoice`,
  `FirstInternalConflictChoice`

Contenido mínimo:

- título o pregunta;
- contexto breve;
- opciones;
- botón de confirmación si la pantalla usa selección previa.

---

## Info Screen

Pantalla informativa de consecuencia.

Usar después de una decisión para contar qué pasó.

Componente actual:

- `InfoScene`

Contenido mínimo:

- eyebrow opcional;
- título opcional;
- texto narrativo;
- tono: `positive`, `neutral` o `negative`;
- botón para continuar.

---

## Cinematic Transition Screen

Pantalla cinematográfica de transición.

Usar cuando pasa tiempo, cambia una etapa o sucede algo que necesita imagen y
ritmo visual.

Componente actual:

- `CinematicTransition`

Contenido mínimo:

- imagen;
- frase o bloque narrativo breve;
- botón para continuar.

Puede aplicar `timePasses` si representa meses o años de carrera.

Documentación relacionada:

- `doc/time-passes-system.md`

---

## Interview Screen

Pantalla de entrevista.

Usar cuando un periodista hace preguntas y las respuestas construyen
personalidad sin modificar stats.

Componente actual:

- `InterviewEvent`

Contenido mínimo:

- entrevista definida;
- set de preguntas;
- respuestas que suman `personalitySignals`.

Documentación relacionada:

- `doc/personality-system.md`

---

## Production Screen

Pantalla de producción musical.

Usar para demos, EPs, álbumes u otros procesos donde varias decisiones forman
una calidad final.

Componente actual:

- `ProductionEvent`

Contenido mínimo:

- intro;
- 3 decisiones de producción;
- outcome final por calidad;
- effects del outcome.

---

## Shop Screen

Pantalla de tienda.

Usar cuando el jugador invierte dinero en carrera, contratos o lujos.

Componentes actuales:

- `ShopModal`
- `ShopCategorySection`
- `ShopItemCard`

Contenido mínimo:

- categorías;
- items disponibles;
- precio;
- estado de compra o bloqueo;
- effects de compra.

Documentación relacionada:

- `doc/Filosofia_Narrativa_y_Shop.md`
