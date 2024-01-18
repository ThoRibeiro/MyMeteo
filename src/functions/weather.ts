import { TemperatureUnit } from './../interfaces/temperature-unit';
import { WeatherInterface } from "../interfaces/weather";
import { CODES_METEO } from "../interfaces/weather-codes";

const WEATHER_FOR_CITIES: WeatherInterface[] = [
  { city: "Tours", country: "France", temperatureCelsius: -1, weatherCode: 0 },
  { city: "Lille", country: "France", temperatureCelsius: -2, weatherCode: 2 },
  { city: "Paris", country: "France", temperatureCelsius: -1, weatherCode: 77 },
  { city: "Reims", country: "France", temperatureCelsius: -4, weatherCode: 0 },
];

export class Weather implements WeatherInterface {
  city: string;
  country: string;
  temperatureCelsius: number;
  weatherCode: number;

  /**
   * Constructeur de Weather à partir du nom d'une ville.
   *
   * @param {string} city - Le nom de la ville à instancier.
   */
  constructor(city: string) {
    const weather = Weather.getWeatherForCity(city);

    this.city = weather.city;
    this.country = weather.country;
    this.temperatureCelsius = weather.temperatureCelsius;
    this.weatherCode = weather.weatherCode;
  }
  
  private static getWeatherForCity(city: string): WeatherInterface {
    const weather = WEATHER_FOR_CITIES.find(
      (weather) => weather.city.toLowerCase() === city.toLowerCase()
    );
    if (!weather) {
      throw new Error(`La ville "${city}" recherchée n'a pas été trouvée`);
    }

    return weather;
  }

  /**
   * Convertit une température de degrés Celsius en degrés Fahrenheit.
   *
   * @param {number} celsius - La température en degrés Celsius à convertir.
   * @returns {number} La température convertie en degrés Fahrenheit.
   */
  celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
    
  /**
   * Affiche les informations météorologiques pour une ville donnée dans la console.
   */
  printWeatherForCity(city: string, temperatureUnit: TemperatureUnit): void {
    const weather: WeatherInterface = Weather.getWeatherForCity(city);
    const temperature = temperatureUnit === 'Fahrenheit' ? this.celsiusToFahrenheit(weather.temperatureCelsius) : weather.temperatureCelsius;
    const codeMeteo = CODES_METEO[weather.weatherCode];
  
    console.log(`\n╔══════════════════════════════╗`);
    console.log(`║      Météo pour ${weather.city}        ║`);
    console.log(`╠══════════════════════════════╣`);
    console.log(`║     Température: ${temperature} ${temperatureUnit === 'Fahrenheit' ? "°F" : "°C"}     ║`);
    console.log(`║       Code météo: ${weather.weatherCode} ${codeMeteo.icon}       ║`);
    console.log(`╚══════════════════════════════╝\n`);
  }

}
  
