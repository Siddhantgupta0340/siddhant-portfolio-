'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/config/siteConfig'
import { ease } from '@/lib/motion'

export function Footer() {
  const letters = 'SIDDHANT'.split('')
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08]">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-3 px-5 py-8 text-sm text-muted-foreground sm:px-8">
        {siteConfig.navItems.map((n) => (
          <a key={n.href} href={n.href} className="transition-colors hover:text-primary">
            {n.name}
          </a>
        ))}
      </nav>
      <p
        aria-hidden="true"
        className="pointer-events-none flex select-none justify-center overflow-hidden whitespace-nowrap pb-2 text-[clamp(4rem,17vw,15rem)] font-semibold leading-[0.85] tracking-[-0.06em]"
      >
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.06, ease }}
            className="inline-block bg-gradient-to-b from-white/[0.14] to-white/[0.01] bg-clip-text text-transparent"
          >
            {l}
          </motion.span>
        ))}
      </p>
    </footer>
  )
}
