import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-topbar">
        <span className="hero-mono">KL</span>
        <span className="hero-domain">kodedlabs.com</span>
        <span className="hero-location">Lagos, NG</span>
        <a href="/status" className="hero-status">
          <span className="hero-status-dot" />
          ALL SYSTEMS OPERATIONAL
        </a>
      </div>

      <div className="hero-main">
        <div
          className="hero-wordmark"
          style={{ animation: 'cell-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s both' }}
        >
          KODED<br />LABS
        </div>
        <div
          className="hero-meta"
          style={{ animation: 'cell-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.28s both' }}
        >
          <span>PRODUCT STUDIO</span>
          <span>EST. 2025</span>
          <span>INDEPENDENT</span>
        </div>
      </div>

      <div
        className="hero-tagline"
        style={{ animation: 'cell-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.42s both' }}
      >
        <p>
          We build products that solve real problems —<br />
          for developers, for workers, for infrastructure<br />
          that doesn't exist yet.
        </p>
      </div>

      <div className="hero-bar">
        <div
          className="hero-stat"
          style={{ animation: 'cell-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.54s both' }}
        >
          <span className="hero-stat-num">04</span>
          <span className="hero-stat-label">LIVE<br />PRODUCTS</span>
        </div>
        <a
          href="#products"
          className="hero-cta"
          style={{ animation: 'cell-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.64s both' }}
        >
          <span>VIEW PRODUCTS</span>
          <span className="hero-cta-arrow">→</span>
        </a>
        <a
          href="#about"
          className="hero-scroll-hint"
          style={{ animation: 'cell-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.74s both' }}
          aria-label="Scroll down"
        >
          <span className="hero-scroll-dot" />
        </a>
      </div>

    </section>
  )
}
