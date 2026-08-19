import type { ReactNode } from 'react'
import { Reveal, Section, Eyebrow } from '../components/Reveal'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type Service = { title: string; body: string; icon: ReactNode }

const SERVICES: Service[] = [
  {
    title: 'Full-Stack Web Development',
    body: 'Django and React applications with REST APIs, PostgreSQL/MySQL, authentication, and admin dashboards — from prototype to deployed product.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-6 w-6" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="14" rx="2" />
        <path d="M2.5 8.5h19M7 12.5l2 2-2 2M11.5 16.5h4" />
      </svg>
    ),
  },
  {
    title: 'Predictive Analytics & ML Prototypes',
    body: 'Python-based machine learning models (Scikit-learn, TensorFlow/Keras) for classification, forecasting, and data-driven decision tools.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-6 w-6" aria-hidden="true">
        <path d="M3 19.5h18M5.5 19.5V13M10.5 19.5V8.5M15.5 19.5v-4M20.5 19.5V4.5" />
        <circle cx="10.5" cy="8.5" r="1.6" />
      </svg>
    ),
  },
  {
    title: 'Business Web Presence',
    body: "Responsive marketing sites and booking/CRUD systems tailored to a business's actual workflow, not a generic template.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
      </svg>
    ),
  },
  {
    title: 'Workflow & Document Automation',
    body: 'Internal tools that cut repetitive manual work — e.g. compliant document generators, data pipelines, and small business utilities.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} className="h-6 w-6" aria-hidden="true">
        <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8l-5.5-5.5Z" />
        <path d="M14 2.5V8h5.5M8.5 13.5l2.5 2.5 4-4.5" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <Section id="services">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            <Eyebrow>Services</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-bone">
            What I Can Build
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={0.06 * i} className="h-full">
              <article className="group h-full bg-ink p-7 transition-colors duration-500 hover:bg-raised lg:p-9">
                <span className="inline-flex text-amber">{service.icon}</span>
                <h3 className="mt-6 font-display text-lg leading-snug font-medium text-bone">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-mute">{service.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
