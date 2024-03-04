import { Coordianates, WeatherInterface } from "../interfaces/weather";
import { Place } from "../Schemas/place";

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
  async setCurrent(city?: string): Promise<Weather> {
    let coordinates: Coordianates | undefined;

    if (city) {
      const place = await Place.findOne({ where: { city: city } });
      if (place) {
        coordinates = {
          city: place.city!,
          latitude: place.latitude!,
          longitude: place.longitude!,
        };
      }
    }
    if (!coordinates) {
      throw new Error(`City coordinates not found ${this.city}`);
    }
    const { latitude, longitude } = coordinates;
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    );
    const weather = await weatherResponse.json();

    this.temperatureCelsius = weather.current.temperature_2m;
    this.weatherCode = weather.current.weather_code;

    return weather;
  }

  /**
   * Convertit une température de degrés Celsius en degrés Fahrenheit.
   *
   * @param {number} celsius - La température en degrés Celsius à convertir.
   * @returns {number} La température convertie en degrés Fahrenheit.
   */
  celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

  /**
   * Récupère la météo actuelle pour les villes favorites.
   * @returns Une promesse résolue avec les données météorologiques pour les villes favorites.
   *          Les données sont filtrées pour exclure les valeurs nulles en cas d'erreur lors de la récupération de la météo pour une ville.
   */
  async getWeatherFavorites(): Promise<Weather[]> {
    try {
      const favorites = await Place.find();

      const weatherPromises = favorites.map(async (favorite) => {
        try {
          const weatherData = await this.setCurrent(favorite.city);
          return weatherData;
        } catch (error) {
          console.error(`Error fetching weather for ${favorite.city}:`, error);
          return null;
        }
      });

      const weatherResults = (await Promise.all(weatherPromises)) as Weather[];

      return weatherResults;
    } catch (error) {
      console.error("Error fetching weather for favorites:", error);
      throw new Error("Error fetching weather for favorites");
    }
  }
}
