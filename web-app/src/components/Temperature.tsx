import { useState } from "react";

export function Temperature() {
  const TEMPERATURE = 5;

  const [isCelcius, setIsCelcius] = useState(true);

  console.log(isCelcius);
  return (
    <div>
      {TEMPERATURE} °{isCelcius ? "C" : "F"}
      <fieldset>
        <legend> Unité d'affichage: </legend>
        <label>
          <input
            type="radio"
            name="unit"
            value="Celsius"
            onClick={() => setIsCelcius(true)}
            defaultChecked
          />
          Celsius
          <br />
          <input
            type="radio"
            name="unit"
            value="Fahrenheit"
            onClick={() => setIsCelcius(false)}
          />
          Fahrenheit
        </label>
      </fieldset>
    </div>
  );
}
