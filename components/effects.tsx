'use client'

import Lenis from 'lenis'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'

/* ------------------------------------------------------------------ */
/* Smooth scroll (Lenis) + smooth in-page anchor links                 */
/* ------------------------------------------------------------------ */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}

/* ------------------------------------------------------------------ */
/* Page-wide background: drifting aurora + soft cursor light           */
/* ------------------------------------------------------------------ */
// Deterministic pseudo-random values (same on server and client, no hydration mismatch)
const rand = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
const particles = Array.from({ length: 22 }, (_, i) => ({
  left: Math.round(rand(i + 1) * 1000) / 10,
  size: 1.5 + Math.round(rand(i + 50) * 25) / 10,
  dur: 14 + Math.round(rand(i + 100) * 16),
  delay: -Math.round(rand(i + 150) * 30),
}))
const meteors = [
  { top: 5, left: 85, dur: 9, delay: 1 },
  { top: 15, left: 60, dur: 13, delay: 5 },
  { top: 0, left: 98, dur: 11, delay: 8 },
]

export function Backdrop() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 60, damping: 20 })
  const sy = useSpring(y, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX - 250)
      y.set(e.clientY - 250)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="grid-drift" aria-hidden="true" />
      <div aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className={`particle ${i % 2 ? 'hidden md:block' : ''}`}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        {meteors.map((m, i) => (
          <span
            key={i}
            className="meteor hidden md:block"
            style={{ top: `${m.top}%`, left: `${m.left}%`, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s` }}
          />
        ))}
      </div>
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[90px] md:block"
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Heading where each word slides up from behind a mask                */
/* ------------------------------------------------------------------ */
export function SplitReveal({
  text,
  className,
  highlight = [],
  delay = 0,
  as: Tag = 'span',
}: {
  text: string
  className?: string
  highlight?: string[]
  delay?: number
  as?: 'span' | 'h2' | 'p'
}) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className={cn('inline-block', highlight.includes(w.replace(/[.,]/g, '')) && 'text-gradient')}
              initial={{ y: '110%', rotate: 4 }}
              whileInView={{ y: '0%', rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: delay + i * 0.05, ease }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* Paragraph whose words light up as you scroll through it             */
/* ------------------------------------------------------------------ */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.4, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Magnetic wrapper: child gently follows the cursor                   */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={cn('inline-block', className)}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* 3D tilt that follows the mouse                                      */
/* ------------------------------------------------------------------ */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Text that "decodes" from random characters                          */
/* ------------------------------------------------------------------ */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}=+*#'

export function Scramble({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    let frame = 0
    const total = 18
    const id = window.setInterval(() => {
      frame++
      const revealed = Math.floor((frame / total) * text.length)
      setOut(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < revealed ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      )
      if (frame >= total) window.clearInterval(id)
    }, 35)
    return () => window.clearInterval(id)
  }, [text])
  return <span className={className}>{out}</span>
}

/* ------------------------------------------------------------------ */
/* Kinetic text strip: always drifting, speeds up + skews with scroll  */
/* ------------------------------------------------------------------ */
function VelocityRow({ words, dir, outline }: { words: string[]; dir: 1 | -1; outline?: boolean }) {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const boost = useTransform(smooth, [-2000, 0, 2000], [-2.5, 0, 2.5], { clamp: false })
  const skew = useTransform(smooth, [-2000, 2000], [3, -3])
  const base = useMotionValue(0)
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)
  const lastDir = useRef(dir)

  useAnimationFrame((_, delta) => {
    let move = dir * 1.6 * (delta / 1000)
    const b = boost.get()
    if (b < 0) lastDir.current = (-dir) as 1 | -1
    else if (b > 0) lastDir.current = dir
    move = lastDir.current * Math.abs(move) + lastDir.current * Math.abs(move) * Math.abs(b)
    base.set(base.get() + move)
  })

  const content = [...words, ...words]
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, skewX: skew }} className="flex shrink-0">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {content.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span
                  className={cn(
                    'px-7 text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium tracking-tight transition-colors',
                    outline ? 'text-white/35' : 'text-white/60 hover:text-white',
                  )}
                >
                  {w}
                </span>
                <span className="h-1 w-1 rounded-full bg-primary/70" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

export function VelocityMarquee({ rows }: { rows: string[][] }) {
  return (
    <section aria-label="Tech stack" className="relative border-y border-white/[0.06] bg-[#0c1117]/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-6 sm:px-8">
        <p className="hidden shrink-0 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground md:block">
          Tech I
          <br />
          ship with
        </p>
        <span className="hidden h-10 w-px shrink-0 bg-white/10 md:block" />
        <div className="mask-x min-w-0 flex-1 space-y-1">
          {rows.map((r, i) => (
            <VelocityRow key={i} words={r} dir={i % 2 ? 1 : -1} outline={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Floating back-to-top button with a scroll progress ring             */
/* ------------------------------------------------------------------ */
export function BackToTop() {
  const { scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  useEffect(() => scrollYProgress.on('change', (v) => setShow(v > 0.12)), [scrollYProgress])
  return (
    <motion.a
      href="#top"
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6, pointerEvents: show ? 'auto' : 'none' }}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-[#121921]/80 text-white backdrop-blur-md transition-colors hover:text-primary"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <motion.circle cx="24" cy="24" r="22" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
      </svg>
      <span aria-hidden="true">↑</span>
    </motion.a>
  )
}
