import { create } from "zustand";
import { CityWeather } from "../../../shared/types";
import { fetchForecast } from "../api/openweather";
import { fetchGeocode } from "../api/fetchGeocode";

export interface WeatherStore {
   weather: CityWeather | null
   isLoading: boolean
   error: string | null
   fetchWeather: (lat: number, lon: number) => Promise<void>
   fetchWeatherByCity: (city: string) => Promise<void>
}

const weatherStore = create<WeatherStore>()((set) => ({
   fetchWeatherByCity: async (city: string) => {
      set({isLoading:true, error:null})
      try{
         const geo = await fetchGeocode(city)
         const data = await fetchForecast(geo[0].lat, geo[0].lon)
         set({weather:data, isLoading:false})
      }catch(e){
         set({error:'Error loading',isLoading: false})
      }
   },
   weather: null,
   isLoading: true,
   error: null,
   fetchWeather: async (lat, lon) => {
      set({ isLoading: true, error: null })
      try {
         const data = await fetchForecast(lat, lon)
         set({ weather: data, isLoading: false })
      } catch (e) {
         set({ error: 'Error loadning', isLoading: false })
      }
   }
   
   
}))

export default weatherStore
