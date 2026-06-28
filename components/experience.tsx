'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase } from 'lucide-react'

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      role: 'Software Development Engineer (Full Stack)',
      company: 'ITSOFT LAB',
      location: 'Indore, Madhya Pradesh',
      duration: 'May 2026 – Present',
      highlights: [
        'Promoted from Software Developer Intern to SDE after a successful 3-month internship based on performance and project impact.',
        'Build and maintain production-ready enterprise applications using the PERN Stack.',
        'Collaborate with senior developers and cross-functional teams in Agile development environments.',
        'Develop secure REST APIs and implement JWT Authentication with RBAC.',
        'Design responsive dashboards and optimize database operations.',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8"
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
            <span className="gradient-text">Professional Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My journey building enterprise applications
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect rounded-xl p-8 border-l-4 border-gradient-to-b from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary">{experience.role}</h3>
                  <p className="text-secondary font-semibold">{experience.company}</p>
                  <p className="text-muted-foreground text-sm">{experience.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">{experience.duration}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 my-6" />

              {/* Highlights */}
              <div className="space-y-3">
                {experience.highlights.map((highlight, highlightIndex) => (
                  <motion.div
                    key={highlightIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.5 + highlightIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
