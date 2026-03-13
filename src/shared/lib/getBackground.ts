export const getBackground = (description: string, hour: number) => {
    if (description.includes('clear')) {
        if (hour >= 6 && hour < 18) return 'from-sky-400 via-blue-400 to-cyan-300'
        if (hour >= 18 && hour < 20) return 'from-orange-900 via-pink-800 to-purple-900'
        return 'from-indigo-950 via-purple-900 to-violet-950'
    }

    if (description.includes('rain')) return 'from-slate-900 via-blue-900 to-slate-800'
    if (description.includes('snow')) return 'from-blue-950 via-slate-800 to-blue-900'
    if (description.includes('thunder')) return 'from-gray-950 via-slate-900 to-gray-800'
    if (description.includes('few clouds')) {
        if (hour >= 6 && hour < 18) return 'from-sky-600 via-slate-700 to-blue-900'
        return 'from-slate-900 via-slate-800 to-zinc-900'
    }
    if (description.includes('clouds')) return 'from-slate-900 via-slate-800 to-zinc-900'
    return 'from-indigo-950 via-purple-900 to-violet-950'
}

export const getAccentColor = (description: string, hour: number) => {
    if (description.includes('clear')) {
        if (hour >= 6 && hour < 18) return '#fbbf24'
        if (hour >= 18 && hour < 22) return '#f97316'
        return '#818cf8'
    }

    if (description.includes('rain')) return '#3b82f6'
    if (description.includes('snow')) return '#bae6fd'
    if (description.includes('thunder')) return '#a78bfa'
    if (description.includes('few clouds')) {
        if (hour >= 6 && hour < 18) return '#60a5fa'
        return '#818cf8'
    }
    if (description.includes('clouds')) return '#94a3b8'
    return '#818cf8'
}