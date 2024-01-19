import { TemperatureUnit } from '../interfaces/temperature-unit';
import { Coordianates, WeatherInterface } from "../interfaces/weather";
import { CODES_METEO } from "../interfaces/weather-codes";

const COORDINATES_FOR_CITIES: Coordianates[] = [
  { city: "Tourcoing", latitude: 50.72391, longitude: 3.16117 },
  { city: "Paris", latitude: 48.8534951, longitude: 2.3483915 },
  { city: "Reims", latitude: 49.2577886, longitude: 4.031926 },
];

export class Weather implements WeatherInterface {
  city: string;
  country!: string;
  temperatureCelsius!: number;
  weatherCode!: number;

  /**
   * Constructeur de Weather à partir du nom d'une ville.
   *
   * @param {string} city - Le nom de la ville à instancier.
   */
  constructor(city: string) {
    this.city = city;
  }

  /**
   * Initialise la météo en appelant l'API météo.
   */
  async setCurrent() : Promise<Weather> {
    const coordinates = COORDINATES_FOR_CITIES.find(coord => coord.city.toLowerCase() === this.city.toLowerCase());
    if (!coordinates) {
      throw new Error(`Coordonnées non trouvées pour la ville ${this.city}`);
    }
  
    const { latitude, longitude } = coordinates;
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    );
    const weather = await weatherResponse.json();
  
    console.log("Réponse de l'API météo :", weather);
  
    this.temperatureCelsius = weather.current.temperature_2m;
    this.weatherCode = weather.current.weather_code;
  
    console.log("Valeurs de température et code météo après l'initialisation :", this.temperatureCelsius, this.weatherCode);
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
  printWeatherForCity(temperatureUnit: TemperatureUnit): void {
    const temperature = temperatureUnit === 'Fahrenheit' ? this.celsiusToFahrenheit(this.temperatureCelsius) : this.temperatureCelsius;
    const codeMeteo = CODES_METEO[this.weatherCode];
  
    // Définir la largeur des colonnes
    const columnWidth = 30;
  
    // Espaces monospaces pour l'alignement
    const monospaceSpace = '\u2003';
  
    // Afficher le tableau avec des lignes de séparation
    console.log('╔' + '═'.repeat(columnWidth) + '╗');
    console.log(`║ Météo pour${monospaceSpace}${this.city}`.padEnd(columnWidth, ' ') + ' ║');
    console.log('╠' + '═'.repeat(columnWidth) + '╣');
    console.log(`║ Température:${monospaceSpace}${temperature} ${temperatureUnit === 'Fahrenheit' ? "°F" : "°C"}`.padEnd(columnWidth, ' ') + ' ║');
    console.log(`║ Code météo:${monospaceSpace}${this.weatherCode} ${codeMeteo.icon}`.padEnd(columnWidth, '') + '║');
    console.log('╚' + '═'.repeat(columnWidth) + '╝');
  }
  
  
}
