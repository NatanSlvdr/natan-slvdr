import { useEffect, useRef } from 'react'
import {
  AmbientLight,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Shape,
  ShapeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

const pixelScale = 4
const frameCenter = 1.04

// Trace the shallow, softened rectangular lens outline from the supplied front photos.
function createLensShapes() {
  const outer = new Shape()
  outer.moveTo(-0.79, 0.44)
  outer.bezierCurveTo(-0.5, 0.47, 0.48, 0.47, 0.79, 0.44)
  outer.bezierCurveTo(0.91, 0.42, 0.96, 0.35, 0.96, 0.25)
  outer.lineTo(0.96, -0.11)
  outer.bezierCurveTo(0.95, -0.3, 0.83, -0.41, 0.62, -0.43)
  outer.bezierCurveTo(0.28, -0.47, -0.35, -0.47, -0.66, -0.43)
  outer.bezierCurveTo(-0.86, -0.41, -0.96, -0.3, -0.96, -0.11)
  outer.lineTo(-0.96, 0.25)
  outer.bezierCurveTo(-0.96, 0.35, -0.91, 0.42, -0.79, 0.44)
  outer.closePath()

  const opening = new Shape()
  opening.moveTo(-0.64, 0.33)
  opening.bezierCurveTo(-0.71, 0.31, -0.78, 0.26, -0.78, 0.17)
  opening.lineTo(-0.78, -0.09)
  opening.bezierCurveTo(-0.77, -0.24, -0.67, -0.32, -0.5, -0.34)
  opening.bezierCurveTo(-0.19, -0.37, 0.28, -0.37, 0.54, -0.34)
  opening.bezierCurveTo(0.7, -0.32, 0.78, -0.24, 0.78, -0.09)
  opening.lineTo(0.78, 0.17)
  opening.bezierCurveTo(0.78, 0.26, 0.71, 0.32, 0.62, 0.33)
  opening.bezierCurveTo(0.31, 0.36, -0.33, 0.36, -0.64, 0.33)
  opening.closePath()

  outer.holes.push(opening)
  return { outer, opening }
}

// Build a shallow, beveled acetate rim around one clear lens.
function createRimGeometry(shape: Shape) {
  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.13,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.022,
    bevelThickness: 0.018,
    curveSegments: 10,
  })
  geometry.translate(0, 0, -0.065)
  return geometry
}

function createBridge() {
  const shape = new Shape()
  shape.moveTo(-0.38, 0.4)
  shape.bezierCurveTo(-0.27, 0.39, -0.18, 0.33, -0.08, 0.28)
  shape.bezierCurveTo(-0.02, 0.25, 0.02, 0.25, 0.08, 0.28)
  shape.bezierCurveTo(0.18, 0.33, 0.27, 0.39, 0.38, 0.4)
  shape.lineTo(0.37, 0.24)
  shape.bezierCurveTo(0.27, 0.23, 0.18, 0.18, 0.08, 0.12)
  shape.bezierCurveTo(0.02, 0.09, -0.02, 0.09, -0.08, 0.12)
  shape.bezierCurveTo(-0.18, 0.18, -0.27, 0.23, -0.37, 0.24)
  shape.closePath()
  return createRimGeometry(shape)
}

// Add a rounded rectangular temple segment between two 3D points.
function addTempleSegment(
  group: Group,
  geometry: RoundedBoxGeometry,
  start: Vector3,
  end: Vector3,
  material: MeshStandardMaterial,
) {
  const direction = end.clone().sub(start)
  const segment = new Mesh(geometry, material)
  segment.position.copy(start).add(end).multiplyScalar(0.5)
  segment.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), direction.clone().normalize())
  group.add(segment)
}

