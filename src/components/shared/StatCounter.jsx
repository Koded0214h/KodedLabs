import { useEffect, useRef, useState } from 'react'
import './StatCounter.css'

// Parses "100+" / "7×" / "2025" into a numeric target + prefix/suffix,
// so the same component can count up any of the trust-bar's stat shapes.
function parseValue(raw) {
  const match = String(raw).match(/^(\D*)(\d+)(\D*)$/)
  if (!match) return { prefix: '', target: 0, suffix: String(raw) }
  const [, prefix, digits, suffix] = match
  return { prefix, target: parseInt(digits, 10), suffix }
}

export default function StatCounter({ value, label, duration = 800 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const { prefix, target, suffix } = parseValue(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRevealed(true)
        obs.unobserve(el)

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(eased * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return (
    <div ref={ref} className={`stat-counter reveal${revealed ? ' is-revealed' : ''}`}>
      <span className="stat-counter-num">{prefix}{display}{suffix}</span>
      <span className="stat-counter-label">{label}</span>
    </div>
  )
}
