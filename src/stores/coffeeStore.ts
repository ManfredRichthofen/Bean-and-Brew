import { create } from 'zustand'
import { standardizeNames } from '../utils/standardizeNames'
import type { CoffeeBean } from '../types/coffee'
import { SHEET_CSV_URL } from '../types/coffee'

interface CoffeeState {
  beans: CoffeeBean[]
  standardizedBeans: CoffeeBean[] // Cached standardized data
  loading: boolean
  error: string | null
  lastFetched: number | null
  cacheDuration: number // 5 minutes in milliseconds
  
  // Actions
  fetchBeans: () => Promise<void>
  setBeans: (beans: CoffeeBean[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  refetch: () => Promise<void>
  getStandardizedBeans: () => CoffeeBean[] // Getter for standardized data
}

// CSV parsing function (same as in sheets.ts)
const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n')
  const result: string[][] = []
  let currentRow: string[] = []
  let currentField = ''
  let inQuotes = false
  
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]
    
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex]
      const nextChar = line[charIndex + 1]
      
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote
          currentField += '"'
          charIndex++ // Skip the next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        currentRow.push(currentField.trim())
        currentField = ''
      } else {
        currentField += char
      }
    }
    
    // If we're not in quotes, this line ends the row
    if (!inQuotes) {
      // Add the last field of this line
      currentRow.push(currentField.trim())
      currentField = ''
      
      // Add the completed row
      result.push([...currentRow])
      currentRow = []
    } else {
      // We're still in quotes, so this line continues the current field
      currentField += '\n'
    }
  }
  
  // Handle any remaining field
  if (currentField.trim()) {
    currentRow.push(currentField.trim())
  }
  
  // Handle any remaining row
  if (currentRow.length > 0) {
    result.push(currentRow)
  }
  
  return result
}

export const useCoffeeStore = create<CoffeeState>((set, get) => ({
  beans: [],
  standardizedBeans: [],
  loading: false,
  error: null,
  lastFetched: null,
  cacheDuration: 5 * 60 * 1000, // 5 minutes
  
  fetchBeans: async () => {
    const { lastFetched, cacheDuration, loading } = get()
    const now = Date.now()
    
    // Check if we have cached data and it's still valid
    if (lastFetched && now - lastFetched < cacheDuration) {
      return
    }
    
    // Prevent multiple simultaneous requests
    if (loading) {
      return
    }
    
    set({ loading: true, error: null })
    
    try {
      const response = await fetch(SHEET_CSV_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const csv = await response.text()
      const rows = parseCSV(csv)
      
      // Skip header row and convert to CoffeeBean objects
      const rawData = rows.slice(1).map((row, index) => {
        // Ensure we have enough columns, pad with empty strings if needed
        const paddedRow = [...row]
        while (paddedRow.length < 29) {
          paddedRow.push('')
        }
        
        // Clean and validate the data
        const cleanRow = paddedRow.map(cell => {
          if (!cell) return ''
          // Remove surrounding quotes and clean whitespace
          return cell.replace(/^["']|["']$/g, '').trim()
        })
        
        return {
          id: index + 1,
          beanName: cleanRow[1] || '', // 'Bean/blend name'
          origin: cleanRow[2] || '', // 'Origin'
          caffeine: cleanRow[3] || '', // 'Caffeine'
          roastLevel: cleanRow[4] || '', // 'Roast level'
          roastDate: cleanRow[5] || '', // 'Roast date'
          roaster: cleanRow[6] || '', // 'Roaster'
          roasterCity: cleanRow[7] || '', // "Roaster's city"
          roasterCountry: cleanRow[8] || '', // "Roaster's country"
          weight: cleanRow[9] || '', // 'Product weight (grams)'
          currency: cleanRow[10] || '', // 'Currency'
          price: cleanRow[11] || '', // 'Price paid'
          costPer100g: cleanRow[12] || '', // 'Cost per 100 g'
          costPerPound: cleanRow[13] || '', // 'Cost per pound'
          tastingNotes: cleanRow[14] || '', // 'Tasting notes'
          rating: cleanRow[15] || '', // 'Rating'
          productUrl: cleanRow[16] || '', // 'Product URL'
          timeRested: cleanRow[17] || '', // 'Time rested (days)'
          dose: cleanRow[18] || '', // 'Dose (grams)'
          yield: cleanRow[19] || '', // 'Yield (grams)'
          brewRatio: cleanRow[20] || '', // 'Brew ratio'
          shotTime: cleanRow[21] || '', // 'Shot time (seconds)'
          espressoMachine: cleanRow[22] || '', // 'Espresso machine'
          grinder: cleanRow[23] || '', // 'Grinder'
          grindSetting: cleanRow[24] || '', // 'Grind setting'
          waterTemperature: cleanRow[25] || '', // 'Water temperature (°C)'
          basketSpecs: cleanRow[26] || '', // 'Basket specs'
          profile: cleanRow[27] || '', // 'Profile'
          additionalWorkflow: cleanRow[28] || '', // 'Additional workflow/equipment'
          redditUsername: cleanRow[29] || '', // 'Reddit username'
        }
      }).filter(bean => bean.beanName) // Only include rows with a bean name
      
      // Standardize the data once and cache it
      const standardizedData = standardizeNames(rawData)
      
      set({ 
        beans: rawData, // Store raw data
        standardizedBeans: standardizedData, // Store cached standardized data
        loading: false, 
        lastFetched: now,
        error: null
      })
    } catch (error) {
      console.error('Failed to fetch coffee beans:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch coffee beans', 
        loading: false 
      })
    }
  },
  
  setBeans: (beans: CoffeeBean[]) => {
    set({ beans })
  },
  
  setLoading: (loading: boolean) => {
    set({ loading })
  },
  
  setError: (error: string | null) => {
    set({ error })
  },
  
  clearError: () => {
    set({ error: null })
  },
  
  refetch: async () => {
    const { fetchBeans } = get()
    // Force refetch by clearing the cache
    set({ lastFetched: null })
    await fetchBeans()
  },
  
  getStandardizedBeans: () => {
    const { standardizedBeans } = get()
    return standardizedBeans
  }
}))

// Selector hooks for better performance
export const useCoffeeBeans = () => {
  const standardizedBeans = useCoffeeStore(state => state.standardizedBeans)
  const loading = useCoffeeStore(state => state.loading)
  const error = useCoffeeStore(state => state.error)
  const refetch = useCoffeeStore(state => state.refetch)
  
  return {
    data: standardizedBeans,
    isLoading: loading,
    error: error ? new Error(error) : null,
    refetch
  }
}

// Hook for raw data (if needed)
export const useCoffeeBeansRaw = () => {
  const { beans, loading, error, refetch } = useCoffeeStore()
  
  return {
    data: beans,
    isLoading: loading,
    error: error ? new Error(error) : null,
    refetch
  }
}

// Individual selectors
export const useCoffeeBeansData = () => useCoffeeStore(state => state.standardizedBeans)
export const useCoffeeBeansRawData = () => useCoffeeStore(state => state.beans)
export const useCoffeeBeansLoading = () => useCoffeeStore(state => state.loading)
export const useCoffeeBeansError = () => useCoffeeStore(state => state.error) 