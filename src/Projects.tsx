import type { CSSProperties, ReactNode } from 'react'
import { useLanguage } from './LanguageProvider'
import { projects, type Project } from './content'

// A bordered panel with its title set into the top border, like a TUI pane.
export function Pane({ index, title, footer, className = '', style, children }: { index: number; title: ReactNode; footer?: ReactNode; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <section className={`pane ${className}`} style={{ '--i': index, ...style } as CSSProperties} aria-labelledby={`pane-${index}`}>
      <h2 className="pane-title" id={`pane-${index}`}><span className="pane-index" aria-hidden="true">[{index}]</span> {title}</h2>
      {children}
      {footer && <span className="pane-footer" aria-hidden="true">{footer}</span>}
    </section>
  )
}

// The project list and the selected project's README, side by side (stacked on phones).
export default function Projects({ selected, onSelect }: { selected: Project; onSelect: (project: Project) => void }) {
  const { t } = useLanguage()
  const position = projects.indexOf(selected) + 1

  return (
    <>
      <Pane index={1} title="projects" className="pane-list" footer={`${position} of ${projects.length}`}>
        <ul className="entries">
          {projects.map(project => (
            <li key={project.slug}>
              <button type="button" className="entry" style={{ '--accent': project.accent } as CSSProperties} aria-pressed={project === selected} aria-controls="readme" onClick={() => onSelect(project)}>
                <span className={`entry-icon icon-${project.slug}`}><img src={project.icon} alt="" /></span>
                <span className="entry-name">{project.slug}<span className="entry-slash">/</span></span>
                <span className="entry-kind">{t(project.category)}</span>
                <span className="entry-desc">{t(project.description)}</span>
              </button>
            </li>
          ))}
        </ul>
      </Pane>

      <Pane index={2} title={<>{selected.slug}/<b>README.md</b></>} className="pane-readme" style={{ '--accent': selected.accent } as CSSProperties}>
        <article className="readme" id="readme" key={selected.slug} aria-live="polite">
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
                    {t(link.label)} <span aria-hidden="true">{external ? '↗' : '→'}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </article>
      </Pane>
    </>
  )
}
