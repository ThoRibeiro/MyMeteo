import { Weather } from "../interfaces/weather"

const WEATHER_FOR_CITIES: Weather[] = [
  {
    city: "Roubaix",
    country: "France",
    temperatureCelsius: -10,
    weatherCode: 3,
  },
  { city: "Lille", country: "France", temperatureCelsius: -2, weatherCode: 2 },
  { city: "Paris", country: "France", temperatureCelsius: -1, weatherCode: 45 },
  { city: "Reims", country: "France", temperatureCelsius: -4, weatherCode: 0 },
];

export function getWeatherForCity(city: string): Weather {
  const cityWeather = WEATHER_FOR_CITIES.find(
    (weather) => weather.city.toLowerCase() === city.toLowerCase()
  );

  if (cityWeather === undefined) {
    throw Error("Impossible d'avoir la température de la ville " + city);
  }
  return cityWeather;
}
