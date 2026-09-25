import { useEffect, useState } from 'react'
import ExperienceDiagram from './ExperienceDiagram'
import TechnologyStack from './TechnologyStack'
import PillTunnel from './PillTunnel'
import GlassesIllustration from './GlassesIllustration'
import PixelGrid from './PixelGrid'

const aboutFacts = [
  { label: 'Born in', value: 'France, Spanish roots' },
  { label: 'Speaks', value: 'French, English, Spanish' },
  { label: 'Trained in', value: 'Systems & networks' },
]

type WorkItem = { title: string; detail: string }

const cyberesistWork: WorkItem[] = [
  { title: 'Scan orchestration', detail: 'Audits are split into background tasks with Huey and Redis. Each task tracks its dependencies, progress, and timeout, so one failing tool does not stop the whole audit.' },
  { title: 'Tool integration', detail: 'I integrate external security tools and normalize their JSON, XML, plain-text, and proprietary outputs into one consistent findings format.' },
  { title: 'Client API', detail: 'Secure APIs built with Django Ninja give clients direct access to their audits, results, and reports.' },
  { title: 'Automated reports', detail: 'PDF, DOCX, and XLSX deliverables are generated automatically, with LLM-assisted summaries, instead of being assembled by hand.' },
  { title: 'Modular architecture', detail: 'A modular Django and Python codebase that I designed and have kept evolving since 2023.' },
  { title: 'Deployment & operations', detail: 'I deploy and run the platform on Linux with Docker Compose, Gunicorn, and MariaDB/MySQL, and keep its services healthy in production.' },
]

const sccWork: WorkItem[] = [
  { title: 'Windows Server', detail: 'Active Directory, Group Policy, DNS and DHCP, file servers and access rights, remote access, WSUS updates, and application services.' },
  { title: 'Level-3 support', detail: 'Diagnosing and fixing escalated incidents on workstations and servers, user accounts and access, Microsoft 365 and Exchange, and business apps.' },
  { title: 'SQL Server', detail: 'Backups and restores, instance maintenance, planned updates and restarts, then checking that the applications behind them still worked.' },
]

const github = 'https://github.com/NatanSlvdr'
const linkedin = 'https://www.linkedin.com/in/natan-salvador'
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
  art: 'caffeine' | 'partix' | 'stageswap' | 'starshield' | 'localecho'
  icon: string
  links: { label: string; href: string }[]
}

