# Fase 9: Store de Zustand

## Objetivo

Conectar la UI con una unica fuente global de estado sin duplicar datos derivados.

## Resultado

La Fase 9 queda implementada.

Se agrego `game/store.ts` con un store minimo de Zustand.

## Implementado

- `useGameStore`
- `gameState`
- `startCareer(input)`
- `chooseOption(eventId, optionId)`
- `advanceStep()`
- `finishCareer()`
- `resetCareer()`

## Regla principal

El store almacena solamente `gameState`.

No almacena:

- `currentEvent`
- `currentStep` como campo separado
- catalogo de eventos
- estado derivado
- persistencia

Datos derivados como `currentEvent` deben obtenerse consultando al `GameEngine` a partir del `GameState` actual:

```ts
const currentEvent = gameEngine.getCurrentEvent(gameState)
```

## Decisiones tomadas

- El store usa `"use client"` porque Zustand se consume desde componentes cliente.
- Todas las acciones delegan en `GameEngine`.
- El store no aplica efectos por su cuenta.
- El store no registra historial por su cuenta.
- El store no avanza flujo por su cuenta.
- `resetCareer` vuelve al estado inicial puro.

## Limites mantenidos

- No se conecto el store con UI.
- No se implementaron pantallas.
- No se agrego persistencia.
- No se agrego LocalStorage.
- No se agrego backend.

## Criterio de avance

Se puede avanzar a Fase 10.

La siguiente fase debe crear pantallas base minimas que lean `gameState`, disparen acciones del store y deriven `currentEvent` desde `GameEngine`.
