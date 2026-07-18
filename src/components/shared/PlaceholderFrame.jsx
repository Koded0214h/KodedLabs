import './PlaceholderFrame.css'

export default function PlaceholderFrame({ label = 'MEDIA PENDING', ratio = '16 / 10', className = '' }) {
  return (
    <div className={`placeholder-frame ${className}`} style={{ aspectRatio: ratio }}>
      <span className="placeholder-frame-label">{label}</span>
    </div>
  )
}
