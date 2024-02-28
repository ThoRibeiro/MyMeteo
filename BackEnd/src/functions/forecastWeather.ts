import { Place } from "../Schemas/place";
import {ForecastWeather} from "../interfaces/weather";

export class forecastWeatherWithCity {
    async getForecastWeatherWithCity(city : string) : Promise<ForecastWeather> {
        const place = await Place.findOne({ where: { city } });

        if(!place){
            throw new Error("City not found in table 'place'");
        }

        const latitude = place.latitude;
        const longitude = place.longitude;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );
        const weatherForecast = await weatherResponse.json();

        return weatherForecast;
    }

}