# Fase 11: Tienda minima como contenido

## Objetivo

Integrar una tienda minima respetando que toda consecuencia termina en `effects`.

## Resultado

La Fase 11 queda implementada.

Se agrego `game/shop.ts`, se extendio el `GameEngine`, se agrego una accion al store y se incorporo una pantalla minima de tienda en el flujo jugable.

## Implementado

- `ShopItem`
- `initialShopItems`
- `getAvailableShopItems(gameState, items)`
- `gameEngine.purchaseShopItem(gameState, itemId, items)`
- `useGameStore.purchaseShopItem(itemId)`
- Paso `Shop` dentro de `careerFlow`
- Pantalla minima `Shop` en `CareerScreen`

## Items iniciales

- `private-teacher`: mejora talento.
- `demo-session`: mejora creatividad y reputacion.
- `local-press`: mejora fama y carisma.

## Comportamiento

- Un item esta disponible si el jugador tiene dinero suficiente y cumple sus condiciones.
- Comprar un item aplica sus `effects`.
- El costo se aplica como efecto sobre `money`.
- La compra registra historial con `eventId: "shop"` y `optionId` igual al id del item.
- Luego de comprar, el flujo avanza al siguiente paso.
- El jugador puede seguir sin comprar.

## Decisiones tomadas

- No se agrego inventario todavia.
- No se bloquean compras repetidas porque todavia no existe estado de compras.
- La tienda no crea un sistema paralelo de reglas.
- La tienda reutiliza `validateConditions` y `applyEffects`.
- Zustand sigue almacenando solamente `gameState`.

## Limites mantenidos

- No se implementaron compras permanentes reales.
- No se implementaron compras temporales.
- No se agrego persistencia.
- No se agrego LocalStorage.
- No se implemento backend.
- No se implemento score final.

## Criterio de avance

Se puede avanzar a Fase 12.

La siguiente fase debe cerrar una carrera en memoria calculando un resultado local sin requests ni persistencia.
