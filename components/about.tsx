'use client'

import { motion } from 'framer-motion'
import { Award, Briefcase, Code2, MapPin, Sparkles } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { Counter, Reveal, SectionHeading, SpotlightCard } from '@/components/primitives'
import { ScrollHighlight } from '@/components/effects'

const coreStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS']

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Engineer who ships real products, not just demos."
        highlight={['real', 'products']}
      />

      <div className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 md:grid-cols-3">
        {/* Summary */}
        <Reveal className="md:col-span-2 md:row-span-2">
          <SpotlightCard className="flex h-full flex-col justify-between p-7 md:p-9">
            <div>
              <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <ScrollHighlight text={siteConfig.summary} className="text-xl leading-relaxed text-white md:text-2xl md:leading-[1.5]" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-7 sm:grid-cols-4">
              {siteConfig.stats.map((s) => (
                <div key={s.label}>
                  <Counter to={s.value} suffix={s.suffix} className="text-3xl font-semibold tracking-tight text-white" />
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Currently */}
        <Reveal delay={0.08}>
          <SpotlightCard className="h-full p-7">
            <div className="mb-5 flex items-center justify-between">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Now
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Junior Software Engineer at</p>
            <p className="mt-1 text-lg font-semibold text-white">Bhaskar Savitt Industries</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Building <span className="text-primary">Wishvam</span> — live SAP-integrated dashboards for sales, stock, dispatch and production.
            </p>
          </SpotlightCard>
        </Reveal>

        {/* Location */}
        <Reveal delay={0.14}>
          <SpotlightCard className="relative h-full overflow-hidden p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/30"
                  animate={{ scale: [0.3, 1.2], opacity: [0.8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i, ease: 'easeOut' }}
                />
              ))}
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_var(--glow)]" />
            </div>
            <MapPin className="mb-5 h-5 w-5 text-primary" />
            <p className="text-lg font-semibold text-white">Indore, India</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Open to remote, hybrid or on-site roles and happy to relocate anywhere in India.
            </p>
          </SpotlightCard>
        </Reveal>

        {/* Core stack */}
        <Reveal delay={0.06} className="md:col-span-2">
          <SpotlightCard className="h-full p-7">
            <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Code2 className="h-5 w-5 text-primary" /> Daily driver stack
            </div>
            <div className="flex flex-wrap gap-2">
              {coreStack.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-sm text-white/90 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Awards */}
        <Reveal delay={0.12}>
          <SpotlightCard className="h-full p-7">
            <Award className="mb-5 h-5 w-5 text-primary" />
            <p className="text-lg font-semibold text-white">How I work</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {['2-week Agile sprints', 'Pull requests & code review', 'DB migrations & automated tests', 'Docker deploys on AWS'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" /> {t}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
