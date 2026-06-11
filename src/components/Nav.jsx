import { useState, useEffect } from 'react'
import './Nav.css'

const links = [
  { href: '#about',    label: 'ABOUT'    },
  { href: '#products', label: 'PRODUCTS' },
  { href: '#people',   label: 'PEOPLE'   },
  { href: '#contact',  label: 'CONTACT'  },
]

export default function Nav({ onToggle, theme }) {
  const [visible, setVisible] = useState(false)
  const [active, setActive]   = useState('')

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.55)
    }
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

  return (
    <nav className={`nav${visible ? ' nav--on' : ''}`}>
      <a href="#" className="nav-logo">KL</a>
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
      <button className="nav-toggle" onClick={onToggle} aria-label="Toggle theme">
        {theme === 'dark' ? '◐' : '◑'}
      </button>
    </nav>
  )
}
