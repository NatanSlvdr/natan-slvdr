import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  UnsignedByteType,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
  type BufferGeometry,
} from 'three'

const size = 192
const cycleDuration = 7
const transitionDuration = 1.3

type Model = {
  group: Group
  geometry: BufferGeometry
  edgeGeometry: EdgesGeometry
  lines: LineBasicMaterial
  colors: Float32BufferAttribute
  radius: number
}

export type PixelModelProjection = {
  size: number
  pixels: Uint8Array
  render: (seconds: number) => void
  dispose: () => void
}

const ease = (value: number) => {
  const clamped = Math.min(1, Math.max(0, value))
  return clamped * clamped * (3 - 2 * clamped)
}

// Render hollow 3D wireframes offscreen; callers sample the flat projection as a light map.
export function createPixelModelProjection(): PixelModelProjection {
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  } catch {
    return createCanvasProjection()
  }

  renderer.setPixelRatio(1)
  renderer.setSize(size, size, false)
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(43, 1, 0.1, 20)
  camera.position.z = 5.5

  const geometries: BufferGeometry[] = [
    new BoxGeometry(2.25, 2.25, 2.25),
    new IcosahedronGeometry(1.82, 0),
    new CylinderGeometry(1.5, 1.5, 3, 6, 1, true),
  ]
  const edgeColor = new Color(0xe4ff9d)
  const rotatedVertex = new Vector3()

  const models: Model[] = geometries.map(geometry => {
    const group = new Group()
    const lines = new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      depthTest: false,
      depthWrite: false,
    })
    const edgeGeometry = new EdgesGeometry(geometry, 13)
    const colors = new Float32BufferAttribute(new Float32Array(edgeGeometry.getAttribute('position').count * 3), 3)
    edgeGeometry.setAttribute('color', colors)
    geometry.computeBoundingSphere()
    group.add(new LineSegments(edgeGeometry, lines))
    scene.add(group)
    return { group, geometry, edgeGeometry, lines, colors, radius: geometry.boundingSphere?.radius ?? 2 }
  })

  const target = new WebGLRenderTarget(size, size, {
    format: RGBAFormat,
    type: UnsignedByteType,
    depthBuffer: true,
    stencilBuffer: false,
  })
  const pixels = new Uint8Array(size * size * 4)

  const render = (seconds: number) => {
    const active = Math.floor(seconds / cycleDuration) % models.length
    const next = (active + 1) % models.length
    const phase = seconds % cycleDuration
    const blend = ease((phase - (cycleDuration - transitionDuration)) / transitionDuration)

    models.forEach((model, index) => {
      const visibility = index === active ? 1 - blend : index === next ? blend : 0
      model.group.visible = visibility > 0.001
      model.lines.opacity = 0.92 * visibility
      model.group.rotation.x = seconds * (0.26 + index * 0.035) + index * 0.35
      model.group.rotation.y = seconds * (0.38 + index * 0.025) + index * 0.6
      model.group.rotation.z = Math.sin(seconds * 0.35 + index) * 0.18

      if (!model.group.visible) return
      const positions = model.edgeGeometry.getAttribute('position')
      for (let vertexIndex = 0; vertexIndex < positions.count; vertexIndex++) {
        rotatedVertex.fromBufferAttribute(positions, vertexIndex).applyEuler(model.group.rotation)
        const depth = Math.min(1, Math.max(0, (rotatedVertex.z / model.radius + 1) / 2))
        const brightness = 0.12 + 0.88 * depth ** 1.5
        model.colors.setXYZ(vertexIndex, edgeColor.r * brightness, edgeColor.g * brightness, edgeColor.b * brightness)
      }
      model.colors.needsUpdate = true
    })

    renderer.setRenderTarget(target)
    renderer.render(scene, camera)
    renderer.readRenderTargetPixels(target, 0, 0, size, size, pixels)
    renderer.setRenderTarget(null)
  }

  const dispose = () => {
    models.forEach(model => {
      model.geometry.dispose()
      model.edgeGeometry.dispose()
      model.lines.dispose()
    })
    target.dispose()
    renderer.dispose()
  }

  return { size, pixels, render, dispose }
}

// Keep a projected 3D wireframe visible when WebGL is unavailable.
function createCanvasProjection(): PixelModelProjection {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const context = canvas.getContext('2d')
  const pixels = new Uint8Array(size * size * 4)
  if (!context) return { size, pixels, render: () => {}, dispose: () => {} }

  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  ]
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ]

  const render = (seconds: number) => {
    const xRotation = seconds * 0.27 + 0.3
    const yRotation = seconds * 0.38 + 0.45
    const project = (x: number, y: number, z: number) => {
      const turnedX = x * Math.cos(yRotation) + z * Math.sin(yRotation)
      const turnedZ = z * Math.cos(yRotation) - x * Math.sin(yRotation)
      const turnedY = y * Math.cos(xRotation) - turnedZ * Math.sin(xRotation)
      const depth = y * Math.sin(xRotation) + turnedZ * Math.cos(xRotation)
      const scale = size * (33 / 96) / (1 + depth * 0.12)
      return { x: size / 2 + turnedX * scale, y: size / 2 + turnedY * scale, depth }
    }
    const projected = vertices.map(([x, y, z]) => project(x, y, z))

    context.clearRect(0, 0, size, size)
    context.lineWidth = 3
    context.lineJoin = 'round'
    edges.map(([start, end]) => ({ start, end, depth: (projected[start].depth + projected[end].depth) / 2 }))
      .sort((a, b) => a.depth - b.depth)
      .forEach(({ start, end, depth }) => {
        const near = Math.min(1, Math.max(0, (depth / Math.sqrt(3) + 1) / 2))
        context.strokeStyle = `rgba(213, 245, 106, ${0.12 + 0.88 * near ** 1.5})`
        context.beginPath()
        context.moveTo(projected[start].x, projected[start].y)
        context.lineTo(projected[end].x, projected[end].y)
        context.stroke()
      })

    pixels.set(context.getImageData(0, 0, size, size).data)
  }

  return { size, pixels, render, dispose: () => {} }
}
