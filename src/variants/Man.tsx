import { useState, type CSSProperties } from 'react'
import './man.css'
import { useLanguage } from '../LanguageProvider'
import { projects } from '../content'
import { contacts, LanguageSwitch, linkProps } from './shared'

export default function Man() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(projects[0])
  const month = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="man">
      <div className="man-page">
        <header className="man-rule"><span>NATAN(1)</span><span>General Commands Manual</span><span>NATAN(1)</span></header>

        <div className="man-body">
          <div className="man-col">
            <section>
              <h2>NAME</h2>
              <h1 className="man-indent"><b>natan</b> — software engineer</h1>
            </section>
            <section>
              <h2>SYNOPSIS</h2>
              <p className="man-indent"><b>natan</b> [<b>--build</b> <u>tool</u>] [<b>--then</b> <u>make-it-better</u>]</p>
            </section>
            <section className="man-projects">
              <h2>PROJECTS</h2>
              <ul className="man-indent">
                {projects.map(project => (
                  <li key={project.slug}>
                    <button type="button" aria-pressed={project === selected} onClick={() => setSelected(project)} style={{ '--accent': project.accent } as CSSProperties}>
                      <span className="man-opt"><b>{project.slug}</b></span>
                      <span className="man-desc">{t(project.description)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2>SEE ALSO</h2>
              <p className="man-indent man-see">
                {contacts.map((contact, index) => (
                  <span key={contact.key}><a {...linkProps(contact.href)} aria-label={`${contact.key}: ${contact.label}`}><b>{contact.short}</b>(1)</a>{index < contacts.length - 1 ? ', ' : ''}</span>
                ))}
              </p>
            </section>
          </div>

          <article className="man-detail" key={selected.slug} aria-live="polite">
            <h2>DESCRIPTION</h2>
            <div className="man-indent">
              <div className="man-head">
                <img src={selected.icon} alt="" />
                <div>
                  <h3>{selected.name}</h3>
                  <p>{t(selected.category)}</p>
                </div>
              </div>
              <p className="man-lead">{t(selected.description)}</p>
              <p>{t(selected.details)}</p>
            </div>
            <h2>STACK</h2>
            <p className="man-indent">{selected.tags.map((tag, index) => <span key={tag}><u>{tag}</u>{index < selected.tags.length - 1 ? ', ' : ''}</span>)}</p>
            <h2>LINKS</h2>
            <p className="man-indent man-links">
              {selected.links.map(link => <a key={link.label} {...linkProps(link.href)}>{t(link.label)} ↗</a>)}
            </p>
          </article>
        </div>

        <footer className="man-rule"><span>slvdr 2.6</span><span>{month}</span><LanguageSwitch className="man-langs" /></footer>
      </div>
    </div>
  )
}
