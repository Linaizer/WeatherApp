# ============================================
# Миграция проекта на FSD архитектуру
# Запускать из корня проекта!
# ============================================

$ErrorActionPreference = "Stop"
$srcRoot = "src"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Миграция на FSD архитектуру" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Создаём папки ────────────────────────────────────────────────
Write-Host "[1/4] Создаём папки FSD..." -ForegroundColor Yellow

$folders = @(
    "$srcRoot/app",
    "$srcRoot/pages/weather-page/ui",
    "$srcRoot/widgets/weather-dashboard/ui",
    "$srcRoot/features/search-city/ui",
    "$srcRoot/features/forecast-list/ui",
    "$srcRoot/features/hourly-forecast/ui",
    "$srcRoot/entities/weather/api",
    "$srcRoot/entities/weather/model",
    "$srcRoot/entities/weather/ui",
    "$srcRoot/shared/ui",
    "$srcRoot/shared/lib",
    "$srcRoot/shared/types",
    "$srcRoot/shared/assets"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "   Папки созданы!" -ForegroundColor Green

# ── 2. Функция безопасного перемещения ──────────────────────────────
function Move-Safe {
    param (
        [string]$From,
        [string]$To
    )
    if (Test-Path $From) {
        $destDir = Split-Path $To -Parent
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    
        Move-Item -Path $From -Destination $To -Force
        Write-Host "   OK  $From  ->  $To" -ForegroundColor Green
    } else {
        Write-Host "   --  Не найдено: $From (пропускаем)" -ForegroundColor DarkGray
    }
}

# ── 3. Перемещаем файлы ─────────────────────────────────────────────
Write-Host ""
Write-Host "[2/4] Перемещаем файлы..." -ForegroundColor Yellow

# app
Move-Safe "$srcRoot/App.tsx"   "$srcRoot/app/App.tsx"
Move-Safe "$srcRoot/App.css"   "$srcRoot/app/App.css"
Move-Safe "$srcRoot/main.tsx"  "$srcRoot/app/main.tsx"
Move-Safe "$srcRoot/index.css" "$srcRoot/app/index.css"

# entities/weather — api
Move-Safe "$srcRoot/api/FeatchGeocode.ts" "$srcRoot/entities/weather/api/fetchGeocode.ts"
Move-Safe "$srcRoot/api/openweather.ts"   "$srcRoot/entities/weather/api/openweather.ts"

# entities/weather — model (store)
Move-Safe "$srcRoot/store/weatherStore.ts" "$srcRoot/entities/weather/model/weatherStore.ts"

# entities/weather — ui
Move-Safe "$srcRoot/features/Wether/Components/WeatherCard.tsx"    "$srcRoot/entities/weather/ui/WeatherCard.tsx"
Move-Safe "$srcRoot/features/Wether/Components/WeatherHeader .tsx" "$srcRoot/entities/weather/ui/WeatherHeader.tsx"
Move-Safe "$srcRoot/features/Wether/Components/WeatherStats.tsx"   "$srcRoot/entities/weather/ui/WeatherStats.tsx"

# features
Move-Safe "$srcRoot/features/search-city/SearchCity.tsx"  "$srcRoot/features/search-city/ui/SearchCity.tsx"
Move-Safe "$srcRoot/features/ForecastList.tsx"            "$srcRoot/features/forecast-list/ui/ForecastList.tsx"
Move-Safe "$srcRoot/features/HourlyForecast.tsx"          "$srcRoot/features/hourly-forecast/ui/HourlyForecast.tsx"

# shared — ui
Move-Safe "$srcRoot/shared/ui/ErrorCard.tsx"          "$srcRoot/shared/ui/ErrorCard.tsx"
Move-Safe "$srcRoot/shared/ui/SkeletonCard.tsx"       "$srcRoot/shared/ui/SkeletonCard.tsx"
Move-Safe "$srcRoot/shared/ui/TemperatureChart.tsx"   "$srcRoot/shared/ui/TemperatureChart.tsx"
Move-Safe "$srcRoot/shared/ui/WeatherBackground.tsx"  "$srcRoot/shared/ui/WeatherBackground.tsx"

# shared — lib
Move-Safe "$srcRoot/shared/ui/lib/getBackround.ts" "$srcRoot/shared/lib/getBackground.ts"

# shared — types
Move-Safe "$srcRoot/types/domian.ts" "$srcRoot/shared/types/domain.ts"
Move-Safe "$srcRoot/types/dto.ts"    "$srcRoot/shared/types/dto.ts"

# shared — assets
Move-Safe "$srcRoot/assets/SadCloud.gif" "$srcRoot/shared/assets/SadCloud.gif"

# ── 4. Создаём index.ts barrel-файлы ────────────────────────────────
Write-Host ""
Write-Host "[3/4] Создаём index.ts barrel-файлы..." -ForegroundColor Yellow

$barrels = @{
    "$srcRoot/entities/weather/index.ts" = @"
export * from './api/openweather'
export * from './api/fetchGeocode'
export * from './model/weatherStore'
export * from './ui/WeatherCard'
export * from './ui/WeatherHeader'
export * from './ui/WeatherStats'
"@

    "$srcRoot/features/search-city/index.ts" = @"
export { default } from './ui/SearchCity'
"@

    "$srcRoot/features/forecast-list/index.ts" = @"
export { default } from './ui/ForecastList'
"@

    "$srcRoot/features/hourly-forecast/index.ts" = @"
export { default } from './ui/HourlyForecast'
"@

    "$srcRoot/shared/ui/index.ts" = @"
export * from './ErrorCard'
export * from './SkeletonCard'
export * from './TemperatureChart'
export * from './WeatherBackground'
"@

    "$srcRoot/shared/types/index.ts" = @"
export * from './domain'
export * from './dto'
"@
}

foreach ($path in $barrels.Keys) {
    $dir = Split-Path $path -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    Set-Content -Path $path -Value $barrels[$path].Trim()
    Write-Host "   OK  $path" -ForegroundColor Green
}

# ── 5. Убираем пустые папки ──────────────────────────────────────────
Write-Host ""
Write-Host "[4/4] Удаляем пустые папки..." -ForegroundColor Yellow

$oldFolders = @(
    "$srcRoot/api",
    "$srcRoot/store",
    "$srcRoot/types",
    "$srcRoot/assets",
    "$srcRoot/features/Wether",
    "$srcRoot/features/search-city",  # старая (без ui/)
    "$srcRoot/shared/ui/lib"
)

foreach ($folder in $oldFolders) {
    if (Test-Path $folder) {
        $items = Get-ChildItem $folder -Recurse -File
        if ($items.Count -eq 0) {
            Remove-Item $folder -Recurse -Force
            Write-Host "   Удалена пустая папка: $folder" -ForegroundColor DarkGray
        } else {
            Write-Host "   Пропущена (не пустая): $folder" -ForegroundColor DarkYellow
        }
    }
}

# ── Итог ─────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Готово! Структура FSD применена." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Не забудь:" -ForegroundColor Yellow
Write-Host "  1. Обновить импорты в файлах (пути изменились)" -ForegroundColor White
Write-Host "  2. Обновить vite.config.ts (alias @ -> src/)" -ForegroundColor White
Write-Host "  3. Запустить  npm run dev  и проверить ошибки" -ForegroundColor White
Write-Host ""
