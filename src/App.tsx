import { useEffect, useState } from 'react'
import { WaypointNav } from './components/WaypointNav'
import { SECTIONS } from './data/sections'
import { Hero } from './sections/Hero'
import { WorldMap } from './sections/WorldMap'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import { Venture } from './sections/Venture'
import { Contact } from './sections/Contact'

export default function App() {
  const [active, setActive] = useState<string>(SECTIONS[0].id)

  // Track the section occupying the middle of the viewport. A centred root
  // margin is more stable than a threshold when sections are taller than the
  // viewport on small screens.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    const nodes = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (n): n is HTMLElement => n !== null,
    )
    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a
        href="#intro"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-amber focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <WaypointNav active={active} />

      <main>
        <Hero />
        <WorldMap />
        <Services />
        <Work />
        <Venture />
        <Contact />
      </main>
    </>
  )
}
