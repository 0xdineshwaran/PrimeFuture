/**
 * About.jsx
 * About page describing PrimeFuture's story, mission, leadership and values
 * Key features: hero, story, mission/vision, leadership bios, company values
 * Used on: /about
 */

import { motion as Motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { Helmet } from "react-helmet"
import { FiTarget, FiEye, FiShield, FiUserCheck, FiAward, FiGlobe } from 'react-icons/fi'

const values = [
  { title: 'Transparency', description: 'Clear processes, honest advice, and ethical guidance.', icon: <FiShield className="h-8 w-8" /> },
  { title: 'Expertise', description: 'Specialists with decades of combined global education experience.', icon: <FiUserCheck className="h-8 w-8" /> },
  { title: 'Personalized Service', description: 'Tailored pathways for every student profile.', icon: <FiTarget className="h-8 w-8" /> },
  { title: 'Student Success', description: 'Relentless focus on outcomes and long-term growth.', icon: <FiAward className="h-8 w-8" /> },
  { title: 'Global Network', description: 'Strong partnerships with top universities worldwide.', icon: <FiGlobe className="h-8 w-8" /> },
  { title: 'Comprehensive Support', description: 'From counseling to departure – every step covered.', icon: <FiEye className="h-8 w-8" /> },
]

/**
 * About
 * Displays company information, mission, leadership and values
 * Features: animated sections revealed on scroll
 */
const About = () => {
  // Refs and animation controls for page sections
  // heroRef - top hero section
  const [heroRef, heroControls] = useReveal()
  // storyRef - company story section
  const [storyRef, storyControls] = useReveal()
  // missionRef - mission + vision section
  const [missionRef, missionControls] = useReveal()
  // leadershipRef - leadership bios
  const [leadershipRef, leadershipControls] = useReveal()
  // valuesRef - company values grid
  const [valuesRef, valuesControls] = useReveal()

  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const target = document.getElementById(location.state.scrollTo)
      if (target) {
        // Clear the navigation state immediately so repeat navigation won't retrigger
        window.history.replaceState({}, '', window.location.pathname)

        // Smooth animated scroll with easing and header offset
        const headerOffset = 96 // adjust this value to match your fixed header height
        const startY = window.pageYOffset
        const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerOffset
        const distance = targetY - startY
        const duration = 400
        let startTime = null

        const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

        const step = (timestamp) => {
          if (!startTime) startTime = timestamp
          const elapsed = timestamp - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = easeInOutCubic(progress)
          window.scrollTo(0, startY + distance * eased)
          if (progress < 1) {
            window.requestAnimationFrame(step)
          }
        }

        window.requestAnimationFrame(step)
      }
    }
  }, [location])

  return (
    <div className="bg-white text-primary">
      <Helmet>
        <title>About PrimeFuture Education</title>
        <meta
          name="description"
          content="Discover the mission, leadership, and values behind PrimeFuture Education, a premium study abroad consultancy."
        />
      </Helmet>

      {/* ===== SECTION: Hero ===== */}
      <Motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroControls}
        className="px-6 pb-16 pt-32"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-primary/70">Home &gt; About</p>
          <h1 className="mt-6 text-4xl font-semibold">About PrimeFuture Education</h1>
          <p className="mt-4 text-primary/80">Your Trusted Partner in Global Education</p>
          {/* <div className="mt-10 rounded-3xl bg-primary/5 p-12">
            <div className="aspect-[3/1] rounded-2xl border-4 border-primary/20 bg-white/70" aria-label="Team image placeholder" />
          </div> */}
        </div>
      </Motion.section>

      {/* ===== SECTION: Our Story ===== */}
      <Motion.section
        ref={storyRef}
        initial={{ opacity: 0, y: 50 }}
        animate={storyControls}
        className="px-6 py-16"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary/70">Our Story</p>
            <h2 className="mt-4 text-3xl font-semibold">Committed to World-Class Student Journeys</h2>
            <p className="mt-6 leading-relaxed text-primary/80">
              We specialise in guiding students toward a successful international education journey. As a leading study abroad consultancy,
              we provide end-to-end support to students aspiring to pursue higher studies in top global destinations.
            </p>
            <p className="mt-6 leading-relaxed text-primary/80">
              From your first step to final departure, PrimeFuture Education is committed to providing transparent, reliable, and
              student-focused services. Let us help you shape your future, globally.
            </p>
          </div>
          <div className="rounded-3xl bg-primary/5 p-10">
            <div className="aspect-square rounded-2xl border-4 border-primary/20 bg-white/70 overflow-hidden" aria-label="Office image container">
              <img
                src="/image/1.jpg"
                alt="PrimeFuture office"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Motion.section>

      {/* ===== SECTION: Mission & Vision ===== */}
      <Motion.section
        ref={missionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={missionControls}
        className="bg-primary text-white"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
          <article className="rounded-3xl border border-white/20 p-10">
            <FiTarget className="h-10 w-10" />
            <h3 className="mt-6 text-2xl font-semibold">Our Mission</h3>
            <p className="mt-4 text-white/80">
              To empower students with world-class guidance and support for achieving their international education dreams.
            </p>
          </article>
          <article className="rounded-3xl border border-white/20 p-10">
            <FiEye className="h-10 w-10" />
            <h3 className="mt-6 text-2xl font-semibold">Our Vision</h3>
            <p className="mt-4 text-white/80">
              To be the most trusted study abroad consultancy, recognized for transparency, excellence, and student success.
            </p>
          </article>
        </div>
      </Motion.section>

      {/* ===== SECTION: Leadership Team ===== */}
      <Motion.section
        id="leadership"
        ref={leadershipRef}
        initial={{ opacity: 0, y: 50 }}
        animate={leadershipControls}
        className="px-6 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-primary/70">Leadership Team</p>
            <h2 className="mt-4 text-3xl font-semibold">Visionaries Behind PrimeFuture</h2>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {[
              {
                name: 'Sathesh Kumar',
                title: 'Founder',
                description: [
                  'With over a decade of experience in international education consulting, Sathesh Kumar founded PrimeFuture Education with a vision to transform how students access global opportunities.',
                  'His passion for education and commitment to student success has helped hundreds of students achieve their dreams of studying abroad.',
                  'Under his leadership, PrimeFuture has become a trusted name in study abroad consulting.',
                  'Sathesh believes in personalized guidance and transparent processes, ensuring every student receives the attention and support they deserve.',
                ],
              },
              {
                name: 'Bharath Raj J',
                title: 'Co-Founder',
                description: [
                  'Bharath Raj J brings strategic vision and operational excellence to PrimeFuture Education.',
                  'With extensive experience in international education and student services, Bharath has built strong partnerships with universities worldwide.',
                  'His leadership has driven PrimeFuture’s growth and reputation for excellence.',
                  'Bharath is committed to innovation in student services and maintaining PrimeFuture’s position as a leader.',
                ],
              },
            ].map((leader) => (
              <article key={leader.name} className="rounded-3xl bg-white p-8 shadow-elevation">
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex items-center justify-center">
                    <div className="h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 rounded-2xl overflow-hidden border-4 border-primary/20 bg-white/70 flex-shrink-0">
                      <img
                        src={
                          leader.name === 'Sathesh Kumar'
                            ? '/image/sathesh-kumar.jpg'
                            : '/image/bharath-raj.jpg'
                        }
                        alt={`${leader.name} portrait`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{leader.name}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.4em] text-primary/60">{leader.title}</p>
                    <div className="mt-4 space-y-4 text-primary/80">
                      {leader.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Motion.section>

      {/* ===== SECTION: Values ===== */}
      <Motion.section
        ref={valuesRef}
        initial={{ opacity: 0, y: 50 }}
        animate={valuesControls}
        className="bg-primary/5 px-6 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-primary/70">Values</p>
            <h2 className="mt-4 text-3xl font-semibold">Why Students Choose Us</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-3xl bg-white p-8 text-primary shadow-elevation">
                <div className="text-primary">{value.icon}</div>
                <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                <p className="mt-4 text-primary/80">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Motion.section>
    </div>
  )
}

export default About

