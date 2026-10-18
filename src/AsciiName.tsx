import { useRef, type PointerEvent } from 'react'

// "ANSI Shadow" figlet lettering. It is drawn as SVG instead of text so the
// blocks line up exactly, whatever box-drawing glyphs the visitor's fonts have.
const art = [
  '███╗   ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗',
  '████╗  ██║██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║',
  '██╔██╗ ██║███████║   ██║   ███████║██╔██╗ ██║',
  '██║╚██╗██║██╔══██║   ██║   ██╔══██║██║╚██╗██║',
  '██║ ╚████║██║  ██║   ██║   ██║  ██║██║ ╚████║',
  '╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝',
]

const W = 10
const H = 20
const D = 2 // half the gap between the two strokes of a double line
const columns = Math.max(...art.map(row => [...row].length))

// Each shadow glyph is two parallel strokes: [outer, inner] point lists.
function shadowPath(char: string, x: number, y: number) {
  const cx = x + W / 2
  const cy = y + H / 2
  const line = (points: number[][]) => 'M' + points.map(point => point.join(' ')).join('L')
  switch (char) {
    case '═': return line([[x, cy - D], [x + W, cy - D]]) + line([[x, cy + D], [x + W, cy + D]])
    case '║': return line([[cx - D, y], [cx - D, y + H]]) + line([[cx + D, y], [cx + D, y + H]])
    case '╗': return line([[x, cy - D], [cx + D, cy - D], [cx + D, y + H]]) + line([[x, cy + D], [cx - D, cy + D], [cx - D, y + H]])
    case '╔': return line([[x + W, cy - D], [cx - D, cy - D], [cx - D, y + H]]) + line([[x + W, cy + D], [cx + D, cy + D], [cx + D, y + H]])
    case '╝': return line([[x, cy + D], [cx + D, cy + D], [cx + D, y]]) + line([[x, cy - D], [cx - D, cy - D], [cx - D, y]])
    case '╚': return line([[x + W, cy + D], [cx - D, cy + D], [cx - D, y]]) + line([[x + W, cy - D], [cx + D, cy - D], [cx + D, y]])
    default: return ''
  }
}

let blocks = ''
let shadows = ''
art.forEach((row, rowIndex) => {
  const chars = [...row]
  const y = rowIndex * H
  // Merge horizontal runs of █ so neighbouring cells never show hairline seams.
  for (let start = 0; start < chars.length; start++) {
    if (chars[start] === '█') {
      let end = start
      while (chars[end + 1] === '█') end++
      blocks += `M${start * W} ${y}h${(end - start + 1) * W}v${H}h-${(end - start + 1) * W}z`
      start = end
    } else {
      shadows += shadowPath(chars[start], start * W, y)
    }
  }
})

export default function AsciiName() {
  const spotRef = useRef<SVGRadialGradientElement>(null)

  // A soft light follows the pointer across the letters.
  function moveSpot(event: PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - box.left) / box.width) * columns * W
    const y = ((event.clientY - box.top) / box.height) * art.length * H
    spotRef.current?.setAttribute('cx', String(x))
    spotRef.current?.setAttribute('cy', String(y))
    event.currentTarget.classList.add('is-lit')
  }

  function hideSpot(event: PointerEvent<SVGSVGElement>) {
    event.currentTarget.classList.remove('is-lit')
  }

  return (
    <svg className="ascii-name" viewBox={`-2 -2 ${columns * W + 4} ${art.length * H + 4}`} role="img" aria-label="Natan" onPointerMove={moveSpot} onPointerLeave={hideSpot}>
      <defs>
        <linearGradient id="ascii-fill" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#56d364" />
          <stop offset="0.55" stopColor="#45ccaa" />
          <stop offset="1" stopColor="#39c5cf" />
        </linearGradient>
        <radialGradient id="ascii-spot" ref={spotRef} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="90">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path className="ascii-shadow" d={shadows} />
      <path className="ascii-blocks" d={blocks} fill="url(#ascii-fill)" />
      <path className="ascii-spot" d={blocks} fill="url(#ascii-spot)" />
    </svg>
  )
}
