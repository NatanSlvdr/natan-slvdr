import { useEffect, useRef } from 'react'
import { createPixelModelProjection } from './PixelModel'

// Samples a rotating 3D scene onto a fixed grid of glowing screen pixels.
export default function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gridLayer = document.createElement('canvas')
    const gridContext = gridLayer.getContext('2d')
    if (!gridContext) return
    const projection = createPixelModelProjection()

    let frame = 0
    let active = false
    let lastDraw = 0
    let lastFrame = 0
    let elapsedTime = 0
    let lastSceneTime = 0
    let width = 0
    let height = 0
    let spacing = 15
    let columns = 0
    let rows = 0
    let centerX = 0
    let centerY = 0
    let modelCells = 0
    let cellInset = 2
    let screen = new Float32Array(0)

    const sampleProjection = (seconds: number) => {
      projection.render(seconds)
      const { pixels, size } = projection
      const startX = centerX - Math.floor(modelCells / 2)
      const startY = centerY - Math.floor(modelCells / 2)

      for (let y = 0; y < modelCells; y++) {
        for (let x = 0; x < modelCells; x++) {
          const cellX = startX + x
          const cellY = startY + y
          if (cellX < 0 || cellY < 0 || cellX >= columns || cellY >= rows) continue

          const sampleStartX = Math.floor(x / modelCells * size)
          const sampleEndX = Math.floor((x + 1) / modelCells * size)
          const sampleStartY = Math.floor((modelCells - y - 1) / modelCells * size)
          const sampleEndY = Math.floor((modelCells - y) / modelCells * size)
          let brightness = 0

          for (let py = sampleStartY; py < sampleEndY; py++) {
            for (let px = sampleStartX; px < sampleEndX; px++) {
              const index = (py * size + px) * 4
              const alpha = pixels[index + 3] / 255
              const luminance = (pixels[index] * 0.25 + pixels[index + 1] * 0.6 + pixels[index + 2] * 0.15) / 255
              brightness = Math.max(brightness, luminance * alpha)
            }
          }

          if (brightness > 0.08) {
            const index = cellY * columns + cellX
            screen[index] = Math.max(screen[index], Math.min(1, brightness * 1.2))
          }
        }
      }
    }

    const draw = (time: number) => {
      if (!width || !height) return
      const seconds = reducedMotion ? 0 : time / 1000
      const delta = Math.max(0, (time - lastSceneTime) / 1000)
      lastSceneTime = time
      const decay = Math.exp(-delta * 12)
      for (let index = 0; index < screen.length; index++) {
        screen[index] *= decay
        if (screen[index] < 0.035) screen[index] = 0
      }
      sampleProjection(seconds)

      context.clearRect(0, 0, width, height)
      context.drawImage(gridLayer, 0, 0, width, height)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const intensity = screen[y * columns + x]
          if (intensity < 0.035) continue
          context.fillStyle = `rgba(213, 245, 106, ${Math.min(0.9, intensity * 0.88)})`
          if (intensity > 0.45) {
            context.shadowColor = '#d5f56a'
            context.shadowBlur = spacing * (14 / 30)
          }
          context.fillRect(x * spacing + cellInset, y * spacing + cellInset, spacing - cellInset * 2, spacing - cellInset * 2)
          context.shadowBlur = 0
        }
      }
    }

    const animate = (time: number) => {
      frame = 0
      if (lastFrame) elapsedTime += Math.min(time - lastFrame, 50)
      lastFrame = time
      if (time - lastDraw >= 40) {
        draw(elapsedTime)
        lastDraw = time
      }
      if (active) frame = requestAnimationFrame(animate)
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      spacing = width < 680 ? 12 : 15
      cellInset = spacing * (4 / 30)
      columns = Math.ceil(width / spacing)
      rows = Math.ceil(height / spacing)
      centerX = Math.floor(columns * (width < 680 ? 0.5 : 0.73))
      centerY = Math.floor(rows * (width < 680 ? 0.68 : 0.49))
      modelCells = Math.min(width < 680 ? 30 : 46, columns - 2, rows - 2)
      screen = new Float32Array(columns * rows)
      lastSceneTime = elapsedTime
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      gridLayer.width = canvas.width
      gridLayer.height = canvas.height
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      gridContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      gridContext.strokeStyle = 'rgba(142, 190, 153, 0.08)'
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          gridContext.strokeRect(x * spacing + spacing * 0.05, y * spacing + spacing * 0.05, spacing * 0.9, spacing * 0.9)
        }
      }
      draw(elapsedTime)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (reducedMotion) return
      if (entry.isIntersecting && !active) {
        active = true
        frame = requestAnimationFrame(animate)
      } else if (!entry.isIntersecting) {
        active = false
        lastFrame = 0
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    visibilityObserver.observe(canvas)

    return () => {
      active = false
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      projection.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="pixel-grid" aria-hidden="true" />
}
