// English strings double as translation keys in src/translations.ts.
export const github = 'https://github.com/NatanSlvdr'
export const linkedin = 'https://www.linkedin.com/in/natan-salvador'
export const email = 'pro.natansalvador@gmail.com'

export type Project = {
  slug: string
  name: string
  category: string
  description: string
  details: string
  tags: string[]
  accent: string
  icon: string
  links: { label: string; href: string }[]
}

// Project links point to known repositories or releases; add live URLs here when available.
export const projects: Project[] = [
  {
    slug: 'caffeine-protocol',
    name: 'Caffeine Protocol',
    category: 'Interactive game',
    description: 'A browser game that teaches programming through a busy robot café.',
    details: 'Over 32 shifts, you program three café robots with instruction blocks such as IF, loops, and functions, then run the service and watch every order play out. Each solution is checked against several scenarios, so it has to work every time, not just once.',
    tags: ['React', 'TypeScript', 'Three.js'],
    accent: '#56d364',
    icon: '/assets/caffeine-icon.png',
    links: [{ label: 'Explore repository', href: `${github}/Caffeine-Protocol` }],
  },
  {
    slug: 'partix',
    name: 'Partix',
    category: 'Realtime platform',
    description: 'Board games with friends, each person playing from their own phone.',
    details: 'A host opens a private room and friends join from their phones. The first game is Werewolf: a narrator guides the game through its phases in real time, while the server enforces the rules and gives each player a private view, so nobody sees a role they shouldn\'t.',
    tags: ['React', 'TypeScript', 'Convex'],
    accent: '#f47067',
    icon: '/assets/partix-icon.svg',
    links: [{ label: 'Ask for a walkthrough', href: `mailto:${email}?subject=Partix%20walkthrough` }],
  },
  {
    slug: 'stageswap',
    name: 'StageSwap',
    category: 'Windows utility',
    description: 'A Zoom camera that switches between your webcam and your presentation on its own.',
    details: 'StageSwap watches the screen used for presentations and compares it with a reference picture. When media starts, Zoom receives the screen; when it stops, the webcam comes back with a smooth transition. It runs entirely on the Windows computer.',
    tags: ['Rust', 'Windows', 'Video'],
    accent: '#39c5cf',
    icon: '/assets/stageswap-icon.png',
    links: [
      { label: 'Download app', href: `${github}/StageSwap/releases/latest` },
      { label: 'Source code', href: `${github}/StageSwap` },
    ],
  },
  {
    slug: 'star-shield',
    name: 'Star Shield',
    category: 'SaaS product',
    description: 'A dashboard that helps businesses understand and manage their online reviews.',
    details: 'Teams connect their Google Business Profile locations, collect customer feedback through QR codes, and follow reviews and trends for each site from one place.',
    tags: ['Next.js', 'Convex', 'Clerk'],
    accent: '#8fa5ff',
    icon: '/assets/starshield-logo.png',
    links: [{ label: 'Explore repository', href: `${github}/starshield-v2` }],
  },
  {
    slug: 'local-echo',
    name: 'Local-Echo',
    category: 'macOS app',
    description: 'Private voice dictation for the Mac: hold a key, speak, and your words appear at the cursor.',
    details: 'Speech recognition runs on the Mac with whisper.cpp and MLX, then a small local model cleans up punctuation, formatting, and obvious recognition errors. No audio or text ever leaves the machine.',
    tags: ['Swift', 'whisper.cpp', 'MLX'],
    accent: '#db61a2',
    icon: '/assets/local-echo-icon.svg',
    links: [{ label: 'Explore repository', href: `${github}/local-echo` }],
  },
]
