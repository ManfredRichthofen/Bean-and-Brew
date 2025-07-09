import { useState, useMemo } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area
} from 'recharts'
import { FiTrendingUp, FiStar, FiMapPin, FiCoffee, FiBarChart2, FiPieChart } from 'react-icons/fi'
import { useCoffeeBeans } from '../utils/sheets'
import type { CoffeeBean } from '../utils/sheets'
import { standardizeNames } from '../utils/standardizeNames'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B']

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

export function StatsPage() {
  const { data, isLoading: loading, error } = useCoffeeBeans()

  // Memoized data processing for better performance
  const processedData = useMemo(() => {
    if (!data?.length) return {}

    // Standardize the data first
    const standardizedData = standardizeNames(data)

    // Calculate summary statistics
    const totalBeans = standardizedData.length
    const beansWithRating = standardizedData.filter(bean => bean.rating && !isNaN(parseFloat(bean.rating)))
    const averageRating = beansWithRating.length > 0 
      ? beansWithRating.reduce((sum, bean) => sum + parseFloat(bean.rating), 0) / beansWithRating.length 
      : 0
    const uniqueRoasters = new Set(standardizedData.map(bean => bean.roaster).filter(Boolean)).size
    const uniqueOrigins = new Set(standardizedData.map(bean => bean.origin).filter(Boolean)).size

    // Top Roasters
    const roasterCounts = standardizedData.reduce((acc, bean) => {
      if (bean.roaster) {
        acc[bean.roaster] = (acc[bean.roaster] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const topRoasters = Object.entries(roasterCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }))

    // Top Origins
    const originCounts = standardizedData.reduce((acc, bean) => {
      if (bean.origin) {
        acc[bean.origin] = (acc[bean.origin] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const topOrigins = Object.entries(originCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }))

    // Rating Distribution
    const ratingRanges = {
      '9-10': 0,
      '8-9': 0,
      '7-8': 0,
      '6-7': 0,
      '5-6': 0,
      'Below 5': 0
    }

    standardizedData.forEach(bean => {
      const rating = parseFloat(bean.rating)
      if (!isNaN(rating)) {
        if (rating >= 9) ratingRanges['9-10']++
        else if (rating >= 8) ratingRanges['8-9']++
        else if (rating >= 7) ratingRanges['7-8']++
        else if (rating >= 6) ratingRanges['6-7']++
        else if (rating >= 5) ratingRanges['5-6']++
        else ratingRanges['Below 5']++
      }
    })

    const ratingDistribution = Object.entries(ratingRanges).map(([range, count]) => ({ range, count }))

    // Monthly Trends
    const monthlyData = standardizedData.reduce((acc, bean) => {
      if (bean.roastDate) {
        const date = new Date(bean.roastDate)
        if (!isNaN(date.getTime())) {
          const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          acc[monthYear] = (acc[monthYear] || 0) + 1
        }
      }
      return acc
    }, {} as Record<string, number>)

    const monthlyTrends = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([month, count]) => ({ month, count }))



    // Top Machines
    const machineCounts = standardizedData.reduce((acc, bean) => {
      if (bean.espressoMachine) {
        acc[bean.espressoMachine] = (acc[bean.espressoMachine] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const topMachines = Object.entries(machineCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }))

    // Top Grinders
    const grinderCounts = standardizedData.reduce((acc, bean) => {
      if (bean.grinder) {
        acc[bean.grinder] = (acc[bean.grinder] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const topGrinders = Object.entries(grinderCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }))

         // Roast Level Distribution
     const roastLevels = standardizedData.reduce((acc, bean) => {
       if (bean.roastLevel) {
         acc[bean.roastLevel] = (acc[bean.roastLevel] || 0) + 1
       }
       return acc
     }, {} as Record<string, number>)

     const roastLevelDistribution = Object.entries(roastLevels)
       .sort(([a], [b]) => a.localeCompare(b))
       .map(([level, count]) => ({ level, count }))

         return {
       totalBeans,
       averageRating,
       uniqueRoasters,
       uniqueOrigins,
       topRoasters,
       topOrigins,
       ratingDistribution,
       monthlyTrends,
       topMachines,
       topGrinders,
       roastLevelDistribution
     }
  }, [data])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-medium">Loading statistics...</p>
          <p className="text-base-content/70">Processing coffee bean data</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <FiBarChart2 className="w-6 h-6" />
          <span>{error.message || 'Failed to load statistics'}</span>
        </div>
      </div>
    )
  }

  const {
    totalBeans = 0,
    averageRating = 0,
    uniqueRoasters = 0,
    uniqueOrigins = 0,
    topRoasters = [],
    topOrigins = [],
    ratingDistribution = [],
    monthlyTrends = [],
    topMachines = [],
    topGrinders = [],
    roastLevelDistribution = []
  } = processedData

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <FiBarChart2 className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold ">
            Coffee Bean Statistics
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-100 shadow-xl rounded-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="stat-figure text-primary">
            <FiCoffee className="w-10 h-10" />
          </div>
          <div className="stat-title text-base-content/70">Total Beans</div>
          <div className="stat-value text-primary text-3xl">{totalBeans.toLocaleString()}</div>
          <div className="stat-desc">Coffee beans in database</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="stat-figure text-secondary">
            <FiStar className="w-10 h-10" />
          </div>
          <div className="stat-title text-base-content/70">Average Rating</div>
          <div className="stat-value text-secondary text-3xl">{averageRating.toFixed(1)}</div>
          <div className="stat-desc">Out of 10 stars</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="stat-figure text-accent">
            <FiMapPin className="w-10 h-10" />
          </div>
          <div className="stat-title text-base-content/70">Unique Roasters</div>
          <div className="stat-value text-accent text-3xl">{uniqueRoasters}</div>
          <div className="stat-desc">Different coffee roasters</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="stat-figure text-info">
            <FiTrendingUp className="w-10 h-10" />
          </div>
          <div className="stat-title text-base-content/70">Origins</div>
          <div className="stat-value text-info text-3xl">{uniqueOrigins}</div>
          <div className="stat-desc">Coffee growing regions</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Roasters Bar Chart */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FiBarChart2 className="w-5 h-5 text-primary" />
              <h2 className="card-title text-xl">Top Roasters</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topRoasters} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          </div>
        </div>

        {/* Rating Distribution Pie Chart */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FiPieChart className="w-5 h-5 text-secondary" />
              <h2 className="card-title text-xl">Rating Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, percent }) => `${range} (${((percent || 0) * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {ratingDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Origins Pie Chart */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FiPieChart className="w-5 h-5 text-accent" />
              <h2 className="card-title text-xl">Top Origins</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={topOrigins}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topOrigins.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>



        {/* Monthly Trends Line Chart */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="w-5 h-5 text-info" />
              <h2 className="card-title text-xl">Monthly Bean Additions</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }} />
                <Area type="monotone" dataKey="count" fill="#8884d8" fillOpacity={0.1} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Espresso Machines */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FiCoffee className="w-5 h-5 text-warning" />
              <h2 className="card-title text-xl">Top Espresso Machines</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topMachines} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} stroke="#6B7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#FF8042" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Grinders */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FiCoffee className="w-5 h-5 text-warning" />
              <h2 className="card-title text-xl">Top Grinders</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topGrinders} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} stroke="#6B7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#FFBB28" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Roast Level Distribution */}
        <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FiPieChart className="w-5 h-5 text-warning" />
              <h2 className="card-title text-xl">Roast Level Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={roastLevelDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ level, percent }) => `${level} (${((percent || 0) * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {roastLevelDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 