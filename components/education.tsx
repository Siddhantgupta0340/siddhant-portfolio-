'use client'

import { GraduationCap, Trophy } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { Reveal, SectionHeading, SpotlightCard } from '@/components/primitives'

export default function Education() {
  const [degree, ...school] = siteConfig.education
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="05" eyebrow="Education & awards" title="Foundations." />

      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-7 md:p-9">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white md:text-2xl">{degree.degree}</h3>
                <p className="mt-1 text-muted-foreground">{degree.institution}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.06] pt-6">
              <span className="font-mono text-sm text-primary">{degree.period}</span>
              <span className="text-2xl font-semibold text-white">{degree.score}</span>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="grid gap-4">
          {school.map((e, i) => (
            <Reveal key={e.degree} delay={0.08 + i * 0.06}>
              <SpotlightCard className="flex items-center justify-between p-6">
                <div>
                  <p className="font-semibold text-white">{e.degree}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{e.period}</p>
                </div>
                <span className="text-xl font-semibold text-primary">{e.score}</span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {siteConfig.achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08} className={i === 0 ? 'md:col-span-2' : ''}>
            <SpotlightCard className="flex h-full items-start gap-4 p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                <Trophy className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">{a.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
