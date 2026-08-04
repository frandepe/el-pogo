# Refactor del sistema de personalidad

## Decisiones

- `personalitySignals` siguen siendo contadores internos acumulables.
- `personalityTraits` siguen siendo rasgos visibles consolidados.
- Las reglas de traits viven en `game/personalityTraitRules.ts`.
- El desbloqueo pasa a ser hibrido: acumular signals no desbloquea traits por
  defecto.

## Traits visibles

El catalogo visible queda en:

- Rebelde
- Perfeccionista
- Humilde
- Ambicioso
- Impulsivo
- Leal
- Creativo
- Lider
- Pragmatico
- Egocentrico

`fearless`, `authentic`, `charismatic` y `resilient` quedan como señales
internas disponibles para narrativa, condiciones futuras y señales dominantes.

## API

- `applyPersonalitySignals(gameState, signals, { unlockTraits })`
- `recalculatePersonalityTraits(gameState)`
- `getUnlockedPersonalityTraits(gameState)`
- `getDominantPersonalitySignals(gameState, limit)`

## Entrevistas

Las opciones de eventos `Interview` no deben modificar atributos. El motor
rechaza cualquier opcion de entrevista con `effects` no vacio.
