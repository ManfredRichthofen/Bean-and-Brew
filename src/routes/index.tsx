import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { HomePage } from '../pages/HomePage'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Layout currentPage="home">
      <HomePage />
    </Layout>
  )
}
