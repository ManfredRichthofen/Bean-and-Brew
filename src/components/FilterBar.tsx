import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import type { CoffeeBean } from '../utils/sheets'

interface FilterBarProps {
  data: CoffeeBean[]
  onFilterChange: (filteredData: CoffeeBean[]) => void
}

export function FilterBar({ data, onFilterChange }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const [selectedRoaster, setSelectedRoaster] = useState('')
  const [minRating, setMinRating] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique values for dropdowns
  const origins = Array.from(new Set(data.map(bean => bean.origin).filter(Boolean))).sort()
  const roasters = Array.from(new Set(data.map(bean => bean.roaster).filter(Boolean))).sort()

  useEffect(() => {
    let filteredData = data

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filteredData = filteredData.filter(bean =>
        bean.beanName.toLowerCase().includes(term) ||
        bean.origin.toLowerCase().includes(term) ||
        bean.roaster.toLowerCase().includes(term) ||
        bean.tastingNotes.toLowerCase().includes(term)
      )
    }

    // Apply origin filter
    if (selectedOrigin) {
      filteredData = filteredData.filter(bean => bean.origin === selectedOrigin)
    }

    // Apply roaster filter
    if (selectedRoaster) {
      filteredData = filteredData.filter(bean => bean.roaster === selectedRoaster)
    }

    // Apply rating filter
    if (minRating) {
      const minRatingNum = parseFloat(minRating)
      filteredData = filteredData.filter(bean => {
        const rating = parseFloat(bean.rating)
        return !isNaN(rating) && rating >= minRatingNum
      })
    }

    onFilterChange(filteredData)
  }, [searchTerm, selectedOrigin, selectedRoaster, minRating, data, onFilterChange])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedOrigin('')
    setSelectedRoaster('')
    setMinRating('')
  }

  const hasActiveFilters = searchTerm || selectedOrigin || selectedRoaster || minRating

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search beans, origins, roasters..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter className="w-4 h-4" />
          Filters
        </button>
        {hasActiveFilters && (
          <button className="btn btn-ghost" onClick={clearFilters}>
            <FiX className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="card bg-base-100 shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Origin Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Origin</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
              >
                <option value="">All Origins</option>
                {origins.map(origin => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>

            {/* Roaster Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Roaster</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedRoaster}
                onChange={(e) => setSelectedRoaster(e.target.value)}
              >
                <option value="">All Roasters</option>
                {roasters.map(roaster => (
                  <option key={roaster} value={roaster}>{roaster}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Min Rating</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="9">9+ Stars</option>
                <option value="8">8+ Stars</option>
                <option value="7">7+ Stars</option>
                <option value="6">6+ Stars</option>
                <option value="5">5+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 