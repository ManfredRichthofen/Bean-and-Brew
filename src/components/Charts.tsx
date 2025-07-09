import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B']

// Custom tooltip component for better styling
export const CustomTooltip = ({ active, payload, label }: any) => {
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

// Chart components
export const TopRoastersChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
      <XAxis 
        dataKey="name" 
        angle={-45} 
        textAnchor="end" 
        height={100}
        tick={{ fontSize: 12 }}
        stroke="#6B7280"
      />
      <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

export const RatingDistributionChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ range, percent }) => `${range} (${((percent || 0) * 100).toFixed(0)}%)`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="count"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
)

export const TopOriginsChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
)

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

export const TopGrindersChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} stroke="#6B7280" />
      <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="count" fill="#FFBB28" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

export const RoastLevelDistributionChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ level, percent }) => `${level} (${((percent || 0) * 100).toFixed(0)}%)`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="count"
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
) 