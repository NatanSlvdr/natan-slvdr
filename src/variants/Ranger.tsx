import { useState, type CSSProperties } from 'react'
import './ranger.css'
import { useLanguage } from '../LanguageProvider'
import { projects } from '../content'
import { contacts, LanguageSwitch, linkProps, useClock } from './shared'

type Folder = 'projects' | 'contact'

export default function Ranger() {
  const { t } = useLanguage()
  const [folder, setFolder] = useState<Folder>('projects')
  const [project, setProject] = useState(projects[0])
  const [contact, setContact] = useState(contacts[0])
  const clock = useClock()
  const path = folder === 'projects' ? `~/projects/${project.slug}` : `~/contact/${contact.key}`
  const count = folder === 'projects' ? projects.length : contacts.length
  const index = folder === 'projects' ? projects.indexOf(project) : contacts.indexOf(contact)

  return (
    <div className="rg">
      <header className="rg-top">
        <h1><b>Natan Salvador</b> <span>— software engineer. {t('I build the tools I need, then make them **better**.').replace(/\*\*/g, '')}</span></h1>
        <span className="rg-path" aria-hidden="true"><span className="rg-user">natan@slvdr</span> {path}</span>
      </header>

      <div className="rg-cols">
        <nav className="rg-col rg-parent" aria-label="Folders">
          <p className="rg-col-title" aria-hidden="true">~</p>
          {(['projects', 'contact'] as Folder[]).map(name => (
            <button type="button" key={name} className="rg-row" aria-pressed={folder === name} onClick={() => setFolder(name)}>
              <span className="rg-glyph" aria-hidden="true">▸</span><span className="rg-dir">{name}/</span><span className="rg-size">{name === 'projects' ? projects.length : contacts.length}</span>
            </button>
          ))}
        </nav>

        <div className="rg-col rg-list">
          <p className="rg-col-title" aria-hidden="true">{folder}/</p>
          {folder === 'projects'
            ? projects.map(item => (
              <button type="button" key={item.slug} className="rg-row" aria-pressed={item === project} onClick={() => setProject(item)} style={{ '--accent': item.accent } as CSSProperties}>
                <img src={item.icon} alt="" /><span className="rg-file">{item.slug}</span><span className="rg-size">{t(item.category)}</span>
              </button>
            ))
            : contacts.map(item => (
              <button type="button" key={item.key} className="rg-row" aria-pressed={item === contact} onClick={() => setContact(item)}>
                <span className="rg-glyph" aria-hidden="true">@</span><span className="rg-file">{item.key}</span>
              </button>
            ))}
        </div>

        <article className="rg-col rg-preview" key={folder + (folder === 'projects' ? project.slug : contact.key)} aria-live="polite" style={{ '--accent': folder === 'projects' ? project.accent : '#3888f8' } as CSSProperties}>
          {folder === 'projects' ? (
            <>
              <div className="rg-head">
                <img src={project.icon} alt="" />
                <div><h2>{project.name}</h2><p>{t(project.category)}</p></div>
              </div>
              <p className="rg-lead">{t(project.description)}</p>
              <p className="rg-text">{t(project.details)}</p>
              <ul className="rg-tags" aria-label={t('Technologies')}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              <div className="rg-actions">
                {project.links.map(link => <a key={link.label} {...linkProps(link.href)}>{t(link.label)} <span aria-hidden="true">↗</span></a>)}
              </div>
            </>
          ) : (
            <>
              <div className="rg-head"><div><h2>{contact.key}</h2><p>{t('Questions, ideas, or just a hello? My inbox is open.')}</p></div></div>
              <p className="rg-lead">{contact.label}</p>
              <div className="rg-actions"><a {...linkProps(contact.href)}>open <span aria-hidden="true">↗</span></a></div>
            </>
          )}
        </article>
      </div>

      <footer className="rg-status">
        <span className="rg-mode">slvdr</span>
        <span className="rg-meta" aria-hidden="true">{index + 1}/{count}</span>
        <span className="rg-spacer" />
        <LanguageSwitch className="rg-langs" />
        <span className="rg-clock" aria-hidden="true">{clock}</span>
      </footer>
    </div>
  )
}
