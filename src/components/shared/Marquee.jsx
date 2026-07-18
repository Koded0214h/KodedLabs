import { SiRust, SiGo, SiPython, SiTypescript, SiPostgresql, SiSolana } from 'react-icons/si'
import './Marquee.css'

// Named imports only (not `import *`) so bundlers can tree-shake the other
// several thousand Simple Icons this package ships.
const ICONS = { SiRust, SiGo, SiPython, SiTypescript, SiPostgresql, SiSolana }

export default function Marquee({ items, speed = 28 }) {
  // Triple the list (not just double) so the strip stays visually full and the
  // loop reads as continuous roll rather than a short run that snaps back.
  const track = [...items, ...items, ...items]

  return (
    <div className="marquee" style={{ '--marquee-duration': `${speed}s` }}>
      <div className="marquee-track">
        {track.map((item, i) => {
          const isObj = typeof item === 'object' && item !== null
          const Icon = isObj && item.icon ? ICONS[item.icon] : null
          return (
            <span className="marquee-item" key={i}>
              {Icon && <Icon className="marquee-item-icon" aria-hidden="true" />}
              {isObj ? item.label : item}
            </span>
          )
        })}
      </div>
    </div>
  )
}
