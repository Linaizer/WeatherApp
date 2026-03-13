import { ForecastDay } from "../../../types/domian"

interface WeatherStatsProps {
    current: ForecastDay
}

export const WeatherStats = ({ current }: WeatherStatsProps) => {
    return (
        <div className="flex gap-4 text-white my-4">
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                <div>
                    <p>Humidity</p>
                    <p>{current.humidity}%</p>
                </div>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                <p>Wind</p>
                <p>{current.windSpeed} m/s</p>
            </div>
        </div>

    )
}