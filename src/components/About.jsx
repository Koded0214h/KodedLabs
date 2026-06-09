import SectionHeader from './SectionHeader'
import useReveal from '../hooks/useReveal'
import './About.css'

const values = [
  'SMALL BY DESIGN',
  'FOCUSED BY NECESSITY',
  'SERIOUS ABOUT CRAFT',
]

export default function About() {
  const textRef   = useReveal()
  const valuesRef = useReveal()

  return (
    <section className="about" id="about">
      <SectionHeader num="02" title="ABOUT THE LAB" />
      <div className="about-body">
        <div ref={textRef} className="about-text reveal">
          <p>
            Koded Labs is an independent product studio. We move fast, ship
            real things, and focus on the gap between what exists and what
            should. Every product we build starts with a problem worth solving
            and ends with something people can actually use.
          </p>
        </div>
        <div ref={valuesRef} className="about-values reveal-stagger reveal">
          {values.map((v) => (
            <div key={v} className="about-value">
              <span className="value-dash">—</span>
              <span className="value-text">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
