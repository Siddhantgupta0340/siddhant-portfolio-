'use client'

import { AnimatePresence, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Check, ChefHat, FileText, Package, Receipt, UtensilsCrossed } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { Chip, SectionHeading, SpotlightCard } from '@/components/primitives'

type Project = (typeof siteConfig.projects)[number]

/* ---------- Mini animated visuals (no screenshots needed) ---------- */

/* Runs a step counter on an interval, only while the element is on screen. */
function useLoop(steps: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-60px' })
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), ms)
    return () => window.clearInterval(id)
  }, [inView, steps, ms])
  return { ref, step, inView }
}

// Deterministic "live" series so the chart looks like streaming data.
const series = (t: number) =>
  Array.from({ length: 10 }, (_, i) =>
    35 + Math.round(30 * Math.abs(Math.sin(i * 1.7 + t * 0.9)) + 25 * Math.abs(Math.cos(i * 0.6 + t * 0.4))) * 0.75,
  )

function DashboardVisual() {
  const { ref, step, inView } = useLoop(1000, 1600)
  const bars = series(step)
  const linePts = series(step + 3).map((v, i) => [(i / 9) * 100, 100 - v * 0.9] as const)
  const line = linePts.map(([x, y]) => `${x},${y}`).join(' ')
  const tabs = ['Sales', 'Stock', 'Dispatch']
  const activeTab = Math.floor(step / 3) % tabs.length
  const activeRow = step % 4

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b1016] p-4"
    >
      {/* scanning light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-primary/[0.08] to-transparent"
        animate={{ left: ['-20%', '110%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />

      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">
          wishvam / {tabs[activeTab].toLowerCase()}_report
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-primary">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block h-3 w-3 rounded-full border-[1.5px] border-primary border-t-transparent"
          />
          SAP sync
        </span>
      </div>

      {/* tabs */}
      <div className="relative mb-4 grid grid-cols-3 gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
        {tabs.map((t, i) => (
          <div key={t} className="relative z-10 py-1.5 text-center text-[11px] font-medium">
            {activeTab === i && (
              <motion.span
                layoutId="wishvam-tab"
                className="absolute inset-0 -z-10 rounded-md bg-primary/15 ring-1 ring-primary/30"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className={activeTab === i ? 'text-primary' : 'text-muted-foreground'}>{t}</span>
          </div>
        ))}
      </div>

      {/* bars + live line */}
      <div className="relative flex min-h-32 flex-1 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: inView ? `${h}%` : 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 14 }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary/10 to-primary/60"
          />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <motion.polyline
            fill="none"
            stroke="#5eead4"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ points: line }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* rows with a moving highlight */}
      <div className="mt-4 space-y-1.5">
        {[0.9, 0.65, 0.8, 0.55].map((w, i) => (
          <div
            key={i}
            className={`relative flex items-center gap-3 rounded-md border px-3 py-2 transition-colors duration-500 ${
              activeRow === i ? 'border-primary/40 bg-primary/[0.08]' : 'border-white/[0.05] bg-white/[0.02]'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${activeRow === i ? 'bg-primary' : 'bg-white/25'}`} />
            <span className="h-1.5 rounded-full bg-white/10" style={{ width: `${w * 55}%` }} />
            <motion.span
              animate={{ width: activeRow === i ? 44 : 28 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className={`ml-auto h-1.5 rounded-full ${activeRow === i ? 'bg-primary' : 'bg-primary/30'}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderFlowVisual() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0a0e13] px-5 py-6">
      {[
        { Icon: UtensilsCrossed, label: 'Waiter' },
        { Icon: Receipt, label: 'Order' },
        { Icon: ChefHat, label: 'Kitchen' },
      ].map(({ Icon, label }, i, arr) => (
        <div key={label} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
          {i < arr.length - 1 && (
            <div className="relative mx-2 mb-5 h-px flex-1 bg-white/10">
              <motion.span
                className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_10px_var(--glow)]"
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function MatchVisual() {
  // steps 0..2 verify PO, Receipt, Invoice one by one; 3-4 = matched; 5 = reset
  const { ref, step } = useLoop(6, 900)
  const docs = [
    { Icon: FileText, label: 'PO' },
    { Icon: Package, label: 'Receipt' },
    { Icon: Receipt, label: 'Invoice' },
  ]
  const matched = step === 3 || step === 4
  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b1016] px-5 pb-4 pt-6">
      <div className="flex items-center justify-between gap-1">
        {docs.map(({ Icon, label }, i) => {
          const done = step > i && step <= 4
          const active = step === i
          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{ scale: active ? 1.12 : 1, y: active ? -3 : 0 }}
                  className={`relative grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-300 ${
                    done || active ? 'border-primary/60 bg-primary/10 text-primary' : 'border-white/10 text-white/60'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {done && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground"
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </motion.span>
                  )}
                </motion.div>
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
              <div className="relative mx-2 mb-5 h-px flex-1 overflow-hidden bg-white/10">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-primary"
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </div>
            </div>
          )
        })}
        <div className="relative mb-5">
          {matched && (
            <motion.span
              key={step}
              className="absolute inset-0 rounded-full border border-primary"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.9 }}
            />
          )}
          <motion.div
            animate={{ scale: matched ? 1 : 0.85, opacity: matched ? 1 : 0.4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className={`grid h-10 w-10 place-items-center rounded-full ${
              matched ? 'bg-primary text-primary-foreground' : 'border border-white/15 text-white/50'
            }`}
          >
            <Check className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between font-mono text-[11px]">
        <span className="text-muted-foreground">3-way match</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={matched ? 'ok' : `check-${Math.min(step, 2)}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={matched ? 'text-primary' : 'text-white/70'}
          >
            {matched ? 'approved ✓' : step === 5 ? 'next invoice…' : `verifying ${docs[step].label}…`}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- Cards ---------- */

function ProjectMeta({ p }: { p: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-primary/25 bg-primary/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-primary">
          {p.badge}
        </span>
        <span className="text-sm text-muted-foreground">{p.subtitle}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">{p.title}</h3>
      <p className="mt-3 leading-relaxed text-white/70">{p.description}</p>
      <ul className="mt-5 space-y-2">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-2.5 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {pt}
          </li>
        ))}
      </ul>
    </>
  )
}

function ProjectFooter({ p }: { p: Project }) {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <Chip key={t} className="text-[11px]">
            {t}
          </Chip>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
        <div>
          <span className="text-2xl font-semibold text-white">{p.metric.value}</span>
          <span className="ml-2 text-sm text-muted-foreground">{p.metric.label}</span>
        </div>
        {p.link ? (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-primary"
          >
            Live demo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : null}
      </div>
    </div>
  )
}

/* Sticky card that scales down slightly as the next card stacks over it (desktop) */
function StackCard({
  i,
  total,
  progress,
  desktop,
  children,
}: {
  i: number
  total: number
  progress: MotionValue<number>
  desktop: boolean
  children: ReactNode
}) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.05])
  const dim = useTransform(progress, [i / total, 1], [0, (total - 1 - i) * 0.25])
  return (
    <div className="md:sticky" style={{ top: `calc(6.5rem + ${i * 26}px)` }}>
      <motion.div style={desktop ? { scale } : undefined} className="relative origin-top">
        {children}
        {desktop && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[#05080b]"
          />
        )}
      </motion.div>
    </div>
  )
}

function VisualPanel({ children }: { children: ReactNode }) {
  return (
    <div className="bg-dots relative flex min-h-[260px] items-center rounded-xl border border-white/[0.08] bg-[#0b1016] p-5 md:p-8">
      <div className="w-full">{children}</div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const visuals = [
    <DashboardVisual key="d" />,
    <VisualPanel key="o">
      <OrderFlowVisual />
    </VisualPanel>,
    <VisualPanel key="m">
      <MatchVisual />
    </VisualPanel>,
  ]
  const total = siteConfig.projects.length

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Production apps used by real teams."
        highlight={['real', 'teams']}
        sub="Three live platforms — from SAP-integrated enterprise reporting to multi-tenant SaaS."
      />

      <div ref={ref} className="flex flex-col gap-6 md:gap-10">
        {siteConfig.projects.map((p, i) => (
          <StackCard key={p.title} i={i} total={total} progress={scrollYProgress} desktop={desktop}>
            <div className={i === 0 ? 'border-beam rounded-2xl' : 'rounded-2xl'}>
              <SpotlightCard className="grid gap-8 bg-[#121921] p-6 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-none md:grid-cols-2 md:p-9">
                <div className="flex flex-col">
                  <span className="mb-5 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <ProjectMeta p={p} />
                  <div className="mt-auto">
                    <ProjectFooter p={p} />
                  </div>
                </div>
                {visuals[i]}
              </SpotlightCard>
            </div>
          </StackCard>
        ))}
      </div>
    </section>
  )
}
