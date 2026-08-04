# Fase 8: GameEngine

## Objetivo

Centralizar las reglas de avance de la partida en un motor puro.

## Resultado

La Fase 8 queda implementada.

Se agrego `game/gameEngine.ts` como coordinador de estado inicial, opciones, efectos, historial, flujo y seleccion de evento actual.

## Implementado

- `gameEngine`
- `startCareer(input)`
- `chooseOption(gameState, eventId, optionId, events)`
- `applyOption(gameState, event, option)`
- `finishCareer(gameState)`
- `getCurrentStep(gameState)`
- `advanceStep(gameState)`
- `getCurrentEvent(gameState, events)`

## Ajuste de tipos

`GameState.history` dejo de ser `unknown[]` y ahora usa el tipo minimo necesario:

```ts
type CareerHistoryEntry = {
  eventId: string;
  optionId: string;
}
```

Esto permite que el `GameEngine` registre decisiones sin definir todavia resumen final, estadisticas historicas ni payload de backend.

## Responsabilidades del GameEngine

El `GameEngine` es el unico responsable de:

- registrar historial;
- aplicar `effects`;
- avanzar el flujo;
- resolver la opcion elegida;
- obtener el paso actual;
- obtener el evento actual.

## Delegaciones internas

El motor coordina funciones puras ya existentes:

- `createInitialGameState`
- `applyEffects`
- `validateConditions`
- `selectNextEvent`
- `getCurrentStep`
- `advanceStep`

## Decisiones tomadas

- `applyOption` valida condiciones del evento y de la opcion antes de aplicar efectos.
- `applyOption` aplica efectos, registra historial y avanza el flujo en una sola operacion del motor.
- `chooseOption` resuelve `eventId` y `optionId` contra un catalogo recibido o contra `initialEvents`.
- `getCurrentEvent` deriva el evento desde `GameState` y el catalogo; no almacena estado derivado.
- `finishCareer` solo mueve la partida al paso `Final`. El calculo de score y resumen queda para Fase 12.

## Limites mantenidos

- No se agrego Zustand.
- No se conecto con UI.
- No se implemento score final.
- No se implemento backend.
- No se agrego persistencia.

## Criterio de avance

Se puede avanzar a Fase 9.

La siguiente fase debe crear un store de Zustand que almacene solamente `gameState` y delegue sus acciones completamente en `GameEngine`.
