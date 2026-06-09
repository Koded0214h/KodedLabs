import SectionHeader from './SectionHeader'
import useReveal from '../hooks/useReveal'
import './Products.css'

const products = [
  {
    num: '01',
    name: 'SCAFLD',
    desc: 'The complete backend lifecycle platform. From idea to deployed API without switching tools.',
    status: 'LIVE',
    url: 'https://scafld.kodedlabs.com',
  },
  {
    num: '02',
    name: 'RECIVO',
    desc: "WAEC for the informal economy. A voice-and-simulation skill exam that turns a trader's hands into a verifiable credential.",
    status: 'LIVE',
    url: 'https://recivo.vercel.app',
  },
  {
    num: '03',
    name: 'EV HACKS',
    desc: "Nigeria's EV intelligence layer. Find where to build charging infrastructure or where to charge your vehicle.",
    status: 'LIVE',
    url: 'https://ev-hacks.vercel.app',
  },
  {
    num: '04',
    name: 'STACKD',
    desc: null,
    status: 'SOON',
    url: null,
  },
]

function ProductCard({ p, index }) {
  const ref = useReveal()
  const Tag = p.url ? 'a' : 'div'
  const linkProps = p.url
    ? { href: p.url, target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <Tag
      ref={ref}
      className={`product-card reveal${p.status === 'SOON' ? ' product-card--soon' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
      {...linkProps}
    >
      <div className="product-top">
        <span className="product-num">{p.num}</span>
        <span className={`product-badge product-badge--${p.status.toLowerCase()}`}>
          {p.status}
        </span>
      </div>

      <div className="product-name">{p.name}</div>

      {p.desc
        ? <p className="product-desc">{p.desc}</p>
        : <div className="product-desc product-desc--empty" />
      }

      <div className="product-footer">
        {p.url
          ? <><span className="product-url">{p.url.replace('https://', '')}</span><span className="product-arrow">↗</span></>
          : <span className="product-coming">COMING SOON</span>
        }
      </div>
    </Tag>
  )
}

export default function Products() {
  return (
    <section className="products" id="products">
      <SectionHeader num="03" title="PRODUCTS" />
      <div className="products-grid">
        {products.map((p, i) => (
          <ProductCard key={p.num} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}
