import GlowGradient from './shared/GlowGradient'
import SectionHeading from './shared/SectionHeading'
import PlaceholderFrame from './shared/PlaceholderFrame'
import { githubOrg, products } from '../data'
import './Products.css'

function getGithubHref(p) {
  return p.github || githubOrg
}

function getLogoLabel(p) {
  if (p.logo) return p.logo
  return p.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

function ProductCard({ p }) {
  const githubHref = getGithubHref(p)
  const liveHref = p.url
  const logoLabel = getLogoLabel(p)

  return (
    <article className={`product-card${!liveHref ? ' product-card--coming-soon' : ''}`}>
      <div className="product-card-media">
        {p.screenshot ? (
          <img
            className="product-card-image"
            src={p.screenshot}
            alt={`${p.name} preview`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <PlaceholderFrame label="IMAGE PENDING" ratio="16 / 10" className="product-card-placeholder" />
        )}
      </div>

      <div className="product-card-body">
        <div className="product-card-header">
          <div className="product-card-logo" aria-hidden="true">
            <span>{logoLabel}</span>
          </div>
          <div className="product-card-meta">
            <span className="product-card-kicker">{p.order}</span>
            <h3 className="product-card-title">{p.name}</h3>
          </div>
        </div>

        {p.description && <p className="product-card-desc">{p.description}</p>}

        {p.tags?.length > 0 && (
          <div className="product-tags">
            {p.tags.map(t => <span key={t} className="product-tag">{t}</span>)}
          </div>
        )}

        <div className="product-card-actions">
          <a
            className="product-card-btn"
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${p.name} on GitHub`}
          >
            Github
          </a>
          {liveHref ? (
            <a
              className="product-card-btn product-card-btn--primary"
              href={liveHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${p.name} live site`}
            >
              Live link
            </a>
          ) : (
            <span className="product-card-btn product-card-btn--disabled" aria-disabled="true">
              Live link
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Products() {
  return (
    <section className="products" id="products">
      <div className="products-inner">
        <GlowGradient size={560} opacity={0.1} />
        <SectionHeading
          eyebrow="Products"
          title="Real things, shipped."
          subtext="A focused grid of products, each with a visual preview, a clear identity, and direct routes to the code and the live experience."
        />

        <div className="products-grid">
          {products.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
