import { lazy, Suspense } from 'react'
import { FiCoffee, FiBarChart2, FiInfo } from 'react-icons/fi'

// Loading components for each page
const HomePageSkeleton = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="text-center space-y-4">
      <FiCoffee className="w-12 h-12 text-primary animate-pulse" />
      <div className="loading loading-spinner loading-lg text-primary"></div>
      <p className="text-lg font-medium">Loading Coffee Database...</p>
      <p className="text-base-content/70">Preparing your coffee bean collection</p>
    </div>
  </div>
)

const StatsPageSkeleton = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="text-center space-y-4">
      <FiBarChart2 className="w-12 h-12 text-secondary animate-pulse" />
      <div className="loading loading-spinner loading-lg text-secondary"></div>
      <p className="text-lg font-medium">Loading Statistics...</p>
      <p className="text-base-content/70">Crunching the numbers</p>
    </div>
  </div>
)

const AboutPageSkeleton = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="text-center space-y-4">
      <FiInfo className="w-12 h-12 text-accent animate-pulse" />
      <div className="loading loading-spinner loading-lg text-accent"></div>
      <p className="text-lg font-medium">Loading About Page...</p>
      <p className="text-base-content/70">Getting the details ready</p>
    </div>
  </div>
)

// Lazy-loaded page components
export const LazyHomePage = lazy(() => 
  import('./HomePage').then(module => ({ 
    default: module.HomePage 
  }))
)

export const LazyStatsPage = lazy(() => 
  import('./StatsPage').then(module => ({ 
    default: module.StatsPage 
  }))
)

export const LazyAboutPage = lazy(() => 
  import('./AboutPage').then(module => ({ 
    default: module.AboutPage 
  }))
)

// Wrapped components with Suspense
export const HomePageWithSuspense = () => (
  <Suspense fallback={<HomePageSkeleton />}>
    <LazyHomePage />
  </Suspense>
)

export const StatsPageWithSuspense = () => (
  <Suspense fallback={<StatsPageSkeleton />}>
    <LazyStatsPage />
  </Suspense>
)

export const AboutPageWithSuspense = () => (
  <Suspense fallback={<AboutPageSkeleton />}>
    <LazyAboutPage />
  </Suspense>
) 