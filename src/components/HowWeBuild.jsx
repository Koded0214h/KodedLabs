import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import BrowserChromeFrame from './shared/BrowserChromeFrame'
import Model3D from './shared/Model3DLazy'
import Marquee from './shared/Marquee'
import { buildStages, stackMarquee } from '../data'
import './HowWeBuild.css'

export default function HowWeBuild() {
  const sectionRef = useReveal()
  const [active, setActive] = useState(0)
  const stage = buildStages[active]

  return (
    <section className="how-we-build">
      <Model3D
        modelUrl="/models/lovedeath__robots.glb"
        scale={1}
        idle="bob"
        height={420}
        rotationY={0.3}
        placeholderLabel="ROBOT"
        className="hwb-robot-bg"
      />
      <div ref={sectionRef} className="hwb-split reveal">
        <div className="hwb-text">
          <span className="hwb-eyebrow">HOW WE BUILD</span>

          <div className="hwb-tabs" role="tablist">
            {buildStages.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                className={`hwb-tab${i === active ? ' hwb-tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="hwb-tab-index">0{i + 1}</span>
                <span className="hwb-tab-label">{s.label}</span>
              </button>
            ))}
          </div>

          <div key={stage.id} className="hwb-panel">
            <h2 className="hwb-title">{stage.title}</h2>
            <p className="hwb-desc">{stage.desc}</p>
          </div>
        </div>

        <div key={stage.id + '-image'} className="hwb-video">
          <div className="hwb-frame-wrap">
            <BrowserChromeFrame label={`${stage.label.toLowerCase()}.kodedlabs.com`}>
              <img className="hwb-image" src={stage.image} alt={stage.label} />
            </BrowserChromeFrame>
          </div>
        </div>
      </div>

      <div className="hwb-marquee">
        <Marquee items={stackMarquee} speed={26} />
      </div>
    </section>
  )
}
