# Fase 13: Preparacion futura para backend

## Objetivo

Definir el limite arquitectonico para agregar backend y persistencia en una fase futura sin rehacer el motor.

## Resultado

La Fase 13 queda ejecutada como documentacion de frontera.

No se implemento backend, no se creo ruta API, no se agrego persistencia y no se modifico el comportamiento actual del juego.

## Contrato disponible hoy

El motor ya puede generar un resultado final local mediante:

```ts
const result = gameEngine.finishCareer(gameState)
```

Ese resultado tiene forma de `CareerResult`:

- `artistName`
- `score`
- `ending`
- `stats`
- `history`

Este objeto es el candidato natural para convertirse en payload futuro.

## Frontera futura

Cuando exista backend, la integracion debe vivir fuera del motor.

Responsabilidad futura de una capa externa:

- recibir el `CareerResult`;
- enviarlo al backend;
- manejar errores de red;
- manejar loading states;
- decidir si se reintenta o no;
- actualizar UI relacionada con persistencia.

Responsabilidad que debe seguir dentro del motor:

- calcular el resultado final;
- mantener el flujo de juego;
- aplicar efectos;
- registrar historial;
- devolver datos puros.

## Endpoint futuro sugerido

```http
POST /api/careers
```

Payload sugerido:

```ts
CareerResult
```

Esta fase no crea el endpoint. Solo deja definida la frontera para no acoplar el motor a HTTP.

## Reglas arquitectonicas

- El motor no debe importar `fetch`.
- El motor no debe conocer rutas API.
- El motor no debe manejar errores de red.
- Zustand no debe persistir automaticamente la carrera.
- La UI puede disparar una accion futura de guardado, pero esa accion debe recibir un `CareerResult` ya generado.
- Si se agrega backend, el juego debe seguir pudiendo ejecutarse completamente en cliente mientras dura la partida.

## Persistencia futura

La persistencia futura debe ocurrir solo al finalizar la carrera.

No deben agregarse requests durante:

- creacion del artista;
- seleccion de opciones;
- aplicacion de efectos;
- compras;
- avance de flujo;
- calculo de evento actual.

## Limites mantenidos

- No se implemento backend.
- No se implemento `POST /api/careers`.
- No se agrego base de datos.
- No se agrego autenticacion.
- No se agrego LocalStorage.
- No se agrego ranking.
- No se cambio el store.
- No se cambio el motor.

## Cierre de la arquitectura base

Con esta fase queda completa la arquitectura base planificada:

- dominio minimo;
- estado inicial;
- efectos puros;
- condiciones;
- catalogo inicial;
- seleccion desacoplada;
- flujo declarativo;
- `GameEngine`;
- store de Zustand;
- pantallas base;
- tienda minima;
- finalizacion en memoria;
- frontera futura para backend.

El proyecto queda listo para evolucionar contenido, UI y persistencia sin rehacer el motor.
