# Fase 1: Tipos minimos del dominio

## Objetivo

Convertir el modelo conceptual validado en Fase 0 en contratos TypeScript minimos.

## Resultado

La Fase 1 queda implementada.

Se agrego `game/types.ts` con los contratos necesarios para que las siguientes fases puedan construir estado inicial, efectos, condiciones, catalogos y motor sin depender de React, Zustand ni UI.

## Tipos definidos

- `GameState`
- `StepType`
- `Effect`
- `Condition`
- `EventOption`
- `GameEvent`

Tambien se agregaron tipos auxiliares estrictamente derivados:

- `NumericGameStateKey`
- `ConditionOperator`

## Decisiones tomadas

- `GameState` contiene los campos documentados para la carrera inicial.
- `history` queda como `readonly unknown[]` porque todavia no esta validada la forma final del historial.
- `role` queda como `string` para no cerrar prematuramente el set de roles.
- `Effect` permite modificar solamente campos numericos del `GameState` en esta etapa.
- `Condition` tambien opera sobre campos numericos del `GameState`, suficiente para los primeros filtros por edad, fama, reputacion, dinero o stats.
- `GameEvent` y `EventOption` son datos puros: no contienen funciones, no aplican efectos y no registran historial.
- `weight` queda como campo opcional para la futura seleccion con `weightedRandom()`.

## Limites mantenidos

- No se implemento `createInitialGameState`.
- No se implemento `applyEffects`.
- No se implemento `validateConditions`.
- No se implemento catalogo de eventos.
- No se agrego Zustand.
- No se definio una estructura formal de historial.

## Criterio de avance

Se puede avanzar a Fase 2.

La siguiente fase debe crear el estado inicial usando estos tipos, sin agregar todavia motor, eventos ni store global.
