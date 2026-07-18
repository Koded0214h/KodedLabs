import './GlowGradient.css'

export default function GlowGradient({
  className = '',
  size = 560,
  opacity = 0.2,
  pulse = false,
}) {
  return (
    <div
      className={`glow-gradient${pulse ? ' glow-gradient--pulse' : ''} ${className}`}
      style={{ '--glow-size': `${size}px`, '--glow-opacity': opacity }}
      aria-hidden="true"
    />
  )
}
