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

export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1dUpWjrkeTVPtIuSVmvjXrt7zq-E_wYg-0e9JMl_glNA/export?format=csv&gid=1812115979'

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