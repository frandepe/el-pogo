# Step 9/10 - Economía personal del primer cachet

## Ajuste realizado

El sobre del primer cachet ahora representa el pago total del bar a la banda:

- Total del sobre: `$180`
- Integrantes: `4`
- Parte personal del protagonista: `$45`

El HUD sigue representando únicamente el dinero personal del protagonista.

## Cambios técnicos

- `game/careerRewards.ts`
  - Se reemplazó una única constante por:
    - `FIRST_CACHET_TOTAL_AMOUNT`
    - `FIRST_CACHET_BAND_MEMBERS`
    - `FIRST_CACHET_PERSONAL_SHARE`
- `game/gameEngine.ts`
  - `receiveFirstCachet()` ahora acredita solamente `FIRST_CACHET_PERSONAL_SHARE`.
- `components/game/season1/FirstCachet.tsx`
  - El sobre sigue mostrando `+$180`.
  - Se agrega la aclaración narrativa de que, al repartir entre cuatro, al protagonista le quedan `$45`.
- `components/game/season1/firstMoney.ts`
  - Se rebalancearon los costos como gastos o aportes personales.

## Rebalanceo de opciones

Los costos grandes de caja de banda fueron reemplazados por montos personales:

- Afiches: `-$25`
- Cables: `-$35`
- Remeras: `-$45`
- Caja de cerveza: `-$45`
- Ropa para tocar: `-$50`
- Cena familiar: `-$55`
- Asado de agradecimiento: `-$60`
- Camioneta del baterista: `-$80`

Guardar la plata ya no suma dinero adicional. Representa conservar la parte personal ya cobrada y otorga efectos narrativos/mecánicos menores.

## Validación

- `npm run lint`: correcto.
- `npm run build`: correcto.
