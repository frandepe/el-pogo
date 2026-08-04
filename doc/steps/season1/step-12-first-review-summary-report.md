# Step 12 - La repercusion

## Objetivo

Implementar una pantalla informativa posterior a la reaccion del jugador frente
a la primera critica publica.

El step no presenta decisiones nuevas, no modifica estadisticas y no aplica
efectos adicionales. Su funcion es mostrar como la respuesta elegida en el Step
11 cambia el clima alrededor de la banda.

## Archivos modificados

- `components/game/season1/firstReviewConsequences.ts`
- `components/game/season1/FirstReviewSummary.tsx`
- `components/game/CareerScreen.tsx`

## Decision arquitectonica

Se reutilizo el patron de consecuencias narrativas ya usado en el Capitulo I:

- cada consecuencia declara `eventId` y `optionId`;
- el componente usa `getLatestNarrativeConsequence()`;
- `CareerScreen` muestra el resumen inmediatamente despues de aplicar la opcion
  del evento `first-review`;
- el contenido queda desacoplado de la UI y puede crecer sin agregar `switch`
  por opcion.

## Contenido narrativo

Cada opcion del Step 11 tiene una repercusion propia:

- la bronca entra al ensayo;
- la cuenta responde con respeto;
- los comentarios se llenan de ruido;
- la banda finge calma;
- la critica aporta detalles utiles;
- el feed se olvida rapido;
- el chiste circula;
- la invitacion abre una revancha;
- la banda lee la resena junta;
- la critica se transforma en cancion.

Las escenas muestran reaccion del publico, de la cuenta, de la banda o del
propio ensayo, sin convertir la critica en castigo automatico ni recompensa
gratis.

## Validacion

- `npm run lint`: correcto.
- `npm run build`: correcto.
