'use client'

import { motion } from 'framer-motion'
import { Cloud, Code2, Database, Layers, Lightbulb, Server } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { Reveal, SectionHeading, SpotlightCard } from '@/components/primitives'

const icons = [Code2, Layers, Server, Database, Cloud, Lightbulb]

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title="The toolkit."
          highlight={['toolkit']}
          sub="Everything here I've used in production code — frontend to database to deployment."
        />
      </div>


      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
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
