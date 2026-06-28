'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gradient-orb-1', {
        x: 100,
        y: 50,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.gradient-orb-2', {
        x: -100,
        y: -50,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.23, 1, 0.320, 1],
      },
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="gradient-orb-1 absolute w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl -top-48 -left-48"
          style={{ filter: 'blur(40px)' }}
        />
        <div
          className="gradient-orb-2 absolute w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl -bottom-48 -right-48"
          style={{ filter: 'blur(40px)' }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl"
      >
        {/* Name */}
        <motion.div
          variants={textVariants}
          custom={0}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-2">
            <span className="gradient-text">Siddhant Gupta</span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div
          variants={textVariants}
          custom={1}
          className="mb-8"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-muted-foreground mb-2">
            Full Stack Developer & Software Engineer
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Building production-grade applications with PERN & MERN stacks
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={textVariants}
          custom={2}
          className="mb-12 max-w-2xl mx-auto"
        >
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            SDE at ITSOFT LAB specializing in enterprise-grade full-stack development,
            REST APIs, authentication systems, and scalable database architecture.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={textVariants}
          custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 glow-pulse">
            View Projects
          </button>
          <button className="px-8 py-3 rounded-lg border border-primary/50 text-primary font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105">
            Contact Me
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-secondary" />
      </motion.div>
    </section>
  )
}
