import { createFileRoute } from '@tanstack/react-router'
import { StatsPage } from '../pages/StatsPage'
import { Layout } from '../components/Layout'

export const Route = createFileRoute('/stats')({
  component: StatsRoute,
})

function StatsRoute() {
  return (
    <Layout currentPage="stats">
      <StatsPage />
    </Layout>
  )
} 