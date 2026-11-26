'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/config/siteConfig'
import { ResumeButton } from '@/components/resume-button'
import { Counter, GithubIcon, LeetcodeIcon, LinkedinIcon, ease } from '@/components/primitives'
import { Magnetic, Scramble, Tilt } from '@/components/effects'

const codeLines: { indent: number; parts: [string, string][] }[] = [
  { indent: 0, parts: [['text-[#c792ea]', 'const '], ['text-white', 'siddhant'], ['text-muted-foreground', ' = {']] },
  { indent: 1, parts: [['text-[#82aaff]', 'role'], ['text-muted-foreground', ': '], ['text-primary', "'Junior Software Engineer'"], ['text-muted-foreground', ',']] },
  { indent: 1, parts: [['text-[#82aaff]', 'company'], ['text-muted-foreground', ': '], ['text-primary', "'Bhaskar Savitt Industries'"], ['text-muted-foreground', ',']] },
  { indent: 1, parts: [['text-[#82aaff]', 'frontend'], ['text-muted-foreground', ': ['], ['text-primary', "'React'"], ['text-muted-foreground', ', '], ['text-primary', "'Next.js'"], ['text-muted-foreground', ', '], ['text-primary', "'TS'"], ['text-muted-foreground', '],']] },
  { indent: 1, parts: [['text-[#82aaff]', 'backend'], ['text-muted-foreground', ': ['], ['text-primary', "'FastAPI'"], ['text-muted-foreground', ', '], ['text-primary', "'Node.js'"], ['text-muted-foreground', '],']] },
  { indent: 1, parts: [['text-[#82aaff]', 'data'], ['text-muted-foreground', ': ['], ['text-primary', "'PostgreSQL'"], ['text-muted-foreground', ', '], ['text-primary', "'Redis'"], ['text-muted-foreground', '],']] },
  { indent: 1, parts: [['text-[#82aaff]', 'ships'], ['text-muted-foreground', ': '], ['text-primary', "'Docker → AWS'"], ['text-muted-foreground', ',']] },
  { indent: 1, parts: [['text-[#82aaff]', 'openToWork'], ['text-muted-foreground', ': '], ['text-[#f78c6c]', 'true'], ['text-muted-foreground', ',']] },
  { indent: 0, parts: [['text-muted-foreground', '}']] },
]

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % siteConfig.roles.length), 2600)
    return () => window.clearInterval(t)
  }, [])
  return (
    <span className="inline-block min-h-[1.6em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={siteConfig.roles[i]}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.4, ease }}
          className="inline-block text-primary"
        >
          <Scramble text={siteConfig.roles[i]} />
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function CodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.6, ease }}
      style={{ transformPerspective: 1200 }}
      className="relative w-full min-w-0"
    >
     <Tilt max={6} className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 2.3 }, scale: { delay: 2.3, type: 'spring' }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute -right-3 -top-5 z-20 hidden rounded-xl border border-white/10 bg-[#121921]/90 px-3 py-2 text-xs shadow-xl backdrop-blur sm:block"
      >
        <span className="text-muted-foreground">API performance</span> <span className="font-semibold text-primary">↑60%</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2.5 }, scale: { delay: 2.5, type: 'spring' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute -bottom-5 -left-4 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#121921]/90 px-3 py-2 text-xs shadow-xl backdrop-blur sm:flex"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        <span className="text-white">Shipping Wishvam</span>
      </motion.div>
      <div className="border-beam relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1319]/95 shadow-[0_40px_100px_-30px_rgba(62,224,165,0.35)] backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">siddhant.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-[13px]">
          {codeLines.map((line, li) => (
            <motion.div
              key={li}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + li * 0.12, duration: 0.35 }}
              className="flex"
            >
              <span className="mr-5 w-4 select-none text-right text-white/20">{li + 1}</span>
              <span style={{ paddingLeft: line.indent * 16 }}>
                {line.parts.map(([cls, txt], pi) => (
                  <span key={pi} className={cls}>
                    {txt}
                  </span>
                ))}
                {li === codeLines.length - 1 && (
                  <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-primary" />
                )}
              </span>
            </motion.div>
          ))}
        </pre>
      </div>
     </Tilt>
    </motion.div>
  )
}

const beams = [
  { left: '12%', delay: 0, dur: 7 },
  { left: '31%', delay: 2.5, dur: 9 },
  { left: '56%', delay: 1.2, dur: 6.5 },
  { left: '78%', delay: 3.8, dur: 8 },
  { left: '92%', delay: 5, dur: 7.5 },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Only the decorative code card drifts a little; text never fades so it always reads cleanly.
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40])

  const nameWords = siteConfig.name.split(' ')

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 md:pt-36 lg:pb-36"
    >
      {/* Background layers */}
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0">
        {beams.map((b) => (
          <span
            key={b.left}
            className="beam hidden md:block"
            style={{ left: b.left, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[-25%] h-[620px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/[0.1] blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] py-1.5 pl-2.5 pr-4 text-xs text-primary transition-colors hover:bg-primary/10 sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {siteConfig.available}
          </motion.a>

          <h1 className="text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
            <span className="sr-only">{siteConfig.name}</span>
            <span aria-hidden="true" className="block">
              {nameWords.map((word, wi) => (
                <span key={word} className="mr-[0.25em] inline-block whitespace-nowrap last:mr-0">
                  {word.split('').map((ch, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, y: '0.5em', filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.6, delay: 0.15 + (wi * 9 + ci) * 0.035, ease }}
                      className={`inline-block ${wi === 1 ? 'text-white/50' : ''}`}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-5 text-xl font-medium text-white/90 sm:text-2xl"
          >
            <RotatingRole />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {siteConfig.headline} Currently a <span className="text-white">Junior Software Engineer</span> at{' '}
            <span className="text-white">Bhaskar Savitt Industries</span>, building{' '}
            <span className="text-primary">Wishvam</span> with React, FastAPI and PostgreSQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-black transition-all hover:bg-primary active:scale-[0.97]"
            >
              View my work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            </Magnetic>
            <Magnetic>
              <ResumeButton size="lg" variant="outline" label="Download Resume" />
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Indore, India
            </span>
            <span className="h-4 w-px bg-white/10" />
            {[
              { href: siteConfig.social.github, label: 'GitHub', Icon: GithubIcon },
              { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
              { href: siteConfig.social.leetcode, label: 'LeetCode', Icon: LeetcodeIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="transition-all hover:-translate-y-0.5 hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ y: cardY }} className="min-w-0">
          <CodeWindow />
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-px px-8 pb-8">
          {siteConfig.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.6, ease }}
              className="border-l border-white/[0.08] pl-5"
            >
              <Counter to={s.value} suffix={s.suffix} className="text-2xl font-semibold text-white" />
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.8 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground lg:hidden"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  )
}
