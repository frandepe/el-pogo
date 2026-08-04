# Sistema de paso del tiempo

Este documento explica como funciona `timePasses`, el sistema de crecimiento
pasivo de El Pogo.

La idea central es que una carrera no crezca solo por premios inmediatos de cada
decision. Las decisiones marcan direccion, personalidad y consecuencias
narrativas. El paso del tiempo consolida lo que ocurrio de fondo.

---

## 1. Que representa

`timePasses` representa un periodo donde la banda siguio viviendo su carrera:
ensayos, recitales chicos, fechas buenas, fechas malas, aprendizaje, contactos,
cansancio y crecimiento organico.

Ejemplo:

```ts
timePasses: {
  months: 11,
  intensity: "active"
}
```

No declara cuántos recitales ocurrieron ni cuantos fans se ganaron. Eso lo decide
el motor a partir del estado actual.

---

## 2. Diferencia con effects

`effects` sigue existiendo para consecuencias directas.

Ejemplo:

```ts
effects: {
  health: -2,
  reputation: 1
}
```

Eso significa: "esta decision tuvo esta consecuencia puntual".

`timePasses`, en cambio, significa: "paso un periodo de carrera y el motor debe
calcular que cambio de fondo".

Regla practica:

- usar `effects` para decisiones, tienda y consecuencias inmediatas;
- usar `timePasses` para montajes temporales, meses, anos, giras o etapas;
- usar entrevistas solo para `personalitySignals`.

---

## 3. Intensidad

La intensidad define el tono del periodo:

- `quiet`: pocos recitales, crecimiento bajo, puede recuperar salud.
- `active`: ritmo normal de carrera, crecimiento estable.
- `intense`: mas recitales y exposicion, pero puede desgastar salud.

El contenido no debe microbalancear stats. Debe decir cuanto tiempo paso y que
tan intenso fue. El motor se encarga del resto.

---

## 4. Calculo automatico

La funcion principal vive en:

```text
game/timePasses.ts
```

APIs:

```ts
calculateTimePassesResult(gameState, timePasses)
applyTimePasses(gameState, timePasses)
```

El calculo es determinista. El mismo `GameState` con el mismo `timePasses`
siempre devuelve el mismo resultado.

El motor considera:

- meses transcurridos;
- intensidad;
- fama;
- fans;
- reputacion;
- carisma;
- recitales previos.

Y calcula effects sobre:

- `concerts`;
- `fans`;
- `fame`;
- `money`;
- `talent`;
- `creativity`;
- `health`;
- `age` si pasan anos completos.

---

## 5. Step 13

El primer uso esta en:

```text
components/game/season1/AlmostAYearTransition.tsx
```

Config actual:

```ts
{
  months: 11,
  intensity: "active"
}
```

La pantalla muestra un resumen sutil de crecimiento antes de continuar. Al
continuar, se aplica `applyTimePasses` y luego avanza la historia hacia el primer
conflicto interno.

---

## 6. Filosofia

Evitar esto:

```text
Primer recital: +15 fans
```

Preferir esto:

```text
Pasaron once meses.
Tocaron donde los dejaron tocar.
La banda siguio adelante.

Fans: +183
Fama: +1
Dinero: +320
Recitales: +12
```

El crecimiento aparece como resultado de una etapa, no como premio arcade por
apretar un boton.
