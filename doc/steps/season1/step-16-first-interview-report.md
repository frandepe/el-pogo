# Step 16 - Primera entrevista

## Objetivo

Introducir la mecanica de entrevistas en el modo carrera.

La entrevista no mejora atributos ni entrega consecuencias inmediatas. Su
funcion es revelar personalidad de forma silenciosa.

## Implementacion

- Se agrego `InterviewEvent`, componente reusable para entrevistas.
- Se agrego `firstInterview`, contenido concreto del Step 16.
- Se agrego `FirstInterviewScene`, wrapper del contenido del Capitulo I.
- Se agrego dominio de entrevistas en `game/interviews.ts`.
- La entrevista aparece despues del Step 15.

## Reglas protegidas

Una entrevista debe tener:

- exactamente 8 preguntas disponibles;
- exactamente 3 preguntas seleccionadas al azar durante la partida;
- exactamente 4 opciones por pregunta;
- una unica `personalitySignal` por respuesta;
- ninguna signal repetida dentro de una misma pregunta;
- ningun badge;
- ningun atributo visible;
- ningun efecto de estadisticas.

El motor aplica cada respuesta con `applyInterviewAnswer`, suma solo la signal y
registra historial. Al completar la tercera pregunta, se avanza el flujo una
sola vez.

## Contenido

La primera entrevista tiene 8 preguntas contextuales sobre:

- el primer recital;
- la primera critica;
- el conflicto interno;
- el nombre de la banda;
- la primera plata;
- el paso de casi un anio;
- los recitales desastrosos;
- la escena under.

Cada pregunta nace de algo que ya paso en el Capitulo I. La entrevista no
pregunta por personalidad de forma directa: pregunta por la historia, y la
personalidad se deduce de la respuesta.

Las 3 preguntas seleccionadas en cada partida aportan 3 senales. Pueden
repetirse entre preguntas distintas si el jugador responde de forma consistente.
Las posibilidades incluyen:

- ambicion;
- humildad;
- creatividad;
- pragmatismo;
- impulsividad;
- resiliencia;
- autenticidad;
- egocentrismo;
- liderazgo;
- lealtad;
- disciplina;
- rebeldia.
