import { useRef } from "react"
import { ForecastDay } from "../../../shared/types"

interface HourlyForecastProps {
    forecast: ForecastDay[]
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
    const items = forecast.slice(0, 8)
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (dir: 'left' | 'right') => {
        scrollRef.current?.scrollBy({ left: dir === 'right' ? 160 : -160, behavior: 'smooth' })
    }

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-white/60 uppercase tracking-wider">3-hour forecast</p>
               <div className="hidden md:flex gap-1">
                    <button onClick={() => scroll('left')} className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition text-xs flex items-center justify-center">‹</button>
                    <button onClick={() => scroll('right')} className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition text-xs flex items-center justify-center">›</button>
                </div>
            </div>
            <div ref={scrollRef} className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                {items.map((item) => {
                    const time = new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                    return (
                        <div key={item.date} className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition min-w-18">
                            <span className="text-xs text-white/60 whitespace-nowrap">{time}</span>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                                className="w-9 h-9"
                                alt={item.description}
                            />
                            <span className="text-sm font-semibold">{Math.round(item.tempMax)}°</span>
                            <span className="text-xs text-white/50">FL {Math.round(item.feelsLike)}°</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}