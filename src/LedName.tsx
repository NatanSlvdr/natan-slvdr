import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import { canAnimate } from './Block'

// 5×7 dot-matrix glyphs, drawn on an LED board with one unlit cell of margin.
const glyphs: Record<string, string[]> = {
  N: ['10001', '10001', '11001', '10101', '10011', '10001', '10001'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
}
const word = 'NATAN'
const CELL = 10
const columns = word.length * 6 + 1
const rows = 9

const dots: { x: number; y: number; lit: boolean; column: number }[] = []
for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    const letter = Math.floor((column - 1) / 6)
    const glyphColumn = (column - 1) % 6
    const lit = column > 0 && glyphColumn < 5 && row > 0 && row < 8 && glyphs[word[letter]]?.[row - 1][glyphColumn] === '1'
    dots.push({ x: column * CELL + CELL / 2, y: row * CELL + CELL / 2, lit, column })
  }
}

export default function LedName({ start }: { start: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)

  // The glow drifts across the board on its own, and follows the pointer while it hovers.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !canAnimate || !start) return
    const spots = svg.querySelectorAll<SVGRadialGradientElement>('radialGradient')
    let frame = 0
    const began = performance.now()
    const tick = (now: number) => {
      const t = (now - began) / 1000
      const target = pointer.current ?? { x: columns * CELL * (0.5 + 0.42 * Math.sin(t * 0.55)), y: rows * CELL * (0.5 + 0.3 * Math.sin(t * 0.9)) }
      spots.forEach(spot => {
        spot.setAttribute('cx', target.x.toFixed(1))
        spot.setAttribute('cy', target.y.toFixed(1))
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start])

  function follow(event: PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect()
    pointer.current = { x: ((event.clientX - box.left) / box.width) * columns * CELL, y: ((event.clientY - box.top) / box.height) * rows * CELL }
  }

  return (
    <svg ref={svgRef} className={`led ${start ? 'is-on' : ''}`} viewBox={`0 0 ${columns * CELL} ${rows * CELL}`} role="img" aria-label="Natan" onPointerMove={follow} onPointerLeave={() => { pointer.current = null }}>
      <defs>
        <radialGradient id="led-glow-lit" gradientUnits="userSpaceOnUse" cx="-100" cy="0" r="46">
          <stop offset="0" stopColor="#56d364" stopOpacity="1" />
          <stop offset="1" stopColor="#56d364" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="led-glow-off" gradientUnits="userSpaceOnUse" cx="-100" cy="0" r="40">
          <stop offset="0" stopColor="#56d364" stopOpacity=".35" />
          <stop offset="1" stopColor="#56d364" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="led-off">{dots.filter(dot => !dot.lit).map(dot => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="3.1" />)}</g>
      <g className="led-off-glow" fill="url(#led-glow-off)">{dots.filter(dot => !dot.lit).map(dot => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="3.1" />)}</g>
      <g className="led-lit">{dots.filter(dot => dot.lit).map(dot => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="4.1" style={{ '--c': dot.column } as CSSProperties} />)}</g>
      <g className="led-lit-glow" fill="url(#led-glow-lit)">{dots.filter(dot => dot.lit).map(dot => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="4.1" />)}</g>
    </svg>
  )
}
