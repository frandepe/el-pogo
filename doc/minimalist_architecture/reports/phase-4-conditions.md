# Fase 4: Condiciones minimas

## Objetivo

Implementar una forma simple de validar si un contenido esta disponible segun el `GameState`.

## Resultado

La Fase 4 queda implementada.

Se agrego `game/validateConditions.ts` con `validateConditions(gameState, conditions)`.

## Implementado

- `validateConditions(gameState, conditions)`

## Comparadores soportados

- `>=`
- `<=`
- `>`
- `<`
- `=`

## Comportamiento

- Recibe un `GameState`.
- Recibe una lista de `Condition`.
- Devuelve `true` solo si todas las condiciones se cumplen.
- Una lista vacia de condiciones devuelve `true`.
- Solo evalua campos numericos del `GameState`, segun los tipos definidos en Fase 1.

## Responsabilidades excluidas

`validateConditions` no:

- selecciona eventos;
- aplica efectos;
- registra historial;
- avanza flujo;
- conoce contenido narrativo;
- conoce UI;
- conoce React;
- conoce Zustand.

## Decisiones tomadas

- Las condiciones funcionan como una conjuncion: todas deben cumplirse.
- No se implementan condiciones compuestas con `or` todavia.
- No se implementa un lenguaje de condiciones mas complejo.
- La seleccion de eventos queda para una fase posterior.

## Limites mantenidos

- No se implemento catalogo de eventos.
- No se implemento `selectNextEvent`.
- No se implemento `weightedRandom`.
- No se implemento `GameEngine`.
- No se agrego store global.

## Criterio de avance

Se puede avanzar a Fase 5.

La siguiente fase debe crear un catalogo inicial pequeno con eventos reales, usando estas condiciones y los `effects` ya definidos.
