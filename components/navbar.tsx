'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/siteConfig'
import { ResumeButton } from '@/components/resume-button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const ids = siteConfig.navItems.map((n) => n.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-primary" />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            'flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500',
            scrolled
              ? 'border-white/10 bg-[#0b0f14]/75 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <a href="#top" className="group flex items-center gap-2 pl-2" aria-label="Back to top">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground transition-transform group-hover:rotate-12">
              {siteConfig.initials}
            </span>
            <span className="hidden font-medium text-white sm:block">{siteConfig.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={cn(
                      'relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors',
                      isActive ? 'text-white' : 'text-muted-foreground hover:text-white',
                    )}
                  >
                    {item.name}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ResumeButton size="sm" className="hidden sm:inline-flex" />
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/10 bg-[#0b0f14]/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {siteConfig.navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-lg text-white hover:bg-white/5"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-3 px-2 pb-1">
              <ResumeButton fullWidth label="Download Resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
