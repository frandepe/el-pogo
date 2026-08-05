# Arquitectura del motor de juego

Este documento describe la arquitectura actual de El Pogo.

El Pogo es un juego narrativo de carrera musical construido en Next.js. La
partida corre completa en el cliente: el estado vive en memoria, Zustand expone
acciones de juego y el motor aplica reglas puras sobre `GameState`.

El backend queda reservado para una fase posterior: guardar carreras finalizadas,
rankings, estadisticas y consultas historicas.

---

## 1. Principio central

El juego esta basado en estado, no en arboles rigidos de decisiones.

La unica fuente de verdad es:

```ts
GameState
```

La UI no decide consecuencias. La UI muestra una pantalla, recibe una accion del
jugador y llama al store. El store delega en el motor. El motor devuelve un nuevo
estado.

Flujo mental:

```text
Interaccion del jugador
        |
        v
Zustand store
        |
        v
gameEngine
        |
        v
GameState actualizado
        |
        v
UI renderizada segun estado
```

---

## 2. GameState

`GameState` contiene la carrera completa:

```ts
type GameState = {
  artistName: string;
  bandName: string;
  role: string;
  currentStep: number;
  age: number;

  fame: number;
  fans: number;
  money: number;
  talent: number;
  creativity: number;
  charisma: number;
  reputation: number;
  health: number;

  albums: number;
  concerts: number;
  awards: number;
  grammys: number;
  worldTours: number;
  recordDeals: number;
  bandBreakups: number;

  personalitySignals: Partial<Record<PersonalitySignal, number>>;
  personalityTraits: readonly PersonalityTrait[];

  completedShopItemIds: readonly string[];
  activeContractIds: readonly string[];
  shopCooldowns: readonly ShopCooldown[];
  history: readonly CareerHistoryEntry[];
};
```

El estado inicial vive en:

```text
game/createInitialGameState.ts
```

El motor nunca debe depender del estado interno de componentes React. Si algo
afecta la carrera, debe terminar representado en `GameState`.

---

## 3. Capas principales

Las piezas principales son:

- `game/types.ts`: tipos centrales del dominio.
- `game/gameEngine.ts`: API principal del motor.
- `game/store.ts`: store de Zustand que conecta UI y motor.
- `game/flow.ts`: flujo declarativo de steps genericos.
- `game/applyEffects.ts`: aplica cambios numericos directos.
- `game/timePasses.ts`: calcula crecimiento pasivo por paso del tiempo.
- `game/personality.ts`: aplica signals y recalcula traits.
- `game/interviews.ts`: reglas de entrevistas.
- `game/shop.ts`: catalogo y reglas de tienda.
- `components/game/CareerScreen.tsx`: orquesta la escena visible.
- `components/game/season1/`: contenido especifico del Capitulo I.

---

## 4. Flujo de carrera

El flujo base vive en:

```text
game/flow.ts
```

Actualmente:

```ts
[
  "CreateArtist",
  "Upgrade",
  "Choice",
  "Info",
  "Shop",
  "Final",
]
```

Ese flujo representa tipos generales de pantalla, no toda la puesta en escena
del Capitulo I. Varias escenas especiales del capitulo se orquestan en
`CareerScreen` con estado local de UI:

- intro de capitulo;
- eleccion de estilo por rol;
- transiciones narrativas;
- decisiones especificas de temporada;
- consecuencias informativas;
- entrevistas.

Esto es una solucion pragmatica del MVP: el motor mantiene el estado de carrera,
mientras `CareerScreen` decide que componente visual aparece en cada momento del
capitulo.

---

## 5. Tipos de pantalla

### Choice

Pantalla de decision narrativa.

Cada opcion puede tener:

- `effects`;
- `personalitySignals`;
- `conditions`;
- `rarity`.

Las decisiones importantes no deberian limitarse a subir stats. Deben expresar
una postura narrativa y, cuando corresponda, construir personalidad.

### Info

Pantalla informativa tradicional. Muestra la consecuencia narrativa de una
decision previa.

No esta pensada para representar paso largo del tiempo.

### CinematicTransition

Transicion cinematografica. Se usa para comunicar que la historia avanzo o que
paso tiempo.

No es una consecuencia directa de una decision. Es un respiro narrativo y, desde
el sistema `timePasses`, tambien es el lugar natural para aplicar crecimiento
pasivo de carrera.

### Interview

Pantalla de entrevista.

Las entrevistas no modifican atributos. No dan fama, dinero, talento, salud ni
reputacion. Construyen personalidad de forma silenciosa mediante
`personalitySignals`.

Cada entrevista define 8 preguntas posibles; el motor de entrevista selecciona 3
al azar. Cada pregunta tiene exactamente 4 respuestas y cada respuesta aporta una
signal.

### NarrativeOpportunity

Evento narrativo con variantes y resolucion contextual.

Se usa cuando el jugador debe elegir que intenta hacer, pero el resultado debe
depender del estado de la carrera. A diferencia de `Choice`, fama, reputacion,
talento, creatividad o personalidad no ocultan opciones narrativas. Esos datos
solo modifican como responde el mundo.

Cada variante define 6 opciones posibles y el motor muestra 3. La unica
restriccion aceptada para bloquear una opcion es una limitacion fisica evidente,
por ejemplo no tener dinero suficiente para pagar un costo.

