// Single source of truth for data-driven sections (Products, Footer links,
// Trust Bar, Education, marquees, socials). Screenshots/photos are `null`
// until real assets are supplied — components fall back to PlaceholderFrame.

export const products = [
  {
    id: 'scafld',
    name: 'Scafld',
    order: '01',
    status: 'live',
    description: 'The complete backend lifecycle platform. From idea to deployed API without switching tools.',
    stack: ['TBD'],
    url: 'https://scafld.kodedlabs.com',
    screenshot: '/img/scafld.webp',
  },
  {
    id: 'recivo',
    name: 'Recivo',
    order: '02',
    status: 'live',
    description: "WAEC for the informal economy. A voice-and-simulation skill exam that turns a trader's hands into a verifiable credential.",
    stack: ['TBD'],
    url: 'https://recivo.vercel.app',
    screenshot: '/img/recivo.webp',
  },
  {
    id: 'ev-hacks',
    name: 'EV Hacks',
    order: '03',
    status: 'live',
    description: "Nigeria's EV intelligence layer. Find where to build charging infrastructure or where to charge your vehicle.",
    stack: ['TBD'],
    url: 'https://ev-hacks.vercel.app',
    screenshot: '/img/ev-hacks.webp',
  },
  {
    id: 'ship',
    name: 'Ship',
    order: '04',
    status: 'live',
    description: 'AI-powered deployment CLI. Describe your stack in plain English — Ship generates Docker, Nginx, SSL, and CI/CD configs and deploys to your own VPS.',
    stack: ['TBD'],
    url: 'https://ship-it.kodedlabs.com',
    screenshot: '/img/ship.webp',
  },
  {
    id: 'stackd',
    name: 'Stackd',
    order: '05',
    status: 'in_progress',
    description: 'A hands-on bootcamp guiding students from first line of code to shipped, production-ready projects. Website incoming.',
    stack: [],
    url: null,
    screenshot: null,
  },
]

// PLACEHOLDER — confirm real program names/photos/descriptions.
export const education = [
  { id: 'ecx-build', name: 'Engineering Career Expo', description: 'A hands-on build cohort turning first-time coders into shipped-product builders.', photo: null },
  { id: 'stackd-program', name: 'Stackd', description: 'Backend-focused mentorship pairing students with real production codebases.', photo: null },
  { id: 'mca', name: 'Muslimah Code Academy', description: 'A foundations program covering the core CS ground most bootcamps skip.', photo: '/teach/mca.webp' },
  { id: 'other', name: 'Other Programs', description: 'Workshops, hackathon mentorship, and one-off sessions across partner programs.', photo: null },
]

export const trustStats = [
  { value: '05', label: 'LIVE PRODUCTS' },
  { value: '7×', label: 'HACKATHON WINS' },
  { value: '100+', label: 'STUDENTS TAUGHT' },
  { value: '2025', label: 'FOUNDED' },
]

export const marqueePrograms = [
  'Harvard Health Hackathon',
  'AHEAD Hackathon',
  'GTCO Squad Hackathon 3.0',
  'AWS Hackathon',
  'Bloomberg Engineering Academy',
  'Nithub HatchDev',
]

// PLACEHOLDER — confirm actual stack in active use. `icon` is a react-icons/si export name.
export const stackMarquee = [
  { label: 'Rust',       icon: 'SiRust' },
  { label: 'Go',         icon: 'SiGo' },
  { label: 'Python',     icon: 'SiPython' },
  { label: 'TypeScript', icon: 'SiTypescript' },
  { label: 'Postgres',   icon: 'SiPostgresql' },
  { label: 'Solana',     icon: 'SiSolana' },
]

// The three build-stage tabs for the "How We Build" section.
export const buildStages = [
  {
    id: 'design',
    label: 'Design',
    title: 'Systems first, not UI first.',
    desc: 'Every product starts as infrastructure — the data model, the pipeline, the thing that has to work before anything gets a face. We map the shape of the problem before we open a design tool.',
    image: '/how/beacon.webp',
  },
  {
    id: 'build',
    label: 'Build',
    title: 'Write it, break it, fix it.',
    desc: "Fast iteration against real data, not mockups. If it doesn't hold up under load or edge cases, it isn't done — it's a draft.",
    image: '/how/coding.webp',
  },
  {
    id: 'ship',
    label: 'Ship',
    title: 'Deployed, not demoed.',
    desc: 'Every product ships to real infrastructure with real users on day one. No perpetual beta — if it is not ready to ship, it is not ready to build.',
    image: '/how/ship.webp',
  },
]

// PLACEHOLDER — fill in real profile URLs; '#' renders a disabled-looking link.
export const socials = [
  { id: 'twitter',  label: 'Twitter',  icon: 'x-mono-icon',      url: '#' },
  { id: 'github',   label: 'GitHub',   icon: 'github-mono-icon', url: '#' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin-icon', url: '#' },
  { id: 'email',    label: 'Email',    icon: 'email-icon',    url: 'mailto:hello@kodedlabs.com' },
]
