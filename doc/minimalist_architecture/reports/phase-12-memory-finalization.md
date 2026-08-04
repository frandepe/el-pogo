# Fase 12: Finalizacion en memoria

## Objetivo

Cerrar una carrera sin backend, base de datos, LocalStorage ni requests.

## Resultado

La Fase 12 queda implementada.

Se agrego `game/finishCareer.ts` y se integro el resultado final en el `GameEngine` y en la pantalla `Final`.

## Implementado

- `CareerEnding`
- `CareerResult`
- `finishCareer(gameState)`
- `gameEngine.finishCareer(gameState)`
- `gameEngine.completeCareer(gameState)`
- Visualizacion de ending y score en `CareerScreen`

## Comportamiento

- `finishCareer(gameState)` devuelve un resultado local en memoria.
- El resultado contiene artista, score, ending, stats e historial.
- `completeCareer(gameState)` solo mueve el estado al paso `Final`.
- Zustand sigue almacenando solamente `gameState`.
- La pantalla final deriva el resultado consultando al `GameEngine`.

## Decisiones tomadas

- El score se calcula con una formula simple basada en stats actuales.
- El ending se define por rangos de puntaje.
- No se envia ningun payload a backend.
- No se guarda nada en LocalStorage.
- No se guarda `CareerResult` en Zustand porque es estado derivado.

## Limites mantenidos

- No se implemento persistencia.
- No se implemento ranking.
- No se implemento estadistica historica.
- No se implemento backend.

## Criterio de avance

Se puede avanzar a Fase 13.

La siguiente fase debe documentar el limite para una futura integracion de backend sin modificar el motor.
