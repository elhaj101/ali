import { useCallback, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Reveal, Section, Eyebrow } from '../components/Reveal'
import { PROJECTS, type Project } from '../data/projects'

function Card({ project }: { project: Project }) {
  return (
    <article className="mr-6 flex w-75 shrink-0 flex-col rounded-xl border border-hairline bg-raised p-6 sm:w-90">
      <span
        className="self-start rounded-full px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.16em] uppercase"
        style={{ color: project.tag, backgroundColor: `${project.tag}1a` }}
      >
        {project.tagline}
      </span>

      <h3 className="mt-5 font-display text-xl font-semibold text-bone">{project.name}</h3>

      <p className="mt-3 text-[0.85rem] leading-relaxed text-mute">{project.what}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-hairline pt-4">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-hairline px-2 py-0.5 font-mono text-[0.62rem] tracking-wide text-mute"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}

/** Marquee speeds, in seconds for one full pass. */
const CRUISE = 44
const FAST = 9

export function Work() {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [fast, setFast] = useState(false)

  // Pause is React state rather than a `:hover` rule because touch devices
  // never hover — that's why the cards wouldn't stop on a phone. Pointer
  // events cover mouse, touch and pen from one code path.
  const hold = useCallback(() => setPaused(true), [])
  const release = useCallback(() => setPaused(false), [])

  const track = {
    animationDuration: `${fast ? FAST : CRUISE}s`,
    animationPlayState: paused ? 'paused' : ('running' as const),
  }

  return (
    <Section id="work" className="overflow-hidden">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            <Eyebrow>Five projects, shipped</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-bone">
            Selected Work
          </h2>
        </Reveal>
      </div>

      {/* Full-bleed marquee: breaks out of the content column so cards run to
          both edges of the viewport. */}
      <Reveal delay={0.1} className="mt-14">
        {reduced ? (
          // Reduced motion: no autoplay, scroll it by hand instead.
          <div
            className="flex overflow-x-auto px-6 pb-4 sm:px-10 lg:px-20"
            tabIndex={0}
            role="group"
            aria-label="Selected projects, scroll horizontally"
          >
            {PROJECTS.map((p) => (
              <Card key={p.name} project={p} />
            ))}
          </div>
        ) : (
          <div
            className="relative flex overflow-hidden"
            onMouseEnter={hold}
            onMouseLeave={release}
            onPointerDown={hold}
            onPointerUp={release}
            onPointerCancel={release}
            onFocusCapture={hold}
            onBlurCapture={release}
          >
            {/* The list is rendered twice; the track travels exactly one copy's
                width, so the loop point is invisible. Each card carries its gap
                as margin-right, which keeps the two halves exactly equal — a
                flex `gap` would leave a half-gap of drift at the seam. */}
            <div className="flex animate-marquee" style={track}>
              {PROJECTS.map((p) => (
                <Card key={p.name} project={p} />
              ))}
            </div>
            <div className="flex animate-marquee" style={track} aria-hidden="true">
              {PROJECTS.map((p) => (
                <Card key={`${p.name}-dup`} project={p} />
              ))}
            </div>

            {/* edge fades so cards dissolve rather than getting sliced off */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-ink to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-ink to-transparent sm:w-28" />
          </div>
        )}
      </Reveal>

      <div className="mx-auto mt-8 flex w-full max-w-5xl items-center gap-4">
        <p className="font-mono text-[0.68rem] tracking-wider text-mute/70">
          {reduced ? 'Scroll the row to browse' : 'Hover or hold to pause'}
        </p>

        {!reduced && (
          <button
            type="button"
            onClick={() => setFast((v) => !v)}
            aria-pressed={fast}
            aria-label={fast ? 'Slow the carousel down' : 'Speed the carousel up'}
            title={fast ? 'Normal speed' : 'Speed up'}
            className={`ml-auto flex h-9 items-center gap-2 rounded-full border px-4 font-mono text-[0.66rem] tracking-wider transition-colors duration-300 ${
              fast
                ? 'border-amber text-amber'
                : 'border-hairline text-mute hover:border-amber hover:text-amber'
            }`}
          >
            {fast ? 'Normal' : 'Faster'}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
              {fast ? (
                <path d="M6 5h3v14H6zM15 5h3v14h-3z" fill="currentColor" />
              ) : (
                <path d="M3 5l9 7-9 7V5zM13 5l9 7-9 7V5z" fill="currentColor" />
              )}
            </svg>
          </button>
        )}
      </div>
    </Section>
  )
}
