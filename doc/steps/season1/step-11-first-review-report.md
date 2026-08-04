# Step 11 - La primera critica

## Objetivo

Implementar la primera reaccion publica frente a una critica externa.

Una cuenta de Instagram de bandas emergentes publica una resena del primer
recital. No es una cuenta enorme, pero representa el primer momento donde
alguien que no conoce personalmente a la banda opina sobre su musica.

## Archivos modificados

- `components/game/season1/firstReview.ts`
- `components/game/season1/FirstReviewChoice.tsx`
- `components/game/CareerScreen.tsx`

## Decision arquitectonica

Se mantuvo el patron de los steps de pregunta del Capitulo I:

- el evento vive como datos en `firstReview.ts`;
- el componente usa `gameEngine.getEventWithVisibleOptions()`;
- las opciones se renderizan con `ChoiceOptionCard`;
- al confirmar, `CareerScreen` aplica la opcion con `applyEventOption()`;
- la decision queda registrada en `GameState.history` como `first-review`.

Esto deja preparado el Step 12 para resolver la repercusion narrativa usando el
historial, igual que los summaries anteriores.

## Contenido narrativo

El catalogo incluye 10 reacciones posibles:

- agradecer y compartir;
- responder con ironia;
- ensayar los puntos flojos;
- fingir que no importa;
- pedir una devolucion mas clara;
- repostear solo la mejor frase;
- burlarse de la resena;
- invitar a la cuenta al proximo show;
- leerla con la banda;
- convertir la critica en letra.

Las opciones tienen efectos moderados, senales de personalidad y algunas rarezas
para que la situacion pueda construir identidad publica sin convertirse en una
respuesta obviamente correcta.

## Validacion

- `npm run lint`: correcto.
- `npm run build`: correcto.
