import { useState, type CSSProperties } from 'react'
import './minimal.css'
import { useLanguage } from '../LanguageProvider'
import { projects } from '../content'
import { contacts, LanguageSwitch, linkProps, useTyped } from './shared'

export default function Minimal() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(projects[0])
  const command = useTyped('ls ~/projects', 900, 55)

  return (
    <div className="mn" style={{ '--accent': selected.accent } as CSSProperties}>
      <main className="mn-center">
        <p className="mn-prompt" aria-hidden="true">natan@slvdr ~ %</p>
        <h1>Natan Salvador<span className="mn-caret" aria-hidden="true" /></h1>
        <p className="mn-tag">Software engineer. {t('I build the tools I need, then make them **better**.').replace(/\*\*/g, '')}</p>

        <p className="mn-prompt mn-cmd" aria-hidden="true">% <span>{command.text}</span></p>
        <ul className={`mn-grid ${command.done ? 'is-shown' : ''}`}>
          {projects.map((project, index) => (
            <li key={project.slug} style={{ '--i': index, '--tile': project.accent } as CSSProperties}>
              <button type="button" aria-label={project.name} aria-pressed={project === selected} onClick={() => setSelected(project)}>
                <span className="mn-icon"><img src={project.icon} alt="" /></span>
                <span className="mn-name">{project.slug}</span>
              </button>
            </li>
          ))}
        </ul>

        <article className={`mn-detail ${command.done ? 'is-shown' : ''}`} key={selected.slug} aria-live="polite">
          <div>
            <p className="mn-kind">{t(selected.category)} · {selected.tags.join(' · ')}</p>
            <p className="mn-lead">{t(selected.description)}</p>
            <p className="mn-text">{t(selected.details)}</p>
          </div>
          <div className="mn-links">
            {selected.links.map(link => <a key={link.label} {...linkProps(link.href)}>{t(link.label)} <span aria-hidden="true">↗</span></a>)}
          </div>
        </article>
      </main>

      <footer className="mn-foot">
        <ul>{contacts.map(contact => <li key={contact.key}><a {...linkProps(contact.href)} aria-label={`${contact.key}: ${contact.label}`}>{contact.short}</a></li>)}</ul>
        <LanguageSwitch className="mn-langs" />
      </footer>
    </div>
  )
}
