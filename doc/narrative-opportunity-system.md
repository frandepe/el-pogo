# Sistema de oportunidades narrativas

Este documento explica la técnica de juego usada para eventos donde el jugador
elige qué intentar hacer, pero el mundo responde según el estado real de la
carrera.

La primera implementación aparece al inicio del Capítulo II, cuando el personaje
atiende la llamada que cerró el Capítulo I.

---

## 1. Idea central

Una oportunidad narrativa separa dos cosas:

- la intención del jugador;
- la respuesta del mundo.

El jugador no desbloquea opciones por tener más fama, reputación, talento o
personalidad. Puede intentar negociar, rechazar, aceptar o proponer algo aunque
su carrera todavía sea chica.

Lo que cambia según `GameState` no es qué puede intentar. Cambia qué tan bien
sale.

Ejemplo:

```text
Opción elegida: Negociar

Jugador con buena reputación:
consigue mejores condiciones.

Jugador sin reputación:
recibe una negativa o apenas mejora la oferta.
```

---

## 2. Cuándo usarlo

Usar oportunidades narrativas para escenas donde:

- hay una situación externa que llega al jugador;
- existen varias respuestas posibles;
- la misma respuesta puede salir bien, regular o mal;
- el estado de la carrera debe afectar la consecuencia, no la disponibilidad.

No usar este sistema para:

- entrevistas, que solo construyen `personalitySignals`;
- producción, que ya tiene su propia mecánica de calidad;
- tienda, donde sí tiene sentido ocultar productos por dinero, etapa o contexto;
- consecuencias informativas simples.

---

## 3. Estructura

Una oportunidad define:

- múltiples variantes de la misma escena;
- un conjunto de opciones por variante;
- outcomes posibles para cada opción;
- reglas simples para resolver el outcome.

En código vive en:

```text
game/narrativeOpportunity.ts
```

Tipos principales:

```ts
NarrativeOpportunityDefinition
NarrativeOpportunityVariant
NarrativeOpportunityOption
NarrativeOpportunityOutcome
```

---

## 4. Variantes

Una variante representa el contexto de la escena.

Ejemplo del inicio del Capítulo II:

- `bad`: llama el dueño de un bar.
- `acceptable`: llama el organizador de un festival barrial.
- `good`: llama un productor independiente.
- `excellent`: llama el manager de una banda conocida.

La variante puede depender de `history`, outcomes anteriores u otros datos del
estado.

En este sistema, la variante explica quién llama y por qué. No decide todavía
qué hace el jugador.

---

## 5. Opciones visibles

Cada variante debe tener exactamente 6 opciones posibles.

El motor selecciona automáticamente 3 opciones visibles.

Regla:

```text
6 opciones posibles
3 opciones visibles
```

Esto aumenta la rejugabilidad sin obligar a escribir una escena completamente
nueva para cada partida.

Las opciones representan intención narrativa:

- aceptar;
- negociar;
- rechazar;
- aceptar con condiciones;
- pedir tiempo;
- proponer una alternativa.

---

## 6. Regla de disponibilidad

Los atributos no deben ocultar opciones narrativas.

No usar fama, reputación, talento, creatividad, carisma, personalidad o traits
para decidir si una opción aparece.

La única excepción aceptada en este sistema es una restricción física evidente.

Ejemplo:

```text
Si una opción cuesta $500 y el jugador tiene $200, no puede elegirla.
```

Fuera de eso, el jugador puede intentar cualquier postura que aparezca entre las
3 opciones visibles.

---

## 7. Resolución

Cada opción define una regla simple:

```ts
score: {
  difficulty: "easy" | "normal" | "hard",
  favors: [...],
  hurts: [...]
}
```

Ejemplo:

```ts
score: {
  difficulty: "normal",
  favors: [stat("reputation"), stat("charisma"), signal("ambition")],
  hurts: [stat("fame")]
}
```

No se usan coeficientes como `0.35` o `0.55`.

La idea es que el contenido sea legible meses después:

```text
Negociar favorece reputación, carisma y ambición.
Perjudica tener fama baja.
```

El motor traduce esos factores a un score interno y elige un outcome.

---

## 8. Outcomes

Los outcomes recomendados son:

- `poor`;
- `normal`;
- `great`.

Estos nombres son internos. El jugador no los ve.

Cada outcome debe tener efectos propios. No usar multiplicadores automáticos
como `x1.35`.

Preferir pocos efectos:

```ts
effects: {
  fans: 90,
  money: 180
}
```

Evitar mover demasiadas stats a la vez. Como regla práctica, un outcome debería
modificar dos o tres campos como máximo.

---

## 9. History

Al resolver una oportunidad, el motor registra:

```ts
{
  eventId,
  variantId,
  optionId,
  outcomeId,
  personalitySignals
}
```

Esto permite que escenas futuras reaccionen no solo a qué eligió el jugador,
sino también a cómo salió.

Ejemplo:

```text
Eligió negociar.
Le salió great.
```

Eso es distinto a:

```text
Eligió negociar.
Le salió poor.
```

---

## 10. Filosofía

Este sistema existe para evitar que el juego se vuelva una lista de respuestas
correctas e incorrectas.

La pregunta no es:

```text
¿Tenés suficiente fama para negociar?
```

La pregunta es:

```text
¿Qué pasa cuando alguien como vos intenta negociar en este momento de su carrera?
```

El jugador escribe la postura. El estado de la carrera escribe la reacción del
mundo.
