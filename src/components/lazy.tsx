import { lazy, Suspense } from 'react'
import { FiEye, FiBarChart2 } from 'react-icons/fi'

// Loading components for heavy components
const DataTableSkeleton = () => (
  <div className="space-y-4">
    <div className="animate-pulse">
      <div className="h-12 bg-base-300 rounded-lg mb-4"></div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-base-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
)

const ModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-base-100 rounded-lg p-6 max-w-md w-full mx-4 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <FiEye className="w-5 h-5 text-primary" />
        <div className="h-6 bg-base-300 rounded w-32"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-base-300 rounded w-full"></div>
        <div className="h-4 bg-base-300 rounded w-3/4"></div>
        <div className="h-4 bg-base-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
)

const ChartSkeleton = ({ height = 350 }: { height?: number }) => (
  <div className="animate-pulse">
    <div className="bg-base-300 rounded-lg" style={{ height: `${height}px` }}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <FiBarChart2 className="w-8 h-8 text-secondary mx-auto" />
          <div className="loading loading-spinner loading-md"></div>
          <p className="text-sm text-base-content/70">Loading chart...</p>
        </div>
      </div>
    </div>
  </div>
)

// Lazy-loaded heavy components
export const LazyDataTable = lazy(() => 
  import('./DataTable').then(module => ({ 
    default: module.DataTable 
  }))
)

export const LazyCoffeeDetailModal = lazy(() => 
  import('./CoffeeDetailModal').then(module => ({ 
    default: module.CoffeeDetailModal 
  }))
)

// Lazy-loaded chart components - individually code-split
export const LazyTopRoastersChart = lazy(() => 
  import('./charts/TopRoastersChart').then(module => ({ 
    default: module.TopRoastersChart 
  }))
)

export const LazyRatingDistributionChart = lazy(() => 
  import('./charts/RatingDistributionChart').then(module => ({ 
    default: module.RatingDistributionChart 
  }))
)

export const LazyTopOriginsChart = lazy(() => 
  import('./charts/TopOriginsChart').then(module => ({ 
    default: module.TopOriginsChart 
  }))
)

export const LazyMonthlyTrendsChart = lazy(() => 
  import('./charts/MonthlyTrendsChart').then(module => ({ 
    default: module.MonthlyTrendsChart 
  }))
)

export const LazyTopMachinesChart = lazy(() => 
  import('./charts/TopMachinesChart').then(module => ({ 
    default: module.TopMachinesChart 
  }))
)

export const LazyTopGrindersChart = lazy(() => 
  import('./charts/TopGrindersChart').then(module => ({ 
    default: module.TopGrindersChart 
  }))
)

export const LazyRoastLevelDistributionChart = lazy(() => 
  import('./charts/RoastLevelDistributionChart').then(module => ({ 
    default: module.RoastLevelDistributionChart 
  }))
)

// Wrapped components with Suspense
export const DataTableWithSuspense = (props: any) => (
  <Suspense fallback={<DataTableSkeleton />}>
    <LazyDataTable {...props} />
  </Suspense>
)

export const CoffeeDetailModalWithSuspense = (props: any) => (
  <Suspense fallback={<ModalSkeleton />}>
    <LazyCoffeeDetailModal {...props} />
  </Suspense>
)

export const TopRoastersChartWithSuspense = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyTopRoastersChart {...props} />
  </Suspense>
)

export const RatingDistributionChartWithSuspense = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyRatingDistributionChart {...props} />
  </Suspense>
)

export const TopOriginsChartWithSuspense = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyTopOriginsChart {...props} />
  </Suspense>
)

export const MonthlyTrendsChartWithSuspense = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyMonthlyTrendsChart {...props} />
  </Suspense>
)

export const TopMachinesChartWithSuspense = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyTopMachinesChart {...props} />
  </Suspense>
)

export const TopGrindersChartWithSuspense = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyTopGrindersChart {...props} />
  </Suspense>
)

export const RoastLevelDistributionChartWithSuspense = (props: any) => (
  <Suspense fallback={<ChartSkeleton />}>
    <LazyRoastLevelDistributionChart {...props} />
  </Suspense>
) 