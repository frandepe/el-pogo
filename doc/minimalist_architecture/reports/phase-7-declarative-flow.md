# Fase 7: Flujo declarativo basico

## Objetivo

Separar el orden de pantallas del contenido narrativo.

## Resultado

La Fase 7 queda implementada.

Se agrego `game/flow.ts` con un flujo minimo declarativo y funciones puras para consultar y avanzar el paso actual.

## Implementado

- `careerFlow`
- `getCurrentStep(gameState, flow)`
- `advanceStep(gameState, flow)`

## Flujo inicial

```text
CreateArtist
-> Upgrade
-> Choice
-> Info
-> Final
```

## Comportamiento

- `careerFlow` declara el orden de pantallas.
- `getCurrentStep` obtiene el tipo de pantalla usando `gameState.currentStep`.
- `advanceStep` devuelve un nuevo `GameState` con `currentStep` avanzado.
- Si el estado ya esta en el ultimo paso, `advanceStep` permanece en `Final`.
- Si `currentStep` queda fuera del rango del flujo, `getCurrentStep` devuelve `Final`.

## Decisiones tomadas

- El flujo no conoce eventos concretos.
- El flujo no selecciona contenido narrativo.
- El flujo no aplica efectos.
- El flujo no registra historial.
- El flujo no depende de React, Zustand ni UI.
- El flujo se mantiene pequeno para validar el recorrido basico antes de agregar pasos como `Market`, `Interview`, `Shop` o `MiniGame`.

## Limites mantenidos

- No se implemento `GameEngine`.
- No se conecto el flujo con eventos.
- No se conecto el flujo con UI.
- No se agrego Zustand.
- No se implemento finalizacion real de carrera.

## Criterio de avance

Se puede avanzar a Fase 8.

La siguiente fase debe crear el `GameEngine` como coordinador puro de estado inicial, flujo, seleccion de eventos, aplicacion de opciones e historial.
