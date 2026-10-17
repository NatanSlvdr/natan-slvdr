import { useEffect, useState, type ReactNode } from 'react'

// Without motion (reduced-motion users) every block renders finished.
export const canAnimate = typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
  command: string
  took: string
  active: boolean
  onDone?: () => void
  className?: string
  children: (done: boolean) => ReactNode
}

// A command block: once active, the command types itself, then its output
// fades in line by line. Blocks run in order, like a session starting up.
export default function Block({ id, title, command, took, active, onDone, className = '', children }: BlockProps) {
  const [typed, setTyped] = useState(canAnimate ? 0 : command.length)
  const [done, setDone] = useState(!canAnimate)

  useEffect(() => {
    if (!canAnimate) {
      onDone?.()
      return
    }
    if (!active) return
    const timers: number[] = []
    for (let index = 1; index <= command.length; index++) {
      timers.push(window.setTimeout(() => setTyped(index), 180 + index * 46))
    }
    const finished = 180 + command.length * 46 + 200
    timers.push(window.setTimeout(() => setDone(true), finished))
    timers.push(window.setTimeout(() => onDone?.(), finished + 650))
    return () => timers.forEach(clearTimeout)
    // onDone is a state setter from the parent and never changes.
  }, [active, command])

  return (
    <section id={id} className={`block ${className}`} data-state={canAnimate ? (done ? 'done' : 'pending') : undefined} aria-labelledby={title ? `${id}-title` : undefined}>
      {title && <h2 className="sr-only" id={`${id}-title`}>{title}</h2>}
      <Prompt path="~" command={command.slice(0, typed)} caret={active && !done} meta={done && <><span className="ok">✓</span> {took}</>} />
      <div className="block-output">{children(done)}</div>
    </section>
  )
}
