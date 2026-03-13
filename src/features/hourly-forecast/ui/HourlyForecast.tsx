import { ForecastDay } from "../types/domian"

interface HourlyForecastProps {
    forecast: ForecastDay[]
    accentColor: string
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
    return (
        <div className=" bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
            <p> Daily forecast </p>
            <div className="flex overflow-x-auto gap-4 py-2">
                {forecast.slice(0, 8).map((item) => (
                    <div key={item.date} className="flex flex-col items-center">
                        <span>{new Date(item.date).toLocaleTimeString('en-EN', { hour: '2-digit', minute: "2-digit" })}</span>
                        <img src={`https://openweathermap.org/img/wn/${item.icon}.png `} />
                        <span>{Math.round(item.tempMax)}°</span>
                    </div>
                ))}
            </div>
        </div>
    )

}