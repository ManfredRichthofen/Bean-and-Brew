import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { AboutPage } from '../pages/AboutPage'

export const Route = createFileRoute('/about')({
  component: AboutPageComponent,
})

function AboutPageComponent() {
  return (
    <Layout currentPage="about">
      <AboutPage />
    </Layout>
  )
} 