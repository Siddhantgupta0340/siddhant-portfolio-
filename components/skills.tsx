'use client'

import { motion } from 'framer-motion'
import { Cloud, Code2, Database, Layers, Lightbulb, Server } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { Reveal, SectionHeading, SpotlightCard } from '@/components/primitives'

const icons = [Code2, Layers, Server, Database, Cloud, Lightbulb]

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-x group flex overflow-hidden">
      <div
        className="flex shrink-0 animate-marquee gap-3 pr-3 group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 font-mono text-sm text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const half = Math.ceil(siteConfig.marquee.length / 2)
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title="The toolkit."
          sub="Everything here I've used in production code — frontend to database to deployment."
        />
      </div>

      <div className="mb-14 space-y-3">
        <Marquee items={siteConfig.marquee.slice(0, half)} />
        <Marquee items={siteConfig.marquee.slice(half)} reverse />
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {siteConfig.skills.map((group, gi) => {
          const Icon = icons[gi % icons.length]
          return (
            <Reveal key={group.name} delay={(gi % 3) * 0.08}>
              <SpotlightCard className="h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="font-semibold text-white">{group.name}</h3>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-sm text-white/80 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
