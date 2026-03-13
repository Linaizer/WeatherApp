import { ForecastDay } from "../types/domian"

interface WeatherCardProps {
    dailyForecast: ForecastDay[]
    accentColor: string
}

export const ForecastList = ({ dailyForecast,accentColor }: WeatherCardProps) => {

    return (
        <div>
            <p className="text-white m-1"> Weekly forecast </p>
            {dailyForecast.map((item) => (
                <div style={{ borderColor: accentColor }} className="flex justify-between text-white py-2 border-b border-purple-800 " key={item.date} >
                    <span> {Math.round(item.tempMax)} °</span>
                    <span> {Math.round(item.tempMin)} °</span>
                    <span> {new Date(item.date).toLocaleDateString('en-En', { weekday: 'short' })}</span>
                    <img className="w-10 h-10" src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} />
                </div>
            ))}
        </div>
    )
}