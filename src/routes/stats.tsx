import { createFileRoute } from '@tanstack/react-router'
import { StatsPageWithSuspense } from '../pages/lazy'
import { Layout } from '../components/Layout'

export const Route = createFileRoute('/stats')({
  component: StatsRoute,
})

function StatsRoute() {
  return (
    <Layout currentPage="stats">
      <StatsPageWithSuspense />
    </Layout>
  )
} 