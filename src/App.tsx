import { useEffect, useState, type PointerEvent } from 'react'
import ExperienceDiagram from './ExperienceDiagram'
import PillTunnel from './PillTunnel'
import PixelGrid from './PixelGrid'
import GlassesModel from './GlassesModel'

type FlowStep = {
  label: string
  detail: string
}

const sccFlow: FlowStep[] = [
  { label: 'Incident', detail: 'A user or service is blocked.' },
  { label: 'Trace cause', detail: 'Check identity, network, app, data.' },
  { label: 'Intervene', detail: 'Fix, restore, or maintain.' },
  { label: 'Verify', detail: 'Confirm the service works again.' },
]

const github = 'https://github.com/NatanSlvdr'
const email = 'pro.natansalvador@gmail.com'
const sections = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'apps', label: 'Apps' },
  { id: 'contact', label: 'Contact' },
] as const
type SectionId = (typeof sections)[number]['id']

type Project = {
  number: string
  name: string
  category: string
  description: string
  details: string
  tags: string[]
  art: 'caffeine' | 'partix' | 'stageswap' | 'starshield'
  links: { label: string; href: string }[]
}

// Project links point to known repositories or releases; add live URLs here when available.
const projects: Project[] = [
  {
    number: '01',
    name: 'Caffeine Protocol',
    category: 'Interactive game',
    description: 'Learn programming by running a very busy robot café.',
    details: 'Players program three robots, run a simulated café shift, inspect failed orders, and revise. Deterministic scenarios check that a solution works beyond one lucky run.',
    tags: ['React', 'TypeScript', 'Three.js'],
    art: 'caffeine',
    links: [{ label: 'Explore repository', href: `${github}/Caffeine-Protocol` }],
  },
  {
    number: '02',
    name: 'Partix',
    category: 'Realtime platform',
    description: 'A private space for playing board games together, wherever you are.',
    details: 'A host opens a room, friends join on their phones, and the game moves through its phases in real time. Each command is validated against the shared state before players receive their own private view.',
    tags: ['React', 'TypeScript', 'Convex'],
    art: 'partix',
    links: [{ label: 'Ask for a walkthrough', href: `mailto:${email}?subject=Partix%20walkthrough` }],
  },
  {
    number: '03',
    name: 'StageSwap',
    category: 'Windows utility',
    description: 'One virtual camera that knows when to show you or your presentation.',
    details: 'It captures a webcam and display, compares the screen with a reference image, and switches a single virtual camera output after a short debounce. Everything stays on the computer.',
    tags: ['Rust', 'Windows', 'Video'],
    art: 'stageswap',
    links: [
      { label: 'Download app', href: `${github}/StageSwap/releases/latest` },
      { label: 'Source code', href: `${github}/StageSwap` },
    ],
  },
  {
    number: '04',
    name: 'Star Shield',
    category: 'SaaS product',
    description: 'A calmer way for businesses to understand and manage their reputation.',
    details: 'Teams connect Google Business Profile locations, invite feedback through QR journeys, and follow reviews and trends by site from one dashboard.',
    tags: ['Next.js', 'Convex', 'Clerk'],
    art: 'starshield',
    links: [{ label: 'Explore repository', href: `${github}/starshield-v2` }],
  },
]

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// Line icons keep the section dock readable at both desktop and phone sizes.
function SectionIcon({ name }: { name: SectionId }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'top' && <><path d="m3.5 10 8.5-7 8.5 7V20H3.5z" /><path d="M9.5 20v-6h5v6" /></>}
      {name === 'about' && <><circle cx="12" cy="7.5" r="3.5" /><path d="M4.5 20c.6-4.1 3.3-6.2 7.5-6.2s6.9 2.1 7.5 6.2" /></>}
      {name === 'experience' && <><rect x="3.5" y="7" width="17" height="13" rx="2" /><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3.5 12.5c4.8 3 12.2 3 17 0M10 14.5h4" /></>}
      {name === 'apps' && <><rect x="3.5" y="3.5" width="7" height="7" rx="1.2" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.2" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.2" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.2" /></>}
      {name === 'contact' && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>}
    </svg>
  )
}

