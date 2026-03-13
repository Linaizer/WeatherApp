const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const GEO_URL = (city: string) =>
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`

export const fetchGeocode = async (city: string) => {
    const response = await fetch(GEO_URL(city))

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()

    return data
}