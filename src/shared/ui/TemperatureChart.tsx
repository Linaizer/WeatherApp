import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface TemperatureChartProps {
    chartData: Array<{ date: string, temp: number }>
    accentColor: string
}

export const TemperatureChart = ({ chartData, accentColor }: TemperatureChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
                <XAxis dataKey="date" stroke="white" tick={{ fontSize: 10 }} />
                <YAxis stroke="white" tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line   type="monotone" dataKey="temp" stroke={accentColor} strokeWidth={2} dot={{ fill: accentColor }} />
            </LineChart>
        </ResponsiveContainer>
    )
}