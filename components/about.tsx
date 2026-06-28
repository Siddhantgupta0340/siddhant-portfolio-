'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  }

  const timeline = [
    {
      year: 'May 2026 Present',
      title: 'Software Development Engineer',
      company: 'ITSOFT LAB',
      description: 'Promoted from SDE Intern. Building enterprise applications with PERN stack.',
    },
    {
      year: '2022-2026',
      title: 'B.Tech Computer Science',
      company: 'IPS Academy, Indore',
      description: 'CGPA: 7.0/10 - Developing full-stack applications and mastering core CS concepts.',
    },
  ]

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
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My journey from intern to Software Development Engineer
          </p>
        </motion.div>

        {/* Professional Summary */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="glass-effect rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Software Development Engineer with hands-on experience in designing, developing, and deploying
            production-ready full-stack web applications using the PERN and MERN stacks. Experienced in building
            secure REST APIs, authentication systems, Role-Based Access Control (RBAC), background job processing,
            and scalable database-driven applications. Contributed to enterprise-grade client projects by developing
            clean, maintainable, and high-performance software while collaborating in Agile development environments.
          </p>
        </motion.div>

        {/* Career Timeline */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Career Timeline</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-effect rounded-xl p-6 border-l-4 border-primary hover:border-secondary transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="text-xl font-bold text-primary">{item.title}</h4>
                  <span className="text-sm font-semibold text-secondary">{item.year}</span>
                </div>
                <p className="text-muted-foreground font-medium mb-2">{item.company}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
