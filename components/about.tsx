'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { siteConfig } from '@/config/siteConfig'
import { Code2, Server, Database, Rocket } from 'lucide-react'

const smoothEase = [0.23, 1, 0.32, 1] as const

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  }

  const highlights = [
    {
      icon: Code2,
      title: 'Frontend',
      description: 'React.js, Next.js, Tailwind CSS — building responsive, interactive UIs',
      color: 'from-primary to-primary/50',
    },
    {
      icon: Server,
      title: 'Backend',
      description: 'Node.js, Express.js, REST APIs, JWT Auth with Role-Based Access Control',
      color: 'from-secondary to-secondary/50',
    },
    {
      icon: Database,
      title: 'Database',
      description: 'PostgreSQL, MongoDB, Prisma ORM — scalable data architecture',
      color: 'from-accent to-accent/50',
    },
    {
      icon: Rocket,
      title: 'DevOps',
      description: 'Git, Vercel, Render, Redis, BullMQ — CI/CD and background processing',
      color: 'from-primary to-secondary',
    },
  ]

  return (
    <section
      ref={ref}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-heading">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From intern to Software Development Engineer — building enterprise solutions that scale
          </p>
        </motion.div>

        {/* Professional Summary Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={itemVariants}
            className="glass-effect rounded-2xl p-8 sm:p-10 mb-12 relative overflow-hidden"
          >
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Avatar area */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <motion.div
                  className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px]"
                  animate={inView ? {
                    boxShadow: [
                      '0 0 20px rgba(108,99,255,0.3)',
                      '0 0 40px rgba(0,212,255,0.3)',
                      '0 0 20px rgba(108,99,255,0.3)',
                    ],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <span className="text-4xl font-bold gradient-text">SG</span>
                  </div>
                </motion.div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 font-heading">
                  {siteConfig.name}
                </h3>
                <p className="text-secondary font-semibold mb-4">
                  {siteConfig.role}
                </p>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {siteConfig.description}
                </p>

                {/* Quick info badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-effect text-sm text-muted-foreground">
                    📍 {siteConfig.location}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-effect text-sm text-muted-foreground">
                    💼 ITSOFT LAB
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-effect text-sm text-muted-foreground">
                    🎓 B.Tech CSE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlight Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-effect rounded-xl p-6 group cursor-default"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 font-heading">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  )
}
