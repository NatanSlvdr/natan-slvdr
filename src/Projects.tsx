import type { CSSProperties } from 'react'
import { useLanguage } from './LanguageProvider'
import { projects, type Project } from './content'

// An `ls` listing beside the selected project's README (stacked on phones).
export default function Projects({ selected, onSelect }: { selected: Project; onSelect: (project: Project) => void }) {
  const { t } = useLanguage()
  const position = projects.indexOf(selected) + 1

  return (
    <div className="explorer" style={{ '--accent': selected.accent } as CSSProperties}>
      <ul className="entries">
        {projects.map((project, index) => (
          <li key={project.slug} style={{ '--i': index } as CSSProperties}>
            <button type="button" className="entry" style={{ '--accent': project.accent } as CSSProperties} aria-pressed={project === selected} aria-controls="readme" onClick={() => onSelect(project)}>
              <span className={`entry-icon icon-${project.slug}`}><img src={project.icon} alt="" /></span>
              <span className="entry-name">{project.slug}<span className="entry-slash">/</span></span>
              <span className="entry-kind">{t(project.category)}</span>
              <span className="entry-desc">{t(project.description)}</span>
            </button>
          </li>
        ))}
      </ul>

      <article className="readme" id="readme" aria-label={selected.name}>
        <div className="readme-bar" aria-hidden="true">
          <span>~/projects/{selected.slug}/<b>README.md</b></span>
          <span>{position}/{projects.length}</span>
        </div>
        <div className="readme-body" key={selected.slug}>
          <div className="readme-head">
            <span className={`readme-icon icon-${selected.slug}`}><img src={selected.icon} alt="" /></span>
            <div>
              <h3><span className="md-mark" aria-hidden="true">#</span> {selected.name}</h3>
              <p className="readme-kind">{t(selected.category)}</p>
            </div>
          </div>
          <p className="readme-lead">{t(selected.description)}</p>
          <p className="readme-text">{t(selected.details)}</p>
          <div className="readme-foot">
            <ul className="readme-stack" aria-label={t('Technologies')}>{selected.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            <div className="readme-links">
              {selected.links.map(link => {
                const external = link.href.startsWith('http')
                return (
                  <a key={link.label} href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                    <span className="link-prompt" aria-hidden="true">$</span> {t(link.label)} <span aria-hidden="true">{external ? '↗' : '→'}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