// Assemble separate real meshes so the front, hinges, and folded-back arms have real depth.
function createGlasses() {
  const group = new Group()
  const geometries = new Set<{ dispose: () => void }>()
  const materials = new Set<{ dispose: () => void }>()
  const rememberGeometry = <T extends { dispose: () => void }>(geometry: T) => {
    geometries.add(geometry)
    return geometry
  }
  const rememberMaterial = <T extends { dispose: () => void }>(material: T) => {
    materials.add(material)
    return material
  }

  const { outer, opening } = createLensShapes()
  const rimGeometry = rememberGeometry(createRimGeometry(outer))
  const lensGeometry = rememberGeometry(new ShapeGeometry(opening, 12))
  const bridgeGeometry = rememberGeometry(createBridge())
  const frameMaterial = rememberMaterial(new MeshPhysicalMaterial({
    color: 0x111113,
    roughness: 0.2,
    metalness: 0.16,
    clearcoat: 0.82,
    clearcoatRoughness: 0.16,
  }))
  const lensMaterial = rememberMaterial(new MeshPhysicalMaterial({
    color: 0xa7b8c0,
    roughness: 0.16,
    metalness: 0.04,
    clearcoat: 0.55,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: DoubleSide,
  }))
  const templeMaterial = rememberMaterial(new MeshStandardMaterial({ color: 0x111113, roughness: 0.24, metalness: 0.12 }))
  const hingeMaterial = rememberMaterial(new MeshPhysicalMaterial({ color: 0x242528, roughness: 0.24, metalness: 0.42, clearcoat: 0.45 }))
  const silverMaterial = rememberMaterial(new MeshStandardMaterial({ color: 0xc0c4c3, roughness: 0.3, metalness: 0.78 }))

  for (const side of [-1, 1]) {
    const rim = new Mesh(rimGeometry, frameMaterial)
    rim.position.x = side * frameCenter
    group.add(rim)

    const lens = new Mesh(lensGeometry, lensMaterial)
    lens.position.set(side * frameCenter, 0, 0.012)
    group.add(lens)

    const hinge = new Mesh(rememberGeometry(new RoundedBoxGeometry(0.25, 0.17, 0.18, 0.045, 3)), hingeMaterial)
    hinge.position.set(side * 1.94, 0.31, -0.015)
    group.add(hinge)

    const hingePin = new Mesh(rememberGeometry(new CylinderGeometry(0.031, 0.031, 0.018, 8)), silverMaterial)
    hingePin.rotation.x = Math.PI / 2
    hingePin.position.set(side * 1.89, 0.34, 0.104)
    group.add(hingePin)

    const templeStart = new Vector3(side * 2.01, 0.26, -0.07)
    const templeBend = new Vector3(side * 2.1, 0.19, -1.77)
    const templeTip = new Vector3(side * 2.04, -0.26, -2.26)
    const mainTempleLength = templeStart.distanceTo(templeBend)
    const tipLength = templeBend.distanceTo(templeTip)
    const mainTemple = rememberGeometry(new RoundedBoxGeometry(0.145, 0.13, mainTempleLength, 0.04, 3))
    const earTip = rememberGeometry(new RoundedBoxGeometry(0.135, 0.12, tipLength, 0.04, 3))
    addTempleSegment(group, mainTemple, templeStart, templeBend, templeMaterial)
    addTempleSegment(group, earTip, templeBend, templeTip, templeMaterial)
  }

  const bridge = new Mesh(bridgeGeometry, frameMaterial)
  group.add(bridge)

  return {
    group,
    dispose: () => {
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(material => material.dispose())
    },
  }
}

// Render the photo-traced glasses as a low-resolution 3D turntable on a transparent canvas.
export default function GlassesModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return
    }

    const scene = new Scene()
    const camera = new PerspectiveCamera(41, 1, 0.1, 30)
    const model = createGlasses()
    scene.add(model.group)

    scene.add(new AmbientLight(0xffffff, 1.25))
    const keyLight = new DirectionalLight(0xfff4e8, 3.5)
    keyLight.position.set(-3.5, 4.5, 5)
    scene.add(keyLight)
    const fillLight = new DirectionalLight(0xc6d8e3, 1.8)
    fillLight.position.set(4, 1.5, 3.5)
    scene.add(fillLight)
    const rimLight = new DirectionalLight(0xffffff, 2.6)
    rimLight.position.set(0, 2.5, -4)
    scene.add(rimLight)

    renderer.setPixelRatio(1)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = 'srgb'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let active = false
    let disposed = false
    let elapsed = 0
    let startTime = 0
    let lastRenderTime = 0
    let renderWidth = 0
    let renderHeight = 0

    const draw = (seconds: number) => {
      if (disposed) return
      const bounds = canvas.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      camera.aspect = bounds.width / bounds.height
      camera.position.z = 4.7 / (2 * Math.tan((camera.fov * Math.PI) / 360) * Math.max(0.85, camera.aspect))
      camera.updateProjectionMatrix()
      const nextWidth = Math.max(1, Math.round(bounds.width / pixelScale))
      const nextHeight = Math.max(1, Math.round(bounds.height / pixelScale))
      if (nextWidth !== renderWidth || nextHeight !== renderHeight) {
        renderWidth = nextWidth
        renderHeight = nextHeight
        renderer.setSize(renderWidth, renderHeight, false)
      }
      model.group.rotation.y = 0.2 + seconds * 0.28
      model.group.rotation.x = 0.06 + Math.sin(seconds * 0.42) * 0.035
      model.group.rotation.z = Math.sin(seconds * 0.3) * 0.025
      renderer.render(scene, camera)
    }

    const animate = (time: number) => {
      if (!active || disposed) return
      if (time - lastRenderTime >= 1000 / 30) {
        elapsed = (time - startTime) / 1000
        lastRenderTime = time
        draw(elapsed)
      }
      animationFrame = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => draw(elapsed))
    resizeObserver.observe(canvas)
    draw(0)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (prefersReducedMotion) return
      if (entry.isIntersecting && !active) {
        active = true
        startTime = performance.now() - elapsed * 1000
        lastRenderTime = 0
        animationFrame = requestAnimationFrame(animate)
      } else if (!entry.isIntersecting && active) {
        active = false
        cancelAnimationFrame(animationFrame)
      }
    })
    visibilityObserver.observe(canvas)

    return () => {
      disposed = true
      active = false
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      model.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="glasses-canvas" aria-label="Pixelated 3D model of Natan's glasses, rotating slowly" role="img" />
}
