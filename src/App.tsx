import { useEffect, useRef, useState, type RefObject } from 'react'
import Block from './Block'
import LedName from './LedName'
import Projects from './Projects'
import { useLanguage } from './LanguageProvider'
import { languages } from './language'
import { email, github, linkedin, projects } from './content'

const palette = ['#101216', '#e83828', '#56d364', '#e3b341', '#3888f8', '#db61a2', '#39c5cf', '#d8d8d9']

function formatLogin(date: Date) {
  const part = (options: Intl.DateTimeFormatOptions) => date.toLocaleString('en-US', options)
  return `${part({ weekday: 'short' })} ${part({ month: 'short' })} ${date.getDate()} ${date.toTimeString().slice(0, 8)}`
}
const lastLogin = formatLogin(new Date())

// Renders **emphasis** from translated copy; the markers themselves are not shown.
function Emphasis({ text }: { text: string }) {
  return <>{text.split(/\*\*([^*]+)\*\*/).map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>
}

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
  { key: 'github', label: 'NatanSlvdr', href: github },
  { key: 'linkedin', label: 'natan-salvador', href: linkedin },
]

function ContactLink({ contact, short = false }: { contact: (typeof contacts)[number]; short?: boolean }) {
  const external = contact.href.startsWith('http')
  return (
    <a href={contact.href} aria-label={`${contact.key}: ${contact.label}`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {short ? contact.key : contact.label}<span aria-hidden="true"> {external ? '↗' : '→'}</span>
    </a>
  )
}

function App() {
  const { language, setLanguage, t } = useLanguage()
  const [stage, setStage] = useState(0)
  const [selected, setSelected] = useState(projects[0])
  const termRef = useRef<HTMLElement>(null)
  const cellRef = useRef<HTMLSpanElement>(null)
  const size = useTerminalSize(termRef, cellRef)
  const clock = useClock()

  return (
    <div className="desktop">
      <div className="window">
        <header className="titlebar">
          <div className="lights" aria-hidden="true"><i /><i /><i /></div>
          <span className="titlebar-title" aria-hidden="true">natan@slvdr — zsh</span>
          <span className="titlebar-size" aria-hidden="true">{size}</span>
        </header>

        <main className="term" ref={termRef}>
          <span className="cell-probe" ref={cellRef} aria-hidden="true">0</span>
          <p className="login" aria-hidden="true">Last login: {lastLogin} on ttys001</p>

          <Block id="fetch" command="fetch" took="12ms" active={stage >= 0} onDone={() => setStage(stage => Math.max(stage, 1))}>
            {done => (
              <div className="fetch">
                <div className="fetch-hero">
                  <LedName start={done} />
                  <h1 className="fetch-name">Natan Salvador <span>/ {t('software engineer')}</span></h1>
                  <p className="fetch-tagline"><Emphasis text={t('I build the tools I need, then make them **better**.')} /></p>
                  <ul className="fetch-links">{contacts.map(contact => <li key={contact.key}><ContactLink contact={contact} short /></li>)}</ul>
                </div>
                <div className="fetch-card">
                  <p className="fetch-user"><b>natan</b>@<b>slvdr</b></p>
                  <p className="fetch-rule" aria-hidden="true" />
                  <dl>
                    <div><dt>stack</dt><dd>python · typescript · rust · swift</dd></div>
                    <div><dt>uptime</dt><dd>{t('coding since age 12')}</dd></div>
                    <div><dt>status</dt><dd className="status"><i aria-hidden="true" />{t('building something new')}</dd></div>
                    {contacts.map(contact => (
                      <div key={contact.key}>
                        <dt>{contact.key}</dt>
                        <dd className="fetch-contact"><ContactLink contact={contact} />{contact.key === 'mail' && <CopyButton text={email} />}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="swatches" aria-hidden="true">{palette.map(color => <i key={color} style={{ background: color }} />)}</div>
                </div>
              </div>
            )}
          </Block>

          <Block id="projects" title={t('Projects')} command="ls ~/projects" took="4ms" active={stage >= 1} className="block-projects">
            {() => (
              <>
                <p className="comment">total {projects.length} <span># {t('click a project to open its README')}</span></p>
                <Projects selected={selected} onSelect={setSelected} />
              </>
            )}
          </Block>
        </main>

        <footer className="statusbar">
          <span className="status-session"><i aria-hidden="true" />slvdr</span>
          <span className="status-path" aria-hidden="true">~/projects/{selected.slug}</span>
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
