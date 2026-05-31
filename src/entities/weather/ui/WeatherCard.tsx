import { TemperatureChart } from "../../../shared/ui/TemperatureChart";
import { WeatherBackground } from "../../../shared/ui/WeatherBackground";
import { CityWeather } from "../../../shared/types";
import { ForecastList } from "../../../features/forecast-list/ui/ForecastList";
import { WeatherHeader } from "./WeatherHeader";
import { WeatherStats } from "./WeatherStats";
import { SearchCity } from "../../../features/search-city/ui/SearchCity";
import { getAccentColor, getBackground } from "../../../shared/lib/getBackground";
import useWeatherStore from '../model/weatherStore'
import { HourlyForecast } from "../../../features/hourly-forecast/ui/HourlyForecast";

interface WeatherCardProps {
  weather: CityWeather;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { fetchWeatherByCity } = useWeatherStore()
  const current = weather.forecast[0];
  const utcMs = Date.now() + new Date().getTimezoneOffset() * 60000
  const cityHour = new Date(utcMs + weather.timezone * 1000).getHours()
  const accentColor = getAccentColor(current.description, cityHour)

  const dailyForecast = weather.forecast.filter(
    (item, index, arr) =>
      arr.findIndex((i) => i.date.startsWith(item.date.split(" ")[0])) ===
      index,
  );

  const chartData = dailyForecast.map((item) => ({
    date: item.date.split(" ")[0],
    temp: Math.round(item.tempMax),
  }));

  return (
    <div className={`min-h-screen bg-linear-to-br ${getBackground(current.description, cityHour)} relative overflow-hidden flex items-center justify-center`}>
      <WeatherBackground description={current.description} hour={cityHour} />
      <div className="max-w-sm mx-auto p-6  md:grid md:grid-cols-2 md:gap-6 md:max-w-4xl w-full ">
        <div className="flex flex-col gap-4">
          <WeatherHeader
            cityName={weather.cityName}
            country={weather.country}
            current={current}
          />
          <WeatherStats current={current} />
          <div className="pb-4 md:p-0">
            <HourlyForecast forecast={weather.forecast} />
          </div>
          <div className="hidden md:block">
            <SearchCity onSearch={fetchWeatherByCity} />
          </div>

        </div>
        <div className="md:pt-10 md:justify-center self-start  bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 my-4">
            <TemperatureChart chartData={chartData}
              accentColor={accentColor}
            />
          </div>

          <div>
            <ForecastList dailyForecast={dailyForecast}
              accentColor={accentColor}
            />
          </div>

        </div>
        <div className="block: md:hidden pt-6  overflow-visible">
          <SearchCity onSearch={fetchWeatherByCity} />
        </div>
      </div>
    </div>
  );
};
