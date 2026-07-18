import { useEffect, useRef, useState } from 'react'

// `once`: mount on first intersection and stop observing (one-shot reveal).
// `!once`: keep toggling as the element enters/exits — used to mount/unmount
// heavy 3D canvases only near the viewport. `exitDelay` debounces the "false"
// transition so a transient layout shift (web fonts loading, a resize) near
// the viewport edge doesn't unmount-then-remount the Canvas and cause a flicker.
export default function useInView(rootMargin = '200px', { once = true, exitDelay = 500 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const exitTimer = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting) {
            setInView(true)
            obs.unobserve(el)
          }
          return
        }

        if (entry.isIntersecting) {
          if (exitTimer.current) {
            clearTimeout(exitTimer.current)
            exitTimer.current = null
          }
          setInView(true)
        } else if (!exitTimer.current) {
          exitTimer.current = setTimeout(() => {
            setInView(false)
            exitTimer.current = null
          }, exitDelay)
        }
      },
      { rootMargin }
    )
    obs.observe(el)

    return () => {
      obs.disconnect()
      if (exitTimer.current) clearTimeout(exitTimer.current)
    }
  }, [rootMargin, once, exitDelay])

  return [ref, inView]
}
