import { DescriptionCodeMeteo } from "./weather-codes"

export type WeatherInterface = {
  city: string;
  country: string;
  temperatureCelsius: number;
  weatherCode: keyof DescriptionCodeMeteo;
};

export type Coordianates = {
  city : string;
  latitude : number;
  longitude : number;
}

export type ForecastWeather = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    wind_speed_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    wind_speed_10m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
}

export type WeatherData = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    weather_code: number;
  }
}

export type CommonWeather = {
  city: string;
  country: string;
  temperatureCelsius: number;
  weatherCode: number;
}

