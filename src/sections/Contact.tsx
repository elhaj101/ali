import { Reveal, Section, Eyebrow } from '../components/Reveal'
import { LINKS, SocialRow } from '../components/Social'
import { Impressum } from '../components/Impressum'

export function Contact() {
  return (
    <Section id="contact">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            <Eyebrow>Contact</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.03em] text-bone">
            Let's Talk
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-mute sm:text-base">
            Open to full-stack developer roles and freelance projects. Based in Berlin, working in
            English, German, and Arabic.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-11 flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-9">
            <a
              href={`mailto:${LINKS.email}`}
              className="inline-flex items-center gap-3 self-start rounded-full bg-amber px-7 py-3.5 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-85"
            >
              {LINKS.email}
              <span aria-hidden="true">→</span>
            </a>
            <SocialRow />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.24}>
        <footer className="mx-auto mt-20 flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-6">
          <p className="font-mono text-[0.68rem] tracking-wider text-mute/70">
            © {new Date().getFullYear()} Ali El Haj — Berlin, Germany
          </p>
          {/* Must stay reachable from every page view — §5 DDG requires the
              Impressum to be "leicht erkennbar und unmittelbar erreichbar". */}
          <Impressum />
        </footer>
      </Reveal>
    </Section>
  )
}
