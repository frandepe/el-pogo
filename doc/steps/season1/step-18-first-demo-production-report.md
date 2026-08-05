# Step 18 - Grabar el primer demo

## Objetivo

Introducir una mecánica genérica de producción musical compuesta.

No es un `Choice` tradicional. El jugador atraviesa una introducción, tres
decisiones consecutivas y una resolución narrativa determinada por una calidad
oculta.

## Implementación

- Se agregó `ProductionEventDefinition` en `game/productionEvents.ts`.
- Se agregó `ProductionEvent`, componente reusable para producciones musicales.
- Se agregó `firstDemoProduction`, contenido concreto del primer demo.
- Se agregó `FirstDemoProductionScene`, wrapper del Capítulo I.
- Se agregó `applyProductionOption` al motor y al store.
- El Step 18 aparece después de "La entrevista salió publicada".

## Reglas protegidas

Una producción debe tener:

- exactamente 3 preguntas;
- exactamente 4 opciones por pregunta;
- efectos visibles inmediatos;
- señales de personalidad ocultas;
- puntaje de calidad oculto por opción;
- resolución narrativa según la suma total de calidad.

El puntaje de calidad no se guarda en `GameState`, para que no aparezca en el
debug ni se mezcle con stats visibles.

## Resultado

Los efectos se aplican inmediatamente al elegir cada opción.

La calidad acumulada solo decide la resolución narrativa:

- demo malo;
- demo aceptable;
- buen demo;
- excelente demo.

La arquitectura no está acoplada a demos y puede reutilizarse para álbumes,
álbumes en vivo, producciones acústicas u otras obras futuras.
