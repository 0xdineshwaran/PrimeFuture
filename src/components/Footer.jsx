/**
 * Footer.jsx
 * Site footer with contact info, quick links and social media
 * Key features: address, phone/email, quick links, social icons, legal links
 * Used on: global footer (all pages)
 */

import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiInstagram, FiFacebook } from 'react-icons/fi'

// Contact numbers displayed in the contact column
const contactNumbers = ['+91 86677 02580', '+91 90258 92194', '+91 93604 07866']

const Footer = () => {
  // Footer renders four primary columns: brand, quick links, contact, and social
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand column */}
        <div>
          <div className="text-lg font-semibold">PrimeFuture Education</div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
            Shape Your Future Globally with bespoke study abroad guidance for ambitious students.
          </p>
        </div>

        {/* Quick links column */}
        <div>
          <div className="text-sm font-semibold uppercase tracking-widest">Quick Links</div>
          <ul className="mt-4 space-y-3 text-white/80">
            {['/', '/about', '/services', '/contact'].map((path) => (
              <li key={path}>
                <Link to={path} className="transition hover:text-white">
                  {path === '/' ? 'Home' : path.replace('/', '').replace(/^\w/, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <div className="text-sm font-semibold uppercase tracking-widest">Contact</div>
          <ul className="mt-4 space-y-3 text-white/80">
            <li className="flex items-center gap-3">
              <FiMail aria-hidden="true" />{' '}
              <a href="mailto:primefutureeducation@gmail.com" className="hover:text-white">
                primefutureeducation@gmail.com
              </a>
            </li>
            <li className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <FiPhone aria-hidden="true" />
                <span>Call Us</span>
              </div>
              {contactNumbers.map((number) => (
                <a key={number} href={`tel:${number.replace(/\s+/g, '')}`} className="pl-7 hover:text-white">
                  {number}
                </a>
              ))}
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin aria-hidden="true" className="mt-1" />
              <span>
                1st Floor, Prime Plaza, 30/13, K.R, College Rd, E Layout, Tirupur,
                <br />
                Tamil Nadu 641602
              </span>
            </li>
          </ul>
        </div>

        {/* Social / Connect column */}
        <div>
          <div className="text-sm font-semibold uppercase tracking-widest">Connect</div>
          <div className="mt-4 flex gap-4 text-2xl">
            {[
              { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/primefuture-education' },
              { icon: <FiInstagram />, label: 'Instagram', href: 'https://www.instagram.com/primefuture.education?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
              { icon: <FiFacebook />, label: 'Facebook', href: 'https://www.facebook.com/' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="transition hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-center text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <div>© 2025 Dineshwaran. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Terms of Use', to: '/terms' },
              { label: 'Sitemap', to: '/sitemap' },
            ].map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

