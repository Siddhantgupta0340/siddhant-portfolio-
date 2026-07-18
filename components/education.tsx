'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Award, GraduationCap } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

const smoothEase = [0.23, 1, 0.32, 1] as const

export default function Education() {
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
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: smoothEase },
    },
  }

  const icons = [GraduationCap, Award, Award]
  const colors = ['primary', 'secondary', 'accent'] as const
  const colorMap = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
      gradient: 'from-primary to-primary/50',
      scoreBg: 'bg-primary/10',
      scoreText: 'text-primary',
      scoreBorder: 'border-primary/20',
    },
    secondary: {
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      border: 'border-secondary/20',
      gradient: 'from-secondary to-secondary/50',
      scoreBg: 'bg-secondary/10',
      scoreText: 'text-secondary',
      scoreBorder: 'border-secondary/20',
    },
    accent: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-accent/20',
      gradient: 'from-accent to-accent/50',
      scoreBg: 'bg-accent/10',
      scoreText: 'text-accent',
      scoreBorder: 'border-accent/20',
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-heading">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Academic journey and achievements
          </p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Connecting line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5 hidden sm:block"
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent), transparent)',
            }}
          />

          {siteConfig.education.map((edu, index) => {
            const Icon = icons[index] || Award
            const color = colors[index] || 'primary'
            const c = colorMap[color]

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-0 sm:pl-16 pb-8 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-[14px] top-2 hidden sm:block">
                  <motion.div
                    className={`w-[14px] h-[14px] rounded-full bg-gradient-to-br ${c.gradient} border-[3px] border-background`}
                    style={{ boxShadow: `0 0 15px var(--${color})` }}
                    animate={inView ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </div>

                <motion.div
                  whileHover={{ x: 6 }}
                  className={`glass-effect rounded-xl p-6 border-l-4 ${c.border} hover:shadow-lg transition-all duration-300`}
                  style={{ borderLeftColor: `var(--${color})` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 ${c.bg} rounded-xl flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div>
                          <h3 className={`text-lg font-bold ${c.text} font-heading`}>
                            {edu.degree}
                          </h3>
                          <p className="text-foreground/80 font-semibold text-sm">
                            {edu.field}
                          </p>
                        </div>
                        <span className={`text-xs font-semibold ${c.text} whitespace-nowrap px-3 py-1 rounded-full ${c.bg} ${c.scoreBorder} border`}>
                          {edu.period}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3">
                        📍 {edu.institution}
                      </p>

                      {/* Score Badge */}
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex px-4 py-1.5 rounded-full ${c.scoreBg} ${c.scoreText} text-sm font-bold border ${c.scoreBorder}`}
                      >
                        {edu.type === 'cgpa' ? '📊' : '📈'} {edu.score}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  )
}
