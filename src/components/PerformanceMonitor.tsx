import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function PerformanceMonitor() {
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null)
  const [queryCount, setQueryCount] = useState(0)
  const queryClient = useQueryClient()

  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMemoryUsage(memory.usedJSHeapSize / 1024 / 1024) // Convert to MB
      }
    }

    const updateQueryCount = () => {
      const queries = queryClient.getQueryCache().getAll()
      setQueryCount(queries.length)
    }

    // Update immediately
    updateMemoryUsage()
    updateQueryCount()

    // Update every 2 seconds
    const interval = setInterval(() => {
      updateMemoryUsage()
      updateQueryCount()
    }, 2000)

    return () => clearInterval(interval)
  }, [queryClient])

  // Only show in development
  if (import.meta.env.PROD) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-base-200 p-3 rounded-lg shadow-lg border border-base-300 text-xs z-50">
      <div className="font-semibold mb-1">Performance Monitor</div>
      <div>Memory: {memoryUsage ? `${memoryUsage.toFixed(1)} MB` : 'N/A'}</div>
      <div>Queries: {queryCount}</div>
    </div>
  )
} 