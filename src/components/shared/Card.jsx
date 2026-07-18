import { forwardRef } from 'react'
import './Card.css'

const Card = forwardRef(function Card({ as: Tag = 'div', className = '', ...props }, ref) {
  return <Tag ref={ref} className={`ui-card ${className}`} {...props} />
})

export default Card
