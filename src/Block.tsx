import { useEffect, useRef, useState, type ReactNode } from 'react'

// Without motion (reduced-motion users, very old browsers) every block renders finished.
export const canAnimate = typeof window !== 'undefined'
  && 'IntersectionObserver' in window
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Prompt({ path = '~', command = '', caret = false, meta }: { path?: string; command?: string; caret?: boolean; meta?: ReactNode }) {
  return (
    <div className="prompt" aria-hidden="true">
      <span className="prompt-user">natan@slvdr</span>
      <span className="prompt-path">{path}</span>
      <span className="prompt-arrow">❯</span>
      <span className="prompt-command">{command}</span>
      {caret && <span className="caret" />}
      {meta && <span className="prompt-meta">{meta}</span>}
    </div>
  )
}

type BlockProps = {
  id: string
  title?: string
  path?: string
  command: string
  took: string
  immediate?: boolean
  children: ReactNode
}

// A command block: the command types itself once the block scrolls into view,
// then its output fades in line by line. Output always keeps its layout space,
// so anchors and the section tracker never jump.
export default function Block({ id, title, path, command, took, immediate = false, children }: BlockProps) {
  const ref = useRef<HTMLElement>(null)
  const [typed, setTyped] = useState(canAnimate ? 0 : command.length)
  const [done, setDone] = useState(!canAnimate)

  useEffect(() => {
    if (!canAnimate) return
    const timers: number[] = []
    const type = () => {
      for (let index = 1; index <= command.length; index++) {
        timers.push(window.setTimeout(() => setTyped(index), 160 + index * 42))
      }
      timers.push(window.setTimeout(() => setDone(true), 160 + command.length * 42 + 220))
    }
    if (immediate) {
      timers.push(window.setTimeout(type, 450))
      return () => timers.forEach(clearTimeout)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      type()
    }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [command, immediate])

  const typing = typed > 0 && !done
  return (
    <section ref={ref} id={id} className="block" data-state={canAnimate ? (done ? 'done' : 'pending') : undefined} aria-labelledby={title ? `${id}-title` : undefined}>
      {title && <h2 className="sr-only" id={`${id}-title`}>{title}</h2>}
      <Prompt path={path} command={command.slice(0, typed)} caret={typing} meta={done && <><span className="ok">✓</span> {took}</>} />
      <div className="block-output">{children}</div>
    </section>
  )
}
