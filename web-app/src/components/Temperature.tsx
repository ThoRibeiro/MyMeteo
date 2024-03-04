import { useState } from "react";

export function Temperature() {
  enum TemperatureUnit {
    CELCIUS = "C",
    FAHRENHEIT = "F",
  }

  const TEMPERATURE = 5;
  const [isCelcius, setIsCelcius] = useState(true);
  const [unit, setUnit] = useState<TemperatureUnit>(TemperatureUnit.CELCIUS);

  function getTemperatureFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

  return (
    <div>
      {unit === TemperatureUnit.CELCIUS
        ? TEMPERATURE
        : getTemperatureFahrenheit(TEMPERATURE)}
      °{unit}
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
