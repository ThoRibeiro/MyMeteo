const WEATHER_FOR_CITIES = [
  { city: "Lille", country: "France", temperatureCelsius: -2, weatherCode: 2 },
  { city: "Paris", country: "France", temperatureCelsius: -1, weatherCode: 45 },
  { city: "Reims", country: "France", temperatureCelsius: -4, weatherCode: 0 },
];

export function getTemperatureForCity(city: string) {
    const cityWeather = WEATHER_FOR_CITIES.find(
      (weather) => weather.city.toLowerCase() === city.toLowerCase()
    );
  
    if (cityWeather) {
      console.log(`La température à ${cityWeather.city} est de ${cityWeather.temperatureCelsius}°C`);
      return {
        city: cityWeather.city,
        temperature: cityWeather.temperatureCelsius,
      };
    } else {
      throw Error(`Aucune méteo trouvé pour la ville : ${city}`)
    }
  }
