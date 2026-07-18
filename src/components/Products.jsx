import useReveal from '../hooks/useReveal'
import Model3D from './shared/Model3DLazy'
import GlowGradient from './shared/GlowGradient'
import SectionHeading from './shared/SectionHeading'
import BrowserChromeFrame from './shared/BrowserChromeFrame'
import PlaceholderFrame from './shared/PlaceholderFrame'
import StatusDot from './shared/StatusDot'
import { products } from '../data'
import './Products.css'

function ProductRow({ p, index }) {
  const ref = useReveal()
  const isLive = p.status === 'live'
  const Tag = p.url ? 'a' : 'div'
  const linkProps = p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag
      ref={ref}
      className={`product-row reveal${!p.url ? ' product-row--soon' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
      {...linkProps}
    >
      <div className="product-row-media">
        <BrowserChromeFrame label={p.url ? p.url.replace('https://', '') : undefined}>
          {p.screenshot
            ? <img src={p.screenshot} alt={`${p.name} screenshot`} />
            : <PlaceholderFrame label="SCREENSHOT PENDING" ratio="16 / 10" />
          }
        </BrowserChromeFrame>
      </div>

      <div className="product-row-body">
        <div className="product-row-top">
          <span className="product-num">{p.order}</span>
          {isLive
            ? <StatusDot label="LIVE" />
            : <span className="product-badge product-badge--soon">IN PROGRESS</span>
          }
        </div>

        <h3 className="product-row-title">
          <span className="product-row-title-text">{p.name}</span>
        </h3>

        {p.description && <p className="product-desc">{p.description}</p>}

        {p.stack.length > 0 && (
          <div className="product-tags">
            {p.stack.map(t => <span key={t} className="product-tag">{t}</span>)}
          </div>
        )}

        {p.url && (
          <div className="product-row-cta">
            <span>{p.url.replace('https://', '')}</span>
            <span className="product-arrow">↗</span>
          </div>
        )}
      </div>
    </Tag>
  )
}

export default function Products() {
  return (
    <section className="products" id="products">
      <Model3D
        modelUrl="/models/drone.glb"
        scale={1.1}
        idle="bob"
        height={200}
        rotationY={Math.PI}
        placeholderLabel="DRONE"
      />
      <GlowGradient size={620} opacity={0.16} />
      <SectionHeading
        eyebrow="PRODUCTS"
        title="Real things, shipped."
        subtext="Five products, each solving one problem worth solving — for developers, workers, and the infrastructure that doesn't exist yet."
      />
      <div className="products-list">
        {products.map((p, i) => (
          <ProductRow key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}
