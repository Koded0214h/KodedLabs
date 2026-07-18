import useReveal from '../hooks/useReveal'
import Model3D from './shared/Model3DLazy'
import SectionHeading from './shared/SectionHeading'
import PlaceholderFrame from './shared/PlaceholderFrame'
import { education } from '../data'
import './Education.css'

function EduTile({ item, index }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="edu-tile reveal"
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      {item.photo
        ? <img src={item.photo} alt={item.name} />
        : <PlaceholderFrame label={item.name.toUpperCase()} ratio="4 / 5" />
      }
      <div className="edu-tile-caption">
        <span className="edu-tile-name">{item.name}</span>
        <p className="edu-tile-desc">{item.description}</p>
      </div>
    </div>
  )
}

export default function Education() {
  return (
    <section className="education" id="education">
      <Model3D
        modelUrl="/models/bomb_crawler.glb"
        scale={1.2}
        idle="bob"
        height={220}
        placeholderLabel="CRAWLER"
      />
      <SectionHeading
        eyebrow="EDUCATION"
        title="Teaching the next builders."
        subtext="100+ students, across 4+ programs, one goal — turning beginners into builders."
      />
      <div className="edu-grid">
        {education.map((item, i) => (
          <EduTile key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
