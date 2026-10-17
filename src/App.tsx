import { useEffect, useRef, useState, type RefObject } from 'react'
import Projects, { Pane } from './Projects'
import { useLanguage } from './LanguageProvider'
import { languages } from './language'
import { email, github, linkedin, projects } from './content'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(timer)
  }, [])
  return now.toTimeString().slice(0, 5)
}

// The title bar reports the terminal size in character cells, like a real one.
function useTerminalSize(element: RefObject<HTMLElement | null>, cell: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState('')
  useEffect(() => {
    if (!element.current || !cell.current || !('ResizeObserver' in window)) return
    const observer = new ResizeObserver(() => {
      const box = cell.current!.getBoundingClientRect()
      if (!box.width) return
      setSize(`${Math.floor(element.current!.clientWidth / box.width)}×${Math.floor(element.current!.clientHeight / box.height)}`)
    })
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [element, cell])
  return size
}

function CopyButton({ text }: { text: string }) {
  const { t } = useLanguage()
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  useEffect(() => {
    if (state === 'idle') return
    const timer = window.setTimeout(() => setState('idle'), 1800)
    return () => clearTimeout(timer)
  }, [state])
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
  }
  return (
    <button type="button" className={`copy is-${state}`} onClick={copy}>
      <span aria-live="polite">{state === 'copied' ? `✓ ${t('copied')}` : state === 'failed' ? t('copy failed') : t('copy')}</span>
    </button>
  )
}

const contacts = [
  { key: 'mail', label: email, href: `mailto:${email}` },
  { key: 'github', label: 'github.com/NatanSlvdr', href: github },
  { key: 'linkedin', label: 'in/natan-salvador', href: linkedin },
]

function App() {
  const { language, setLanguage, t } = useLanguage()
  const [selected, setSelected] = useState(projects[0])
  const workspaceRef = useRef<HTMLElement>(null)
  const cellRef = useRef<HTMLSpanElement>(null)
  const size = useTerminalSize(workspaceRef, cellRef)
  const clock = useClock()

  return (
    <div className="desktop">
      <div className="window">
        <header className="titlebar">
          <div className="lights" aria-hidden="true"><i /><i /><i /></div>
          <span className="titlebar-title" aria-hidden="true">natan@slvdr: ~/projects</span>
          <span className="titlebar-size" aria-hidden="true">{size}</span>
        </header>

        <main className="workspace" ref={workspaceRef}>
          <span className="cell-probe" ref={cellRef} aria-hidden="true">0</span>
          <Pane index={0} title="whoami" className="pane-intro">
            <div className="intro">
              <h1>Natan Salvador<span className="caret" aria-hidden="true" /></h1>
              <p>{t('Software engineer. I build the tools I need, then make them better.')}</p>
            </div>
            <ul className="contacts">
              {contacts.map(contact => {
                const external = contact.href.startsWith('http')
                return (
                  <li key={contact.key}>
                    <span className="contact-key" aria-hidden="true">{contact.key}</span>
                    <a href={contact.href} aria-label={`${contact.key}: ${contact.label}`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                      <span className="contact-label">{contact.label}</span>
                      <span className="contact-short" aria-hidden="true">{contact.key}</span>
                      <span aria-hidden="true"> {external ? '↗' : '→'}</span>
                    </a>
                    {contact.key === 'mail' && <CopyButton text={email} />}
                  </li>
                )
              })}
            </ul>
          </Pane>
          <Projects selected={selected} onSelect={setSelected} />
        </main>

        <footer className="statusbar">
          <span className="status-path" aria-hidden="true">~/projects/<b>{selected.slug}</b></span>
          <span className="status-spacer" />
          <div className="status-langs" role="group" aria-label={t('Language')}>
            {languages.map(option => (
              <button type="button" key={option.code} lang={option.code} title={option.name} aria-pressed={language === option.code} onClick={() => setLanguage(option.code)}>
                {option.code}
              </button>
            ))}
          </div>
          <span className="status-clock" aria-hidden="true">{clock}</span>
        </footer>
      </div>
    </div>
  )
}

export default App
