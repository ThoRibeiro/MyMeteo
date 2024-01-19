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
