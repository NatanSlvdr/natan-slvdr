import { useEffect, useRef, useState, type RefObject } from 'react'
import AsciiName from './AsciiName'
import Block, { Prompt } from './Block'
import Projects from './Projects'
import { useLanguage } from './LanguageProvider'
import { languages } from './language'
import { email, fetchInfo, github, linkedin, projects } from './content'

const sections = [
  { id: 'fetch', path: '~' },
  { id: 'about', path: '~/about.md' },
  { id: 'projects', path: '~/projects' },
  { id: 'contact', path: '~/contact' },
] as const
type SectionId = (typeof sections)[number]['id']

const palette = ['#101216', '#e83828', '#56d364', '#e3b341', '#3888f8', '#db61a2', '#39c5cf', '#d8d8d9']

function formatLogin(date: Date) {
  const part = (options: Intl.DateTimeFormatOptions) => date.toLocaleString('en-US', options)
  const time = date.toTimeString().slice(0, 8)
  return `${part({ weekday: 'short' })} ${part({ month: 'short' })} ${String(date.getDate()).padStart(2, ' ')} ${time}`
}
const lastLogin = formatLogin(new Date())

// Renders **emphasis** the way a terminal markdown viewer would: markers dimmed, text bright.
function Markdown({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*)/).map((part, index) => part.startsWith('**')
    ? <strong key={index}><span className="md-mark">**</span>{part.slice(2, -2)}<span className="md-mark">**</span></strong>
    : part)}</>
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

function App() {
  const { language, setLanguage, t } = useLanguage()
  const termRef = useRef<HTMLElement>(null)
  const cellRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState<SectionId>('fetch')
  const size = useTerminalSize(termRef, cellRef)
  const clock = useClock()

  useEffect(() => {
    const term = termRef.current
    if (!term) return
    const update = () => {
      const marker = term.scrollTop + term.clientHeight * 0.4
      let current: SectionId = 'fetch'
      for (const section of sections) {
        if ((document.getElementById(section.id)?.offsetTop ?? Infinity) <= marker) current = section.id
      }
      if (term.scrollTop + term.clientHeight >= term.scrollHeight - 4) current = 'contact'
      setActive(current)
    }
    update()
    term.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      term.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const activePath = sections.find(section => section.id === active)!.path

  return (
    <div className="desktop">
      <a className="skip-link" href="#projects">{t('Skip to projects')}</a>
      <div className="window">
        <header className="titlebar">
          <div className="lights" aria-hidden="true"><i /><i /><i /></div>
          <nav className="tabs" aria-label={t('Section navigation')}>
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>
                <span className="tab-index" aria-hidden="true">{index + 1}</span>{section.id}
              </a>
            ))}
          </nav>
          <span className="titlebar-size" aria-hidden="true">zsh {size && `— ${size}`}</span>
        </header>

        <main className="term" id="main" ref={termRef} tabIndex={-1}>
          <span className="cell-probe" ref={cellRef} aria-hidden="true">0</span>
          <p className="login" aria-hidden="true">Last login: {lastLogin} on ttys001</p>

          <Block id="fetch" command="fetch" took="12ms" immediate>
            <div className="fetch">
              <div className="fetch-hero">
                <AsciiName />
                <h1 className="fetch-name">Natan Salvador <span>/ {t('software engineer')}</span></h1>
                <p className="fetch-tagline"><Markdown text={t('I build the tools I need, then make them **better**.')} /></p>
              </div>
              <div className="fetch-card">
                <p className="fetch-user"><b>natan</b>@<b>slvdr</b></p>
                <p className="fetch-rule" aria-hidden="true">───────────</p>
                <dl>
                  {fetchInfo.map(row => <div key={row.key}><dt>{row.key}</dt><dd>{t(row.value)}</dd></div>)}
                  <div><dt>status</dt><dd className="status"><i aria-hidden="true" />{t('building something new')}</dd></div>
                </dl>
                <div className="swatches" aria-hidden="true">{palette.map(color => <i key={color} style={{ background: color }} />)}</div>
              </div>
            </div>
          </Block>

          <Block id="about" title={t('About')} command="bat about.md" took="8ms">
            <div className="bat">
              <div className="bat-rule" aria-hidden="true" />
              <div className="bat-line bat-file"><span aria-hidden="true" /><p><span className="bat-dim">File:</span> about.md</p></div>
              <div className="bat-rule" aria-hidden="true" />
              <div className="bat-line"><span aria-hidden="true">1</span><p className="md-heading"><span className="md-mark">#</span> {t('about')}</p></div>
              <div className="bat-line"><span aria-hidden="true">2</span><p /></div>
              <div className="bat-line"><span aria-hidden="true">3</span><p>{t("I started coding at 12, making small tools for problems I ran into. Today I'm a software engineer, mostly on the backend.")}</p></div>
              <div className="bat-line"><span aria-hidden="true">4</span><p /></div>
              <div className="bat-line"><span aria-hidden="true">5</span><p><Markdown text={t('In my own time I keep building things. Once something works, I start wondering how to make it **simpler**, **faster**, or **nicer to use**.')} /></p></div>
              <div className="bat-rule" aria-hidden="true" />
            </div>
          </Block>

          <Block id="projects" title={t('Projects')} command="ls ~/projects" took="4ms">
            <p className="comment">
              <span>total {projects.length}</span>
              <span className="comment-hint"># {t('click a project to open its README')}</span>
            </p>
            <Projects />
            <a className="more-link" href={github} target="_blank" rel="noopener noreferrer">
              <span className="link-prompt" aria-hidden="true">$</span> open github.com/NatanSlvdr <span className="bat-dim"># {t('Browse all repositories')}</span> <span aria-hidden="true">↗</span>
            </a>
          </Block>

          <Block id="contact" title={t('Contact')} command="contact" took="2ms">
            <p className="contact-intro">{t('Questions, ideas, or just a hello? My inbox is open.')}</p>
            <ul className="contact-list">
              <li>
                <span className="contact-key">email</span>
                <a href={`mailto:${email}`}>{email}<span aria-hidden="true"> →</span></a>
                <CopyButton text={email} />
              </li>
              <li>
                <span className="contact-key">github</span>
                <a href={github} target="_blank" rel="noopener noreferrer">github.com/NatanSlvdr<span aria-hidden="true"> ↗</span></a>
              </li>
              <li>
                <span className="contact-key">linkedin</span>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/natan-salvador<span aria-hidden="true"> ↗</span></a>
              </li>
            </ul>
          </Block>

          <div className="final">
            <Prompt caret />
            <p className="comment"># {t('thanks for stopping by')} · © {new Date().getFullYear()} Natan Salvador</p>
          </div>
        </main>

        <footer className="statusbar">
          <span className="status-session"><i aria-hidden="true" />slvdr</span>
          <span className="status-path" aria-hidden="true">{activePath}</span>
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
