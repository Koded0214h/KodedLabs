import { useState, useEffect } from 'react'
import './Nav.css'

const links = [
  { href: '#products',  label: 'Products'  },
  { href: '#education', label: 'Education' },
  { href: '#founder',   label: 'About'     },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <nav className={`nav${scrolled ? ' nav--solid' : ''}${menuOpen ? ' nav--menu-open' : ''}`}>
      <div className="nav-left">
        <div className="nav-links">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link${active === l.href ? ' nav-link--active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <a href="#" className="nav-brand" aria-label="Koded Labs home">
        <span className="nav-brand-shell">
          <span className="nav-mark">KL</span>
          <span className="nav-wordmark">KODED LABS</span>
        </span>
      </a>

      <div className="nav-right">
        <a href="#education" className="nav-cta nav-cta--member">
          Become a member
        </a>
        <button
          type="button"
          className="nav-grid"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="nav-menu" id="nav-menu" aria-hidden={!menuOpen}>
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            className={`nav-menu-link${active === l.href ? ' nav-menu-link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