function ProjectArt({ kind }: { kind: Project['art'] }) {
  if (kind === 'caffeine') {
    return (
      <div className="project-art art-caffeine" aria-hidden="true">
        <div className="art-topline"><span>CAFFEINE_PROTOCOL.EXE</span><span>SHIFT 07 / 32</span></div>
        <div className="caffeine-scene">
          <span className="scene-grid" />
          <span className="caffeine-halo" />
          <img src="/assets/caffeine-icon.png" alt="" loading="lazy" />
          <span className="scene-pill">SERVICE RUNNING <i /></span>
        </div>
        <div className="art-bottomline"><span>IF ORDER == COFFEE</span><span>THEN BREW →</span></div>
      </div>
    )
  }

  if (kind === 'partix') {
    return (
      <div className="project-art art-partix" aria-hidden="true">
        <img src="/assets/partix-og.jpg" alt="" loading="lazy" />
        <span className="art-corner-label">PARTIX / GAME 01</span>
        <span className="partix-mark">LIVE SESSION <i /></span>
      </div>
    )
  }

  if (kind === 'stageswap') {
    return (
      <div className="project-art art-stageswap" aria-hidden="true">
        <div className="signal signal-a" /><div className="signal signal-b" /><div className="signal signal-c" />
        <span className="art-corner-label">INPUT 01 / WEBCAM</span>
        <img src="/assets/stageswap-icon.png" alt="" loading="lazy" />
        <span className="stageswap-output">OUTPUT / READY <i /></span>
      </div>
    )
  }

  return (
    <div className="project-art art-starshield" aria-hidden="true">
      <div className="starshield-orbit orbit-one" /><div className="starshield-orbit orbit-two" />
      <span className="art-corner-label">REPUTATION / SIGNAL</span>
      <div className="starshield-emblem"><img src="/assets/starshield-logo.png" alt="" loading="lazy" /></div>
      <span className="starshield-caption">LISTEN · LEARN · RESPOND</span>
    </div>
  )
}

function tiltCard(event: PointerEvent<HTMLElement>) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  event.currentTarget.style.setProperty('--card-x', `${-y * 14}deg`)
  event.currentTarget.style.setProperty('--card-y', `${x * 14}deg`)
}

