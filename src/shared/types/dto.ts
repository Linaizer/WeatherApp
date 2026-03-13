export interface WeatherForecasDTO {
    cod: string,
    cnt: number,
    list: ForecastItemDTO[],
    city: CityDTO
}

export interface ForecastItemDTO {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
    dt_txt: string;
}

export interface CityDTO {
    id: number;
    name: string;
    country: string;
    timezone: number;
}