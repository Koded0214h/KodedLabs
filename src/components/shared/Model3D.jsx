import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
const DEFAULT_FIT_MARGIN = 1.4 // headroom so bob motion / off-center content don't clip

// Catches GLTF load/parse errors so one bad model can't blank the whole page,
// and logs the reason so we can see what actually failed.
class ModelErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error) {
    console.error(`[Model3D] FAILED to load "${this.props.label}":`, error)
  }
  render() {
    if (this.state.error) return this.props.fallback
    return this.props.children
  }
}

function autoFitDistance(maxScale, aspect, fitMargin) {
  const radius = (TARGET_SIZE * maxScale * fitMargin) / 2
  const fovRad = (FOV * Math.PI) / 180
  const distV = radius / Math.tan(fovRad / 2)
  return aspect < 1 ? distV / aspect : distV
}

const _v = new THREE.Vector3()

// Measures a model's REAL on-screen bounds. `Box3.setFromObject` only reads the
// static bind-pose geometry, which for a rigged/skinned model (e.g. a Sketchfab
// export scaled 0.001× under an armature) is microscopic and unrelated to where
// the skeleton actually poses the mesh — giving a ~0 box and a broken normalize
// factor. For skinned meshes we instead sample the posed vertices via
// applyBoneTransform + matrixWorld, which replicates exactly what the skinning
// shader renders. Non-skinned models fall back to the plain object box.
function computeModelBounds(root) {
  root.updateWorldMatrix(true, true)
  const box = new THREE.Box3()
  let sampledSkinned = false

  root.traverse((o) => {
    if (
      o.isSkinnedMesh &&
      o.geometry?.attributes?.position &&
      o.geometry.attributes.skinIndex &&
      o.geometry.attributes.skinWeight &&
      typeof o.applyBoneTransform === 'function'
    ) {
      sampledSkinned = true
      o.skeleton?.update()
      const pos = o.geometry.attributes.position
      const step = Math.max(1, Math.floor(pos.count / 1200)) // sample ~1200 verts/mesh
      for (let i = 0; i < pos.count; i += step) {
        _v.fromBufferAttribute(pos, i)
        o.applyBoneTransform(i, _v)     // → skinned position in mesh-local space
        _v.applyMatrix4(o.matrixWorld)  // → world space (same as the shader)
        box.expandByPoint(_v)
      }
    }
  })

  if (!sampledSkinned || box.isEmpty()) {
    box.setFromObject(root)
  }
  return box
}

function FitCamera({ maxScale, floor, fitMargin }) {
  const { camera, size } = useThree()
  /* eslint-disable react-hooks/immutability */
  useLayoutEffect(() => {
    const aspect = size.width / size.height
    const distance = Math.max(autoFitDistance(maxScale, aspect, fitMargin), floor ?? 0)
    camera.position.set(0, 0, distance)
    camera.fov = FOV
    camera.aspect = aspect
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height, maxScale, floor, fitMargin])
  /* eslint-enable react-hooks/immutability */
  return null
}

function Mesh({ url, scale, idle, reduceMotion, rotationY, position = [0, 0, 0], phase = 0 }) {
  const { scene } = useGLTF(url, '/draco/gltf/')
  const group = useRef()
  const elapsed = useRef(0)

  // useGLTF caches one scene per url — clone (SkeletonUtils, required for
  // skinned meshes) so the same model can appear in multiple places at once.
  const instance = useMemo(() => {
    const c = cloneSkeleton(scene)
    let meshCount = 0
    c.traverse((o) => {
      if (!o.isMesh) return
      meshCount++
      // Skinned meshes cull against their bind-pose bounds, which sit far from
      // where the posed mesh renders — three.js culls them out of view entirely.
      o.frustumCulled = false
      // Fully-metallic materials render near-black without an environment map.
      // Pull metalness down / roughness up so the light rig actually lights them.
      const mats = Array.isArray(o.material) ? o.material : [o.material]
      mats.forEach((m) => {
        if (!m) return
        if (typeof m.metalness === 'number') m.metalness = Math.min(m.metalness, 0.5)
        if (typeof m.roughness === 'number') m.roughness = Math.max(m.roughness, 0.35)
        m.envMapIntensity = 1
      })
    })
    console.log(`[Model3D] loaded "${url}" — meshes: ${meshCount}`)
    return c
  }, [scene, url])

  const fitFactor = useMemo(() => {
    const box = computeModelBounds(instance)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    instance.position.sub(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const factor = TARGET_SIZE / maxDim
    console.log(
      `[Model3D] fit "${url}" — size: [${size.x.toFixed(3)}, ${size.y.toFixed(3)}, ${size.z.toFixed(3)}], factor: ${factor.toFixed(3)}`
    )
    return factor
  }, [instance, url])

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

    g.scale.setScalar(base * (0.9 + 0.1 * eased))
    g.rotation.y = rotationY + (1 - eased) * 0.28
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
  cameraDistance,
  fitMargin = DEFAULT_FIT_MARGIN,
}) {
  const [wrapRef, inView] = useInView('150px', { once: false })
  const [frameloop, setFrameloop] = useState('always')
  const reduceMotion = usePrefersReducedMotion()

  const meshes = models ?? [{ url: modelUrl, scale, rotationY, position: [0, 0, 0] }]
  const maxScale = Math.max(...meshes.map(m => m.scale ?? 1))
  const label = modelUrl ?? (models && models[0]?.url) ?? placeholderLabel

  useEffect(() => {
    const onVisibility = () => setFrameloop(document.hidden ? 'never' : 'always')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const fallback = <PlaceholderFrame label={placeholderLabel} ratio="1 / 1" />

  return (
    <div ref={wrapRef} className={`model3d ${className}`} style={{ height }} aria-hidden="true">
      {inView && (
        <ModelErrorBoundary label={label} fallback={fallback}>
          <Suspense fallback={fallback}>
            <Canvas
              dpr={[1, 1.25]}
              camera={{ position: [0, 0, cameraDistance || 4], fov: FOV }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              frameloop={frameloop}
              onCreated={({ gl }) => {
                const canvas = gl.domElement
                canvas.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault()
                  console.error(`[Model3D] WebGL CONTEXT LOST for "${label}"`)
                })
                canvas.addEventListener('webglcontextrestored', () => {
                  console.warn(`[Model3D] WebGL context restored for "${label}"`)
                })
              }}
            >
              <FitCamera maxScale={maxScale} floor={cameraDistance} fitMargin={fitMargin} />
              <ambientLight intensity={0.8} />
              <hemisphereLight args={['#ffffff', '#404040', 1]} />
              <directionalLight position={[4, 6, 5]} intensity={2} />
              <directionalLight position={[-6, 2, -3]} intensity={1.1} />
              <directionalLight position={[0, -4, 2]} intensity={0.6} />
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
        </ModelErrorBoundary>
      )}
    </div>
  )
}
