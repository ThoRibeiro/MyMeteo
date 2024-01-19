import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [WeatherService],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
})
export class TileComponent {
  grandiantBackground: string = '';
  icon: string = '';
  city: string = '';
  selectedCity: string = 'Paris';
  cities = ['Paris', 'New York', 'Tokyo', 'Londres'];

  temperature: number = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.setGrandiantBackgroundIemperature();
    this.fetchWeather('Paris');
  }

  fetchWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      if (data) {
        console.log(data);
      }
    });
  }

  setGrandiantBackgroundIemperature() {
    if (this.temperature <= 0) {
      this.grandiantBackground =
        'linear-gradient(45deg, #00FFFF 0%, #ff00e6 100%)';
    } else if (this.temperature > 0 && this.temperature <= 15) {
      this.grandiantBackground =
        'linear-gradient(45deg, #0065ff 0%, #ff7900 100%)';
    } else if (this.temperature > 15 && this.temperature <= 30) {
      this.grandiantBackground =
        'linear-gradient(45deg, #FFD700 0%, #ffffff 100%)';
    } else if (this.temperature > 30) {
      this.grandiantBackground =
        'linear-gradient(45deg, #ff7900 0%, #ffffff 100%)';
    }
  }

  onCityChange() {
    console.log('La ville sélectionnée est :', this.selectedCity);
    this.fetchWeather(this.selectedCity);
  }
}
