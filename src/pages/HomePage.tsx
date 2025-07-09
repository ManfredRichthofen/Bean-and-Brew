import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useCoffeeBeans } from '../utils/sheets'
import type { CoffeeBean } from '../utils/sheets'
import { DataTable } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'

export function HomePage() {
  const [filteredData, setFilteredData] = useState<CoffeeBean[]>([])
  const { data: allData = [], isLoading: loading, error } = useCoffeeBeans()

  // Update filtered data when all data changes
  useEffect(() => {
    setFilteredData(allData)
  }, [allData])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Coffee Bean Database</h1>
          <p className="text-base-content/70 mt-1">
            {loading ? 'Loading...' : `${filteredData.length} beans found`}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link 
            to="/stats" 
            className="btn btn-secondary w-full sm:w-auto"
          >
            View Statistics
          </Link>
          <a 
            href="https://forms.gle/yAxGKATMwKeL7Xmy8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto"
          >
            Submit New Beans
          </a>
        </div>
      </div>

      {/* Filters */}
      <FilterBar data={allData} onFilterChange={setFilteredData} />

      {/* Table */}
      <DataTable data={filteredData} loading={loading} error={error?.message || null} />
    </div>
  )
} 