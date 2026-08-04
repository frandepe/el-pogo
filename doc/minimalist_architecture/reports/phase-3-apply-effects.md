# Fase 3: Aplicador de efectos puro

## Objetivo

Implementar una funcion pura para aplicar `effects` sobre el `GameState`.

## Resultado

La Fase 3 queda implementada.

Se agrego `game/applyEffects.ts` con `applyEffects(gameState, effects)`.

## Implementado

- `applyEffects(gameState, effects)`

## Comportamiento

- Recibe un `GameState`.
- Recibe un objeto `effects`.
- Devuelve un nuevo `GameState`.
- Aplica los efectos como deltas sobre campos numericos.
- No muta el objeto recibido.

## Responsabilidades excluidas

`applyEffects` no:

- registra historial;
- avanza flujo;
- selecciona eventos;
- valida condiciones;
- conoce UI;
- conoce React;
- conoce Zustand.

## Decisiones tomadas

- En esta etapa los efectos solo pueden modificar campos numericos del `GameState`.
- Los valores de `effects` se interpretan como deltas. Por ejemplo, `{ fame: 5 }` suma 5 a la fama actual.
- No se agregan limites de rango todavia. Si luego salud, dinero u otras stats necesitan minimos o maximos, esa regla debe definirse explicitamente en una fase posterior.

## Limites mantenidos

- No se implemento `validateConditions`.
- No se implemento catalogo de eventos.
- No se implemento `GameEngine`.
- No se agrego historial formal.
- No se agrego Zustand.

## Criterio de avance

Se puede avanzar a Fase 4.

La siguiente fase debe implementar condiciones minimas para filtrar contenido segun el `GameState`, sin seleccionar eventos todavia.
