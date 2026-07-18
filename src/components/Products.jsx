import { useEffect, useRef } from 'react'
import GlowGradient from './shared/GlowGradient'
import Model3D from './shared/Model3DLazy'
import SectionHeading from './shared/SectionHeading'
import BrowserChromeFrame from './shared/BrowserChromeFrame'
import PlaceholderFrame from './shared/PlaceholderFrame'
import StatusDot from './shared/StatusDot'
import { products } from '../data'
import './Products.css'

function ProductRow({ p }) {
  const isLive = p.status === 'live'
  const Tag = p.url ? 'a' : 'div'
  const linkProps = p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag className={`product-row${!p.url ? ' product-row--soon' : ''}`} {...linkProps}>
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
            <span className="product-arrow" aria-hidden="true">↗</span>
          </div>
        )}
      </div>
    </Tag>
  )
}

// Scroll-linked stack. The `.products-scroll` spacer is several viewports tall;
// as it scrolls past the pinned sticky, each card rises from below and covers
// the previous one (newest on top), while placed cards recede up + shrink + dim
// so the growing deck stays visible. Once the last card rests, the sticky
// releases and normal scrolling resumes.
function useScrollStack(count) {
  const scrollRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const update = () => {
      const el = scrollRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
      // activeFloat runs 1..count so card 0 rests on top at the start and each
      // card i becomes the resting top card at p = i/(count-1).
      const active = 1 + p * (count - 1)

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const delta = active - i
        let translateY, scale, opacity

        if (delta < 0) {
          translateY = 140
          opacity = 0
          scale = 0.94
        } else if (delta <= 1) {
          translateY = (1 - delta) * 140
          opacity = Math.min(delta * 1.6, 1)
          scale = 0.94 + delta * 0.06
        } else {
          const past = Math.min(delta - 1, 8)
          translateY = -past * 10
          opacity = Math.max(1 - past * 0.14, 0.25)
          scale = 1 - past * 0.03
        }

        card.style.transform = `translateY(${translateY}px) scale(${scale})`
        card.style.opacity = opacity
        card.style.zIndex = i + 1
      })
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [count])

  return { scrollRef, cardRefs }
}

export default function Products() {
  const { scrollRef, cardRefs } = useScrollStack(products.length)
  const scrollHeight = `${(products.length - 1) * 72 + 100}vh`

  return (
    <section className="products" id="products">
      <div ref={scrollRef} className="products-scroll" style={{ height: scrollHeight }}>
        <div className="products-sticky">
          <div className="products-inner">
            <GlowGradient size={560} opacity={0.12} />
            <Model3D
              modelUrl="/models/drone.glb"
              scale={1.1}
              idle="bob"
              height={420}
              rotationY={Math.PI}
              placeholderLabel="DRONE"
              className="products-drone"
            />
            <SectionHeading
              eyebrow="Products"
              title="Real things, shipped."
              subtext="Every product solves one problem worth solving — for developers, workers, and the infrastructure that doesn't exist yet."
            />
            <div className="products-stack">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className="product-stack-slot"
                  ref={el => { cardRefs.current[i] = el }}
                >
                  <ProductRow p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
