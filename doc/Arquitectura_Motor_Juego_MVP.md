# Arquitectura del motor de juego (MVP)

## Objetivo

Construir un juego narrativo estilo "modo carrera" donde toda la partida se ejecuta completamente en el cliente y únicamente al finalizar se envía un resumen de la carrera al backend.

El objetivo del MVP es validar que el juego sea divertido antes de invertir tiempo en autenticación, rankings y persistencia.

Toda la filosofía narrativa, el tono del juego, la tienda y las reglas de escritura de eventos se documentan en `Filosofia_Narrativa_y_Shop.md`.

---

# Arquitectura general

```text
Frontend (Next.js)
│
├── Motor del juego
├── GameState
├── Historial de decisiones
├── Catálogo de eventos
├── Flujo del juego
├── Componentes de UI
└── POST /api/careers (solo al finalizar)

Backend (Fase 2)
│
├── Guarda la carrera
├── Rankings
├── Estadísticas
└── Historial de partidas
```

Durante toda la partida:

- No existen requests al backend.
- No existe persistencia.
- Todo el estado vive únicamente en memoria.
- No se utiliza LocalStorage ni base de datos.

Al finalizar:

```http
POST /api/careers
```

---

# GameState

Existe un único objeto que representa absolutamente toda la carrera.

```ts
GameState {
  artistName: "",
  role: "",

  currentStep: 0,
  age: 18,

  fame: 10,
  fans: 0,
  money: 500, (pesos argentinos)

  talent: 40,
  creativity: 50,
  charisma: 35,
  reputation: 20,
  health: 100,

  albums: 0,
  concerts: 0,
  awards: 0,
  grammys: 0,
  worldTours: 0,
  recordDeals: 0,
  bandBreakups: 0,

  history: []
}
```

El `GameState` es la única fuente de verdad del juego.

Nunca existen múltiples estados con información duplicada.

El motor nunca debe depender del estado interno de componentes de React.

La UI únicamente representa el estado generado por el motor.

---

# Rasgos de personalidad

Además de las estadísticas, el jugador puede desarrollar **rasgos de personalidad**.

Los rasgos no son valores numéricos.

Representan la forma en que el jugador construyó la personalidad de su músico a través de sus decisiones.

Ejemplos:

- Rebelde
- Perfeccionista
- Humilde
- Ambicioso
- Impulsivo
- Diplomático
- Temerario
- Leal

Los rasgos nunca se eligen directamente.

Se obtienen de manera orgánica a lo largo de la carrera.

Por ejemplo, si el jugador responde de forma agresiva o desafiante de manera recurrente, puede desbloquear el rasgo **Rebelde**.

Si constantemente prioriza a sus compañeros por encima de su propio beneficio, puede obtener el rasgo **Leal**.

## Consecuencias

Los rasgos modifican la narrativa del juego.

Pueden:

- desbloquear nuevas opciones de diálogo;
- habilitar eventos exclusivos;
- impedir determinadas decisiones;
- modificar la reacción de otros personajes;
- cambiar la forma en que evoluciona una situación.

Los rasgos no reemplazan a las estadísticas.

Mientras las estadísticas representan **qué tan bueno es el músico**, los rasgos representan **quién es como persona**.

El objetivo es que dos jugadores con estadísticas similares puedan vivir carreras completamente distintas gracias a la personalidad que construyeron durante la partida.

---

Yo dividiría el juego en dos fases.

Fase 1 - Construcción del personaje

Aproximadamente los primeros 5-10 eventos.

No importa demasiado qué tan aleatorios sean.

Lo importante es responder preguntas como:

¿Qué clase de músico sos?
¿Cómo tratás a tu banda?
¿Cómo reaccionás ante la presión?
¿Preferís el talento o el trabajo?
¿Sos humilde o agrandado?
¿Improvisás o planificás?

Es como cuando conocés a alguien. Todavía no sabés qué le va a pasar en la vida, pero empezás a entender quién es.

Fase 2 - La carrera responde a quién sos

Recién ahí el motor empieza a decir:

"Bueno... este jugador es guitarrista, creativo, bastante rebelde, tiene buen talento y ya ganó algo de reputación."

Y desde ese momento empiezan a aparecer eventos acordes.

---

# Filosofía del motor

El juego **no** está basado en árboles de decisiones.

Está basado en el estado actual del jugador.

