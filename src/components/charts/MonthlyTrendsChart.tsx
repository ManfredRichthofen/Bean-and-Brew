import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-200 p-3 rounded-lg shadow-lg border border-base-300">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export const MonthlyTrendsChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
      <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }} />
      <Area type="monotone" dataKey="count" fill="#8884d8" fillOpacity={0.1} />
    </LineChart>
  </ResponsiveContainer>
) 