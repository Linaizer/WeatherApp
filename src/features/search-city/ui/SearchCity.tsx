import { useEffect, useState } from "react"
import { fetchGeocode } from "../../../entities/weather/api/fetchGeocode"

interface SearchCityProps {
    onSearch: (city: string) => void
}

interface GeoSuggestion {
    name: string
    country: string
    lat: number
    lon: number
}

export const SearchCity = ({ onSearch }: SearchCityProps) => {
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([])
    const handleSearch = () => {
        onSearch(input)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const suggestionsFn = async () => {
                try {
                       setSuggestions(await fetchGeocode(input))
                } catch (error) {
                    throw new Error
                }
            }
            suggestionsFn()
        }, 500)

        return () => clearTimeout(timer)
        
    }, [input])

    return (
        <div className="relative w-full">
            <input
                onChange={e => setInput(e.target.value)}
                placeholder="Search city..."
                className="bg-white/10 border border-white/20 rounded-xl p-2 text-white placeholder-white/50 outline-none "
            />
            <button
                onClick={handleSearch}
                
                className="bg-white/20 text-white rounded-xl p-2 ml-2"
            >
                Search
            </button>
        <div>
            {suggestions.length > 0 && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl mt-1  z-10 min-w-max">
                    {suggestions.map((s, i)=>(
                        <div key={i} 
                        onClick={()=> onSearch(s.name)}
                        className="text-white/70 p-2 hover:bg-white/20 cursor-pointer rounded-xl"
                        >
                            {s.name}, {s.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    )
}
