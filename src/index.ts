
import { Weather } from './functions/weather';

const currentWeather = new Weather('Paris');
currentWeather.setCurrent().then(() => {
    currentWeather.printWeatherForCity("Celsius");
  });

