import { WeatherForecasDTO } from "../types/dto"
import { CityWeather } from "../types/domian"
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const BASE_URL = (lat: number, lon: number) => {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
}

export const fetchForecast = async (lat: number, lon: number): Promise<CityWeather> => {
    const response = await fetch(BASE_URL(lat, lon))

    if (!response.ok) {
        throw new Error(`Error:${response.status}`)
    }

    const data = await response.json()
    return mapForecast(data)


}

const mapForecast = (dto: WeatherForecasDTO): CityWeather => {
    return {
        cityName: dto.city.name,
        country: dto.city.country,
        timezone: dto.city.timezone,
        forecast: dto.list.map((item) => ({
            date: item.dt_txt,
            tempMax: item.main.temp_max,
            tempMin: item.main.temp_min,
            humidity: item.main.humidity,
            feelsLike: item.main.feels_like,
            pressure: item.main.pressure,
            windSpeed: item.wind.speed,
            description: item.weather[0].description,
            icon: item.weather[0].icon,

        }))
    }
}