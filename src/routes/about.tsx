import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { AboutPageWithSuspense } from '../pages/lazy'

export const Route = createFileRoute('/about')({
  component: AboutPageComponent,
})

function AboutPageComponent() {
  return (
    <Layout currentPage="about">
      <AboutPageWithSuspense />
    </Layout>
  )
} 