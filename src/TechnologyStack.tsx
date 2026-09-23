type Technology = {
  name: string
  icon: string
}

const cyberesist: { main: Technology[]; secondary: Technology[] } = {
  main: [
    { name: 'Python', icon: 'python.svg' },
    { name: 'Django', icon: 'django.svg' },
    { name: 'Huey', icon: 'huey.jpg' },
    { name: 'Redis', icon: 'redis.svg' },
  ],
  secondary: [
    { name: 'Django Ninja', icon: 'django-ninja.svg' },
    { name: 'HTMX', icon: 'htmx.svg' },
    { name: 'MariaDB', icon: 'mariadb.svg' },
    { name: 'MySQL', icon: 'mysql.svg' },
    { name: 'Docker', icon: 'docker.svg' },
    { name: 'Docker Compose', icon: 'docker.svg' },
    { name: 'Gunicorn', icon: 'gunicorn.svg' },
    { name: 'Linux', icon: 'linux.svg' },
  ],
}

const scc: { main: Technology[]; secondary: Technology[] } = {
  main: [
    { name: 'Windows Server', icon: 'windows.svg' },
    { name: 'Active Directory', icon: 'microsoft.svg' },
    { name: 'Microsoft 365', icon: 'microsoft-365.svg' },
    { name: 'SQL Server', icon: 'sql-server.svg' },
  ],
  secondary: [
    { name: 'Exchange', icon: 'exchange.svg' },
    { name: 'Group Policy', icon: 'windows.svg' },
    { name: 'DNS / DHCP', icon: 'windows.svg' },
    { name: 'WSUS', icon: 'windows.svg' },
    { name: 'RDP', icon: 'windows.svg' },
  ],
}

function TechnologyIcon({ technology }: { technology: Technology }) {
  return <img src={`/assets/tech/${technology.icon}`} alt="" loading="lazy" />
}

// Use product marks where available and the Windows mark for Windows Server services.
export default function TechnologyStack({ role }: { role: 'cyberesist' | 'scc' }) {
  const groups = role === 'cyberesist' ? cyberesist : scc

  return (
    <div className="technology-stack" aria-label="Technologies used">
      {(['main', 'secondary'] as const).map(group => (
        <div className="technology-group" key={group}>
          <span className="technology-group-label">{group === 'main' ? 'MAIN TECHNOLOGIES' : 'ALSO USED'}</span>
          <ul>
            {groups[group].map(technology => (
              <li key={technology.name}>
                <span className={`technology-icon${technology.name === 'Huey' ? ' is-huey' : ''}`}><TechnologyIcon technology={technology} /></span>
                <span>{technology.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
