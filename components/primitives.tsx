'use client'

import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { SplitReveal } from '@/components/effects'

import { ease } from '@/lib/motion'
export { ease }

/** Fades + slides children in once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  highlight = [],
  sub,
}: {
  index: string
  eyebrow: string
  title: string
  highlight?: string[]
  sub?: string
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[11px] text-primary">{index}</span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="h-px w-10 origin-left bg-primary/60"
          />
          {eyebrow}
        </p>
      </Reveal>
      <SplitReveal
        as="h2"
        text={title}
        highlight={highlight}
        className="max-w-3xl text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
      />
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Card with an emerald spotlight + border glow that follows the mouse. */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div
      onMouseMove={onMove}
      className={cn(
        'spotlight rounded-2xl border border-white/[0.08] bg-card/70 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.14]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Counter({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v).toString())
  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, { duration: 1.8, ease })
    return controls.stop
  }, [inView, mv, to])
  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}

/* Brand icons (lucide-react v1 no longer ships brand logos) */
export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function LeetcodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.22l-2.73 2.92a5.3 5.3 0 0 0-1.22 2.06 5.6 5.6 0 0 0-.1 2.53 5.3 5.3 0 0 0 1.43 2.73l4.32 4.37a5.5 5.5 0 0 0 7.66.07l2.65-2.58a1.38 1.38 0 1 0-1.92-1.98l-2.65 2.58a2.75 2.75 0 0 1-3.83-.04l-4.32-4.37a2.6 2.6 0 0 1-.72-1.39 2.84 2.84 0 0 1 .73-2.45l2.73-2.92 5.4-5.78A1.38 1.38 0 0 0 13.48 0Zm-2.87 13.79a1.38 1.38 0 1 0 0 2.76h9.78a1.38 1.38 0 1 0 0-2.76Z" />
    </svg>
  )
}
