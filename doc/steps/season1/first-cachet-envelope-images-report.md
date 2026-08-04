# Step 9 - Primer cachet con imágenes

## Cambios realizados

- Se reemplazó el sobre generado con CSS por los assets reales:
  - `public/money/close_envelope.png`
  - `public/money/open_envelope.png`
- Se actualizó `FirstCachet` para mostrar primero el sobre cerrado, luego el abierto y finalmente el monto `+$180`.
- Se separaron los momentos de la escena:
  - apertura visual;
  - aparición del monto;
  - acreditación del dinero;
  - avance automático al siguiente step.
- Se agregó una transición breve al valor del header cuando cambia el dinero.

## Timing aplicado

- 300 ms: comienza la apertura visual.
- 500 ms: aparece el sobre abierto.
- 600 ms: aparece el monto recibido.
- 1400 ms: se acredita el dinero al `GameState`.
- 2500 ms: avanza automáticamente a `¿Qué hacemos con el cachet?`.

## Decisiones de animación

La animación usa únicamente `transform` y `opacity`, con curvas `cubic-bezier(0.23, 1, 0.32, 1)`.

No se agregaron partículas, rebotes, confeti ni efectos de premio. La intención es que el momento se sienta sobrio y narrativo, no como una recompensa de casino.

Se agregó soporte para `prefers-reduced-motion`, reduciendo el movimiento y conservando cambios de opacidad.

## Validación

- `npm run lint`: correcto.
- `npm run build`: correcto.
