'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

const smoothEase = [0.23, 1, 0.32, 1] as const

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: smoothEase },
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
            <span className="gradient-text">Professional Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My journey building enterprise applications
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5"
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)',
            }}
          />

          {/* Intern phase */}
          <motion.div variants={itemVariants} className="relative pl-16 pb-12">
            {/* Timeline dot */}
            <div className="absolute left-[14px] top-2">
              <div className="timeline-dot" />
            </div>

            <div className="glass-effect rounded-2xl p-6 sm:p-8 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-secondary font-heading">Software Developer Intern</h3>
                    <ArrowUpRight className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-foreground font-semibold">ITSOFT LAB</p>
                  <p className="text-muted-foreground text-sm">{siteConfig.experience[0].location}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                    Feb 2026 – Apr 2026
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                    Internship
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Completed a rigorous 3-month internship building production features for enterprise clients.
                Demonstrated strong performance leading to full-time SDE promotion.
              </p>
            </div>
          </motion.div>

          {/* Promotion arrow */}
          <motion.div
            variants={itemVariants}
            className="relative pl-16 pb-4"
          >
            <div className="absolute left-[10px] top-0">
              <motion.div
                className="w-[22px] flex flex-col items-center"
                animate={inView ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-0.5 h-4 bg-gradient-to-b from-secondary to-primary" />
                <div className="w-3 h-3 border-l-2 border-b-2 border-primary transform rotate-[-45deg] -mt-1" />
              </motion.div>
            </div>
            <div className="ml-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30">
                🚀 Promoted based on performance & impact
              </span>
            </div>
          </motion.div>

          {/* SDE phase */}
          {siteConfig.experience.map((experience, index) => (
            <motion.div key={index} variants={itemVariants} className="relative pl-16 pb-8">
              {/* Timeline dot */}
              <div className="absolute left-[14px] top-2">
                <div className="timeline-dot" />
              </div>

              <div className="glass-effect rounded-2xl p-6 sm:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary font-heading">
                          {experience.role}
                        </h3>
                        <p className="text-secondary font-semibold">
                          {experience.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm ml-12">
                      {experience.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-12 sm:ml-0">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {experience.duration}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                      {experience.type}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 my-5" />

                {/* Highlights */}
                <div className="space-y-3">
                  {experience.highlights.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlightIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + highlightIndex * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {highlight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  )
}
