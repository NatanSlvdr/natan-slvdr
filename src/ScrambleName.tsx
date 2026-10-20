import { useEffect, useRef, useState } from 'react'

const lines = ['Natan', 'Salvador']
const letters = lines.join('')
const glyphs = '!<>-_\\/[]{}=+*^?#%&$@'

// Picks a glyph that changes every 70 ms, without storing random state per letter.
function glyphFor(index: number, time: number) {
  const noise = Math.abs(Math.sin(index * 12.9898 + Math.floor(time / 70) * 78.233)) * 43758.5453
  return glyphs[Math.floor(noise) % glyphs.length]
}

// Letters decode from random glyphs on load, and scramble again briefly under the pointer.
export default function ScrambleName({ onDone }: { onDone: () => void }) {
  const [display, setDisplay] = useState(() => [...letters].map((_, index) => glyphFor(index, 0)))
  const resolveAt = useRef<number[]>([])
  const frame = useRef(0)
  const finished = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  function animate() {
    if (frame.current) return
    const tick = (time: number) => {
      let pending = false
      setDisplay([...letters].map((letter, index) => {
        if (time >= resolveAt.current[index]) return letter
        pending = true
        return glyphFor(index, time)
      }))
      if (pending) {
        frame.current = requestAnimationFrame(tick)
        return
      }
      frame.current = 0
      if (!finished.current) {
        finished.current = true
        onDoneRef.current()
      }
    }
    frame.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    const start = performance.now()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resolveAt.current = [...letters].map((_, index) => reducedMotion ? 0 : start + 400 + index * 75 + Math.random() * 160)
    animate()
    return () => {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
  }, [])

  function scramble(index: number) {
    if (!finished.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const now = performance.now()
    for (const [offset, duration] of [[0, 380], [-1, 220], [1, 220]]) {
      const neighbour = index + offset
      // Stay within the hovered line so the effect doesn't jump between words.
      if (neighbour < 0 || neighbour >= letters.length || (neighbour < lines[0].length) !== (index < lines[0].length)) continue
      resolveAt.current[neighbour] = Math.max(resolveAt.current[neighbour], now + duration + Math.random() * 120)
    }
    animate()
  }

  let offset = 0
  return (
    <h1 className="name" aria-label={lines.join(' ')}>
      {lines.map((line, lineIndex) => {
        const start = offset
        offset += line.length
        return (
          <span className={`name-line name-line-${lineIndex + 1}`} aria-hidden="true" key={line}>
            {[...line].map((letter, letterIndex) => {
              const index = start + letterIndex
              return <span key={index} className={display[index] === letter ? undefined : 'is-scrambled'} onPointerEnter={() => scramble(index)}>{display[index]}</span>
            })}
            {lineIndex === lines.length - 1 && <span className="cursor" />}
          </span>
        )
      })}
    </h1>
  )
}
