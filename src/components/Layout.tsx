import type { ReactNode } from 'react'
import { Navigation } from './Navigation'

interface LayoutProps {
  children: ReactNode
  currentPage?: 'home' | 'about'
}

export function Layout({ children, currentPage = 'home' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navigation currentPage={currentPage} />
      <main className="container mx-auto flex-1 px-2 sm:px-4 lg:px-6">
        {children}
      </main>
      <footer className="footer footer-center p-4 bg-base-100 text-base-content mt-8">
        <aside>
          <p className="text-sm sm:text-base">© {new Date().getFullYear()} Bean & Brew Database</p>
        </aside>
      </footer>
    </div>
  )
} 