export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1dUpWjrkeTVPtIuSVmvjXrt7zq-E_wYg-0e9JMl_glNA/export?format=csv&gid=1812115979'

export interface CoffeeBean {
  id: number
  beanName: string
  origin: string
  caffeine: string
  roastLevel: string
  roastDate: string
  roaster: string
  roasterCity: string
  roasterCountry: string
  weight: string
  currency: string
  price: string
  costPer100g: string
  costPerPound: string
  tastingNotes: string
  rating: string
  productUrl: string
  timeRested: string
  dose: string
  yield: string
  brewRatio: string
  shotTime: string
  espressoMachine: string
  grinder: string
  grindSetting: string
  waterTemperature: string
  basketSpecs: string
  profile: string
  additionalWorkflow: string
  redditUsername: string
}

// TanStack Query hook for fetching coffee beans data
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { standardizeNames } from './standardizeNames'

export const useCoffeeBeans = () => {
  return useQuery({
    queryKey: ['coffee-beans'],
    queryFn: async () => {
      const rawData = await fetchSheetData()
      // Standardize the data once when fetched
      return standardizeNames(rawData)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes (reduced for memory efficiency)
    retry: 2, // Reduced retries
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't refetch on mount if data exists
  })
}

// Utility function to invalidate and refetch coffee beans data
export const useInvalidateCoffeeBeans = () => {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['coffee-beans'] })
  }
}

export async function fetchSheetData(): Promise<CoffeeBean[]> {
  const response = await fetch(SHEET_CSV_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const csv = await response.text()
  
  // More robust CSV parsing that handles quoted fields with newlines and commas
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
  
  const rows = parseCSV(csv)
  
  // Skip header row and convert to CoffeeBean objects
  return rows.slice(1).map((row, index) => {
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
}

export function filterData(data: CoffeeBean[], filter: string): CoffeeBean[] {
  if (!filter.trim()) return data
  
  const searchTerm = filter.toLowerCase()
  return data.filter((bean) =>
    bean.beanName.toLowerCase().includes(searchTerm) ||
    bean.origin.toLowerCase().includes(searchTerm) ||
    bean.roaster.toLowerCase().includes(searchTerm) ||
    bean.tastingNotes.toLowerCase().includes(searchTerm) ||
    bean.roasterCountry.toLowerCase().includes(searchTerm)
  )
}

export function sortData(data: CoffeeBean[], sortBy: keyof CoffeeBean, sortOrder: 'asc' | 'desc'): CoffeeBean[] {
  return [...data].sort((a, b) => {
    let aValue = String(a[sortBy] || '')
    let bValue = String(b[sortBy] || '')
    
    // Handle date sorting
    if (sortBy === 'roastDate') {
      const aDate = new Date(aValue || '1900-01-01')
      const bDate = new Date(bValue || '1900-01-01')
      return sortOrder === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
    }
    
    // Handle numeric sorting
    if (sortBy === 'rating' || sortBy === 'price' || sortBy === 'weight') {
      const aNum = parseFloat(aValue) || 0
      const bNum = parseFloat(bValue) || 0
      return sortOrder === 'asc' ? aNum - bNum : bNum - aNum
    }
    
    // Handle string sorting
    aValue = aValue.toLowerCase()
    bValue = bValue.toLowerCase()
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
}

export function getColumnHeaders(): { key: keyof CoffeeBean; label: string; sortable: boolean }[] {
  return [
    { key: 'beanName', label: 'Coffee Bean', sortable: true },
    { key: 'caffeine', label: 'Caffeine', sortable: true },
    { key: 'roastLevel', label: 'Roast Level', sortable: true },
    { key: 'roastDate', label: 'Roasted On', sortable: true },
    { key: 'roaster', label: 'Roaster', sortable: true },
    { key: 'roasterCountry', label: 'Roaster Location', sortable: true },
    { key: 'rating', label: 'User Rating', sortable: true },
    { key: 'price', label: 'Price Paid', sortable: true },
    { key: 'weight', label: 'Bag Size', sortable: true },
  ]
} 