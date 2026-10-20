import { useEffect, useRef } from 'react'

// Brightness ramp, darkest to brightest, as in Andy Sloane's donut.c.
const ramp = '.,-~:;=!*#$@'

const shadow = [43, 48, 56]
const ink = [216, 216, 217]
const accent = [56, 136, 248]
const mix = (from: number[], to: number[], amount: number) => `rgb(${from.map((value, index) => Math.round(value + (to[index] - value) * amount)).join(',')})`
// Fades from shadow to ink, and the two brightest characters lean towards the accent.
const colors = [...ramp].map((_, index) => {
  const level = index / (ramp.length - 1)
  return level > 0.8 ? mix(ink, accent, (level - 0.8) / 0.2) : mix(shadow, ink, level / 0.8)
})

// The core of the letter N: two upright bars and a slanted stroke. Every edge is then
// rounded by `radius`, which brings the letter to about 2 units tall.
const halfWidth = 0.66
const halfHeight = 0.86
const bar = 0.18
const slant = 0.3
const halfDepth = 0.1
const radius = 0.14
const parts = [
  [[-halfWidth, -halfHeight], [-halfWidth + bar, -halfHeight], [-halfWidth + bar, halfHeight], [-halfWidth, halfHeight]],
  [[halfWidth - bar, -halfHeight], [halfWidth, -halfHeight], [halfWidth, halfHeight], [halfWidth - bar, halfHeight]],
  [[halfWidth - slant, -halfHeight], [halfWidth, -halfHeight], [-halfWidth + slant, halfHeight], [-halfWidth, halfHeight]],
]
// Every point of the letter lies inside this sphere, so rays that miss it are skipped.
const bounds = 1.4

const distance = 5
// A lamp up and to the left, between the viewer and the letter, so faces shade unevenly and catch a glint.
const lamp = [-2, 2.5, 2.2]

// Signed distance from a point to a polygon outline, negative inside (Inigo Quilez's method).
function polygonDistance(part: number[][], x: number, y: number) {
  let nearest = Infinity
  let sign = 1
  for (let index = 0, previous = part.length - 1; index < part.length; previous = index, index++) {
    const [ax, ay] = part[index]
    const edgeX = part[previous][0] - ax
    const edgeY = part[previous][1] - ay
    const offsetX = x - ax
    const offsetY = y - ay
    const along = Math.max(0, Math.min(1, (offsetX * edgeX + offsetY * edgeY) / (edgeX * edgeX + edgeY * edgeY)))
    const gapX = offsetX - edgeX * along
    const gapY = offsetY - edgeY * along
    nearest = Math.min(nearest, gapX * gapX + gapY * gapY)
    const above = y >= ay
    const below = y < part[previous][1]
    const left = edgeX * offsetY > edgeY * offsetX
    if ((above && below && left) || (!above && !below && !left)) sign = -sign
  }
  return sign * Math.sqrt(nearest)
}

// Distance to the letter: the flat outline, given depth, then grown by the rounding radius.
function letterDistance(x: number, y: number, z: number) {
  let flat = Infinity
  for (const part of parts) flat = Math.min(flat, polygonDistance(part, x, y))
  const depth = Math.abs(z) - halfDepth
  const outsideX = Math.max(flat, 0)
  const outsideZ = Math.max(depth, 0)
  return Math.sqrt(outsideX * outsideX + outsideZ * outsideZ) + Math.min(Math.max(flat, depth), 0) - radius
}

type Grid = { columns: number; rows: number; cellWidth: number; cellHeight: number; projection: number }

