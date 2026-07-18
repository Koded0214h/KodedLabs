import StatusDot from './shared/StatusDot'
import { products, socials } from '../data'
import './Footer.css'

const company = [
  { label: 'About',          href: '#founder'   },
  { label: 'Founder Story',  href: '#founder'   },
  { label: 'Education',      href: '#education' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <div className="footer-mark">
            <span className="footer-kl">KL</span>
            <span className="footer-name">KODED LABS</span>
          </div>
          <p className="footer-tagline">
            Independent product studio building real infrastructure.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">PRODUCTS</span>
          {products.map(p => (
            p.url
              ? <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="footer-link">{p.name}</a>
              : <span key={p.id} className="footer-link footer-link--muted">{p.name}</span>
          ))}
        </div>

        <div className="footer-col">
          <span className="footer-col-title">COMPANY</span>
          {company.map(c => (
            <a key={c.label} href={c.href} className="footer-link">{c.label}</a>
          ))}
        </div>

        <div className="footer-col">
          <span className="footer-col-title">CONNECT</span>
          {socials.map(s => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="footer-link">{s.label}</a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">© 2026 Koded Labs · Nigeria</span>
        <a href="/status" className="footer-status">
          <StatusDot label="All systems operational" />
        </a>
        <div className="footer-socials">
          {socials.map(s => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="footer-social-icon" aria-label={s.label}>
              <svg width="16" height="16"><use href={`/icons.svg#${s.icon}`} /></svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
