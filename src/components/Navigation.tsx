import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './ThemeToggle'

interface NavigationProps {
  currentPage?: 'home' | 'about'
}

export function Navigation({ currentPage = 'home' }: NavigationProps) {
  return (
    <nav className="navbar bg-base-100 shadow mb-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="btn btn-ghost text-xl">Beans App</Link>
        <div className="flex gap-2 items-center">
          <Link 
            to="/" 
            className={`btn btn-ghost btn-sm ${currentPage === 'home' ? 'btn-active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`btn btn-ghost btn-sm ${currentPage === 'about' ? 'btn-active' : ''}`}
          >
            About
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 