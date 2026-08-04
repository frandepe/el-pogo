# Fase 6: Seleccion desacoplada de eventos

## Objetivo

Elegir el proximo evento valido sin acoplar el resto del motor al algoritmo de seleccion.

## Resultado

La Fase 6 queda implementada.

Se agregaron:

- `game/weightedRandom.ts`
- `game/selectNextEvent.ts`

## Implementado

- `weightedRandom(candidates)`
- `selectNextEvent(gameState, events)`

## Comportamiento

`selectNextEvent`:

- recibe un `GameState`;
- recibe un catalogo de eventos;
- filtra eventos usando `validateConditions`;
- delega la eleccion final en `weightedRandom`;
- devuelve un `GameEvent` o `undefined` si no hay candidatos.

`weightedRandom`:

- recibe candidatos con `weight` opcional;
- usa `Math.random()` internamente;
- trata el peso ausente como `1`;
- permite evolucionar el algoritmo sin modificar `selectNextEvent` ni el futuro `GameEngine`.

## Decisiones tomadas

- La seleccion no aplica efectos.
- La seleccion no registra historial.
- La seleccion no avanza flujo.
- La seleccion no conoce UI, React ni Zustand.
- Si no hay eventos validos, se devuelve `undefined`; el manejo de ese caso pertenece al futuro `GameEngine`.
- Los pesos menores a `0` se tratan como `0`.

## Limites mantenidos

- No se implemento `GameEngine`.
- No se implemento flujo declarativo.
- No se conecto el catalogo con UI.
- No se agrego Zustand.
- No se agrego persistencia.

## Criterio de avance

Se puede avanzar a Fase 7.

La siguiente fase debe definir el flujo declarativo basico y las reglas minimas para consultar y avanzar `currentStep`.
