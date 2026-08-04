# Fase 5: Catalogo inicial con eventos reales

## Objetivo

Crear un catalogo inicial pequeno con eventos reales para validar tono, decisiones y efectos desde el inicio.

## Resultado

La Fase 5 queda implementada.

Se agrego `game/events/initialEvents.ts` con tres eventos narrativos iniciales escritos como datos puros.

## Implementado

- `initialEvents`

## Eventos incluidos

- `free-afternoon`: el jugador tiene una tarde libre antes del proximo ensayo.
- `cerati-comparison`: un periodista compara al jugador con Cerati.
- `suspended-rehearsal`: la banda quiere suspender un ensayo.

## Decisiones tomadas

- Los eventos son reales, no placeholders ni dummy data.
- Cada evento tiene opciones con consecuencias distintas sobre el `GameState`.
- El catalogo no contiene funciones.
- Los eventos no aplican efectos por si mismos.
- Los eventos no registran historial.
- Los eventos no seleccionan el siguiente contenido.
- `weight` queda definido para preparar la fase de seleccion, aunque todavia no se usa.
- Se incluyo una condicion simple en `cerati-comparison` para validar que el catalogo ya puede declarar disponibilidad.

## Limites mantenidos

- No se implemento `selectNextEvent`.
- No se implemento `weightedRandom`.
- No se implemento `GameEngine`.
- No se conecto el catalogo con UI.
- No se agrego Zustand.

## Criterio de avance

Se puede avanzar a Fase 6.

La siguiente fase debe implementar seleccion desacoplada de eventos usando `validateConditions` y `weightedRandom`.
