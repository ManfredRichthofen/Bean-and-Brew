import { useEffect, useState } from 'react'
import { fetchSheetData } from '../utils/sheets'
import type { CoffeeBean } from '../utils/sheets'
import { DataTable } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'

export function HomePage() {
  const [data, setData] = useState<CoffeeBean[]>([])
  const [filteredData, setFilteredData] = useState<CoffeeBean[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSheetData()
      .then((beans) => {
        setData(beans)
        setFilteredData(beans)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch data')
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Coffee Bean Database</h1>
          <p className="text-base-content/70 mt-1">
            {loading ? 'Loading...' : `${filteredData.length} beans found`}
          </p>
        </div>
        <a 
          href="https://forms.gle/yAxGKATMwKeL7Xmy8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Submit New Beans
        </a>
      </div>

      {/* Filters */}
      <FilterBar data={data} onFilterChange={setFilteredData} />

      {/* Table */}
      <DataTable data={filteredData} loading={loading} error={error} />
    </div>
  )
} 