'use client'

import { motion } from 'framer-motion'
import { Code2, Share2, Mail, ArrowUp, Heart } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { useCallback, useEffect, useState } from 'react'

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setShowBackToTop(scrollTop > 400)
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const socialLinks = [
    {
      icon: Code2,
      label: 'GitHub',
      href: siteConfig.social.github,
    },
    {
      icon: Share2,
      label: 'LinkedIn',
      href: siteConfig.social.linkedin,
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${siteConfig.email}`,
    },
  ]

  const currentYear = new Date().getFullYear()
  const circumference = 2 * Math.PI * 18

  return (
    <>
      <footer className="relative border-t border-white/5 bg-background/80 backdrop-blur-xl">
        {/* Gradient line at top */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <motion.h3
                className="text-2xl font-bold gradient-text mb-3 font-heading"
                whileHover={{ scale: 1.02 }}
              >
                {siteConfig.name}
              </motion.h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {siteConfig.role}
              </p>
              <p className="text-muted-foreground/60 text-xs">
                📍 {siteConfig.location}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 font-heading">Quick Links</h4>
              <nav className="grid grid-cols-2 gap-2">
                {siteConfig.navItems.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-secondary transition-colors text-sm nav-link-underline inline-block w-fit"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 font-heading">Get in Touch</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors text-sm"
                >
                  📞 {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="p-2.5 rounded-xl glass-effect hover:bg-white/10 transition-all duration-300 text-muted-foreground hover:text-primary"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
              © {currentYear} {siteConfig.name}. Built with
              <Heart className="w-3 h-3 text-accent inline" />
              & Next.js
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.5,
          pointerEvents: showBackToTop ? 'auto' as const : 'none' as const,
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="back-to-top"
        aria-label="Back to top"
        suppressHydrationWarning
      >
        {/* Circular progress ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * scrollProgress) / 100}
            strokeLinecap="round"
            className="transition-all duration-200"
          />
        </svg>
        <ArrowUp className="w-5 h-5 relative z-10" />
      </motion.button>
    </>
  )
}
