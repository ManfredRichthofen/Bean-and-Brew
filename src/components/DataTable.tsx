import { useState } from 'react'
import { FiChevronUp, FiChevronDown, FiExternalLink, FiEye, FiEyeOff } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { FaStarHalfStroke } from 'react-icons/fa6'
import type { CoffeeBean } from '../utils/sheets'
import { sortData, getColumnHeaders } from '../utils/sheets'
import { CoffeeDetailModal } from './CoffeeDetailModal'

interface DataTableProps {
  data: CoffeeBean[]
  loading: boolean
  error: string | null
}

export function DataTable({ data, loading, error }: DataTableProps) {
  const [sortBy, setSortBy] = useState<keyof CoffeeBean>('roastDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeBean | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hiddenColumns, setHiddenColumns] = useState<Set<keyof CoffeeBean>>(new Set())
  const [showColumnToggle, setShowColumnToggle] = useState(false)
  const headers = getColumnHeaders()

  const handleSort = (column: keyof CoffeeBean) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const handleRowClick = (coffee: CoffeeBean) => {
    setSelectedCoffee(coffee)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCoffee(null)
  }

  const toggleColumn = (columnKey: keyof CoffeeBean) => {
    const newHiddenColumns = new Set(hiddenColumns)
    if (newHiddenColumns.has(columnKey)) {
      newHiddenColumns.delete(columnKey)
    } else {
      newHiddenColumns.add(columnKey)
    }
    setHiddenColumns(newHiddenColumns)
  }

  const visibleHeaders = headers.filter(header => !hiddenColumns.has(header.key))
  const sortedData = sortData(data, sortBy, sortOrder)

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    
    // Check if it looks like a URL
    if (dateString.includes('http') || dateString.includes('www') || dateString.includes('.com')) {
      return '-'
    }
    
    // Try to parse as date
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      // If it's not a valid date, check if it's a reasonable date string
      const datePattern = /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}$|^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/
      if (datePattern.test(dateString)) {
        return dateString // Return as-is if it looks like a date format
      }
      return '-' // Return dash for invalid dates
    }
    
    return date.toLocaleDateString()
  }

  const formatPrice = (price: string, currency: string) => {
    if (!price) return '-'
    return `${currency || '$'}${price}`
  }

  const formatRating = (rating: string) => {
    if (!rating) return '-'
    const num = parseFloat(rating)
    if (isNaN(num)) return rating
    return `${num}/10`
  }

  const getStarRating = (rating: string) => {
    if (!rating) return 0
    const num = parseFloat(rating)
    if (isNaN(num)) return 0
    // Convert 10-point scale to 5-point scale for stars (each point = half star)
    return (num / 10) * 5
  }

  const formatRoastLevel = (roastLevel: string) => {
    if (!roastLevel) return '-'
    return roastLevel
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-base-200">
      {/* Column Visibility Toggle */}
      <div className="bg-base-200 p-2 border-b border-base-300">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowColumnToggle(!showColumnToggle)}
            className="btn btn-ghost btn-sm"
          >
            {showColumnToggle ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            Columns
          </button>
          {hiddenColumns.size > 0 && (
            <span className="text-xs text-base-content/70">
              {hiddenColumns.size} hidden
            </span>
          )}
        </div>
        
        {showColumnToggle && (
          <div className="mt-2 flex flex-wrap gap-2">
            {headers.map((header) => (
              <label key={header.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!hiddenColumns.has(header.key)}
                  onChange={() => toggleColumn(header.key)}
                  className="checkbox checkbox-sm"
                />
                <span className="text-sm">{header.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={`transition-all duration-300 ${hiddenColumns.size > 0 ? 'max-w-fit mx-auto' : 'w-full'}`}>
        <table className={`table table-zebra ${hiddenColumns.size > 0 ? 'w-auto' : 'w-full'}`}>
        <thead className="bg-base-300">
          <tr>
            {visibleHeaders.map((header) => (
              <th 
                key={header.key} 
                className={`font-semibold text-base min-w-0 ${header.sortable ? 'cursor-pointer hover:bg-base-200' : ''}`}
                onClick={() => header.sortable && handleSort(header.key)}
              >
                <div className="flex items-center gap-2">
                  <span className="truncate">{header.label}</span>
                  {header.sortable && sortBy === header.key && (
                    sortOrder === 'asc' ? <FiChevronUp className="w-4 h-4 flex-shrink-0" /> : <FiChevronDown className="w-4 h-4 flex-shrink-0" />
                  )}
                </div>
              </th>
            ))}
            {sortedData.some(bean => bean.productUrl) && (
              <th className="font-semibold text-base w-12 flex-shrink-0">Link</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((bean) => (
            <tr key={bean.id} className="hover:bg-base-100 cursor-pointer" onClick={() => handleRowClick(bean)}>
              {visibleHeaders.map((header) => {
                switch (header.key) {
                  case 'beanName':
                    return (
                      <td key={header.key} className="font-medium min-w-0">
                        <div className="flex flex-col">
                          <span className="font-semibold truncate" title={bean.beanName || '-'}>
                            {bean.beanName && bean.beanName.length > 25 
                              ? `${bean.beanName.substring(0, 25)}...` 
                              : bean.beanName || '-'}
                          </span>
                          {bean.origin && (
                            <span className="text-xs text-base-content/70 truncate">{bean.origin}</span>
                          )}
                        </div>
                      </td>
                    )
                  case 'caffeine':
                    return (
                      <td key={header.key} className="min-w-0">
                        <div className="flex flex-col">
                          <span className="truncate">{bean.caffeine || '-'}</span>
                        </div>
                      </td>
                    )
                  case 'roastLevel':
                    return (
                      <td key={header.key} className="min-w-0">
                        <div className="flex items-center gap-2">
                          {bean.roastLevel ? (
                            <div className="badge badge-outline badge-sm flex-shrink-0">
                              {formatRoastLevel(bean.roastLevel)}
                            </div>
                          ) : (
                            <span>-</span>
                          )}
                        </div>
                      </td>
                    )
                  case 'roastDate':
                    return (
                      <td key={header.key} className="min-w-0">
                        <span className="truncate">{formatDate(bean.roastDate)}</span>
                      </td>
                    )
                  case 'roaster':
                    return (
                      <td key={header.key} className="min-w-0">
                        <div className="flex flex-col">
                          <span className="font-medium truncate">{bean.roaster || '-'}</span>
                          {bean.roasterCity && (
                            <span className="text-xs text-base-content/70 truncate">{bean.roasterCity}</span>
                          )}
                        </div>
                      </td>
                    )
                  case 'roasterCountry':
                    return (
                      <td key={header.key} className="min-w-0">
                        <span className="truncate">{bean.roasterCountry || '-'}</span>
                      </td>
                    )
                  case 'rating':
                    return (
                      <td key={header.key} className="min-w-0">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{formatRating(bean.rating)}</span>
                            {bean.rating && (
                              <div className="flex gap-0.5 flex-shrink-0">
                                {[1, 2, 3, 4, 5].map((star) => {
                                  const ratingValue = getStarRating(bean.rating)
                                  const isFullStar = ratingValue >= star
                                  const isHalfStar = ratingValue >= star - 0.5 && ratingValue < star
                                  
                                  if (isHalfStar) {
                                    return (
                                      <FaStarHalfStroke key={star} className="text-orange-400 text-sm" />
                                    )
                                  }
                                  
                                  if (isFullStar) {
                                    return (
                                      <FaStar key={star} className="text-orange-400 text-sm" />
                                    )
                                  }
                                  
                                  return (
                                    <FaStar key={star} className="text-gray-300 text-sm" />
                                  )
                                })}
                              </div>
                            )}
                          </div>
                          {bean.tastingNotes && (
                            <span className="text-xs text-base-content/70 line-clamp-1">{bean.tastingNotes}</span>
                          )}
                        </div>
                      </td>
                    )
                  case 'price':
                    return (
                      <td key={header.key} className="min-w-0">
                        <div className="flex flex-col">
                          <span className="font-medium truncate">{formatPrice(bean.price, bean.currency)}</span>
                        </div>
                      </td>
                    )
                  case 'weight':
                    return (
                      <td key={header.key} className="min-w-0">
                        <span className="truncate">{bean.weight ? `${bean.weight}g` : '-'}</span>
                      </td>
                    )
                  default:
                    return <td key={header.key} className="min-w-0">-</td>
                }
              })}
              {sortedData.some(bean => bean.productUrl) && (
                <td onClick={(e) => e.stopPropagation()} className="w-12 flex-shrink-0">
                  <div className="flex gap-1">
                    {bean.productUrl && (
                      <a
                        href={bean.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-xs"
                        title="View Product"
                      >
                        <FiExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-base-content/70">
          No coffee beans found matching your criteria.
        </div>
      )}
      {selectedCoffee && (
        <CoffeeDetailModal
          coffee={selectedCoffee}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  )
} 