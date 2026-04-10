/**
 * App.jsx
 * Root application component and route map
 * Key features: routing, page transitions, global layout (Navbar/Footer), loading screen
 * Used on: index (app root), routes/pages
 */

import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import BackToTopButton from './components/BackToTopButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Sitemap from './pages/Sitemap'
import Login from './pages/Login'
import Signup from './pages/Signup'

/**
 * PageWrapper
 * Small wrapper that applies a page transition animation to route content
 * Features: fade + slide up on enter, fade + slide up on exit
 */
console.log("App loaded");
const PageWrapper = ({ children }) => (
  <Motion.div
    // Fade in and slide up when route mounts
    initial={{ opacity: 0, y: 30 }}
    // Visible state
    animate={{ opacity: 1, y: 0 }}
    // Fade out and slide up when leaving
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </Motion.div>
)

/**
 * App
 * Root application component that sets up global layout and routing
 * Features: loading screen control, animated route transitions, accessibility skip link
 */
const App = () => {
  // Controls whether the initial loading screen is shown
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  // Hide loading screen after a fixed timeout (simulates app ready)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  // Lock scroll while loading to prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isLoading])

  return (
    <div className="bg-white text-primary">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-primary">
        Skip to main content
      </a>
      {/* Loading screen - blocks interaction while `isLoading` is true */}
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <ScrollToTop />
      <BackToTopButton />
      <main id="main" className="pt-24">
        {/* AnimatePresence wraps routes to animate page transitions */}
        <AnimatePresence mode="wait">
          {/* ROUTE MAP
           * / → Home (landing page)
           * /about → About (company info)
           * /services → Services (all services)
           * /contact → Contact (contact form)
           */}
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route
              path="/services"
              element={
                <PageWrapper>
                  <Services />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />
            <Route
              path="/signup"
              element={
                <PageWrapper>
                  <Signup />
                </PageWrapper>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageWrapper>
                  <Privacy />
                </PageWrapper>
              }
            />
            <Route
              path="/terms"
              element={
                <PageWrapper>
                  <Terms />
                </PageWrapper>
              }
            />
            <Route
              path="/sitemap"
              element={
                <PageWrapper>
                  <Sitemap />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
