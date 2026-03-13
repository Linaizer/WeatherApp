import { useEffect } from 'react'
import './App.css'
import useWeatherStore from '../entities/weather/model/weatherStore'
import { WeatherCard } from '../entities/weather/ui/WeatherCard'
import { SkeletonCard } from '../shared/ui/SkeletonCard'
import { ErrorCard } from '../shared/ui/ErrorCard'

function App() {
  const { fetchWeather, weather, isLoading, error } = useWeatherStore()
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }
  function OnGeoError(error: any) {
    console.warn(`ERROR(${error.code}): ${error.message}`)
  }
  function success(pos: any) {
    var crd = pos.coords
    fetchWeather(crd.latitude, crd.longitude)
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, OnGeoError, options)
  }, [fetchWeather])
  if (isLoading) return <SkeletonCard />
  if (error) return <ErrorCard />
  if (!weather) return 'Error with data'
  return (
    <div>
      <WeatherCard weather={weather} />
    </div>
  )
}
export default App
