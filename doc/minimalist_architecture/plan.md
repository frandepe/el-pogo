# Plan de arquitectura minimalista

## Principios base

- Todo el juego corre en cliente y en memoria.
- No hay backend, base de datos, LocalStorage ni autenticacion en esta etapa.
- `GameState` es la unica fuente de verdad del estado de la carrera.
- Zustand sera la unica libreria de estado global, pero solo almacenara `GameState`.
- Todo dato derivado, como el paso actual o el evento actual, se obtiene desde el motor.
- El motor no renderiza UI, no depende de React ni depende de Zustand.
- El contenido narrativo y de tienda vive como datos fuera del motor.
- Toda modificacion del estado ocurre mediante `effects`.
- No se crean abstracciones antes de que exista una necesidad concreta.

## Inconsistencias o puntos a definir

- El documento de arquitectura menciona `POST /api/careers` al finalizar, pero el contexto actual indica que no existe backend. Alternativa simple: la finalizacion devuelve un resumen en memoria; el envio queda como integracion futura.
- El `GameState` inicial no incluye inventario, compras, desbloqueos o bloqueos, pero la filosofia de tienda los requiere. Alternativa simple: agregarlos solo cuando una fase concreta de tienda o eventos los necesite.
- La estructura propuesta originalmente incluye muchas piezas del motor desde el inicio. Alternativa simple: crear archivos solo cuando una fase los use.

## Fase 0: Validacion del dominio

**Objetivo:** validar el modelo conceptual del juego antes de implementar cualquier tipo o funcion.

**Que se valida:**

- `GameState`
- `Event`
- `EventOption`
- `Effect`
- `Condition`

El objetivo es comprobar que toda la arquitectura pueda expresarse mediante el ciclo:

```text
Evento
↓
Opcion
↓
Effects
↓
GameState
```

Sin escribir todavia ninguna implementacion.

**Queda funcionando:** existe un modelo del dominio claro y consensuado.

**Dependencias:** ninguna.

## Fase 1: Tipos minimos del dominio

**Objetivo:** convertir el modelo conceptual validado en contratos TypeScript minimos.

**Que se implementa:** tipos para `GameState`, `StepType`, `Effect`, `GameEvent`, `EventOption` y `Condition`.

**Queda funcionando:** el proyecto puede compilar tipos compartidos entre motor, catalogo, store y UI.

**Dependencias:** Fase 0.

## Fase 2: Estado inicial

**Objetivo:** tener una forma unica y testeable de crear una carrera nueva.

**Que se implementa:** `createInitialGameState` con los valores definidos en la arquitectura.

**Queda funcionando:** se puede obtener un `GameState` inicial puro, sin React ni Zustand.

**Dependencias:** Fase 1.

## Fase 3: Aplicador de efectos puro

**Objetivo:** aplicar cambios al estado con una unica responsabilidad.

**Que se implementa:** `applyEffects(gameState, effects)`, soportando unicamente la aplicacion de `effects` sobre el `GameState`.

**Queda funcionando:** la funcion recibe un `GameState` y un objeto `effects`, y devuelve un nuevo `GameState`. No registra historial, no avanza flujo, no selecciona eventos y no conoce UI.

**Dependencias:** Fases 1 y 2.

## Fase 4: Condiciones minimas

**Objetivo:** filtrar contenido segun el estado actual del jugador.

**Que se implementa:** `validateConditions(gameState, conditions)` con comparadores simples (`>=`, `<=`, `>`, `<`, `=`).

**Queda funcionando:** un evento puede declarar cuando esta disponible sin que el motor conozca historias concretas.

**Dependencias:** Fase 1.

## Fase 5: Catalogo inicial con eventos reales

**Objetivo:** validar desde el inicio si el juego tiene personalidad y resulta divertido.

**Que se implementa:** un catalogo muy chico, pero real, escrito como datos y separado del motor. Ejemplos de eventos iniciales:

- "Tenes toda la tarde libre. ¿Que haces?"
- "Un periodista te compara con Cerati."
- "Tu banda quiere suspender un ensayo."

**Queda funcionando:** existe contenido suficiente para probar decisiones, tono narrativo argentino, condiciones simples y efectos sin usar eventos dummy.

