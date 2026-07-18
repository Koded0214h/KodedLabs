import './SectionHeading.css'

export default function SectionHeading({ eyebrow, title, subtext, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <span className="section-heading-eyebrow">{eyebrow}</span>}
      <h2 className="section-heading-title">{title}</h2>
      {subtext && <p className="section-heading-subtext">{subtext}</p>}
    </div>
  )
}
