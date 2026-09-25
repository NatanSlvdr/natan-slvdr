type JobStatus = 'done' | 'running' | 'waiting' | 'timeout'

const targets = ['app.example.com', 'api.example.com', '203.0.113.10']

const jobs: { name: string; detail: string; status: JobStatus }[] = [
  { name: 'Discovery', detail: 'ports & services', status: 'done' },
  { name: 'Tool A', detail: '443 · HTTPS', status: 'done' },
  { name: 'Tool B', detail: '22 · SSH', status: 'running' },
  { name: 'Tool C', detail: '3306 · DB', status: 'timeout' },
  { name: 'Tool D', detail: 'needs Tool B', status: 'waiting' },
]

const statusLabels: Record<JobStatus, string> = { done: 'DONE', running: 'RUNNING', waiting: 'WAITING', timeout: 'TIMED OUT' }

const formats = ['JSON', 'XML', 'TEXT', 'CUSTOM']

const finding = [
  ['asset', '203.0.113.10:443'],
  ['severity', 'high'],
  ['source', 'Tool A'],
  ['status', 'to review'],
]

// Example data only: the figure explains how one Cyberesist audit moves through the backend.
export default function ExperienceDiagram() {
  return (
    <figure className="pipeline">
      <figcaption className="pipeline-bar">
        <span>CYBERESIST / HOW AN AUDIT RUNS</span>
        <span className="pipeline-live"><i aria-hidden="true" />EXAMPLE AUDIT · RUNNING</span>
      </figcaption>
      <ol className="pipeline-stages">
        <li className="pipeline-stage">
          <span className="pipeline-step">01 · SCOPE</span>
          <strong>Targets</strong>
          <p>The subdomains and IP addresses the client wants checked.</p>
          <ul className="pipeline-targets">{targets.map(target => <li key={target}>{target}</li>)}</ul>
        </li>
        <li className="pipeline-stage">
          <span className="pipeline-step">02 · RUN</span>
          <strong>Background tasks</strong>
          <p>Huey workers, queued in Redis, each with a timeout.</p>
          <ul className="pipeline-jobs">
            {jobs.map(job => (
              <li className={`is-${job.status}`} key={job.name}>
                <span className="pipeline-job-name">{job.name}<small>{job.detail}</small></span>
                <span className="pipeline-job-state">{statusLabels[job.status]}</span>
              </li>
            ))}
          </ul>
          <p className="pipeline-note">One timeout is recorded. The rest of the audit keeps going.</p>
        </li>
        <li className="pipeline-stage">
          <span className="pipeline-step">03 · NORMALIZE</span>
          <strong>One findings format</strong>
          <p>Every tool reports differently. Parsers turn each output into the same record.</p>
          <div className="pipeline-formats">{formats.map(format => <span key={format}>{format}</span>)}</div>
          <dl className="pipeline-finding">
            {finding.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}
          </dl>
        </li>
        <li className="pipeline-stage">
          <span className="pipeline-step">04 · DELIVER</span>
          <strong>Review & report</strong>
          <p>Analysts check the findings, then the report is generated.</p>
          <ul className="pipeline-outputs">
            <li className="is-check">Analyst review</li>
            <li className="is-check">LLM-assisted summary</li>
            <li className="pipeline-files"><span>PDF</span><span>DOCX</span><span>XLSX</span></li>
            <li className="is-api">Client API · Django Ninja</li>
          </ul>
        </li>
      </ol>
    </figure>
  )
}
