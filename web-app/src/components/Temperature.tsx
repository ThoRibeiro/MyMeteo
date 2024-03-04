import { useState } from "react";

export function Temperature() {
  const TEMPERATURE = 5;

  type TemperatureUnit = "CELCIUS" | "FAHRENHEIT";

  const [isCelcius, setIsCelcius] = useState(true);
  const [unit, setUnit] = useState<TemperatureUnit>("CELCIUS");

  console.log(unit);
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
            onClick={() => setUnit("CELCIUS")}
            defaultChecked
          />
          Celsius
          <br />
          <input
            type="radio"
            name="unit"
            value="Fahrenheit"
            onClick={() => setUnit("FAHRENHEIT")}
          />
          Fahrenheit
        </label>
      </fieldset>
    </div>
  );
}
