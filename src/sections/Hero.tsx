import { Reveal, Section, Eyebrow } from '../components/Reveal'
import { SocialRow } from '../components/Social'

/* Feathers the portrait into the page on three sides — the cutout is a hard
   silhouette, and a hard edge on a flat dark ground reads as a pasted-on
   sticker. Two gradients intersected: one fades the bottom, one both sides. */
const FADE = [
  'linear-gradient(to bottom, #000 60%, transparent 100%)',
  'linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%)',
].join(', ')

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
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_420px] 2xl:grid-cols-[minmax(0,1fr)_470px]">
        {/* Portrait sits above the name on narrow screens and beside it from
            `lg`, where there's finally room for both without shrinking the
            name into the column. */}
        <Reveal delay={0.2} className="order-first lg:order-last">
          <picture>
            <source srcSet={`${import.meta.env.BASE_URL}ali-portrait.webp`} type="image/webp" />
            <img
              src={`${import.meta.env.BASE_URL}ali-portrait.png`}
              alt="Ali El Haj"
              width={900}
              height={974}
              className="w-36 select-none lg:w-full"
              /* The suit is already near-black; fading the lower edge lets it
                 dissolve into the page instead of ending on a cut line. */
              style={{
                maskImage: FADE,
                WebkitMaskImage: FADE,
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            />
          </picture>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-amber" aria-hidden="true" />
              <Eyebrow>Berlin, Germany — 52.52° N, 13.40° E</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[clamp(2.9rem,11vw,6.5rem)] lg:text-[clamp(2.9rem,6vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.03em] text-bone">
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
      </div>
    </Section>
  )
}
