# 🌤️ Weather App

A weather app built with React and TypeScript. Shows current conditions, hourly and weekly forecasts, with live background animations that react to the weather and time of day in the selected city.

---

## Preview

The background changes depending on the weather and local time of the chosen city — stars appear at night, raindrops fall during rain, lightning strikes during a thunderstorm.

---

## Tech Stack

- **React + TypeScript + Vite**
- **Zustand** — state management
- **Tailwind CSS** — styling
- **Recharts** — temperature chart
- **OpenWeatherMap API** — weather data
- **Feature-Sliced Design** — project architecture

---

## Features

- Auto-detects your location and shows local weather on load
- City search with autocomplete suggestions
- Hourly forecast for the next 24 hours
- 7-day forecast with icons and temperatures
- Temperature trend chart
- Live animated background — rain, snow, thunderstorm, stars (based on city's local time)
- Responsive design — works on mobile and desktop
- Skeleton loader on fetch and a custom error page

---

## Getting Started

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
npm install
```

Create a `.env` file in the root of the project:

```
VITE_WEATHER_API_KEY=your_openweathermap_key
```

You can get a free API key at [openweathermap.org](https://openweathermap.org/api)

```bash
npm run dev
```

---

## Project Structure

```
src/
├── api/              # OpenWeatherMap requests
├── features/         # Feature components (search, forecasts)
├── shared/           # Reusable utilities and UI
├── store/            # Zustand store
├── types/            # TypeScript types
└── widgets/          # Composite UI blocks
```

---

## Contact

Found a bug or have an idea? Feel free to reach out:

- Email: [ponomar.kolya10@gmail.com](mailto:ponomar.kolya10@gmail.com)
- LinkedIn: [Mykola Ponomar](https://www.linkedin.com/in/mykola-ponomar-81717a32b/)