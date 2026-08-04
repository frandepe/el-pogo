# Fase 2: Estado inicial

## Objetivo

Crear una forma unica y testeable de iniciar una carrera nueva.

## Resultado

La Fase 2 queda implementada.

Se agrego `game/createInitialGameState.ts` con una funcion pura que devuelve un `GameState` inicial usando los valores definidos en la arquitectura del MVP.

## Implementado

- `createInitialGameState()`

## Valores iniciales

- `artistName`: `""`
- `role`: `""`
- `currentStep`: `0`
- `age`: `18`
- `fame`: `10`
- `fans`: `0`
- `money`: `500`
- `talent`: `40`
- `creativity`: `50`
- `charisma`: `35`
- `reputation`: `20`
- `health`: `100`
- `albums`: `0`
- `concerts`: `0`
- `awards`: `0`
- `grammys`: `0`
- `worldTours`: `0`
- `recordDeals`: `0`
- `bandBreakups`: `0`
- `history`: `[]`

## Decisiones tomadas

- La funcion no recibe parametros todavia, porque la creacion de artista y rol pertenece a fases posteriores del flujo.
- `history` inicia vacio, pero su estructura interna sigue sin definirse.
- No se agrega inventario, tienda, desbloqueos ni persistencia.
- No se conecta con React, Zustand ni componentes.

## Limites mantenidos

- No se implemento `applyEffects`.
- No se implemento `GameEngine`.
- No se implemento catalogo de eventos.
- No se agrego store global.

## Criterio de avance

Se puede avanzar a Fase 3.

La siguiente fase debe implementar `applyEffects(gameState, effects)` como funcion pura, sin registrar historial ni avanzar flujo.
