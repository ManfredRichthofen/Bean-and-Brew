import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { DataTable } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'
import { useCoffeeStore } from '../stores/coffeeStore'
import type { CoffeeBean } from '../types/coffee'

export function HomePage() {
  const { loading } = useCoffeeStore()
  const allData = useCoffeeStore(state => state.standardizedBeans)
  const [filteredData, setFilteredData] = useState<CoffeeBean[] | undefined>(undefined)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {filteredData && filteredData.length !== allData.length ? 'Filtered Results' : 'Coffee Bean Database'}
          </h1>
          <p className="text-base-content/70 mt-1">
            {loading ? 'Loading...' : `${filteredData ? filteredData.length : allData.length} beans found`}
            {filteredData && filteredData.length !== allData.length && ` of ${allData.length} total`}
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
      <FilterBar onFilterChange={setFilteredData} />

      {/* Table */}
      <DataTable filteredData={filteredData} />
    </div>
  )
} 