import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { HomePageWithSuspense } from '../pages/lazy'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Layout currentPage="home">
      <HomePageWithSuspense />
    </Layout>
  )
}
