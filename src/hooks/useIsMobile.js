import { useState, useEffect } from 'react'

const QUERY = '(max-width: 768px)'

export default function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false
  )
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}
