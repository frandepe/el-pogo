# Sistema de personalidad del jugador

Este documento explica como funciona el sistema de personalidad de El Pogo.

La idea central es separar dos capas:

- `personalitySignals`: senales internas acumulables e invisibles para el jugador.
- `personalityTraits`: rasgos visibles que representan una personalidad consolidada.

No son lo mismo y no deben fusionarse.

---

## 1. Personality Signals

Los `personalitySignals` son contadores internos dentro de `GameState`.

Viven aca:

```ts
gameState.personalitySignals
```

Ejemplo real de estado:

```ts
personalitySignals: {
  humble: 6,
  leader: 2,
  authentic: 4,
  rebellion: 1
}
```

Estos valores no se muestran directamente al jugador. Sirven para que el juego
entienda como viene actuando el personaje a lo largo de la carrera.

Cada decision puede sumar una o mas senales:

```ts
{
  id: "band-meeting",
  title: "Hacer reunion de banda",
  effects: {
    reputation: 2,
    talent: 1
  },
  personalitySignals: ["leader", "loyalty"]
}
```

Al elegir esa opcion:

- `leader` suma `+1`;
- `loyalty` suma `+1`;
- la decision queda registrada en `history`.

Las senales existentes estan definidas en:

```text
game/personalitySignals.ts
```

Lista actual:

- `impulsive`
- `humble`
- `fearless`
- `discipline`
- `pragmatic`
- `loyalty`
- `egocentric`
- `ambition`
- `authentic`
- `creativity`
- `perfectionist`
- `rebellion`
- `leader`
- `charismatic`
- `resilient`

---

## 2. Personality Traits

Los `personalityTraits` son rasgos visibles y consolidados.

Viven aca:

```ts
gameState.personalityTraits
```

Ejemplo:

```ts
personalityTraits: ["Humilde", "Leal", "Creativo"]
```

Estos traits representan una lectura mas estable de la personalidad del
personaje. No se desbloquean por una sola decision aislada, sino por patrones
acumulados.

Los traits posibles estan tipados en:

```text
game/types.ts
```

Lista actual:

- `Rebelde`
- `Perfeccionista`
- `Humilde`
- `Ambicioso`
- `Impulsivo`
- `Leal`
- `Creativo`
- `Líder`
- `Pragmático`
- `Egocéntrico`

---

## 3. Reglas de desbloqueo

Las reglas viven separadas en:

```text
game/personalityTraitRules.ts
```

Cada trait tiene una o mas condiciones sobre `personalitySignals`.

Reglas actuales:

```ts
Rebelde: rebellion >= 6

Perfeccionista:
  perfectionist >= 3
  discipline >= 4

Humilde:
  humble >= 6
  egocentric <= 2

Ambicioso:
  ambition >= 6
  humble <= 3

Impulsivo:
  impulsive >= 4
  discipline <= 3

Leal:
  loyalty >= 6

Creativo:
  creativity >= 6

Líder:
  leader >= 4
  loyalty >= 2

Pragmático:
  pragmatic >= 5
  impulsive <= 2

Egocéntrico:
  egocentric >= 3
  humble <= 2
```

Esto permite que un trait no sea una traduccion directa de una sola accion.

Ejemplo: alguien no es `Perfeccionista` solo por ser disciplinado. Necesita
haber acumulado senales de `perfectionist` y tambien suficiente `discipline`.

---

## 4. Desbloqueo hibrido

El sistema actual usa desbloqueo hibrido.

Eso significa:

- las decisiones normales acumulan `personalitySignals`;
- los `personalityTraits` no se recalculan automaticamente en cada decision;
- los traits se recalculan en momentos explicitos.

La funcion principal es:

```ts
applyPersonalitySignals(gameState, signals, options)
```

Uso normal:

```ts
applyPersonalitySignals(gameState, ["leader", "loyalty"])
```

Esto solo suma signals.

Uso con desbloqueo inmediato:

```ts
applyPersonalitySignals(gameState, ["leader", "loyalty"], {
  unlockTraits: true
})
```

Esto suma signals y despues recalcula traits.

Para recalcular traits manualmente:

```ts
recalculatePersonalityTraits(gameState)
```

Hoy el motor recalcula traits al finalizar la carrera:

- `gameEngine.completeCareer`
- `finishCareer`

En el futuro tambien puede hacerse al cierre de un capitulo, despues de una
entrevista importante o en un hito narrativo.

---

## 5. Flujo cuando el jugador elige una opcion

Cuando el jugador toma una decision, el motor hace esto:

1. Valida que el evento este disponible.
2. Valida que la opcion este disponible.
3. Aplica `effects`.
4. Aplica `personalitySignals`.
5. Registra la decision en `history`.
6. Avanza el step.

La parte importante esta en:

```text
game/gameEngine.ts
```

Simplificado:

```ts
const effectedState = applyEffects(gameState, option.effects)

const nextState = applyPersonalitySignals(
  effectedState,
  option.personalitySignals
)
```

Por defecto, ese llamado no desbloquea traits. Solo acumula senales.

---

