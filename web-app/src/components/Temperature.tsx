import { useState } from "react";

export function Temperature() {
  const TEMPERATURE = 5;

  const [isCelcius, setIsCelcius] = useState(true);

  return (
    <div>
      {" "}
      {TEMPERATURE}°C
      <fieldset>
        <legend> Unité d'affichage: </legend>
        <label>
          <input type="radio" name="unit" value="Celsius" />
          Celsius
          <br />
          <input type="radio" name="unit" value="Fahrenheit" />
          Fahrenheit
        </label>
      </fieldset>
    </div>
  );
}
