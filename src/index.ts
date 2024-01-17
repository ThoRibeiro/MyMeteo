import { getWeatherForCity } from './functions/weather';

  
const weather = getWeatherForCity("roubaix");
console.log(weather.temperatureCelsius)