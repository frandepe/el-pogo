# Step 10 - Consecuencia del primer dinero

## Objetivo

Implementar la pantalla informativa posterior a la decision del primer dinero.

El step no agrega una nueva decision, no modifica atributos y no aplica efectos
adicionales. Su funcion es mostrar que la eleccion del Step 9 dejo una marca
visible en el mundo de la banda.

## Archivos modificados

- `components/game/season1/firstMoneyConsequences.ts`
- `components/game/season1/FirstMoneySummary.tsx`
- `components/game/CareerScreen.tsx`

## Decision arquitectonica

Se reutilizo el mismo patron del resumen del primer recital:

- el catalogo narrativo declara consecuencias por `eventId` y `optionId`;
- el componente usa `getLatestNarrativeConsequence()`;
- `CareerScreen` muestra el resumen inmediatamente despues de aplicar la opcion
  del evento `first-money`.

La UI no contiene un `switch` por opcion y el catalogo puede crecer sin tocar el
componente.

## Contenido narrativo

Cada una de las 10 opciones del Step 9 tiene una escena propia:

- cables nuevos;
- afiches barriales;
- guardar la plata;
- primeras remeras;
- festejo en la barra;
- primera cita;
- asado de agradecimiento;
- ropa para tocar;
- camioneta del baterista;
- cena familiar.

Las escenas mantienen tono argentino, humor de under y consecuencias concretas
sin presentar una unica decision como correcta.

## Validacion

- `npm run lint`: correcto.
- `npm run build`: correcto.
