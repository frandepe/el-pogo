# El Pogo

El Pogo es una web/juego narrativo de carrera musical. El jugador crea un músico, elige un rol, forma una banda y atraviesa decisiones que construyen una biografía: ensayos, recitales, primeros pagos, prensa, conflictos, demos, excesos, oportunidades y finales posibles.

No busca simular la industria musical de forma realista. Busca contar una carrera de rock divertida, exagerada, argentina y con consecuencias narrativas visibles.

## Estado del proyecto

MVP en Next.js. La partida corre completa en el cliente:

- el estado vive en memoria;
- el motor aplica efectos y avanza el flujo;
- la UI renderiza pantallas según el estado actual;
- el backend queda reservado para una fase posterior, principalmente para guardar carreras finalizadas, rankings y estadísticas.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Comandos útiles:

```bash
npm run lint
npm run build
```

## Archivos importantes

- `app/page.tsx`: entrada principal de la web.
- `app/layout.tsx`: layout raíz de Next.js.
- `app/globals.css`: estilos globales.
- `components/game/CareerScreen.tsx`: orquesta la pantalla actual de la carrera.
- `components/game/CareerStepContent.tsx`: renderiza los pasos genéricos del flujo.
- `components/game/season1/`: componentes y contenido específico del Capítulo I.
- `components/game/info/InfoScene.tsx`: plantilla visual para escenas informativas.
- `components/game/choices/ChoiceOptionCard.tsx`: tarjeta reutilizable para decisiones.
- `components/game/shop/`: UI de tienda.
- `game/gameEngine.ts`: API principal del motor.
- `game/types.ts`: tipos centrales del dominio.
- `game/store.ts`: store de Zustand.
- `game/flow.ts`: flujo declarativo de steps.
- `game/applyEffects.ts`: aplicación de efectos sobre `GameState`.
- `game/validateConditions.ts`: validación de condiciones.
- `game/selectNextEvent.ts`: selección de eventos.
- `game/narrativeConsequences.ts`: helper para mapear decisiones a consecuencias narrativas.
- `game/shop.ts`: catálogo y reglas de tienda.
- `public/`: imágenes y assets estáticos.
- `doc/`: documentación de diseño, narrativa, arquitectura y planes.

## Filosofía narrativa

El Pogo no es un juego sobre convertirse siempre en estrella. Es un juego sobre vivir una carrera.

Algunas carreras pueden terminar llenando estadios. Otras pueden terminar en bares chicos, en una banda de culto, en una ferretería con una guitarra guardada o en un retiro sin arrepentimientos. Todas tienen que poder sentirse como una historia propia.

El tono debe ser:

- humorístico;
- descontracturado;
- escrito en español argentino;
- inspirado en cultura rock;
- humano incluso cuando el jugador pierde.

La regla de oro: cada evento debería sentirse como una anécdota que un músico cuenta treinta años después en una entrevista.

Documentación completa: [doc/Filosofia_Narrativa_y_Shop.md](doc/Filosofia_Narrativa_y_Shop.md)

## Narrativa y temporadas

La carrera se organiza por capítulos que representan momentos de vida, no niveles de éxito.

Ejemplo:

- Capítulo I: nacimiento de la banda, primeros ensayos, primer recital y primer demo.
- Capítulo II: buscar un lugar y hacerse un nombre.
- Capítulo III: decisiones que empiezan a definir la carrera.
- Capítulos posteriores: mantenerse, cargar con la reputación y construir un legado.

Plan general: [doc/seasons.md](doc/seasons.md)

Plan del Capítulo I: [doc/steps/season1/Capitulo_1_Los_Primeros_Acordes_Plan.md](doc/steps/season1/Capitulo_1_Los_Primeros_Acordes_Plan.md)

## Personalidad del jugador

El sistema de personalidad separa dos capas:

- `personalitySignals`: contadores internos, acumulables e invisibles para el jugador.
- `personalityTraits`: rasgos visibles que aparecen cuando una tendencia ya se consolidó.

Las decisiones y entrevistas no convierten al personaje inmediatamente en "Rebelde", "Humilde" o "Líder". Primero suman señales como `humble`, `leader`, `authentic`, `rebellion`, `pragmatic` o `ambition`. Luego, en momentos importantes de la carrera, el juego puede recalcular los traits visibles a partir de esas señales.

