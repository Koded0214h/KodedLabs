import { lazy, Suspense } from 'react'
import PlaceholderFrame from './PlaceholderFrame'
import useIsMobile from '../../hooks/useIsMobile'

// three.js + @react-three/fiber + drei make up the bulk of the JS bundle —
// split them into their own chunk so the initial page paint (text/CSS) isn't
// gated on that weight, loading it only once a 3D section actually mounts.
const Model3D = lazy(() => import('./Model3D'))

export default function Model3DLazy(props) {
  const mobile = useIsMobile()

  // On mobile, Three.js parsing alone causes 30+ s of TBT on slow devices.
  // Skip the canvas entirely and show nothing (models are decorative, not content).
  if (mobile) return null

  return (
    <Suspense fallback={<PlaceholderFrame label={props.placeholderLabel ?? 'MODEL'} ratio="1 / 1" />}>
      <Model3D {...props} />
    </Suspense>
  )
}
