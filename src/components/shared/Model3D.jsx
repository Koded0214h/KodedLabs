import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'
import useInView from '../../hooks/useInView'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import PlaceholderFrame from './PlaceholderFrame'
import './Model3D.css'

const SETTLE_SECONDS = 0.8
const TARGET_SIZE = 2 // every model is normalized to ~this many world units, regardless of native scale
const FOV = 40
const FIT_MARGIN = 1.4 // headroom so bob motion / off-center content don't clip

// Camera distance that guarantees an object of the given `scale` (after
// TARGET_SIZE normalization) stays fully inside the frustum on BOTH axes,
// instead of hand-picking a `cameraDistance` per usage and re-tuning it
// every time `scale` changes. Vertical FOV alone isn't enough — our
// containers are frequently narrower than tall (aspect < 1), which makes
// the horizontal frustum the tighter constraint; dividing by `aspect`
// accounts for that.
function autoFitDistance(maxScale, aspect) {
  const radius = (TARGET_SIZE * maxScale * FIT_MARGIN) / 2
  const fovRad = (FOV * Math.PI) / 180
  const distV = radius / Math.tan(fovRad / 2)
  return aspect < 1 ? distV / aspect : distV
}

// Re-fits the camera whenever the canvas is resized or the content's max
// scale changes, using the CURRENT real aspect ratio rather than one
// guessed from CSS before the canvas existed.
function FitCamera({ maxScale, floor }) {
  const { camera, size } = useThree()

  // Mutating `camera` imperatively is the standard react-three-fiber pattern
  // for custom camera control (this is what drei's own camera helpers do too).
  /* eslint-disable react-hooks/immutability */
  useLayoutEffect(() => {
    const aspect = size.width / size.height
    const distance = Math.max(autoFitDistance(maxScale, aspect), floor ?? 0)
    // y must stay 0: react-three-fiber calls camera.lookAt(0,0,0) by default,
    // so any vertical offset here tilts the camera down toward the
    // (vertically centered) object — that tilt is what was clipping heads
    // at the top of frame while leaving dead space at the bottom.
    camera.position.set(0, 0, distance)
    camera.fov = FOV
    camera.aspect = aspect
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height, maxScale, floor])
  /* eslint-enable react-hooks/immutability */

  return null
}

function Mesh({ url, scale, idle, reduceMotion, rotationY, position = [0, 0, 0], phase = 0 }) {
  const { scene } = useGLTF(url, '/draco/gltf/')
  const group = useRef()
  const elapsed = useRef(0)

  // useGLTF caches one scene per url — clone so the same model (e.g. the mascot,
  // reused in Hero + Pre-footer CTA) can exist in multiple places at once.
  // SkeletonUtils.clone (not scene.clone) is required for skinned meshes —
  // a plain clone doesn't rebind SkinnedMesh bones to the cloned skeleton.
  const instance = useMemo(() => cloneSkeleton(scene), [scene])

  // Native model scales vary wildly (the mascot's bbox is ~800 units across,
  // the crawler's is ~0.03) — normalize every model to the same footprint so
  // one `scale` prop means the same thing regardless of source model.
  const fitFactor = useMemo(() => {
    const box = new THREE.Box3().setFromObject(instance)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    instance.position.sub(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return TARGET_SIZE / maxDim
  }, [instance])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const base = scale * fitFactor

    if (reduceMotion || idle === 'none') {
      g.scale.setScalar(base)
      g.rotation.y = rotationY
      return
    }

    elapsed.current += delta
    const t = elapsed.current + phase
    const settle = Math.min(1, t / SETTLE_SECONDS)
    const eased = 1 - Math.pow(1 - settle, 3)
    const bob = idle === 'bob' ? Math.sin(t * 1.2) * 0.05 : 0

    g.scale.setScalar(base * (0.85 + 0.15 * eased))
    g.rotation.y = rotationY + (1 - eased) * 0.6
    g.position.y = position[1] + bob * eased
  })

  return <primitive ref={group} object={instance} position={position} />
}

export default function Model3D({
  modelUrl,
  models,
  scale = 1,
  idle = 'bob',
  height = 320,
  rotationY = 0,
  placeholderLabel = 'MODEL',
  className = '',
  cameraDistance, // optional floor — auto-fit distance is used unless this asks for more room
}) {
  const [wrapRef, inView] = useInView('150px', { once: false })
  const [frameloop, setFrameloop] = useState('always')
  const reduceMotion = usePrefersReducedMotion()

  const meshes = models ?? [{ url: modelUrl, scale, rotationY, position: [0, 0, 0] }]
  const maxScale = Math.max(...meshes.map(m => m.scale ?? 1))

  useEffect(() => {
    const onVisibility = () => setFrameloop(document.hidden ? 'never' : 'always')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <div ref={wrapRef} className={`model3d ${className}`} style={{ height }} aria-hidden="true">
      {inView && (
        <Suspense fallback={<PlaceholderFrame label={placeholderLabel} ratio="1 / 1" />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, cameraDistance || 4], fov: FOV }}
            gl={{ antialias: true, alpha: true }}
            frameloop={frameloop}
          >
            <FitCamera maxScale={maxScale} floor={cameraDistance} />
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 4, 2]} intensity={1.2} />
            {meshes.map((m, i) => (
              <Mesh
                key={m.url + i}
                url={m.url}
                scale={m.scale ?? 1}
                idle={m.idle ?? idle}
                reduceMotion={reduceMotion}
                rotationY={m.rotationY ?? 0}
                position={m.position ?? [0, 0, 0]}
                phase={i * 0.6}
              />
            ))}
          </Canvas>
        </Suspense>
      )}
    </div>
  )
}
