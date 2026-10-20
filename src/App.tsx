import { useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { languages } from './language'
import AsciiMonogram from './AsciiMonogram'
import ScrambleName from './ScrambleName'

type Platform = 'github' | 'linkedin' | 'email'

const links: { platform: Platform; name: string; label: string; href: string }[] = [
  { platform: 'github', name: 'GitHub', label: 'github.com/NatanSlvdr', href: 'https://github.com/NatanSlvdr' },
  { platform: 'linkedin', name: 'LinkedIn', label: 'linkedin.com/in/natan-salvador', href: 'https://www.linkedin.com/in/natan-salvador' },
  { platform: 'email', name: 'Email', label: 'pro.natansalvador@gmail.com', href: 'mailto:pro.natansalvador@gmail.com' },
]

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === 'email') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {platform === 'github'
        ? <path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23A11.52 11.52 0 0 1 12 6.317c1.02.005 2.045.138 3.003.404 2.291-1.553 3.298-1.23 3.298-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12 12 0 0 0 12 .297z" />
        : <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.118 20.452H2.555V9h3.563v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
    </svg>
  )
}

export default function App() {
  const { t, language, setLanguage } = useLanguage()
  const [ready, setReady] = useState(false)

  return (
    <div className={`page ${ready ? 'is-ready' : ''}`}>
      <header className="top">
        <span className="mark">slvdr</span>
        <nav className="languages" aria-label={t('Language')}>
          {languages.map(option => (
            <button
              key={option.code}
              type="button"
              lang={option.code}
              aria-label={option.name}
              aria-pressed={language === option.code}
              onClick={() => setLanguage(option.code)}
            >{option.code}</button>
          ))}
        </nav>
      </header>

      <main className="hero">
        <div className="intro">
          <ScrambleName onDone={() => setReady(true)} />
          <p className="tagline">{t('I build what I need. Then I make it better.')}</p>
          <ul className="links">
            {links.map(link => {
              const external = link.href.startsWith('http')
              return (
                <li key={link.platform}>
                  <a className={`link-${link.platform}`} href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={`${link.name}: ${link.label}`}>
                    <span className="link-icon"><PlatformIcon platform={link.platform} /></span>
                    <span className="link-label">{link.label}</span>
                    <span className="link-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <AsciiMonogram className="art" />
      </main>

      <footer className="bottom">© {new Date().getFullYear()}</footer>
    </div>
  )
}
