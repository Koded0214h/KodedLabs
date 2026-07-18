import Model3D from './shared/Model3DLazy'
import BrowserChromeFrame from './shared/BrowserChromeFrame'
import GlowGradient from './shared/GlowGradient'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <Model3D
        modelUrl="/models/modural_robot.glb"
        scale={4.5}
        idle="bob"
        height={480}
        cameraDistance={15}
        placeholderLabel="MASCOT"
        className="hero-mascot"
      />

      <h1 className="hero-title">
        We build the things<br />that should already exist.
      </h1>
      <p className="hero-subtitle">
        A small studio shipping real products for developers, workers, and
        infrastructure that doesn't exist yet.
      </p>

      <div className="hero-actions">
        <a href="#products" className="hero-btn hero-btn--primary">View Products</a>
        <a href="#founder" className="hero-btn hero-btn--ghost">Read the story</a>
      </div>

      <div className="hero-video-wrap">
        <GlowGradient className="hero-video-glow" size={480} opacity={0.18} pulse />
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
