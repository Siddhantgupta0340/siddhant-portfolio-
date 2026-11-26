'use client'

import { ArrowUpRight, Check, Copy, Mail, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { siteConfig } from '@/config/siteConfig'
import { GithubIcon, LeetcodeIcon, LinkedinIcon, Reveal, SpotlightCard } from '@/components/primitives'
import { ResumeButton } from '@/components/resume-button'
import { Magnetic, SplitReveal } from '@/components/effects'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${siteConfig.email}`
    }
  }

  // Opens the visitor's own mail app with the message pre-filled (no backend needed).
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const message = String(data.get('message') || '')
    const subject = encodeURIComponent(`Opportunity for Siddhant — from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}`)
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  const socials = [
    { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: siteConfig.social.github, label: 'GitHub', Icon: GithubIcon },
    { href: siteConfig.social.leetcode, label: 'LeetCode', Icon: LeetcodeIcon },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      <div className="bg-dots mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-5 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="text-muted-foreground">06</span>
            <span className="h-px w-8 bg-primary/50" />
            Contact
          </p>
        </Reveal>
        <SplitReveal
          as="h2"
          text="Let's build something great together."
          highlight={['great', 'together']}
          className="mx-auto block max-w-4xl text-center text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground md:text-lg">
            Open to Software Engineer, Full Stack and Frontend roles across India.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={copyEmail}
              className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] pl-5 pr-2 font-mono text-sm text-white transition-colors hover:border-primary/50"
            >
              {siteConfig.email}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </span>
            </button>
            <Magnetic>
              <ResumeButton size="lg" label="Resume" />
            </Magnetic>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <SpotlightCard className="p-6 md:p-8">
              <form onSubmit={onSubmit} className="space-y-4">
                <p className="font-semibold text-white">Send a quick message</p>
                <input
                  name="name"
                  required
                  placeholder="Your name / company"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-white outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about the role or project…"
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                />
                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-medium text-black transition-colors hover:bg-primary"
                >
                  Open in email
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4 md:col-span-2">
            <Reveal delay={0.08}>
              <SpotlightCard className="p-6">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white/90 hover:text-primary">
                  <Mail className="h-5 w-5 text-primary" /> Email me
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`}
                  className="mt-4 flex items-center gap-3 text-white/90 hover:text-primary"
                >
                  <Phone className="h-5 w-5 text-primary" /> {siteConfig.phone}
                </a>
              </SpotlightCard>
            </Reveal>
            {socials.map(({ href, label, Icon }, i) => (
              <Reveal key={label} delay={0.12 + i * 0.05}>
                <a href={href} target="_blank" rel="noreferrer" className="block">
                  <SpotlightCard className="group flex items-center justify-between p-5">
                    <span className="flex items-center gap-3 text-white/90">
                      <Icon className="h-5 w-5" /> {label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </SpotlightCard>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
