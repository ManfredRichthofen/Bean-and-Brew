// Standardization mappings for roaster names
const ROASTER_STANDARDIZATION: Record<string, string> = {
  // Counter Culture variations
  'counter culture': 'Counter Culture',
  'counterculture': 'Counter Culture',
  'counter culture coffee': 'Counter Culture',
  'counterculture coffee': 'Counter Culture',
  'counter culture coffee co': 'Counter Culture',
  'counterculture coffee co': 'Counter Culture',
  'counter culter': 'Counter Culture',
  
  // Stumptown variations
  'stumptown': 'Stumptown',
  'stumptown coffee': 'Stumptown',
  'stumptown coffee roasters': 'Stumptown',
  'stumptown coffee roasting': 'Stumptown',
  
  // Blue Bottle variations
  'blue bottle': 'Blue Bottle',
  'blue bottle coffee': 'Blue Bottle',
  'bluebottle': 'Blue Bottle',
  'bluebottle coffee': 'Blue Bottle',
  
  // Intelligentsia variations
  'intelligentsia': 'Intelligentsia',
  'intelligentsia coffee': 'Intelligentsia',
  'intelligentsia coffee & tea': 'Intelligentsia',

  // Percolate variations
  'perc': 'Perc',
  'perc coffee': 'Perc',
  
 // Black & White variations
  'black & white': 'Black & White',
  'black & white coffee': 'Black & White',
  'black & white coffee roasters': 'Black & White',
  'black and white': 'Black & White',
  
  // Verve variations
  'verve': 'Verve',
  'verve coffee': 'Verve',
  'verve coffee roasters': 'Verve',
  
  // Onyx variations
  'onyx': 'Onyx',
  'onyx coffee': 'Onyx',
  'onyx coffee lab': 'Onyx',

  //Café du Jour
  'cafe du jour': 'Café du Jour',
  'cafedujour': 'Café du Jour',
}



// Cache for standardization results to avoid redundant processing
const standardizeCache = new WeakMap<any[], any[]>()

/**
 * Standardizes a roaster name by normalizing common variations
 */
export function standardizeRoasterName(name: string): string {
  if (!name) return name
  
  const normalized = name.toLowerCase().trim()
  return ROASTER_STANDARDIZATION[normalized] || name
}







/**
 * Standardizes roaster names in a dataset with early exit optimization
 */
export function standardizeNames(data: any[]): any[] {
  if (!data?.length) return data
  
  // Check cache first
  if (standardizeCache.has(data)) {
    return standardizeCache.get(data)!
  }
  
  // Check if any roaster names need standardization
  let needsStandardization = false
  
  for (const item of data) {
    if (item.roaster && ROASTER_STANDARDIZATION[item.roaster.toLowerCase().trim()]) {
      needsStandardization = true
      break
    }
  }
  
  // Early exit if no standardization needed
  if (!needsStandardization) {
    standardizeCache.set(data, data)
    return data
  }
  
  const result = data.map(item => ({
    ...item,
    roaster: standardizeRoasterName(item.roaster)
  }))
  
  // Cache the result
  standardizeCache.set(data, result)
  return result
} 