'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Award } from 'lucide-react'

export default function Education() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      institution: 'IPS Academy, Indore',
      period: '2022 – 2026',
      cgpa: '7.0 / 10',
      icon: BookOpen,
    },
    {
      degree: 'Higher Secondary (Class XII)',
      field: 'MPBSE Board',
      institution: 'IPS Academy, Indore',
      period: '2022',
      percentage: '79%',
      icon: Award,
    },
    {
      degree: 'Secondary (Class X)',
      field: 'MPBSE Board',
      institution: 'IPS Academy, Indore',
      period: '2020',
      percentage: '82%',
      icon: Award,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Academic journey and achievements
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {education.map((edu, index) => {
            const Icon = edu.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 8 }}
                className="glass-effect rounded-xl p-6 border-l-4 border-primary hover:border-secondary transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="p-3 bg-primary/20 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{edu.degree}</h3>
                        <p className="text-secondary font-semibold">{edu.field}</p>
                      </div>
                      <span className="text-sm font-semibold text-secondary whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-2">{edu.institution}</p>

                    {/* Score */}
                    <div className="inline-flex gap-2">
                      {edu.cgpa && (
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                          CGPA: {edu.cgpa}
                        </span>
                      )}
                      {edu.percentage && (
                        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold border border-secondary/20">
                          {edu.percentage}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
