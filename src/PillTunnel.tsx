import { useEffect, useRef } from 'react'

const distances = [0, 4, 9, 15, 23, 34, 49, 70, 100, 140]
const perspectiveStrength = 0.045
const scaleAt = (distance: number) => 1 / (1 + distance * perspectiveStrength)
const fadeAt = (distance: number) => Math.exp(-distance * 0.18)

// Trace a capsule centered in the pill, scaled toward the vanishing point.
function traceCapsule(context: CanvasRenderingContext2D, centerX: number, centerY: number, width: number, height: number) {
  const radius = height / 2
  const leftCenter = centerX - (width - height) / 2
  const rightCenter = centerX + (width - height) / 2
  context.beginPath()
  context.moveTo(leftCenter, centerY - radius)
  context.lineTo(rightCenter, centerY - radius)
  context.arc(rightCenter, centerY, radius, -Math.PI / 2, Math.PI / 2)
  context.lineTo(leftCenter, centerY + radius)
  context.arc(leftCenter, centerY, radius, Math.PI / 2, Math.PI * 1.5)
  context.closePath()
}

// Redraw only when the pill changes size; the wireframe itself is static.
export default function PillTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const outerWidth = width - 1
      const outerHeight = height - 1
      const radius = outerHeight / 2
      const leftCenter = centerX - (outerWidth - outerHeight) / 2
      const rightCenter = centerX + (outerWidth - outerHeight) / 2
      const perimeter: { x: number; y: number }[] = []
      const railCount = Math.max(3, Math.round((rightCenter - leftCenter) / 80))

      for (let index = 0; index <= railCount; index++) {
        const x = leftCenter + (rightCenter - leftCenter) * index / railCount
        perimeter.push({ x, y: centerY - radius }, { x, y: centerY + radius })
      }
      for (let index = 1; index < 3; index++) {
        const leftAngle = Math.PI / 2 + Math.PI * index / 3
        const rightAngle = -Math.PI / 2 + Math.PI * index / 3
        perimeter.push(
          { x: leftCenter + Math.cos(leftAngle) * radius, y: centerY + Math.sin(leftAngle) * radius },
          { x: rightCenter + Math.cos(rightAngle) * radius, y: centerY + Math.sin(rightAngle) * radius },
        )
      }

      context.lineWidth = 0.9
      for (let index = 0; index < distances.length - 1; index++) {
        const start = scaleAt(distances[index])
        const end = scaleAt(distances[index + 1])
        context.strokeStyle = `rgba(177, 235, 173, ${0.14 * fadeAt(distances[index])})`
        context.beginPath()
        for (const point of perimeter) {
          context.moveTo(centerX + (point.x - centerX) * start, centerY + (point.y - centerY) * start)
          context.lineTo(centerX + (point.x - centerX) * end, centerY + (point.y - centerY) * end)
        }
        context.stroke()
      }

      distances.forEach(distance => {
        const scale = scaleAt(distance)
        traceCapsule(context, centerX, centerY, outerWidth * scale, outerHeight * scale)
        context.strokeStyle = `rgba(190, 245, 177, ${0.32 * fadeAt(distance)})`
        context.lineWidth = 1
        context.stroke()
      })
    }

    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    draw()
    return () => observer.disconnect()
  }, [])

  return <canvas ref={canvasRef} className="bottom-nav-wireframe" aria-hidden="true" />
}