// Casts one ray per character cell and marches it towards the letter.
function draw(context: CanvasRenderingContext2D, grid: Grid, yaw: number, pitch: number) {
  const { columns, rows, cellWidth, cellHeight, projection } = grid
  const width = columns * cellWidth
  const height = rows * cellHeight
  const cells = new Int8Array(columns * rows).fill(-1)
  const [cosYaw, sinYaw, cosPitch, sinPitch] = [Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch)]

  // Rays are turned into the letter's own space, rather than turning the letter.
  const toLetter = (x: number, y: number, z: number) => {
    const pitchedY = y * cosPitch + z * sinPitch
    const pitchedZ = z * cosPitch - y * sinPitch
    return [x * cosYaw - pitchedZ * sinYaw, pitchedY, x * sinYaw + pitchedZ * cosYaw]
  }
  const toView = (x: number, y: number, z: number) => {
    const turnedZ = z * cosYaw - x * sinYaw
    return [x * cosYaw + z * sinYaw, y * cosPitch - turnedZ * sinPitch, y * sinPitch + turnedZ * cosPitch]
  }
  const [originX, originY, originZ] = toLetter(0, 0, -distance)

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const rayX = ((column + 0.5) * cellWidth - width / 2) / projection
      const rayY = (height / 2 - (row + 0.5) * cellHeight) / projection
      const rayLength = Math.sqrt(rayX * rayX + rayY * rayY + 1)
      const [directionX, directionY, directionZ] = toLetter(rayX / rayLength, rayY / rayLength, 1 / rayLength)

      const middle = -(originX * directionX + originY * directionY + originZ * directionZ)
      const spread = middle * middle - (originX * originX + originY * originY + originZ * originZ - bounds * bounds)
      if (spread < 0) continue
      const exit = middle + Math.sqrt(spread)
      let travelled = middle - Math.sqrt(spread)
      let hit = false
      for (let step = 0; step < 48 && travelled < exit; step++) {
        const gap = letterDistance(originX + directionX * travelled, originY + directionY * travelled, originZ + directionZ * travelled)
        if (gap < 0.003) {
          hit = true
          break
        }
        travelled += gap
      }
      if (!hit) continue

      // The surface normal comes from how the distance changes around the hit point.
      const [x, y, z] = [originX + directionX * travelled, originY + directionY * travelled, originZ + directionZ * travelled]
      const nudge = 0.002
      const a = letterDistance(x + nudge, y - nudge, z - nudge)
      const b = letterDistance(x - nudge, y - nudge, z + nudge)
      const c = letterDistance(x - nudge, y + nudge, z - nudge)
      const d = letterDistance(x + nudge, y + nudge, z + nudge)
      const [letterNormalX, letterNormalY, letterNormalZ] = [a - b - c + d, -a - b + c + d, -a + b - c + d]
      const normalLength = Math.sqrt(letterNormalX * letterNormalX + letterNormalY * letterNormalY + letterNormalZ * letterNormalZ)
      const [normalX, normalY, normalZ] = toView(letterNormalX / normalLength, letterNormalY / normalLength, letterNormalZ / normalLength)

      const [pointX, pointY, pointZ] = [rayX / rayLength * travelled, rayY / rayLength * travelled, travelled / rayLength]
      const [toLampX, toLampY, toLampZ] = [lamp[0] - pointX, lamp[1] - pointY, lamp[2] - pointZ]
      const lampDistance = Math.sqrt(toLampX * toLampX + toLampY * toLampY + toLampZ * toLampZ)
      const diffuse = (normalX * toLampX + normalY * toLampY + normalZ * toLampZ) / lampDistance
      // Blinn-Phong highlight, halfway between the lamp and the viewer.
      const [halfX, halfY, halfZ] = [toLampX / lampDistance - pointX / travelled, toLampY / lampDistance - pointY / travelled, toLampZ / lampDistance - pointZ / travelled]
      const facing = Math.max(0, (normalX * halfX + normalY * halfY + normalZ * halfZ) / Math.sqrt(halfX * halfX + halfY * halfY + halfZ * halfZ))
      const brightness = 0.16 + 0.58 * Math.max(0, diffuse) + 0.45 * facing ** 16
      cells[row * columns + column] = Math.min(ramp.length - 1, Math.floor(brightness * ramp.length))
    }
  }

  context.clearRect(0, 0, width, height)
  // One pass per shade keeps fillStyle changes to a dozen per frame.
  for (let shade = 0; shade < ramp.length; shade++) {
    context.fillStyle = colors[shade]
    for (let index = 0; index < cells.length; index++) {
      if (cells[index] === shade) context.fillText(ramp[shade], (index % columns) * cellWidth, Math.floor(index / columns) * cellHeight)
    }
  }
}

export default function AsciiMonogram({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let grid: Grid = { columns: 0, rows: 0, cellWidth: 1, cellHeight: 1, projection: 0 }
    let yaw = 0.5
    let pitch = -0.25
    let tilt = { x: 0, y: 0 }
    let target = { x: 0, y: 0 }
    let spinning = false
    let speed = 0
    let previous = 0
    let frame = 0

    const render = () => draw(context, grid, yaw + tilt.y, pitch + tilt.x)

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      // Smaller canvases get smaller characters so the letter keeps its shape.
      const fontSize = Math.max(7, Math.min(12, Math.round(Math.min(width, height) / 42)))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.font = `${fontSize}px 'IBM Plex Mono', ui-monospace, monospace`
      context.textBaseline = 'top'
      const cellWidth = fontSize * 0.6
      const cellHeight = fontSize * 1.2
      // Leaves room for the corners as they swing towards the viewer.
      const projection = Math.min(width, height) * distance * 0.3
      grid = { columns: Math.floor(width / cellWidth), rows: Math.floor(height / cellHeight), cellWidth, cellHeight, projection }
      render()
    }

    // The letter holds still, facing the viewer, until it has faded in.
    const startSpinning = (event: TransitionEvent) => {
      if (event.propertyName === 'opacity') spinning = true
    }

    // The letter leans gently towards the pointer.
    const follow = (event: PointerEvent) => {
      target = { x: (event.clientY / window.innerHeight - 0.5) * 0.9, y: (event.clientX / window.innerWidth - 0.5) * 0.9 }
    }

    // Around 30 frames per second suits the character grid and keeps the CPU quiet.
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - previous < 33) return
      const elapsed = previous ? Math.min(now - previous, 100) : 33
      previous = now
      // The spin eases in over about a second rather than starting at full speed.
      speed += ((spinning ? 1 : 0) - speed) * 0.04
      yaw += elapsed * 0.0007 * speed
      pitch += elapsed * 0.0003 * speed
      tilt = { x: tilt.x + (target.x - tilt.x) * 0.06, y: tilt.y + (target.y - tilt.y) * 0.06 }
      render()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    document.fonts?.ready.then(resize)
    if (!reducedMotion) {
      canvas.addEventListener('transitionend', startSpinning)
      window.addEventListener('pointermove', follow, { passive: true })
      frame = requestAnimationFrame(tick)
    }
    return () => {
      observer.disconnect()
      canvas.removeEventListener('transitionend', startSpinning)
      window.removeEventListener('pointermove', follow)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
