# Step 13 - Pasó casi un año

## Objetivo

Introducir una pantalla narrativa distinta de las escenas informativas de consecuencia.

El Step 13 funciona como una transición temporal: comunica que pasó casi un año y cambia el ritmo antes de seguir con nuevas decisiones.

## Implementación

- Se agregó `CinematicTransition`, un componente reusable para montajes narrativos.
- Se estrenó con `AlmostAYearTransition`.
- La imagen usada es `public/pictures/musicians-in-the-rain.png`.
- La pantalla aparece después del Step 12, al continuar desde la repercusión de la primera crítica.

## Criterio visual

La composición usa la imagen como escenario principal, con texto integrado dentro del encuadre, barras cinematográficas, gradientes de lectura y una cámara lenta muy sutil.

Las animaciones usan `transform` y `opacity`, curvas custom y soporte para `prefers-reduced-motion`.
