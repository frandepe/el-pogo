# Placeholders narrativos

Usar placeholders cuando un texto menciona a un integrante genérico de la banda.
El formatter evita que ese integrante sea el rol del jugador.

## Integrantes de banda

- `{randomBandMember}`: `guitarrista`, `bajista`, `baterista` o `cantante`.
- `{randomBandMemberWithArticle}`: `el guitarrista`, `el bajista`, etc.
- `{randomBandMemberPossessive}`: `del guitarrista`, `del bajista`, etc.

Ejemplos:

```ts
"La mamá {randomBandMemberPossessive} apareció con empanadas."
"{randomBandMemberWithArticle} atendió haciéndose pasar por el manager."
```

Si el jugador es guitarrista, esos textos pueden mostrarse como:

```text
La mamá del bajista apareció con empanadas.
El baterista atendió haciéndose pasar por el manager.
```

## Regla

Los textos fuente pueden seguir escritos de forma natural, pero para integrantes
genéricos conviene usar placeholders. La capa de presentación llama a
`formatNarrativeText(text, gameState, seed)` antes de renderizar narrativa.

El reemplazo es estable por `seed`, así que no cambia en cada render.
