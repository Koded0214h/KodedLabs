import StatCounter from './shared/StatCounter'
import Marquee from './shared/Marquee'
import { trustStats, marqueePrograms } from '../data'
import './TrustBar.css'

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="trust-stats">
        {trustStats.map(s => (
          <StatCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
      <div className="trust-rule" />
      <Marquee items={marqueePrograms} speed={32} />
    </section>
  )
}
