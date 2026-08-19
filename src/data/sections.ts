/** Section order drives both the page and the waypoint nav. */
export const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'map', label: "Where I've Worked" },
  { id: 'services', label: 'What I Can Build' },
  { id: 'work', label: 'Selected Work' },
  { id: 'contact', label: "Let's Talk" },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']
