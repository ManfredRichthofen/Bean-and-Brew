import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { ThemeToggle } from './ThemeToggle'

interface NavigationProps {
  currentPage?: 'home' | 'about' | 'stats'
}

export function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest('.navbar')) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav className="navbar bg-base-100 shadow mb-6 relative">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo/Brand */}
        <Link to="/" className="btn btn-ghost text-xl" onClick={closeMenu}>
          <span className="hidden sm:inline">Bean & Brew Database</span>
          <span className="sm:hidden">Bean & Brew</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2 items-center">
          <Link 
            to="/" 
            className={`btn btn-ghost btn-sm ${currentPage === 'home' ? 'btn-active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/stats" 
            className={`btn btn-ghost btn-sm ${currentPage === 'stats' ? 'btn-active' : ''}`}
          >
            Stats
          </Link>
          <Link 
            to="/about" 
            className={`btn btn-ghost btn-sm ${currentPage === 'about' ? 'btn-active' : ''}`}
          >
            About
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="btn btn-ghost btn-sm"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-base-100 shadow-lg border-t border-base-200 z-[100] min-h-[120px]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className={`btn btn-ghost justify-start text-left ${currentPage === 'home' ? 'btn-active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`btn btn-ghost justify-start text-left ${currentPage === 'about' ? 'btn-active' : ''}`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/stats" 
                className={`btn btn-ghost justify-start text-left ${currentPage === 'stats' ? 'btn-active' : ''}`}
                onClick={closeMenu}
              >
                Stats
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 