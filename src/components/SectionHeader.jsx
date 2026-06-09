import './SectionHeader.css'

export default function SectionHeader({ num, title }) {
  return (
    <div className="section-header">
      <span className="sh-num">{num}</span>
      <span className="sh-title">{title}</span>
    </div>
  )
}
