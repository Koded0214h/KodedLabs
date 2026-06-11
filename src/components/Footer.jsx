import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-kl">KL</span>
          <span className="footer-name">KODED LABS</span>
        </div>
        <div className="footer-center">
          <span>Building from Lagos.</span>
        </div>
        <div className="footer-right">
          <a href="/status" className="footer-status">
            <span className="footer-status-dot" />
            SYSTEM STATUS
          </a>
          <span className="footer-sep">·</span>
          <span>kodedlabs.com</span>
        </div>
      </div>
    </footer>
  )
}