## 6. Entrevistas

Las entrevistas tienen una regla especial:

> Una entrevista construye personalidad, no atributos.

Una entrevista no debe sentirse como un cuestionario psicologico. Las preguntas
nacen de lo que acaba de pasar en la carrera: un recital, una critica, un
conflicto interno, una gira, un contrato o una reaccion publica.

Cada entrevista define 8 preguntas posibles, pero el componente muestra solo 3
por partida. Cada pregunta tiene 4 respuestas y cada respuesta aporta
exactamente una `personalitySignal`. La misma signal puede aparecer en
preguntas distintas si es natural para la situacion.

Por eso una opcion de `stepType: "Interview"` no debe modificar:

- fama;
- talento;
- salud;
- dinero;
- creatividad;
- carisma;
- reputacion;
- ni ningun otro atributo numerico.

Debe usar:

```ts
personalitySignal: "humble"
```

Ejemplo:

```ts
{
  id: "answer-with-humility",
  text: "No somos mejores que nadie. Solo seguimos tocando.",
  personalitySignal: "humble"
}
```

El motor protege esta regla con el flujo dedicado de entrevistas:
`applyInterviewAnswer`.

El selector de entrevistas elige 3 preguntas al azar desde el pool de 8. La regla
de unicidad aplica solo dentro de cada pregunta: sus 4 respuestas no deben
repetir la misma signal.

---

## 7. Dominant Personality Signals

Existe una utilidad para saber que senales predominan en el personaje:

```ts
getDominantPersonalitySignals(gameState, limit)
```

Tambien esta expuesta desde:

```ts
gameEngine.getDominantPersonalitySignals(gameState)
```

Ejemplo:

```ts
getDominantPersonalitySignals(gameState, 3)
```

Puede devolver:

```ts
["humble", "leader", "authentic"]
```

Esto no devuelve traits. Devuelve las senales internas ordenadas por peso.

Sirve para:

- elegir dialogos;
- condicionar eventos;
- adaptar entrevistas;
- escribir consecuencias narrativas;
- detectar el tono dominante de una carrera antes de que haya traits visibles.

Si dos senales tienen el mismo valor, se ordenan segun el orden definido en
`personalitySignals.ts`.

---

## 8. Diferencia practica entre Signals y Traits

Ejemplo de mitad de carrera:

```ts
personalitySignals: {
  humble: 5,
  loyalty: 4,
  creativity: 3,
  rebellion: 2
}

personalityTraits: []
```

El personaje viene mostrando una tendencia humilde y leal, pero todavia no se
consolido ningun rasgo visible.

Mas adelante:

```ts
personalitySignals: {
  humble: 7,
  loyalty: 6,
  creativity: 6,
  rebellion: 2
}
```

Al recalcular traits:

```ts
personalityTraits: ["Humilde", "Leal", "Creativo"]
```

Las signals cuentan la historia interna.

Los traits muestran la conclusion narrativa.

---

## 9. Como escribir contenido usando personalidad

Cuando agregues una opcion, preguntate:

1. Que hace mecanicamente esta decision?
2. Que dice sobre la personalidad del jugador?
3. Que senales deberia sumar?

Ejemplo:

```ts
{
  title: "Decirselo de frente",
  text: "Apenas cruza la puerta, se lo decis sin anestesia.",
  effects: {
    reputation: 1,
    health: -2
  },
  personalitySignals: ["leader", "rebellion"]
}
```

No todas las opciones necesitan dos signals, pero las decisiones importantes
deberian dejar una marca de personalidad cuando corresponde.

Buenas practicas:

- usar `impulsive` para decisiones apuradas o viscerales;
- usar `fearless` para apuestas riesgosas pero no necesariamente impulsivas;
- usar `discipline` para constancia, ensayo y metodo;
- usar `perfectionist` para obsesion por detalle o control de calidad;
- usar `leader` para hacerse cargo de una situacion;
- usar `loyalty` para cuidar a la banda o sostener vinculos;
- usar `egocentric` para priorizar imagen, ego o protagonismo;
- usar `authentic` para sostener identidad propia;
- usar `pragmatic` para soluciones practicas aunque poco romanticas;
- usar `resilient` para levantarse despues de fracasos.

---

## 10. Archivos importantes

- `game/personalitySignals.ts`: definicion de signals internas.
- `game/types.ts`: tipo `PersonalityTrait` y forma del `GameState`.
- `game/personalityTraitRules.ts`: reglas para convertir signals en traits.
- `game/personality.ts`: funciones para aplicar signals, recalcular traits y
  obtener dominant signals.
- `game/gameEngine.ts`: aplica opciones, registra historial y protege reglas de
  entrevistas.
- `game/finishCareer.ts`: recalcula traits para el resultado final.

---

## 11. Resumen mental

Pensalo asi:

```text
Decisiones del jugador
        |
        v
personalitySignals
contadores internos acumulables
        |
        v
recalculo en hitos
        |
        v
personalityTraits
rasgos visibles consolidados
```

Las signals son el historial emocional invisible.

Los traits son la biografia resumida.
