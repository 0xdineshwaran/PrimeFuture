/**
 * Navbar.jsx
 * Top navigation bar with responsive menu and routing helpers
 * Key features: responsive menu, active link highlighting, smooth scroll to sections
 * Used on: all pages (global header)
 */

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { label: 'Home', path: '/', targetId: 'hero' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
]

const authLinks = [
  { label: 'Login', path: '/login' },
  { label: 'Sign Up', path: '/signup' },
]

/**
 * Navbar
 * Renders navigation links and a mobile menu
 */
const Navbar = () => {
  // Whether the page has been scrolled (used to add shadow/background)
  const [scrolled, setScrolled] = useState(false)
  // Mobile menu open state
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Add scroll listener to toggle `scrolled` state for header styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // When a navigation item is clicked: navigate or scroll to targetId on home
  const handleNavClick = (link) => {
    if (link.path === '/' && link.targetId) {
      if (location.pathname !== '/') {
        // Navigate to home and let Home page scroll on mount via location.state
        navigate('/', { state: { scrollTo: link.targetId } })
      } else {
        // Already on home - smooth scroll to the target section
        document.getElementById(link.targetId)?.scrollIntoView({
          behavior: 'smooth',
        })
      }
    } else {
      navigate(link.path)
    }
    // Close mobile menu after navigation
    setMenuOpen(false)
  }

  // Helper to determine active link styling
  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path))
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-shadow duration-300 ${
        scrolled ? 'shadow-elevation' : ''
      }`}
      role="banner"
      style={{ backgroundColor: '#211E61' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          type="button"
          className="flex items-center gap-3 text-left text-lg font-semibold text-white focus-visible:ring-2 focus-visible:ring-white/30"
          onClick={() => handleNavClick({ path: '/', targetId: 'hero' })}
        >
          <img
            src="/image/logo.jpg"
            alt="PrimeFuture logo"
            className="h-10 w-auto rounded-sm object-contain"
            loading="lazy"
          />
          <span className="leading-none">PrimeFuture Education</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={`text-sm font-semibold uppercase tracking-widest transition ${
                isActive(link.path) ? 'text-white underline decoration-2' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          {authLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={`text-sm font-semibold uppercase tracking-widest transition ${
                isActive(link.path) ? 'text-white underline decoration-2' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick({ label: 'Contact', path: '/contact' })}
            className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#211E61] transition bg-white shadow-elevation hover:scale-105`}
          >
            Contact
          </button>
        </nav>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX className="h-6 w-6 text-white" /> : <FiMenu className="h-6 w-6 text-white" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <Motion.nav
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-4 border-t border-white/20 bg-[#211E61] px-6 py-4">
              {[...navLinks, ...authLinks, { label: 'Contact', path: '/contact' }].map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`py-2 text-left text-base font-semibold uppercase tracking-wide ${
                    isActive(link.path) ? 'text-white underline' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </Motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