// Project links point to known repositories or releases; add live URLs here when available.
const projects: Project[] = [
  {
    number: '01',
    name: 'Caffeine Protocol',
    category: 'Interactive game',
    description: 'A browser game that teaches programming through a busy robot café.',
    details: 'Over 32 shifts, you program three café robots with instruction blocks such as IF, loops, and functions, then run the service and watch every order play out. Each solution is checked against several scenarios, so it has to work every time, not just once.',
    tags: ['React', 'TypeScript', 'Three.js'],
    art: 'caffeine',
    icon: '/assets/caffeine-icon.png',
    links: [{ label: 'Explore repository', href: `${github}/Caffeine-Protocol` }],
  },
  {
    number: '02',
    name: 'Partix',
    category: 'Realtime platform',
    description: 'Board games with friends, each person playing from their own phone.',
    details: 'A host opens a private room and friends join from their phones. The first game is Werewolf: a narrator guides the game through its phases in real time, while the server enforces the rules and gives each player a private view, so nobody sees a role they shouldn\'t.',
    tags: ['React', 'TypeScript', 'Convex'],
    art: 'partix',
    icon: '/assets/partix-icon.svg',
    links: [{ label: 'Ask for a walkthrough', href: `mailto:${email}?subject=Partix%20walkthrough` }],
  },
  {
    number: '03',
    name: 'StageSwap',
    category: 'Windows utility',
    description: 'A Zoom camera that switches between your webcam and your presentation on its own.',
    details: 'StageSwap watches the screen used for presentations and compares it with a reference picture. When media starts, Zoom receives the screen; when it stops, the webcam comes back with a smooth transition. It runs entirely on the Windows computer.',
    tags: ['Rust', 'Windows', 'Video'],
    art: 'stageswap',
    icon: '/assets/stageswap-icon.png',
    links: [
      { label: 'Download app', href: `${github}/StageSwap/releases/latest` },
      { label: 'Source code', href: `${github}/StageSwap` },
    ],
  },
  {
    number: '04',
    name: 'Star Shield',
    category: 'SaaS product',
    description: 'A dashboard that helps businesses understand and manage their online reviews.',
    details: 'Teams connect their Google Business Profile locations, collect customer feedback through QR codes, and follow reviews and trends for each site from one place.',
    tags: ['Next.js', 'Convex', 'Clerk'],
    art: 'starshield',
    icon: '/assets/starshield-logo.png',
    links: [{ label: 'Explore repository', href: `${github}/starshield-v2` }],
  },
  {
    number: '05',
    name: 'Local-Echo',
    category: 'macOS app',
    description: 'Private voice dictation for the Mac: hold a key, speak, and your words appear at the cursor.',
    details: 'Speech recognition runs on the Mac with whisper.cpp and MLX, then a small local model cleans up punctuation, formatting, and obvious recognition errors. No audio or text ever leaves the machine.',
    tags: ['Swift', 'whisper.cpp', 'MLX'],
    art: 'localecho',
    icon: '/assets/local-echo-icon.svg',
    links: [{ label: 'Explore repository', href: `${github}/local-echo` }],
  },
]

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// Brand marks make external profiles recognizable at a glance.
function SocialIcon({ name }: { name: 'github' | 'linkedin' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {name === 'github'
        ? <path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23A11.52 11.52 0 0 1 12 6.317c1.02.005 2.045.138 3.003.404 2.291-1.553 3.298-1.23 3.298-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12 12 0 0 0 12 .297z" />
        : <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.118 20.452H2.555V9h3.563v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
    </svg>
  )
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

function ProjectRow({ project }: { project: Project }) {
  return (
    <li className={`project-row project-${project.art}`} data-reveal>
      <span className="project-icon"><img src={project.icon} alt="" loading="lazy" /></span>
      <div className="project-main">
        <div className="project-heading"><h3>{project.name}</h3><span className="project-category">{project.number} · {project.category}</span></div>
        <p className="project-lead">{project.description}</p>
        <p className="project-details">{project.details}</p>
      </div>
      <div className="project-side">
        <ul className="project-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-links">
          {project.links.map(link => (
            <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} key={link.label}>
              {link.label}<ArrowIcon />
            </a>
          ))}
        </div>
      </div>
    </li>
  )
}

function WorkList({ label, items }: { label: string; items: WorkItem[] }) {
  return (
    <div className="experience-built">
      <span className="experience-label">{label}</span>
      <ul>
        {items.map((item, index) => (
          <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.title}</strong><p>{item.detail}</p></li>
        ))}
      </ul>
    </div>
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
            <figure className="robot-stage" data-reveal>
              <GlassesIllustration />
            </figure>
            <div className="section-intro story-intro" data-reveal><span className="section-index">01 / ABOUT ME</span><h2 id="about-title">I build what I need.<br /><span>Then I make it better.</span></h2></div>
            <div className="story-copy" data-reveal>
              <p className="story-lead">I started coding at 12, making small websites for problems I ran into. When video converters failed or hid larger files behind a paywall, I made my own.</p>
              <p>That habit led me to systems and support at SCC France, then to backend engineering at Cyberesist. Along the way I learned to be patient with problems: find the real cause, try another route when the first fix fails, and check that the result actually helps someone.</p>
              <p>I still build things in my own time. Once something works, I start wondering how to make it simpler, faster, or nicer to use.</p>
              <dl className="story-facts">
                {aboutFacts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>

        <section className="experience-section" id="experience" aria-labelledby="experience-title">
          <div className="container experience-inner">
            <div className="section-intro experience-intro" data-reveal><span className="section-index">02 / EXPERIENCE</span><div><h2 id="experience-title">The work<br /><span>behind the work.</span></h2><p>From keeping critical systems running to building the software behind a cybersecurity platform, I care about how a product behaves in real use.</p></div></div>
            <div className="experience-list">
              <article className="experience-row is-current" data-reveal>
                <div className="experience-date">2023 — NOW <span>FREELANCE</span></div>
                <div className="timeline-rail"><span>01</span></div>
                <div className="experience-content">
                  <div className="experience-heading"><h3>Backend Engineer <span>/</span> Cyberesist</h3><span>CYBERSECURITY SAAS</span></div>
                  <p className="experience-summary">I design and build the backend of <strong>Cyberesist</strong>, a SaaS platform where security teams launch <strong>internal and external audits</strong>, follow them while they run, and deliver the results to their clients.</p>
                  <div className="experience-story">
                    <div className="experience-project"><span>THE PROJECT</span><p>An audit starts from a scope: the <strong>subdomains and IP addresses</strong> a client wants checked. The platform discovers the servers, open ports, and services behind them, then runs the right security tools against each one. Every tool reports in its own way, so the results are brought together as one list of findings that analysts review before a <strong>client report</strong> is produced.</p></div>
                    <div className="experience-project"><span>THE HARD PART</span><p>Audits are long and unpredictable. One audit can run many tools for a long time; some time out or fail halfway, and others depend on results that are not ready yet. The backend has to keep going anyway: track the progress of every step, record what failed, and still give analysts <strong>usable findings and a report</strong>.</p></div>
                  </div>
                  <ExperienceDiagram />
                  <WorkList label="WHAT I BUILT" items={cyberesistWork} />
                  <TechnologyStack role="cyberesist" />
                </div>
              </article>
              <article className="experience-row" data-reveal>
                <div className="experience-date">2021 — 2023 <span>APPRENTICESHIP</span></div>
                <div className="timeline-rail"><span>02</span></div>
                <div className="experience-content">
                  <div className="experience-heading"><h3>Systems & Network Admin <span>/</span> SCC France</h3><span>INFRASTRUCTURE & DBA</span></div>
                  <p className="experience-summary">During my apprenticeship, I looked after the <strong>Windows servers, accounts, and databases</strong> people relied on every day, and handled the support cases that needed deeper investigation.</p>
                  <div className="experience-story">
                    <div className="experience-project"><span>THE ROLE</span><p>I joined SCC France while studying for my BTS in systems and networks, working as a <strong>system and network administrator and DBA</strong>. My work covered Windows Server administration, level-3 support for workstations, servers, Microsoft 365, and business applications, and the maintenance of SQL Server instances.</p></div>
                    <div className="experience-project"><span>THE HARD PART</span><p>The visible problem was often far from its cause. A user who could not open an app might have a permission, network, or database issue behind it. I learned to trace issues across each layer, plan updates and restarts carefully, and check that the <strong>application itself worked again</strong> after an intervention, not just the server.</p></div>
                  </div>
                  <WorkList label="WHAT I LOOKED AFTER" items={sccWork} />
                  <TechnologyStack role="scc" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section apps-section container" id="apps" aria-labelledby="apps-title">
          <div className="section-intro" data-reveal><span className="section-index">03 / THINGS I'VE MADE</span><div><h2 id="apps-title">A little practical.<br /><span>A little playful.</span></h2><p>My projects move between tools that solve specific problems and ideas I wanted to explore. Each one taught me something different.</p></div></div>
          <ol className="project-list">{projects.map(project => <ProjectRow key={project.name} project={project} />)}</ol>
          <div className="section-endnote"><span>MORE IN THE WORKS</span><a href={github} target="_blank" rel="noopener noreferrer">Browse all repositories <ArrowIcon /></a></div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <div className="contact-top">04 / CONTACT</div>
            <div className="contact-content">
              <div className="contact-copy">
                <h2 id="contact-title">Questions or ideas?<br /><em>My inbox is open.</em></h2>
                <p>For projects, opportunities, or just a hello, feel free to reach out.</p>
              </div>
              <div className="contact-actions">
                <a href={`mailto:${email}`} className="contact-button contact-email">
                  <span className="contact-button-icon"><SectionIcon name="contact" /></span>
                  <span className="contact-button-text"><strong>Send an email</strong><small>{email}</small></span>
                  <ArrowIcon />
                </a>
                <a className="contact-button contact-social linkedin" href={linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="contact-button-icon"><SocialIcon name="linkedin" /></span>
                  <span className="contact-button-text"><strong>LinkedIn</strong><small>Connect professionally</small></span>
                  <ArrowIcon />
                </a>
                <a className="contact-button contact-social github" href={github} target="_blank" rel="noopener noreferrer">
                  <span className="contact-button-icon"><SocialIcon name="github" /></span>
                  <span className="contact-button-text"><strong>GitHub</strong><small>Explore my projects</small></span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} NATAN SALVADOR</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </div>
  )
}

export default App
