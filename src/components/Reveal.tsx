import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-triggered entrance. Content is always rendered — only its transform
 * is animated — so nothing depends on motion being allowed to become readable.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Small uppercase mono eyebrow used to label every section. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.7rem] tracking-[0.28em] text-mute uppercase">
      {children}
    </span>
  )
}

/**
 * Full-viewport section wrapper. `min-h-screen` rather than `h-screen` so
 * overflowing content on small screens still grows the section instead of
 * being clipped.
 */
export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      // `md:pr-16` keeps the content column clear of the waypoint nav, which
      // appears at `md` but only gets generous page padding at `lg`.
      className={`snap-section relative flex min-h-screen w-full flex-col justify-center px-6 py-24 sm:px-10 md:pr-16 lg:px-20 ${className}`}
    >
      {children}
    </section>
  )
}
