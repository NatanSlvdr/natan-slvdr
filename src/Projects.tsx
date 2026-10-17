import { Fragment, useState, type CSSProperties } from 'react'
import { useLanguage } from './LanguageProvider'
import { projects } from './content'

// An `ls` listing on the left and the selected project's README on the right.
// On narrow screens the README opens under its row instead, like an accordion.
export default function Projects() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(projects[0].slug)

  return (
    <div className="explorer" style={{ '--rows': projects.length } as CSSProperties}>
      {projects.map((project, index) => {
        const isOpen = project.slug === selected
        const style = { '--accent': project.accent, '--row': index + 1 } as CSSProperties
        return (
          <Fragment key={project.slug}>
            <button type="button" className="entry" style={style} aria-expanded={isOpen} aria-controls={`readme-${project.slug}`} onClick={() => setSelected(project.slug)}>
              <span className={`entry-icon icon-${project.slug}`}><img src={project.icon} alt="" /></span>
              <span className="entry-text">
                <span className="entry-name">{project.slug}<span className="entry-slash">/</span></span>
                <span className="entry-desc">{t(project.description)}</span>
              </span>
              <span className="entry-kind">{t(project.category)}</span>
            </button>
            {isOpen && (
              <article className="readme" id={`readme-${project.slug}`} style={style} aria-label={project.name}>
                <div className="readme-bar">
                  <span>~/projects/{project.slug}/<b>README.md</b></span>
                  <span className="readme-count">{index + 1}/{projects.length}</span>
                </div>
                <div className="readme-body" key={project.slug}>
                  <div className="readme-head">
                    <span className={`readme-icon icon-${project.slug}`}><img src={project.icon} alt="" /></span>
                    <div>
                      <h3><span className="md-mark">#</span> {project.name}</h3>
                      <p className="readme-kind">{t(project.category)}</p>
                    </div>
                  </div>
                  <p className="readme-lead">{t(project.description)}</p>
                  <p className="readme-text">{t(project.details)}</p>
                  <div className="readme-stack">
                    <span className="readme-label">stack</span>
                    <ul aria-label={t('Technologies')}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                  </div>
                  <div className="readme-links">
                    {project.links.map(link => {
                      const external = link.href.startsWith('http')
                      return (
                        <a key={link.label} href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                          <span className="link-prompt" aria-hidden="true">$</span> {t(link.label)} <span aria-hidden="true">{external ? '↗' : '→'}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </article>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
