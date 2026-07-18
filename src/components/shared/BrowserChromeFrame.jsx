import './BrowserChromeFrame.css'

export default function BrowserChromeFrame({ children, className = '', label }) {
  return (
    <div className={`chrome-frame ${className}`}>
      <div className="chrome-frame-bar">
        <span className="chrome-dot chrome-dot--red" />
        <span className="chrome-dot chrome-dot--yellow" />
        <span className="chrome-dot chrome-dot--green" />
        {label && <span className="chrome-frame-label">{label}</span>}
      </div>
      <div className="chrome-frame-body">{children}</div>
    </div>
  )
}
