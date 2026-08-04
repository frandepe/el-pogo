# Paso inicial de estilo artístico

## Objetivo

Después de la introducción del Capítulo 1, el jugador responde una primera decisión específica según su rol. Esta decisión no reemplaza al rol: define el estilo artístico inicial del personaje.

## Archivos modificados

- `components/game/CareerScreen.tsx`
- `components/game/role-style/RoleStyleChoice.tsx`
- `components/game/role-style/RoleStyleOptionCard.tsx`
- `components/game/role-style/roleStyleOptions.ts`
- `game/store.ts`
- `game/types.ts`

## Decisiones tomadas

- La decisión de estilo se implementó como contenido del paso `Upgrade`, inmediatamente después de la pantalla `ChapterIntro`.
- Al confirmar una opción, la UI usa `GameEngine.applyOption()` mediante una acción genérica del store (`applyEventOption`).
- Esto permite aplicar `effects`, registrar historial, sumar `personalitySignals` y avanzar el flujo sin crear lógica paralela en React.
- Las opciones están separadas por rol en `roleStyleOptions.ts` para mantener el contenido fuera de los componentes.
- Las cards usan selección visual con borde dorado, punto dorado y microinteracciones suaves, siguiendo el patrón de selección de rol.

## Ajuste de personalidad

Se agregó la señal `creativity` a `PersonalitySignal` porque las nuevas opciones de estilo creativo la necesitan explícitamente.

## Validación

- `npm run lint`: OK
- `npm run build`: OK
