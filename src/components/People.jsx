import SectionHeader from './SectionHeader'
import useReveal from '../hooks/useReveal'
import './People.css'

const stats = [
  { num: '04', label: 'PRODUCTS SHIPPED' },
  { num: '01', label: 'STUDIO' },
  { num: 'NG', label: 'ORIGIN' },
]

export default function People() {
  const personRef = useReveal()
  const statsRef  = useReveal()

  return (
    <section className="people" id="people">
      <SectionHeader num="04" title="THE PEOPLE" />
      <div className="people-body">
        <div ref={personRef} className="person reveal">
          <div className="person-role">FOUNDER · ENGINEER · BUILDER</div>
          <div className="person-name">KODED</div>
          <p className="person-desc">
            Handles product, engineering, and strategy across everything the lab ships.
          </p>
          <div className="person-tags">
            <span className="person-tag">PRODUCT</span>
            <span className="person-tag">ENGINEERING</span>
            <span className="person-tag">STRATEGY</span>
          </div>
        </div>

        <div ref={statsRef} className="people-stats reveal-stagger reveal">
          {stats.map((s) => (
            <div key={s.label} className="people-stat">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
