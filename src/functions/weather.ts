import { Weather } from "../interfaces/weather";
import { CODES_METEO } from "../interfaces/weather-codes";

const WEATHER_FOR_CITIES: Weather[] = [
  { city: "Tours", country: "France", temperatureCelsius: -1, weatherCode : 0 },
  { city: "Lille", country: "France", temperatureCelsius: -2, weatherCode: 77 },
  { city: "Paris", country: "France", temperatureCelsius: -1, weatherCode: 77 },
  { city: "Reims", country: "France", temperatureCelsius: -4, weatherCode: 0 },
];

export function getWeatherForCity(city: string): Weather {
  const cityWeather = WEATHER_FOR_CITIES.find(
    (weather) => weather.city.toLowerCase() === city.toLowerCase()
  );

  if (cityWeather == undefined) {
    throw Error("Impossible d'avoir la température de la ville " + city);
  }
  return cityWeather;
}

export function printWeatherForCity(city: string): void {
  const weather: Weather = getWeatherForCity(city);
  const codeMeteo = CODES_METEO[weather.weatherCode];
  console.log("Météo pour " + weather.city);
  console.log("Température: " + weather.temperatureCelsius + "°C");
  console.log("Code météo: " + weather.weatherCode, codeMeteo.icon);
}
