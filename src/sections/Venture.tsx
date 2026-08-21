import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Reveal, Section, Eyebrow } from '../components/Reveal'

/** Neon pink, used only in this section — the rest of the page is amber. */
const PINK = '255, 46, 151'

type Comet = { x: number; y: number; speed: number; len: number; width: number; life: number }

const DIR = { x: Math.cos(0.36), y: Math.sin(0.36) } // ~20° downward drift

/**
 * Comets streak across the section on a canvas behind the copy. Canvas rather
 * than DOM nodes because the tapering trail is a gradient stroke, and because
 * a dozen moving elements would otherwise each need their own layer.
 *
 * Runs only while the section is on screen, and not at all under reduced
 * motion — the copy never depends on it.
 */
function CometField({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !active || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const comets: Comet[] = []
    const spawn = () => {
      const len = 140 + Math.random() * 220
      comets.push({
        x: -len,
        y: Math.random() * h * 0.85 - h * 0.05,
        speed: 340 + Math.random() * 380,
        len,
        width: 1 + Math.random() * 1.4,
        life: 0,
      })
    }
    // A few already in flight, so the section never opens on an empty sky.
    for (let i = 0; i < 3; i++) {
      spawn()
      comets[i].x = Math.random() * w
      comets[i].y = Math.random() * h * 0.8
    }

    let raf = 0
    let last = performance.now()
    let nextSpawn = 0

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      nextSpawn -= dt
      if (nextSpawn <= 0 && comets.length < 6) {
        spawn()
        nextSpawn = 0.7 + Math.random() * 1.6
      }

      ctx.clearRect(0, 0, w, h)

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i]
        c.x += DIR.x * c.speed * dt
        c.y += DIR.y * c.speed * dt
        c.life += dt

        const tailX = c.x - DIR.x * c.len
        const tailY = c.y - DIR.y * c.len

        const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY)
        grad.addColorStop(0, `rgba(${PINK}, 0.9)`)
        grad.addColorStop(0.35, `rgba(${PINK}, 0.3)`)
        grad.addColorStop(1, `rgba(${PINK}, 0)`)

        ctx.strokeStyle = grad
        ctx.lineWidth = c.width
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        // Bright head with a bloom, which is what sells it as a comet.
        ctx.shadowColor = `rgba(${PINK}, 0.9)`
        ctx.shadowBlur = 14
        ctx.fillStyle = `rgba(255, 220, 240, 0.95)`
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.width * 0.9, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        if (tailX > w || tailY > h) comets.splice(i, 1)
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [active, reduced])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

export function Venture() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <Section id="venture" className="overflow-hidden">
      <div ref={ref} className="absolute inset-0" aria-hidden="true">
        <CometField active={inView} />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span
              className="h-px w-8"
              style={{ backgroundColor: `rgb(${PINK})` }}
              aria-hidden="true"
            />
            <Eyebrow>Open to partnerships</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-bone">
            Entrepreneurship
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl font-display text-[clamp(1.15rem,2.6vw,1.75rem)] leading-snug text-bone">
            I'm not just a developer — I'm an entrepreneur.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-mute sm:text-base">
            If you're like-minded and have a business project idea, we can bring it to life
            together, on a partnership basis. I've built and run businesses before — a recruitment
            agency in Hong Kong, and trading projects in Lebanon that are still running today — so I
            know what it takes to get something off the ground and keep it there.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <button
            type="button"
            onClick={() => go('contact')}
            className="mt-10 rounded-full px-7 py-3 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-85"
            style={{ backgroundColor: `rgb(${PINK})` }}
          >
            Pitch me an idea
          </button>
        </Reveal>
      </div>
    </Section>
  )
}
