# Step 8 - Resumen del primer recital

## Objetivo

Implementar una pantalla informativa posterior al primer recital, sin decisiones ni cambios mecánicos adicionales.

## Archivos modificados

- `game/narrativeConsequences.ts`
- `components/game/season1/firstRecitalConsequences.ts`
- `components/game/season1/FirstRecitalSummary.tsx`
- `components/game/CareerScreen.tsx`

## Decisión arquitectónica

La relación entre decisión y consecuencia narrativa se resolvió mediante un catálogo desacoplado de la UI.

Cada consecuencia declara:

- `eventId`
- `optionId`
- `eyebrow`
- `title`
- `text`
- `cta`

El helper `getLatestNarrativeConsequence()` busca en el `history` del `GameState` la última decisión compatible y devuelve el contenido narrativo correspondiente.

De esta forma, el componente no contiene un `switch` por opción ni conoce reglas del evento. Solo recibe el `GameState`, obtiene la consecuencia narrativa y la presenta.

## Comportamiento

El Step 8 aparece inmediatamente después de elegir una opción en `Primer recital`.

No aplica efectos.
No modifica estadísticas.
No desbloquea rasgos.
No altera el `GameState`.

Cada una de las 10 opciones posibles del Step 7 tiene una consecuencia narrativa propia, sin juzgar la decisión como correcta o incorrecta.

## Validación

- `npm run lint`: correcto.
- `npm run build`: correcto.
