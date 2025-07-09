import { FiX, FiExternalLink, FiMapPin, FiStar, FiDollarSign, FiCoffee } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { FaStarHalfStroke } from 'react-icons/fa6'
import type { CoffeeBean } from '../types/coffee'

interface CoffeeDetailModalProps {
  coffee: CoffeeBean | null
  isOpen: boolean
  onClose: () => void
}

export function CoffeeDetailModal({ coffee, isOpen, onClose }: CoffeeDetailModalProps) {
  if (!coffee || !isOpen) return null

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified'
    
    if (dateString.includes('http') || dateString.includes('www') || dateString.includes('.com')) {
      return 'Not specified'
    }
    
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      const datePattern = /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}$|^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/
      if (datePattern.test(dateString)) {
        return dateString
      }
      return 'Not specified'
    }
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatPrice = (price: string, currency: string) => {
    if (!price) return 'Not specified'
    return `${currency || '$'}${price}`
  }

  const formatRating = (rating: string) => {
    if (!rating) return 'Not rated'
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
    if (!roastLevel) return 'Not specified'
    const level = parseInt(roastLevel)
    if (isNaN(level)) return roastLevel
    
    const roastLevels = {
      1: 'Very Light',
      2: 'Light',
      3: 'Medium-Light',
      4: 'Medium',
      5: 'Medium-Dark',
      6: 'Dark',
      7: 'Very Dark'
    }
    
    return `${roastLevels[level as keyof typeof roastLevels] || roastLevel} (${roastLevel})`
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-primary truncate">{coffee.beanName}</h3>
            <p className="text-base-content/70 flex items-center gap-1 mt-1 text-sm">
              <FiMapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{coffee.origin}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm flex-shrink-0 ml-2"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <h4 className="card-title text-base sm:text-lg flex items-center gap-2">
                  <FiCoffee className="w-4 h-4 sm:w-5 sm:h-5" />
                  Coffee Details
                </h4>
                <div className="space-y-2 text-sm">
                  {coffee.caffeine && (
                    <div>
                      <span className="font-medium">Caffeine:</span> {coffee.caffeine}
                    </div>
                  )}
                  {coffee.roastLevel && (
                    <div>
                      <span className="font-medium">Roast Level:</span> {formatRoastLevel(coffee.roastLevel)}
                    </div>
                  )}
                  {coffee.roastDate && (
                    <div>
                      <span className="font-medium">Roast Date:</span> {formatDate(coffee.roastDate)}
                    </div>
                  )}
                  {coffee.timeRested && (
                    <div>
                      <span className="font-medium">Time Rested:</span> {coffee.timeRested} days
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <h4 className="card-title text-base sm:text-lg flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  Roaster Info
                </h4>
                <div className="space-y-2 text-sm">
                  {coffee.roaster && (
                    <div>
                      <span className="font-medium">Roaster:</span> {coffee.roaster}
                    </div>
                  )}
                  {coffee.roasterCity && (
                    <div>
                      <span className="font-medium">City:</span> {coffee.roasterCity}
                    </div>
                  )}
                  {coffee.roasterCountry && (
                    <div>
                      <span className="font-medium">Country:</span> {coffee.roasterCountry}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Info - Only show if there's pricing data */}
          {(coffee.price || coffee.weight || coffee.costPer100g || coffee.costPerPound) && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <h4 className="card-title text-base sm:text-lg flex items-center gap-2">
                  <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                  Purchase Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  {coffee.price && (
                    <div>
                      <span className="font-medium">Price Paid:</span> {formatPrice(coffee.price, coffee.currency)}
                    </div>
                  )}
                  {coffee.weight && (
                    <div>
                      <span className="font-medium">Bag Size:</span> {coffee.weight}g
                    </div>
                  )}
                  {coffee.costPer100g && (
                    <div>
                      <span className="font-medium">Cost per 100g:</span> {coffee.currency || '$'}{coffee.costPer100g}
                    </div>
                  )}
                  {coffee.costPerPound && (
                    <div>
                      <span className="font-medium">Cost per Pound:</span> {coffee.currency || '$'}{coffee.costPerPound}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Brewing Details - Only show if there's brewing data */}
          {(coffee.dose || coffee.yield || coffee.brewRatio || coffee.shotTime || coffee.waterTemperature || coffee.grindSetting) && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <h4 className="card-title text-base sm:text-lg">Brewing Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  {coffee.dose && (
                    <div>
                      <span className="font-medium">Dose:</span> {coffee.dose}g
                    </div>
                  )}
                  {coffee.yield && (
                    <div>
                      <span className="font-medium">Yield:</span> {coffee.yield}g
                    </div>
                  )}
                  {coffee.brewRatio && (
                    <div>
                      <span className="font-medium">Brew Ratio:</span> {coffee.brewRatio}
                    </div>
                  )}
                  {coffee.shotTime && (
                    <div>
                      <span className="font-medium">Shot Time:</span> {coffee.shotTime}s
                    </div>
                  )}
                  {coffee.waterTemperature && (
                    <div>
                      <span className="font-medium">Water Temperature:</span> {coffee.waterTemperature}°C
                    </div>
                  )}
                  {coffee.grindSetting && (
                    <div>
                      <span className="font-medium">Grind Setting:</span> {coffee.grindSetting}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Equipment - Only show if there's equipment data */}
          {(coffee.espressoMachine || coffee.grinder || coffee.basketSpecs || coffee.profile) && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <h4 className="card-title text-base sm:text-lg">Equipment</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  {coffee.espressoMachine && (
                    <div>
                      <span className="font-medium">Espresso Machine:</span> {coffee.espressoMachine}
                    </div>
                  )}
                  {coffee.grinder && (
                    <div>
                      <span className="font-medium">Grinder:</span> {coffee.grinder}
                    </div>
                  )}
                  {coffee.basketSpecs && (
                    <div>
                      <span className="font-medium">Basket Specs:</span> {coffee.basketSpecs}
                    </div>
                  )}
                  {coffee.profile && (
                    <div>
                      <span className="font-medium">Profile:</span> {coffee.profile}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Additional Workflow */}
          {coffee.additionalWorkflow && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <h4 className="card-title text-base sm:text-lg">Additional Workflow/Equipment</h4>
                <p className="text-base-content/80 text-sm">{coffee.additionalWorkflow}</p>
              </div>
            </div>
          )}

          {/* Rating and Tasting Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {coffee.rating && (
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h4 className="card-title text-base sm:text-lg flex items-center gap-2">
                    <FiStar className="w-4 h-4 sm:w-5 sm:h-5" />
                    Rating
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{formatRating(coffee.rating)}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const ratingValue = getStarRating(coffee.rating)
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
                    </div>
                  </div>
                </div>
              </div>
            )}

            {coffee.tastingNotes && (
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h4 className="card-title text-base sm:text-lg">Tasting Notes</h4>
                  <p className="text-base-content/80 text-sm">{coffee.tastingNotes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Reddit Username */}
          {coffee.redditUsername && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-3 sm:p-4">
                <h4 className="card-title text-base sm:text-lg">Submitted By</h4>
                <p className="text-base-content/80 text-sm">u/{coffee.redditUsername}</p>
              </div>
            </div>
          )}

          {/* Product Link */}
          {coffee.productUrl && (
            <div className="flex justify-center">
              <a
                href={coffee.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto"
              >
                <FiExternalLink className="w-4 h-4 mr-2" />
                View Product
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-action">
          <button className="btn w-full sm:w-auto" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
} 