import { useState } from "react";

export function Temperature() {
  //   type TemperatureUnit = "CELCIUS" | "FAHRENHEIT";
  enum TemperatureUnit {
    CELCIUS = "Celsius",
    FAHRENHEIT = "Fahrenheit",
  }

  const TEMPERATURE = 5;
  const [isCelcius, setIsCelcius] = useState(true);
  const [unit, setUnit] = useState<TemperatureUnit>(TemperatureUnit.CELCIUS);

  // JE SUIS EN LOVE SUR ALEXY LE GROS BG DE FOU
  // LOVE ALEXY
  // NUD3 ALEXY
  // ALEXY LE GROS BG
  // ALEXY LE GROS BG
  // ALEXY LE GROS BG
  // TROP BEAU LA CHEMISE DE ALEXY
  // SEX_ALEXY.COM
  // ALEXY LE GROS SEXE

  return (
    <div>
      {TEMPERATURE} °{unit}
      <fieldset>
        <legend> Unité d'affichage: </legend>
        <label>
          <input
            type="radio"
            name="unit"
            value="Celsius"
            onClick={() => setUnit(TemperatureUnit.CELCIUS)}
            defaultChecked
          />
          Celsius
          <br />
          <input
            type="radio"
            name="unit"
            value="Fahrenheit"
            onClick={() => setUnit(TemperatureUnit.FAHRENHEIT)}
          />
          Fahrenheit
        </label>
      </fieldset>
    </div>
  );
}
