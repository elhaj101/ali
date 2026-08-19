import { Reveal, Section, Eyebrow } from '../components/Reveal'
import { SocialRow } from '../components/Social'

const LANGUAGES = [
  { name: 'Arabic', level: 'native' },
  { name: 'English', level: 'C1' },
  { name: 'German', level: 'B2' },
]

export function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <Section id="intro">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            <Eyebrow>Berlin, Germany — 52.52° N, 13.40° E</Eyebrow>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-7 font-display text-[clamp(2.9rem,11vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.03em] text-bone">
            Ali El Haj
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-5 max-w-3xl font-display text-[clamp(1.05rem,2.5vw,1.6rem)] leading-snug font-normal text-balance text-mute">
            Full-Stack Software Developer
            <span className="text-amber"> — Predictive Analytics &amp; AI</span>
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-9 max-w-2xl text-[0.98rem] leading-relaxed text-mute sm:text-base">
            I'm a full-stack developer based in Berlin, specializing in Python/Django and React,
            with a focus on predictive analytics and machine learning. I hold a Diploma in
            Full-Stack Software Development (Predictive Analytics &amp; AI) from Code Institute.
            Before software, I spent years in international retail and teaching across Kuwait,
            China, and Hong Kong — experience that shaped how I build: user-first, clearly
            communicated, and reliable under real-world constraints.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[0.72rem] tracking-wider text-mute">
            {LANGUAGES.map((lang) => (
              <li key={lang.name}>
                <span className="text-bone">{lang.name}</span>
                <span className="text-mute"> ({lang.level})</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => go('work')}
                className="rounded-full bg-amber px-7 py-3 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-85"
              >
                View Projects
              </button>
              <button
                type="button"
                onClick={() => go('contact')}
                className="rounded-full border border-hairline px-7 py-3 text-sm font-medium text-bone transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                Get in Touch
              </button>
            </div>
            <SocialRow className="sm:ml-auto" />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
