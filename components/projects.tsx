'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ChefHat, FileText, Package, Receipt, UtensilsCrossed } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { Chip, Reveal, SectionHeading, SpotlightCard } from '@/components/primitives'

type Project = (typeof siteConfig.projects)[number]

/* ---------- Mini animated visuals (no screenshots needed) ---------- */

function DashboardVisual() {
  const bars = [42, 68, 55, 82, 61, 90, 74, 96]
  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0e13] p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">sales_dashboard / live</span>
        <span className="flex items-center gap-1.5 text-[11px] text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> SAP sync
        </span>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          ['Sales', 'Team-wise'],
          ['Stock', 'Ageing'],
          ['Dispatch', 'Live'],
        ].map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
          >
            <p className="text-[10px] text-muted-foreground">{k}</p>
            <p className="text-sm font-semibold text-white">{v}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary/20 to-primary/80"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0e13] to-transparent" />
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
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-[#0a0e13] px-5 py-6">
      {[
        { Icon: FileText, label: 'PO' },
        { Icon: Package, label: 'Receipt' },
        { Icon: Receipt, label: 'Invoice' },
      ].map(({ Icon, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/80">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-muted-foreground">{label}</span>
        </motion.div>
      ))}
      <span className="mb-5 text-white/30">=</span>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 14 }}
        className="mb-5 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        <Check className="h-5 w-5" />
      </motion.div>
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
        ) : (
          <span className="text-xs text-muted-foreground">Private client codebase</span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [featured, ...rest] = siteConfig.projects
  const visuals = [OrderFlowVisual, MatchVisual]

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title={
          <>
            Production apps used by <span className="text-gradient">real teams</span>.
          </>
        }
        sub="Three live platforms — from SAP-integrated enterprise reporting to multi-tenant SaaS."
      />

      <div className="grid gap-5">
        <Reveal>
          <SpotlightCard className="grid gap-8 p-6 md:grid-cols-2 md:p-9">
            <div className="flex flex-col">
              <ProjectMeta p={featured} />
              <div className="mt-auto">
                <ProjectFooter p={featured} />
              </div>
            </div>
            <DashboardVisual />
          </SpotlightCard>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => {
            const Visual = visuals[i]
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <SpotlightCard className="flex h-full flex-col p-6 md:p-8">
                  <Visual />
                  <div className="mt-7">
                    <ProjectMeta p={p} />
                  </div>
                  <div className="mt-auto">
                    <ProjectFooter p={p} />
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
