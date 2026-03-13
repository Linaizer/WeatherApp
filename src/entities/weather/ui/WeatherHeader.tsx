import { ForecastDay } from "../../../shared/types"

interface WeatherHeaderProps {
    cityName: string
    country: string
    current: ForecastDay
}

export const WeatherHeader = ({ cityName, country, current }: WeatherHeaderProps) => {
   
    return (
        <>
            <div className="flex flex-col text-center items-center text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl self-start p-6 justify-center w-full">
                <h2 className="text-2xl font-bold">{cityName}</h2>
                <p className="text-purple-300 text-sm">{country}</p>
                <img src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`} />
                <h1 className="text-6xl font-bold">{Math.round(current.tempMax)}°</h1>
                <p>{current.description}</p>
                <p>Feels like: {Math.round(current.feelsLike)}°</p>
            </div>
        </>
    )
}