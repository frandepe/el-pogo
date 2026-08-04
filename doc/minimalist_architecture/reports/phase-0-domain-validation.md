# Fase 0: Validacion del dominio

## Objetivo

Validar el modelo conceptual del juego antes de implementar tipos, funciones o archivos de motor.

La arquitectura base debe poder expresarse mediante este ciclo:

```text
Evento
-> Opcion
-> Effects
-> GameState
```

## Resultado

La Fase 0 queda validada.

El modelo conceptual es suficiente para iniciar la Fase 1 sin implementar logica todavia. Las entidades principales estan separadas por responsabilidad y no obligan a crear abstracciones prematuras.

## Entidades validadas

### GameState

Representa el estado completo y actual de la carrera.

Responsabilidades:

- Ser la unica fuente de verdad de la partida.
- Contener datos persistentes durante la carrera: artista, rol, edad, stats, recursos, progreso y datos necesarios para desbloqueos futuros.
- Vivir en memoria durante esta etapa.

No debe:

- Conocer eventos disponibles.
- Calcular condiciones.
- Aplicar efectos por si mismo.
- Contener estado derivado que pueda obtenerse desde el motor.

### Event

Representa una situacion narrativa disponible para el jugador.

Responsabilidades:

- Definir el contenido narrativo.
- Declarar sus condiciones de aparicion.
- Contener opciones disponibles.
- Existir como dato, no como logica de motor.

No debe:

- Mutar el `GameState`.
- Decidir el siguiente paso del flujo.
- Ejecutar efectos.

### EventOption

Representa una decision concreta dentro de un evento.

Responsabilidades:

- Mostrar una accion elegible por el jugador.
- Declarar los `effects` que produce.
- Tener un identificador estable para historial futuro.

No debe:

- Aplicar sus propios efectos.
- Registrar historial.
- Conocer Zustand ni React.

### Effect

Representa una consecuencia sobre el `GameState`.

Responsabilidades:

- Describir cambios que pueden aplicarse al estado.
- Ser el mecanismo unico de modificacion del `GameState`.
- Servir tanto para decisiones narrativas como para tienda, entrevistas, excesos o eventos especiales.

No debe:

- Contener texto narrativo.
- Avanzar el flujo.
- Registrar historial.

### Condition

Representa una regla de disponibilidad.

Responsabilidades:

- Determinar si un evento, opcion o item puede estar disponible segun el `GameState`.
- Mantener el contenido desacoplado del motor.

No debe:

- Modificar estado.
- Elegir eventos.
- Depender de UI.

## Responsabilidades externas al ciclo

### GameEngine

El `GameEngine` sera el coordinador del ciclo.

Responsabilidades conceptuales:

- Obtener el paso actual.
- Obtener eventos disponibles.
- Seleccionar el evento actual.
- Aplicar una opcion elegida.
- Delegar la aplicacion de `effects`.
- Registrar historial.
- Avanzar el flujo.
- Finalizar la carrera en memoria.

Decision validada: el historial no pertenece a `applyEffects`. Lo registra el `GameEngine` cuando una opcion fue elegida.

### Zustand

Zustand sera solo el contenedor global de `GameState`.

Decision validada: el store no guarda `currentEvent`, `currentStep` como dato derivado independiente ni ningun catalogo. Esos valores se consultan al `GameEngine` usando el `GameState` actual.

## Validacion del ciclo

El ciclo conceptual cubre las mecanicas principales documentadas:

- Decisiones narrativas: `Event -> EventOption -> Effect -> GameState`.
- Tienda: un item comprado puede modelarse como opcion con costo y efectos.
- Entrevistas: cada respuesta puede modelarse como opcion con efectos.
- Excesos: las consecuencias positivas o negativas se expresan como efectos.
- Desbloqueos futuros: pueden incorporarse luego como efectos sobre campos concretos del `GameState`.

## Decisiones tomadas

- No se define todavia la forma final del historial.
- No se agregan inventario, desbloqueos ni compras al `GameState` hasta que una fase concreta los necesite.
- No se crean interfaces genericas "por las dudas".
- El primer contrato tecnico de Fase 1 debe mantenerse minimo y alineado con estas entidades.
- La arquitectura futura de backend debe recibir un resumen final generado desde el estado, pero no participa durante la partida.

## Riesgos detectados

- La tienda necesitara extender el `GameState` mas adelante para representar compras permanentes, temporales o desbloqueos.
- El historial es necesario para resumen final, pero todavia conviene postergar su forma exacta.
- Las condiciones deben empezar simples para evitar crear un mini lenguaje prematuro.

## Criterio de avance

Se puede avanzar a Fase 1 cuando los tipos iniciales representen solo:

- `GameState`
- `GameEvent`
- `EventOption`
- `Effect`
- `Condition`
- `StepType`

No debe incorporarse todavia una estructura detallada de historial ni sistemas de tienda avanzados.
