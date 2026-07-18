import Model3D from './shared/Model3DLazy'
import BrowserChromeFrame from './shared/BrowserChromeFrame'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-stage">
        <Model3D
          modelUrl="/models/modural_robot.glb"
          scale={4.5}
          idle="bob"
          fitMargin={1.25}
          height="100%"
          placeholderLabel="MASCOT"
          className="hero-mascot"
        />
        <div className="hero-scrim" />

        <div className="hero-copy">
          <h1 className="hero-title">
            Great companies <br />need great products.
          </h1>
          <p className="hero-subtitle">
            Koded Labs designs and engineers them <br /> where good ideas meet execution that holds up.
          </p>
          <div className="hero-actions">
            <a href="#products" className="hero-btn hero-btn--primary">View products</a>
            <a href="#founder" className="hero-btn hero-btn--ghost">Read the story</a>
          </div>
        </div>
      </div>

      <div className="hero-video-wrap">
        <div className="hero-cone-glow" aria-hidden="true" />
        <BrowserChromeFrame label="scafld.kodedlabs.com" className="hero-video-frame">
          <video
            src="/videos/scafld-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </BrowserChromeFrame>
      </div>
    </section>
  )
}