Documentacion completa:

```text
doc/narrative-opportunity-system.md
```

### Shop

La tienda permite compras de carrera, contratos y lujos.

Las compras usan `effects` y pueden tener condiciones, cooldowns y estados de
disponibilidad.

---

## 6. Effects

`effects` representa consecuencias directas y numericas sobre `GameState`.

Ejemplo:

```ts
effects: {
  talent: 2,
  health: -1
}
```

Usar `effects` para:

- decisiones puntuales;
- compras;
- recompensas concretas;
- consecuencias inmediatas.

No usar `effects` para:

- entrevistas;
- crecimiento de fondo por meses o anos;
- personalidad consolidada.

El helper vive en:

```text
game/applyEffects.ts
```

`applyEffects` es una funcion pura: recibe un estado, aplica deltas numericos y
devuelve un nuevo estado.

---

## 7. Paso del tiempo

`timePasses` es el mecanismo principal de crecimiento pasivo.

Ejemplo:

```ts
timePasses: {
  months: 11,
  intensity: "active"
}
```

El contenido solo declara cuanto tiempo paso y cuan intenso fue el periodo. El
motor calcula automaticamente:

- recitales;
- fans;
- fama;
- dinero;
- talento;
- creatividad;
- salud si hubo desgaste o recuperacion;
- edad si pasan anos completos.

Esto evita que el juego se sienta arcade.

En vez de:

```text
Primer recital: +15 fans
```

El juego busca:

```text
Pasaron once meses.
La banda siguio tocando.

Fans +183
Fama +1
Dinero +320
Recitales +12
```

La regla de contenido es: cada cierto periodo largo de la historia, normalmente
meses o anos representados por una transicion cinematografica, el juego debe
aplicar `timePasses` para consolidar el crecimiento de fondo.

APIs:

```ts
calculateTimePassesResult(gameState, timePasses)
applyTimePasses(gameState, timePasses)
```

Documentacion completa:

```text
doc/time-passes-system.md
```

---

## 8. Personalidad

La personalidad tiene dos capas:

- `personalitySignals`: contadores internos invisibles.
- `personalityTraits`: rasgos visibles consolidados.

Las decisiones y entrevistas suman signals. Los traits se recalculan en hitos
narrativos o al finalizar la carrera.

Ejemplo:

```ts
personalitySignals: {
  humble: 6,
  leader: 2,
  authentic: 4
}
```

Mas adelante, al recalcular:

```ts
personalityTraits: ["Humilde"]
```

Las reglas viven en:

```text
game/personalityTraitRules.ts
```

La documentacion completa vive en:

```text
doc/personality-system.md
```

---

## 9. Entrevistas

Las entrevistas existen para revelar quien es el musico, no para optimizar
estadisticas.

Reglas:

- cada entrevista tiene 8 preguntas posibles;
- se muestran 3 preguntas por partida;
- cada pregunta tiene 4 opciones;
- cada opcion aporta exactamente una `personalitySignal`;
- no se repite la misma signal dentro de una misma pregunta;
- se pueden repetir signals entre preguntas distintas si es natural;
- no se muestran badges, signals ni consecuencias inmediatas.

Las preguntas deben nacer de algo que paso en la carrera. Una entrevista nunca
pregunta directamente por la personalidad del jugador; la personalidad se deduce
de la respuesta.

---

## 10. Historial

El historial registra decisiones y respuestas importantes:

```ts
history: [
  {
    eventId: "first-review",
    optionId: "answer-with-humility",
    personalitySignals: ["humble"]
  }
]
```

El historial no reconstruye el estado. Sirve para:

- resumen final;
- narrativa futura;
- estadisticas posteriores;
- condiciones basadas en decisiones previas.

---

## 11. Seleccion de eventos y opciones

Los eventos son datos. El motor filtra por condiciones y selecciona contenido
disponible segun `GameState`.

Las opciones visibles se seleccionan sin reemplazo. En decisiones normales se
evita mostrar opciones con la misma firma de `effects` para dar variedad
mecanica. En entrevistas esa deduplicacion no aplica porque las respuestas no
usan `effects`.

Las condiciones soportan:

- comparadores numericos sobre stats;
- presencia o ausencia de personality traits.

En `NarrativeOpportunity`, las condiciones por stats o personalidad no deben
usarse para ocultar opciones. El estado solo participa en la resolucion del
outcome posterior.

---

## 12. Finalizacion

Al finalizar la carrera:

1. Se recalculan `personalityTraits`.
2. Se calcula el puntaje.
3. Se determina el ending.
4. Se genera `CareerResult`.

Hoy el resultado se calcula localmente. La persistencia en backend queda para una
fase posterior.

---

## 13. Principios actuales

- `GameState` es la unica fuente de verdad.
- El motor no conoce textos ni historias concretas.
- La UI no calcula consecuencias de carrera.
- `effects` es para consecuencias directas.
- `timePasses` es para crecimiento pasivo en periodos largos.
- Entrevistas solo construyen personalidad.
- Personality signals son invisibles; traits son rasgos consolidados.
- El crecimiento importante debe sentirse como carrera, no como premio arcade.
- Las transiciones cinematograficas rompen el ritmo y pueden consolidar stats.
- Agregar contenido no deberia requerir cambiar formulas del motor salvo que se
  este agregando una mecanica nueva.
