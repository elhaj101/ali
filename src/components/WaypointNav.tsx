import { SECTIONS } from '../data/sections'

/**
 * The right-edge section nav, drawn as a route: a hairline rail with five
 * waypoints on it. The page's subject is a journey across five countries, so
 * the required dot-nav doubles as the page's signature motif rather than
 * sitting on top of it as unrelated chrome.
 *
 * Hidden below `md`, where normal scrolling is the expected behaviour.
 */
export function WaypointNav({ active }: { active: string }) {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 md:block lg:right-8"
    >
      <div className="relative flex flex-col items-center gap-7 py-2">
        {/* the rail the waypoints sit on */}
        <div className="route-rail absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2" aria-hidden="true" />

        {SECTIONS.map((section) => {
          const isActive = active === section.id
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => go(section.id)}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex h-4 w-4 items-center justify-center"
            >
              {/* label, revealed on hover/focus */}
              <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap font-mono text-[0.7rem] tracking-wider text-bone opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
                {section.label}
              </span>

              {/* halo on the active waypoint */}
              <span
                aria-hidden="true"
                className={`absolute rounded-full transition-all duration-500 ${
                  isActive ? 'h-4 w-4 bg-amber/15' : 'h-0 w-0 bg-transparent'
                }`}
              />
              <span
                aria-hidden="true"
                className={`relative rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-[7px] w-[7px] bg-amber'
                    : 'h-[5px] w-[5px] bg-hairline group-hover:bg-mute'
                }`}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
