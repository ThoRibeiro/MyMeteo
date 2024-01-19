class Weather {
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
  };

  constructor(
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    current_units: {
      time: string;
      interval: string;
      temperature_2m: string;
      weather_code: string;
    },
    current: {
      time: string;
      interval: number;
      temperature_2m: number;
      weather_code: number;
    }
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.generationtime_ms = generationtime_ms;
    this.utc_offset_seconds = utc_offset_seconds;
    this.timezone = timezone;
    this.timezone_abbreviation = timezone_abbreviation;
    this.elevation = elevation;
    this.current_units = current_units;
    this.current = current;
  }
}
