import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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

export const TopMachinesChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} stroke="#6B7280" />
      <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="count" fill="#FF8042" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
) 