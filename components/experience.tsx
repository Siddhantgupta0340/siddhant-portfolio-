'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { siteConfig } from '@/config/siteConfig'
import { Chip, Reveal, SectionHeading, SpotlightCard } from '@/components/primitives'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where I've been building."
        sub="From PERN-stack client products to an enterprise SAP-integrated platform."
      />

      <div ref={ref} className="relative">
        {/* Track + animated progress line */}
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-white/[0.08] md:left-[calc(25%+7px)]" />
        <motion.div
          style={{ scaleY: line }}
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-primary via-primary to-primary/0 md:left-[calc(25%+7px)]"
        />

        <div className="space-y-14">
          {siteConfig.experience.map((job, i) => (
            <div key={job.company} className="relative grid gap-4 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
              {/* Dot */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full border border-primary/60 bg-background md:left-[25%]"
              >
                <span className={`h-[7px] w-[7px] rounded-full bg-primary ${job.current ? 'animate-pulse' : ''}`} />
              </motion.span>

              <Reveal className="md:pr-10 md:text-right">
                <p className="font-mono text-sm text-primary">{job.duration}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.type} · {job.location}
                </p>
              </Reveal>

              <Reveal delay={0.1} className="md:col-span-3 md:pl-10">
                <SpotlightCard className="p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold text-white md:text-2xl">{job.role}</h3>
                    {job.current && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Current</span>
                    )}
                  </div>
                  <p className="mt-1 text-muted-foreground">{job.company}</p>

                  <ul className="mt-6 space-y-3">
                    {job.highlights.map((h, hi) => (
                      <motion.li
                        key={hi}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + hi * 0.06, duration: 0.5 }}
                        className="flex gap-3 text-[15px] leading-relaxed text-white/75"
                      >
                        <span className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-primary/70" />
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
              {i < siteConfig.experience.length - 1 && <span className="sr-only">then</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
