export interface ForecastDay {
  date: string;          
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  feelsLike: number;
  pressure: number
}

export interface CityWeather {
  cityName: string;
  country: string;
  forecast: ForecastDay[];
  timezone: number;
}