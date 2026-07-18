import { lazy, Suspense } from 'react'
import PlaceholderFrame from './PlaceholderFrame'

// three.js + @react-three/fiber + drei make up the bulk of the JS bundle —
// split them into their own chunk so the initial page paint (text/CSS) isn't
// gated on that weight, loading it only once a 3D section actually mounts.
const Model3D = lazy(() => import('./Model3D'))

export default function Model3DLazy(props) {
  return (
    <Suspense fallback={<PlaceholderFrame label={props.placeholderLabel ?? 'MODEL'} ratio="1 / 1" />}>
      <Model3D {...props} />
    </Suspense>
  )
}
