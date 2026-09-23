const stages = [
  {
    label: '01 / SCOPE',
    title: 'Targets',
    detail: 'Subdomains and IP addresses define the audit scope.',
    examples: ['app.example.com', '203.0.113.10'],
  },
  {
    label: '02 / DISCOVER',
    title: 'Servers, ports & services',
    detail: 'Each target fans out into reachable services.',
    examples: ['443 · HTTPS', '22 · SSH', '3306 · DB'],
  },
  {
    label: '03 / EXECUTE',
    title: 'Security tools',
    detail: 'One or more tools run against each relevant port or service.',
    examples: ['Tool A', 'Tool B', 'Tool C'],
  },
  {
    label: '04 / ANALYZE',
    title: 'Vulnerabilities',
    detail: 'Different outputs become findings analysts can review.',
    examples: ['Finding 01', 'Finding 02', 'Finding 03'],
  },
  {
    label: '05 / DELIVER',
    title: 'Client reports',
    detail: 'LLM-assisted synthesis and structured PDF deliverables.',
    examples: ['LLM', 'PDF', 'DOCX / XLSX'],
  },
]

// The audit flow stays readable without dragging or zooming, including on phones.
export default function ExperienceDiagram() {
  return (
    <figure className="experience-flow">
      <figcaption><span>CYBERESIST / AUDIT FLOW</span><span>FROM SCOPE TO REPORT</span></figcaption>
      <ol className="audit-stages" aria-label="Cyberesist audit flow from targets to reports">
        {stages.map(stage => (
          <li className="audit-stage" key={stage.label}>
            <span className="audit-stage-label">{stage.label}</span>
            <strong>{stage.title}</strong>
            <p>{stage.detail}</p>
            <div className="audit-stage-examples" aria-label="Examples">
              {stage.examples.map(example => <span key={example}>{example}</span>)}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
