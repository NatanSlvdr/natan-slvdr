import { useEffect, useRef } from 'react'
import PixelGrid from './PixelGrid'

const keyRows = [15, 14, 13]

// Keep the screen in the first viewport, then reveal the flat computer as the page scrolls.
export default function HeroComputer() {
  const stageRef = useRef<HTMLElement>(null)
  const computerRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const computer = computerRef.current
    const screen = screenRef.current
    if (!stage || !computer || !screen) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const screenX = screen.offsetLeft + screen.offsetWidth / 2
      const screenY = screen.offsetTop + screen.offsetHeight / 2
      const computerX = (viewportWidth - computer.offsetWidth) / 2 + screenX
      const computerY = (viewportHeight - computer.offsetHeight) / 2 + screenY
      const stageTop = stage.getBoundingClientRect().top
      const progress = motionPreference.matches
        ? 1
        : Math.min(1, Math.max(0, -stageTop / (viewportHeight * 0.95)))
      const remaining = 1 - progress
      const coverScale = Math.max(viewportWidth / screen.offsetWidth, viewportHeight / screen.offsetHeight) * 1.04

      computer.style.transformOrigin = `${screenX}px ${screenY}px`
      computer.style.transform = `translate(${(viewportWidth / 2 - computerX) * remaining}px, ${(viewportHeight / 2 - computerY) * remaining}px) scale(${1 + (coverScale - 1) * remaining})`
      stage.style.setProperty('--hero-progress', String(progress))
      stage.classList.add('is-ready')
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    motionPreference.addEventListener('change', scheduleUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      motionPreference.removeEventListener('change', scheduleUpdate)
    }
  }, [])

  return (
    <section className="hero-stage" ref={stageRef} aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="retro-computer" ref={computerRef}>
          <div className="retro-monitor">
            <div className="retro-topline" aria-hidden="true"><span>N / S</span><span>PERSONAL COMPUTER</span></div>
            <div className="hero retro-screen" ref={screenRef}>
              <PixelGrid />
              <div className="hero-inner">
                <div className="hero-copy">
                  <h1 id="hero-title">Natan<br /><em>Salvador.</em></h1>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="retro-controls" aria-hidden="true">
              <div className="retro-vents"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="retro-drive"><span /></div>
              <div className="retro-power"><i /><span>POWER</span></div>
            </div>
          </div>
          <div className="retro-neck" aria-hidden="true" />
          <div className="retro-keyboard" aria-hidden="true">
            {keyRows.map((count, row) => (
              <div className="retro-key-row" key={count}>
                {Array.from({ length: count }, (_, key) => <i key={`${row}-${key}`} />)}
              </div>
            ))}
            <div className="retro-spacebar" />
          </div>
        </div>
      </div>
    </section>
  )
}
