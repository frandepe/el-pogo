# Resumen del proyecto

## Concepto

Juego web narrativo estilo modo carrera donde el jugador intenta convertirse en una leyenda del rock. La partida ocurre completamente del lado del cliente, en memoria, sin backend, base de datos, autenticacion ni LocalStorage.

## Stack actual

- Next.js 16 con App Router y Turbopack.
- React 19.
- TypeScript.
- Tailwind CSS 4.
- shadcn/ui configurado como base de componentes.
- Zustand como unica libreria de estado global.

## Arquitectura base

El dominio se organiza alrededor del ciclo:

```text
Evento -> Opcion -> Effects -> GameState
```

`GameState` es la unica fuente de verdad. El store de Zustand guarda solamente `gameState`; cualquier dato derivado, como el paso actual o el evento actual, se consulta al `GameEngine`.

El motor vive en `game/` y no depende de React, Zustand ni UI.

## Motor del juego

Archivos principales:

- `game/types.ts`: contratos del dominio.
- `game/createInitialGameState.ts`: estado inicial.
- `game/applyEffects.ts`: aplica efectos puros sobre stats numericas.
- `game/validateConditions.ts`: valida condiciones minimas.
- `game/weightedRandom.ts`: seleccion ponderada desacoplada.
- `game/selectNextEvent.ts`: filtra eventos validos y delega seleccion.
- `game/flow.ts`: flujo declarativo.
- `game/gameEngine.ts`: coordina estado, flujo, eventos, efectos, historial, tienda y finalizacion.
- `game/finishCareer.ts`: genera resultado final local.
- `game/shop.ts`: tienda minima como contenido.
- `game/store.ts`: store Zustand minimo.

## Contenido jugable

Existe un catalogo inicial real en `game/events/initialEvents.ts` con eventos narrativos:

- tarde libre antes del ensayo;
- comparacion con Cerati en una entrevista;
- banda que quiere suspender un ensayo.

La tienda minima contiene items como profesor particular, sesion de demo y prensa barrial. Las compras tambien se expresan como `effects`.

## Flujo actual

Flujo declarativo inicial:

```text
CreateArtist -> Upgrade -> Choice -> Info -> Shop -> Final
```

La carrera puede iniciarse, avanzar, elegir una opcion narrativa, ver cambios de stats, comprar en tienda y finalizar en memoria.

## UI actual

La pantalla principal esta en `components/game/CareerScreen.tsx`.

Componentes separados:

- `components/game/role-selection/RoleCard.tsx`
- `components/game/StatCard.tsx`
- `components/game/data/roleOptions.ts`

La seleccion de rol ya no usa `<select>`. Ahora muestra cuatro tarjetas visuales con imagenes de `public/rol`:

- cantante;
- guitarrista;
- bajista;
- baterista.

La seleccion usa borde dorado, glow sutil, elevacion y microinteracciones moderadas.

## Diseño base

El proyecto usa identidad oscura, con fondo negro moderno, tipografia `Archivo` para UI y `Oswald` para titulos. El color primario es rojo intenso y elegante, con acentos dorados puntuales en seleccion de rol.

## Documentacion generada

Plan de arquitectura:

- `doc/minimalist_architecture/plan.md`

Reportes por fase:

- `doc/minimalist_architecture/reports/phase-0-domain-validation.md`
- `doc/minimalist_architecture/reports/phase-1-domain-types.md`
- `doc/minimalist_architecture/reports/phase-2-initial-state.md`
- `doc/minimalist_architecture/reports/phase-3-apply-effects.md`
- `doc/minimalist_architecture/reports/phase-4-conditions.md`
- `doc/minimalist_architecture/reports/phase-5-initial-events.md`
- `doc/minimalist_architecture/reports/phase-6-event-selection.md`
- `doc/minimalist_architecture/reports/phase-7-declarative-flow.md`
- `doc/minimalist_architecture/reports/phase-8-game-engine.md`
- `doc/minimalist_architecture/reports/phase-9-zustand-store.md`
- `doc/minimalist_architecture/reports/phase-10-base-screens.md`
- `doc/minimalist_architecture/reports/phase-11-shop-content.md`
- `doc/minimalist_architecture/reports/phase-12-memory-finalization.md`
- `doc/minimalist_architecture/reports/phase-13-backend-preparation.md`

## Estado de validacion

La ultima validacion realizada paso correctamente:

- `npm run lint`
- `npm run build`

## Proximos pasos posibles

- Mejorar UI de las pantallas `Upgrade`, `Choice`, `Info`, `Shop` y `Final`.
- Ampliar catalogo de eventos reales.
- Definir inventario/compras permanentes cuando la tienda lo necesite.
- Agregar tests del motor puro.
- Refinar score y endings.
- Preparar futura integracion `POST /api/careers` sin acoplarla al motor.