Esto permite que la personalidad no funcione como una recompensa ni como un castigo, sino como una lectura narrativa de cómo viene actuando el músico. Por ejemplo, un jugador puede acumular `humble: 6`, `leader: 2`, `authentic: 4` y `rebellion: 1`; esas señales cuentan una historia interna aunque todavía no todas se hayan convertido en rasgos visibles.

Las entrevistas siguen una regla especial: construyen personalidad de forma silenciosa y no modifican atributos como fama, talento, salud, dinero o reputación. Cada respuesta aporta exactamente una `personalitySignal`, pero la pregunta siempre debe nacer de algo que pasó en la carrera para que no se sienta como un test psicológico.

Documentación completa: [doc/personality-system.md](doc/personality-system.md)

## Paso del tiempo

Las transiciones temporales son el principal mecanismo de crecimiento pasivo de la carrera. En lugar de que cada decisión entregue premios inmediatos como `+15 fans`, el juego deja que pasen meses o años y recién ahí consolida el crecimiento de fondo.

Para eso existe `timePasses`:

```ts
timePasses: {
  months: 11,
  intensity: "active"
}
```

El contenido declara cuánto tiempo pasó y qué tan intenso fue el período. El motor calcula automáticamente recitales, fans, fama, dinero, talento, creatividad y desgaste de salud cuando corresponde.

La intención es que cada cierto tramo largo de la historia, especialmente meses o años representados por una transición cinematográfica, el juego actualice esas estadísticas de fondo. Así el jugador siente que la banda viene trabajando, tocando y cambiando entre decisiones importantes, no que cada pantalla reparte puntos de forma inmediata.

Documentación completa: [doc/time-passes-system.md](doc/time-passes-system.md)

## Shop

La tienda no existe solo para subir estadísticas. Es parte de la narrativa.

Las compras pueden representar instrumentos, formación, staff, producción, marketing o lujos. Algunas mejoran atributos, otras desbloquean eventos, modifican probabilidades o simplemente cambian el tipo de historia que puede vivir el jugador.

Una compra no debería sentirse como un botón de optimización, sino como una decisión de carrera.

Documentación completa: [doc/Filosofia_Narrativa_y_Shop.md](doc/Filosofia_Narrativa_y_Shop.md)

## Arquitectura

El juego está basado en estado, no en árboles rígidos de decisiones.

Principios principales:

- `GameState` es la única fuente de verdad.
- El motor no conoce historias concretas.
- Los eventos son datos.
- Las opciones aplican `effects` para consecuencias directas.
- Las transiciones temporales aplican `timePasses` para crecimiento pasivo.
- Las entrevistas suman `personalitySignals` sin modificar atributos.
- El historial registra decisiones tomadas.
- El flujo define tipos de pantalla, no contenido.
- La UI consume el estado y renderiza componentes.

Esto permite que dos jugadores pasen por un flujo parecido pero vivan carreras distintas según rol, atributos, rasgos, señales de personalidad, dinero, fama, reputación, salud, compras, paso del tiempo e historial.

Documentación completa: [doc/Arquitectura_Motor_Juego_MVP.md](doc/Arquitectura_Motor_Juego_MVP.md)

## Documentación útil

- Filosofía narrativa, lenguaje y shop: [doc/Filosofia_Narrativa_y_Shop.md](doc/Filosofia_Narrativa_y_Shop.md)
- Arquitectura del motor: [doc/Arquitectura_Motor_Juego_MVP.md](doc/Arquitectura_Motor_Juego_MVP.md)
- Sistema de personalidad del jugador: [doc/personality-system.md](doc/personality-system.md)
- Sistema de paso del tiempo: [doc/time-passes-system.md](doc/time-passes-system.md)
- Temporadas y capítulos: [doc/seasons.md](doc/seasons.md)
- Plan del Capítulo I: [doc/steps/season1/Capitulo_1_Los_Primeros_Acordes_Plan.md](doc/steps/season1/Capitulo_1_Los_Primeros_Acordes_Plan.md)
- Reportes de implementación del Capítulo I: [doc/steps/season1](doc/steps/season1)
- Resumen actual del proyecto: [doc/resume/project-summary.md](doc/resume/project-summary.md)

## Nota para desarrollo

Este proyecto usa una versión de Next.js con cambios importantes. Antes de escribir código relacionado con APIs o convenciones de Next, revisar la documentación local en:

```text
node_modules/next/dist/docs/
```
