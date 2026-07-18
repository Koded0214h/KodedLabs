import useReveal from '../hooks/useReveal'
import './FounderStory.css'

export default function FounderStory() {
  const photoRef = useReveal()
  const textRef  = useReveal()

  return (
    <section className="founder-story" id="founder">
      <div className="fs-split">
        <div ref={photoRef} className="fs-photo reveal">
          <img src="/founder.webp" alt="Koded" />
        </div>

        <div ref={textRef} className="fs-text reveal" style={{ transitionDelay: '0.1s' }}>
          <span className="fs-eyebrow">THE STORY</span>
          <p className="fs-desc">
            Koded is the founder, engineer, and builder behind the lab — handling
            product, engineering, and strategy across everything it ships. Small
            by design, focused by necessity, serious about craft.
          </p>
          <blockquote className="fs-quote">
            "I will be the greatest engineer to ever come out of Africa."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