Dos jugadores pueden recorrer exactamente el mismo flujo y vivir carreras completamente diferentes debido a las decisiones que fueron tomando.

El motor nunca conoce historias concretas.

Únicamente conoce:

- el GameState;
- el flujo del juego;
- el catálogo de eventos.

Todo el contenido vive fuera del motor.

---

# Flujo del juego

El flujo es completamente declarativo.

Ejemplo:

```text
Crear artista
↓
Elegir rol
↓
UP
↓
Choice
↓
Info
↓
UP
↓
Choice
↓
Info
↓
Market
↓
Interview
↓
MiniGame
↓
Info
↓
UP
↓
Choice
↓
...
↓
Final
```

Cada paso representa únicamente un tipo de pantalla.

El motor sabe cuál es el siguiente paso.

Nunca conoce qué historia contará esa pantalla.

---

# Tipos de pasos

## CreateArtist

Inicializa el GameState.

---

## Upgrade

Permite elegir una mejora para el personaje.

---

## Choice

Presenta una decisión narrativa.

---

## Info

Pantalla narrativa.

No requiere interacción.

---

## Interview

Serie de preguntas.

---

## Market

Presenta oportunidades disponibles según el estado actual del jugador.

---

## Shop

Permite realizar compras.

Toda la lógica de la tienda se encuentra documentada en `Filosofia_Narrativa_y_Shop.md`.

---

## MiniGame

Eventos especiales con mecánicas propias.

Ejemplos:

- Festival.
- Premios.
- Concierto histórico.

---

# Sistema de efectos

El motor nunca modifica manualmente el GameState.

Cada opción disponible dentro de un evento posee un conjunto de efectos (`effects`).

Ejemplo:

```ts
{
  id: "practice",

  text: "¿Qué hacés durante el ensayo?",

  options: [
    {
      text: "Practicar durante ocho horas.",

      effects: {
        talent: +4,
        creativity: -1,
        health: -1
      }
    },

    {
      text: "Componer un riff nuevo.",

      effects: {
        creativity: +3,
        talent: +1
      }
    }
  ]
}
```

El motor únicamente recibe la opción elegida y aplica sus efectos sobre el `GameState`.

Todos los sistemas del juego utilizan exactamente este mecanismo.

Da igual si se trata de:

- una compra;
- una entrevista;
- una pelea con la banda;
- un concierto;
- un exceso;
- una decisión narrativa.

Todo termina convirtiéndose en efectos sobre el estado del jugador.

Los efectos no se limitan únicamente a modificar estadísticas.

También pueden:

- agregar objetos al inventario;
- otorgar logros;
- desbloquear nuevos eventos;
- bloquear eventos futuros;
- modificar probabilidades;
- registrar información en el historial;
- cambiar cualquier otro dato del GameState.

## Decisiones importantes

Toda decisión importante debe tener consecuencias mecánicas y narrativas.

Una opción no debería existir solo como texto cosmético. Si el jugador está definiendo una postura relevante para su carrera, la opción debe:

- modificar al menos un atributo del `GameState` mediante `effects`;
- registrar señales de personalidad cuando corresponda;
- expresar una diferencia narrativa clara frente a las otras opciones.

No todas las decisiones deben ser una mejora gratuita. Algunas opciones pueden aumentar un atributo y reducir otro.

Ejemplo:

```ts
{
  text: "Aceptar el cambio de sonido",
  effects: {
    fame: 4,
    reputation: -2
  },
  personalitySignals: ["ambition"]
}
```

La regla general es que las respuestas válidas construyan músicos distintos, no solo resultados correctos o incorrectos.

# Rareza de las opciones

No todas las opciones de un evento deben aparecer con la misma frecuencia.

Cada opción podrá pertenecer a uno de estos tres niveles:

## Común

Es el comportamiento por defecto.

- Son las opciones que aparecen con mayor frecuencia.
- No requieren ninguna diferenciación visual.
- Constituyen la mayoría del contenido del juego.

## Poco común

Representan oportunidades que aparecen ocasionalmente.

No necesariamente son mejores que una opción común, pero suelen ofrecer un impacto ligeramente mayor o una situación más interesante.

En la UI deberán diferenciarse de forma sutil mediante:

- un pequeño detalle visual en tonos dorados;
- un badge con el texto **"Poco común"**.

El resto de la card debe mantenerse igual para no romper la estética general del juego.

## Especial

Representan oportunidades extraordinarias dentro de una carrera.

