# Elección aleatoria del nombre de la banda

## Objetivo

Hacer que la elección del nombre de la banda sea distinta en cada carrera, evitando que el Step 6 muestre siempre las mismas tres opciones.

## Archivos modificados

- `components/game/season1/bandNameCatalog.ts`
- `components/game/season1/chooseBandName.ts`
- `components/game/season1/ChooseBandNameChoice.tsx`

## Decisiones tomadas

- Se separó el catálogo completo de nombres en `bandNameCatalog.ts`.
- El evento `chooseBandName` quedó limpio: solo define título, descripción y crea el evento con las opciones recibidas.
- La pantalla `ChooseBandNameChoice` selecciona 3 opciones al montarse.
- La selección se hace sin reemplazo, por lo que nunca se repite un nombre dentro de la misma elección.
- Cada entrada del catálogo conserva objeto completo:
  - `bandName`
  - descripción narrativa
  - badge
  - effects
  - personalitySignals
- Se agregaron 22 nombres con identidades distintas: barriales, under, poéticos, rebeldes, clásicos, pesados y épicos.

## Validación

- `npm run lint`: OK
- `npm run build`: OK