function resetCard(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--card-x', '0deg')
  event.currentTarget.style.setProperty('--card-y', '0deg')
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-${project.art}`} onPointerMove={tiltCard} onPointerLeave={resetCard} data-reveal>
      <ProjectArt kind={project.art} />
      <div className="project-body">
        <div className="project-meta"><span>{project.number} / {project.category}</span><span className="project-cross">✳</span></div>
        <h3>{project.name}</h3>
        <p className="project-lead">{project.description}</p>
        <p className="project-details">{project.details}</p>
        <div className="project-tags" aria-label="Technologies">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          {project.links.map(link => (
            <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} key={link.label}>
              {link.label}<ArrowIcon />
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

function FlowDiagram({ steps, title, compact = false }: { steps: FlowStep[]; title: string; compact?: boolean }) {
  return (
    <figure className={compact ? 'flow-diagram is-compact' : 'flow-diagram'} onPointerMove={tiltCard} onPointerLeave={resetCard}>
      <figcaption><span>FLOW / {title}</span><span>SIMPLIFIED VIEW</span></figcaption>
      <ol className="flow-rail" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((step, index) => (
          <li className="flow-step" key={step.label}>
            <span className="flow-number">{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.label}</strong>
            <small>{step.detail}</small>
          </li>
        ))}
      </ol>
    </figure>
  )
}

function App() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('top')

  useEffect(() => {
    const updateNavigation = () => {
      setHasScrolled(window.scrollY > 48)
      const marker = window.scrollY + window.innerHeight * 0.7
      let current: SectionId = 'top'
      for (const section of sections.slice(1)) {
        if ((document.getElementById(section.id)?.offsetTop ?? Infinity) <= marker) current = section.id
      }
      setActiveSection(current)
    }
    updateNavigation()
    window.addEventListener('scroll', updateNavigation, { passive: true })
    window.addEventListener('resize', updateNavigation)
    return () => {
      window.removeEventListener('scroll', updateNavigation)
      window.removeEventListener('resize', updateNavigation)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })
    elements.forEach(element => observer.observe(element))
    document.documentElement.classList.add('motion-ready')
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <nav className={`bottom-nav ${hasScrolled ? 'is-expanded' : 'is-compact'}`} aria-label="Section navigation">
        <PillTunnel />
        {hasScrolled ? (
          <div className="bottom-nav-menu">
            {sections.map(section => (
              <a href={`#${section.id}`} key={section.id} aria-label={section.id === 'top' ? 'Back to top' : undefined} aria-current={activeSection === section.id ? 'location' : undefined}>
                <SectionIcon name={section.id} />
                <span className="nav-label">{section.label}</span>
              </a>
            ))}
          </div>
        ) : (
          <a className="scroll-prompt" href="#about" aria-label="Scroll to About me">
            <span className="scroll-prompt-copy">SCROLL</span>
            <span className="scroll-prompt-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v15m-6-6 6 6 6-6" /></svg></span>
          </a>
        )}
      </nav>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <PixelGrid />
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1 id="hero-title">Natan<br /><em>Salvador.</em></h1>
              <p>Software Engineer</p>
            </div>
          </div>
        </section>

        <section className="section story-section container" id="about" aria-labelledby="about-title">
          <div className="story-layout">
            <figure className="glasses-stage" data-reveal>
              <GlassesModel />
            </figure>
            <div className="story-copy" data-reveal>
              <span className="section-index">01 / ABOUT ME</span>
              <h2 id="about-title">A bit about me.</h2>
              <p className="story-lead">I started coding when I was 12. I can't point to one big moment that made me choose software engineering; building things was just something I kept doing.</p>
              <p>My work took me through support and systems before backend engineering. It taught me to be patient with problems. I don't give up easily: I like finding the actual cause, trying another route when the first fix fails, and checking that the solution really helps someone.</p>
              <p>I still build things in my own time because I enjoy it. When something works, I start wondering how to make it simpler, faster, or nicer to use.</p>
            </div>
          </div>
        </section>

        <section className="experience-section" id="experience" aria-labelledby="experience-title">
          <div className="container experience-inner">
            <div className="section-intro experience-intro" data-reveal><span className="section-index">02 / EXPERIENCE</span><div><h2 id="experience-title">The work<br /><span>behind the work.</span></h2><p>From keeping critical systems running to building the software behind a cybersecurity platform, I care about how a product behaves in real use.</p></div></div>
            <div className="experience-list">
              <article className="experience-row" data-reveal>
                <div className="experience-date">2023 — NOW <span>FREELANCE</span></div>
                <div className="timeline-rail"><span>01</span></div>
                <div className="experience-content">
                  <div className="experience-heading"><h3>Backend Engineer <span>/</span> Cyberesist</h3><span>CYBERSECURITY PLATFORM</span></div>
                  <p className="experience-summary">A platform that turns complex cybersecurity audits into a process analysts can launch, follow, review, and deliver to clients.</p>
                  <div className="experience-detail">
                    <div><span>THE PRODUCT</span><p>Cyberesist brings different scanning tools and their results into one audit workflow. Instead of juggling outputs by hand, an analyst sets a scope, starts the work, follows progress, reviews findings, and produces a client-ready report.</p></div>
                    <div><span>HOW IT WORKS</span><p>Django exposes the workflow and APIs. Huey tasks backed by Redis run scans outside the request path, then normalize mixed tool outputs into findings the analyst can inspect. Results feed PDF, DOCX, and spreadsheet deliverables.</p></div>
                    <div><span>THE CHALLENGE</span><p>Long-running scans can time out or fail halfway through. I worked on tracking progress and partial failures, making results comparable across tools, and keeping report generation dependable even when an audit does not follow the happy path.</p></div>
                  </div>
                  <ExperienceDiagram />
                  <div className="experience-tags"><span>Python / Django</span><span>Huey / Redis</span><span>MariaDB</span><span>Docker</span></div>
                </div>
              </article>
              <article className="experience-row" data-reveal>
                <div className="experience-date">2021 — 2023 <span>INFRASTRUCTURE</span></div>
                <div className="timeline-rail"><span>02</span></div>
                <div className="experience-content">
                  <div className="experience-heading"><h3>Systems & Network Admin <span>/</span> SCC France</h3><span>OPERATIONS & SUPPORT</span></div>
                  <p className="experience-summary">Keeping the systems people depend on available, secure, and understandable when something goes wrong.</p>
                  <div className="experience-detail">
                    <div><span>THE WORK</span><p>Users needed working devices, accounts, files, applications, and data. I handled advanced support and administration across Windows Server, Active Directory, Microsoft 365, networking services, and SQL Server.</p></div>
                    <div><span>HOW IT WORKED</span><p>An incident began with a user or service symptom. I traced it across identity, network, application, and data layers, then fixed or restored the affected part and verified that the user's actual workflow worked again.</p></div>
                    <div><span>THE CHALLENGE</span><p>The visible failure was often far from its cause. Backups, restores, policy changes, and maintenance required careful diagnosis and follow-through so a technical fix also restored the service people needed.</p></div>
                  </div>
                  <FlowDiagram steps={sccFlow} title="SCC incident workflow" compact />
                  <div className="experience-tags"><span>Windows Server</span><span>Active Directory</span><span>Microsoft 365</span><span>SQL Server</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section apps-section container" id="apps" aria-labelledby="apps-title">
          <div className="section-intro" data-reveal><span className="section-index">03 / THINGS I'VE MADE</span><div><h2 id="apps-title">A little practical.<br /><span>A little playful.</span></h2><p>My projects move between tools that solve specific problems and ideas I wanted to explore. Each one taught me something different.</p></div></div>
          <div className="project-grid">{projects.map(project => <ProjectCard key={project.name} project={project} />)}</div>
          <div className="section-endnote"><span>MORE IN THE WORKS</span><a href={github} target="_blank" rel="noopener noreferrer">Browse all repositories <ArrowIcon /></a></div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-inner"><div className="contact-top"><span>04 / SAY HELLO</span><span>GOOD IDEAS START WITH A CONVERSATION</span></div><h2 id="contact-title">Tell me what<br /><em>you're building.</em></h2><div className="contact-bottom"><a href={`mailto:${email}`} className="contact-email">{email}<ArrowIcon /></a><p>I like a good problem, especially one that matters to someone.</p></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><span className="brand-symbol">N<span>/</span>S</span><p>Curious by nature. Engineer by practice.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#about">About</a><a href="#experience">Experience</a><a href="#apps">Apps</a></div><div><span>CONNECT</span><a href={github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={`mailto:${email}`}>Email ↗</a></div><div><span>CV / DOWNLOAD</span><a href="/cv/natan-salvador-backend-ai.pdf" download>Backend & AI ↗</a><a href="/cv/natan-salvador-backend-python.pdf" download>Python / Django ↗</a><a href="/cv/natan-salvador-it-support.pdf" download>IT Support ↗</a></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} NATAN SALVADOR</span><span>MADE WITH INTENTION <span className="footer-spark">✳</span></span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </div>
  )
}

export default App
