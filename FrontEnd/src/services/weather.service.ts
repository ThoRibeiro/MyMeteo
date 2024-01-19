import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url: string = 'http://localhost:';
  port: string = '3500';

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(`${this.url}:${this.port}/weather?city=${city}`);
  }
}