**Dependencias:** Fases 1, 3 y 4.

## Fase 6: Seleccion desacoplada de eventos

**Objetivo:** elegir el proximo evento valido sin acoplar el motor al algoritmo de seleccion.

**Que se implementa:** `selectNextEvent(gameState, events)` y `weightedRandom(candidates)`. Al inicio `weightedRandom()` puede usar `Math.random()` internamente.

**Queda funcionando:** dado un estado y un catalogo, se filtran candidatos validos y se elige uno mediante una funcion reemplazable sin modificar el resto del motor.

**Dependencias:** Fases 4 y 5.

## Fase 7: Flujo declarativo basico

**Objetivo:** separar el orden de pantallas del contenido narrativo.

**Que se implementa:** una lista minima de pasos (`CreateArtist`, `Upgrade`, `Choice`, `Info`, `Final`) y reglas simples para avanzar `currentStep`.

**Queda funcionando:** el juego puede saber que tipo de pantalla corresponde sin conocer que historia se mostrara.

**Dependencias:** Fases 1 y 2.

## Fase 8: GameEngine

**Objetivo:** centralizar las reglas de avance de la partida en un motor puro.

**Que se implementa:** un `GameEngine` independiente de React y Zustand, responsable de:

- `startCareer`
- `chooseOption`
- `applyOption`
- `finishCareer`
- `getCurrentStep`
- `advanceStep`
- `getCurrentEvent`

El `GameEngine` es el unico responsable de:

- registrar historial de decisiones
- aplicar `effects`
- avanzar el flujo

Internamente puede delegar en funciones puras como `applyEffects`, `selectNextEvent` y `finishCareer`, pero ninguna otra capa registra historial, aplica consecuencias o decide el avance de la partida.

**Queda funcionando:** una partida minima puede iniciarse, consultar su paso actual, obtener el evento actual, aplicar opciones, registrar historial, avanzar flujo y finalizar en memoria.

**Dependencias:** Fases 2, 3, 6 y 7.

## Fase 9: Store de Zustand

**Objetivo:** conectar la UI con una unica fuente global de estado sin duplicar datos derivados.

**Que se implementa:**

- `gameState`
- acciones que delegan completamente en `GameEngine`

El `currentEvent` nunca se almacena en el store. Siempre se obtiene consultando al `GameEngine` a partir del `GameState` actual, por ejemplo: `gameEngine.getCurrentEvent(gameState)`.

**Queda funcionando:** los componentes React pueden leer `gameState` y disparar acciones sin contener reglas de juego ni duplicar estado derivado.

**Dependencias:** Fase 8.

## Fase 10: Pantallas base sin diseno final

**Objetivo:** comprobar el ciclo jugable con UI minima.

**Que se implementa:** componentes para crear artista, mostrar el paso actual, mostrar una decision, aplicar una opcion y avanzar.

**Queda funcionando:** se puede jugar una secuencia corta en memoria usando Zustand solo como contenedor de `GameState`.

**Dependencias:** Fase 9.

## Fase 11: Tienda minima como contenido

**Objetivo:** integrar la tienda respetando que toda consecuencia termina en `effects`.

**Que se implementa:** formato minimo de items de tienda, condiciones de disponibilidad y compra como opcion con costo y efectos.

**Queda funcionando:** una compra modifica el `GameState` con el mismo mecanismo que una decision narrativa, sin crear un sistema paralelo de reglas.

**Dependencias:** Fases 3, 4, 8 y 9.

## Fase 12: Finalizacion en memoria

**Objetivo:** cerrar una carrera sin backend.

**Que se implementa:** `finishCareer(gameState)` para calcular score, ending y resumen local.

**Queda funcionando:** la partida puede terminar y mostrar un resultado sin request ni persistencia.

**Dependencias:** Fase 8.

## Fase 13: Preparacion futura para backend

**Objetivo:** dejar claro donde se agregara persistencia sin rehacer el motor.

**Que se implementa:** solo documentacion del limite arquitectonico: el motor devuelve el payload final y una capa futura sera responsable de enviarlo.

**Queda funcionando:** no cambia el comportamiento actual; queda definido que el backend sera una integracion externa al motor.

**Dependencias:** Fase 12.
