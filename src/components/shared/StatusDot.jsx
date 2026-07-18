import './StatusDot.css'

export default function StatusDot({ label, size = 6, live = true }) {
  return (
    <span className="status-dot-wrap">
      <span
        className={`status-dot${live ? '' : ' status-dot--idle'}`}
        style={{ width: size, height: size }}
      />
      {label && <span className="status-dot-label">{label}</span>}
    </span>
  )
}
