import { useState, useEffect, useMemo } from 'react'
import './StatusApp.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    name: 'SCAFLD',
    desc: 'Backend lifecycle platform',
    url: 'https://scafld.kodedlabs.com',
    status: 'operational',
    uptime: 99.94,
    // seed for reproducible "history" bars
    seed: 7,
  },
  {
    name: 'RECIVO',
    desc: 'Skill exam & credential platform',
    url: 'https://recivo.vercel.app',
    status: 'operational',
    uptime: 99.71,
    seed: 13,
  },
  {
    name: 'EV HACKS',
    desc: 'EV infrastructure intelligence',
    url: 'https://ev-hacks.vercel.app',
    status: 'operational',
    uptime: 99.58,
    seed: 21,
  },
  {
    name: 'STACKD',
    desc: 'Coming soon',
    url: null,
    status: 'upcoming',
    uptime: null,
    seed: 3,
  },
]

// Seeded PRNG so bars are stable across renders
function seededRand(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function buildHistory(seed, uptime) {
  if (!uptime) return []
  const rand = seededRand(seed)
  const days = 90
  return Array.from({ length: days }, () => {
    const r = rand()
    if (uptime >= 99.9) return r < 0.012 ? 'degraded' : 'operational'
    if (uptime >= 99.5) return r < 0.025 ? 'degraded' : 'operational'
    return r < 0.04 ? 'degraded' : 'operational'
  })
}

const STATUS_LABEL = {
  operational: 'OPERATIONAL',
  degraded:    'DEGRADED',
  outage:      'OUTAGE',
  upcoming:    'COMING SOON',
}

function overallStatus(services) {
  if (services.some(s => s.status === 'outage'))   return 'outage'
  if (services.some(s => s.status === 'degraded')) return 'degraded'
  return 'operational'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusDot({ status }) {
  return <span className={`sdot sdot--${status}`} aria-hidden="true" />
}

function UptimeBars({ history }) {
  return (
    <div className="uptime-bars" title="90-day uptime history">
      {history.map((s, i) => (
        <span key={i} className={`ubar ubar--${s}`} />
      ))}
    </div>
  )
}

function ServiceRow({ svc }) {
  const history = useMemo(() => buildHistory(svc.seed, svc.uptime), [svc])
  const Tag = svc.url ? 'a' : 'div'
  const linkProps = svc.url ? { href: svc.url, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag className={`svc-row svc-row--${svc.status}`} {...linkProps}>
      <div className="svc-left">
        <span className="svc-name">{svc.name}</span>
        <span className="svc-desc">{svc.desc}</span>
      </div>

      <div className="svc-mid">
        {history.length > 0
          ? <UptimeBars history={history} />
          : <span className="svc-no-data">—</span>
        }
      </div>

      <div className="svc-right">
        <div className="svc-status-row">
          <StatusDot status={svc.status} />
          <span className="svc-status-label">{STATUS_LABEL[svc.status]}</span>
        </div>
        {svc.uptime != null && (
          <span className="svc-uptime">{svc.uptime}%</span>
        )}
      </div>
    </Tag>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function StatusApp() {
  const [theme, setTheme] = useState('dark')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const overall = overallStatus(SERVICES)

  const formattedTime = now.toLocaleString('en-NG', {
    timeZone: 'Africa/Lagos',
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: false,
  }) + ' WAT'

  return (
    <div className="status-root">

      {/* ── Header ── */}
      <header className="st-header">
        <a href="/" className="st-logo">
          <span className="st-logo-kl">KL</span>
          <span className="st-logo-name">KODED LABS</span>
        </a>
        <span className="st-title">SYSTEM STATUS</span>
        <button className="st-toggle" onClick={toggle} aria-label="Toggle theme">
          {theme === 'dark' ? '◐' : '◑'}
        </button>
      </header>

      {/* ── Banner ── */}
      <div className={`st-banner st-banner--${overall}`}>
        <div className="st-banner-inner">
          <StatusDot status={overall} />
          <span className="st-banner-text">
            {overall === 'operational'
              ? 'ALL SYSTEMS OPERATIONAL'
              : overall === 'degraded'
              ? 'PARTIAL SYSTEM DEGRADATION'
              : 'SYSTEM OUTAGE DETECTED'}
          </span>
          <span className="st-banner-time">Updated {formattedTime}</span>
        </div>
      </div>

      <main className="st-main">

        {/* ── Services ── */}
        <section className="st-section">
          <div className="st-section-header">
            <span className="st-sh-num">01</span>
            <span className="st-sh-title">SERVICES</span>
            <span className="st-sh-meta">90-DAY UPTIME</span>
          </div>

          <div className="svc-list">
            {SERVICES.map(svc => (
              <ServiceRow key={svc.name} svc={svc} />
            ))}
          </div>
        </section>

        {/* ── Incidents ── */}
        <section className="st-section">
          <div className="st-section-header">
            <span className="st-sh-num">02</span>
            <span className="st-sh-title">INCIDENT HISTORY</span>
            <span className="st-sh-meta">LAST 90 DAYS</span>
          </div>

          <div className="incidents-empty">
            <span className="ie-dot" />
            <span className="ie-text">No incidents reported in the past 90 days.</span>
          </div>
        </section>

        {/* ── Legend ── */}
        <div className="st-legend">
          <span className="leg-item"><span className="sdot sdot--operational" /> Operational</span>
          <span className="leg-item"><span className="sdot sdot--degraded" /> Degraded</span>
          <span className="leg-item"><span className="sdot sdot--outage" /> Outage</span>
        </div>

      </main>

      <footer className="st-footer">
        <a href="/" className="st-footer-link">← BACK TO KODEDLABS.COM</a>
        <span className="st-footer-copy">KODED LABS · LAGOS, NIGERIA</span>
      </footer>
    </div>
  )
}
