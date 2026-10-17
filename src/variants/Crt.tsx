import { useState } from 'react'
import '@fontsource/vt323/latin-400.css'
import './crt.css'
import { useLanguage } from '../LanguageProvider'
import { projects } from '../content'
import { contacts, LanguageSwitch, linkProps, useClock, useTyped } from './shared'

export default function Crt() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(projects[0])
  const clock = useClock()
  const name = useTyped('NATAN SALVADOR', 500, 70)

  return (
    <div className="crt">
      <div className="crt-bezel">
        <div className="crt-screen">
          <header className="crt-top">
            <span>SLVDR-OS 2.6 · READY</span>
            <LanguageSwitch className="crt-langs" />
            <span>{clock}</span>
          </header>

          <section className="crt-hero">
            <p className="crt-cmd">&gt; WHOAMI</p>
            <h1>{name.text}<span className="crt-caret" aria-hidden="true" /></h1>
            <p className="crt-tag">{t('software engineer')} — {t('I build the tools I need, then make them **better**.').replace(/\*\*/g, '')}</p>
          </section>

          <section className="crt-main">
            <div className="crt-menu">
              <p className="crt-cmd">&gt; LS PROJECTS</p>
              <ul>
                {projects.map((project, index) => (
                  <li key={project.slug}>
                    <button type="button" aria-pressed={project === selected} onClick={() => setSelected(project)}>
                      <span className="crt-num">{index + 1}</span>
                      <span className="crt-name">{project.name.toUpperCase()}</span>
                      <span className="crt-dots" aria-hidden="true" />
                      <span className="crt-kind">{t(project.category).toUpperCase()}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="crt-cmd crt-contact-cmd">&gt; CONTACT</p>
              <ul className="crt-contacts">
                {contacts.map(contact => <li key={contact.key}><a {...linkProps(contact.href)} aria-label={`${contact.key}: ${contact.label}`}>[{contact.short.toUpperCase()}]</a></li>)}
              </ul>
            </div>

            <article className="crt-box" key={selected.slug} aria-live="polite">
              <p className="crt-box-title">┤ {selected.slug.toUpperCase()}.TXT ├</p>
              <div className="crt-box-head">
                <img src={selected.icon} alt="" />
                <div>
                  <h2>{selected.name}</h2>
                  <p>{t(selected.category)}</p>
                </div>
              </div>
              <p className="crt-lead">{t(selected.description)}</p>
              <p className="crt-text">{t(selected.details)}</p>
              <p className="crt-stack">STACK: {selected.tags.join(' / ')}</p>
              <div className="crt-links">
                {selected.links.map(link => <a key={link.label} {...linkProps(link.href)}>[ {t(link.label).toUpperCase()} ]</a>)}
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  )
}
