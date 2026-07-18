'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { TypeAnimation } from 'react-type-animation'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { FloatingShapes } from '@/components/animations/FloatingShapes'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { siteConfig } from '@/config/siteConfig'

const smoothEase = [0.23, 1, 0.32, 1] as const

// Lazy load the 3D background for performance
const ParticleBackground = dynamic(
  () =>
    import('@/components/animations/ParticleBackground').then(
      (mod) => mod.ParticleBackground
    ),
  { ssr: false }
)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gradient-orb-1', {
        x: 120,
        y: 60,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.gradient-orb-2', {
        x: -120,
        y: -60,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.gradient-orb-3', {
        x: 80,
        y: -40,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = useCallback(() => {
    const el = document.getElementById('projects')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: smoothEase,
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 animated-gradient-bg"
    >
      {/* 3D Particle Background */}
      <ParticleBackground />

      {/* Floating Geometric Shapes */}
      <FloatingShapes />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="gradient-orb-1 absolute w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-3xl -top-48 -left-48"
        />
        <div
          className="gradient-orb-2 absolute w-[400px] h-[400px] bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-3xl -bottom-48 -right-48"
        />
        <div
          className="gradient-orb-3 absolute w-[300px] h-[300px] bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl top-1/3 left-1/2"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl"
      >
        {/* Available Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm font-medium text-secondary"
            animate={{ boxShadow: ['0 0 20px rgba(0,212,255,0.1)', '0 0 30px rgba(0,212,255,0.2)', '0 0 20px rgba(0,212,255,0.1)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight font-heading">
            <span className="gradient-text">{siteConfig.name}</span>
          </h1>
        </motion.div>

        {/* Typing Animation for Role */}
        <motion.div variants={itemVariants} className="mb-6 h-10 sm:h-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-muted-foreground">
            <TypeAnimation
              sequence={siteConfig.typingSequences}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              cursor={true}
              style={{ color: 'var(--secondary)' }}
            />
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants} className="mb-10 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            SDE at{' '}
            <span className="text-primary font-semibold">ITSOFT LAB</span>{' '}
            specializing in enterprise-grade full-stack development,
            REST APIs, authentication systems, and scalable database architecture.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <MagneticButton variant="primary" size="lg" onClick={scrollToProjects}>
            View Projects
          </MagneticButton>
          <MagneticButton variant="outline" size="lg" onClick={scrollToContact}>
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 glass-effect rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto"
        >
          {siteConfig.stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              target={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 text-secondary" />
      </motion.div>
    </section>
  )
}