No son simplemente una recompensa más grande.

Su objetivo es introducir situaciones poco frecuentes que puedan cambiar el rumbo de la historia.

Una opción especial puede ofrecer:

- efectos superiores a los habituales;
- eventos exclusivos;
- objetos únicos;
- contactos importantes;
- decisiones con gran impacto narrativo;
- oportunidades difíciles de volver a encontrar.

También puede implicar riesgos importantes.

Una opción especial no debe ser automáticamente la mejor opción. Debe ser la más trascendente.

Visualmente deberá diferenciarse mediante:

- borde con tonos dorados;
- brillo muy sutil;
- badge dorado con el texto **"Especial"**.

La estética debe seguir siendo elegante y coherente con el resto del juego. No debe sentirse como un sistema de loot de un RPG.

## Filosofía

El objetivo no es recompensar al jugador con más estadísticas.

El objetivo es generar momentos memorables.

Cuando aparezca una opción **Especial**, el jugador debe sentir que acaba de recibir una oportunidad que probablemente no vuelva a aparecer en esa carrera.

---

# Cómo evoluciona la historia

El flujo del juego siempre es el mismo.

Lo que cambia es el contenido disponible para el jugador.

Ejemplo:

```
fame = 90
```

↓

Festival internacional.

---

```
fame = 40
```

↓

Teatro.

---

```
fame = 10
```

↓

Bar.

El recorrido es idéntico.

La narrativa cambia porque cambia el GameState.

---

# Catálogo de eventos

Los eventos son únicamente datos.

Cada evento define:

- cuándo puede aparecer;
- qué opciones presenta;
- qué efectos produce cada opción.

Ejemplo:

```ts
{
  id: "festival",

  conditions: {
    fame: ">=80",
    age: ">=22"
  },

  options: [
    ...
  ]
}
```

El motor únicamente filtra los eventos válidos según el GameState.

---

# Motor de selección

```ts
const candidates = events.filter((event) => event.matches(gameState));

const nextEvent = weightedRandom(candidates);
```

No existen árboles gigantes de decisiones.

No existen cientos de `if` anidados.

Agregar nuevos eventos nunca debe requerir modificar esta lógica.

---

# Historial de la carrera

Durante toda la partida el motor registra las decisiones tomadas por el jugador.

Ejemplo:

```ts
history: [
  {
    eventId: "journalist-cerati",
    optionId: "humilde",
  },
  {
    eventId: "record-deal",
    optionId: "rechazar",
  },
];
```

El historial no representa el estado del jugador.

Su objetivo es:

- construir el resumen final;
- mostrar la historia de la carrera;
- enviar información al backend;
- obtener estadísticas en futuras versiones.

El GameState nunca se reconstruye a partir del historial.

Siempre representa el estado actual del jugador.

---

# Responsabilidades del motor

El motor es responsable de:

- mantener el GameState;
- avanzar el flujo;
- validar condiciones;
- seleccionar eventos;
- aplicar efectos;
- registrar el historial;
- finalizar la carrera.

El motor **no** es responsable de:

- renderizar componentes;
- decidir textos;
- conocer historias concretas;
- comunicarse continuamente con el backend.

---

# Finalización

Cuando termina la carrera:

1. Se calcula el resultado final.
2. Se obtiene el puntaje.
3. Se genera el resumen de la carrera.
4. Se envía una única request al backend.

Ejemplo:

```http
POST /api/careers
```

Payload:

```json
{
  "artistName": "...",
  "score": 18340,
  "ending": "Rock Legend",
  "stats": {
    "fame": 98,
    "fans": 24500000,
    "albums": 14,
    "grammys": 8,
    "money": 185000000
  },
  "history": [...]
}
```

Durante toda la partida no existe persistencia.

---

# Principios de diseño

- El GameState es la única fuente de verdad.
- Todo cambio sobre el GameState se realiza mediante `effects`.
- El motor nunca conoce historias concretas.
- Los eventos son datos.
- El flujo es declarativo.
- El estado actual determina qué eventos pueden aparecer.
- El backend participa únicamente al finalizar la carrera.
- Agregar nuevos eventos nunca debe requerir modificar el motor.
- Agregar contenido consiste únicamente en crear nuevos datos.
- El juego debe poder ejecutarse completamente sin conexión a un backend.
- El motor debe poder ejecutarse independientemente de React.
- La UI únicamente consume el estado generado por el motor.
