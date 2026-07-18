'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { TiltCard } from '@/components/animations/TiltCard'
import { siteConfig } from '@/config/siteConfig'

const smoothEase = [0.23, 1, 0.32, 1] as const

export default function Projects() {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  }

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
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Production-ready applications I&apos;ve built for enterprise clients
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {siteConfig.projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TiltCard tiltAmount={6} className="h-full">
                <div className="glass-effect rounded-2xl overflow-hidden group h-full border border-white/5 hover:border-primary/20 transition-all duration-500">
                  {/* Project header with gradient */}
                  <div
                    className="h-40 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
                    }}
                  >
                    {/* Decorative grid pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />

                    {/* Project title overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.h3
                        className="text-3xl font-bold font-heading opacity-20"
                        style={{ color: project.color }}
                        animate={{
                          opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {project.title.split(' ')[0]}
                      </motion.h3>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="status-live bg-green-500/10 border border-green-500/20 text-green-400">
                        <span className="status-dot" />
                        {project.type}
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <motion.div
                      className="absolute bottom-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 font-heading group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5 + featureIndex * 0.08 }}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span
                              className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div
                      className="mb-5 p-3 rounded-lg border text-sm font-medium"
                      style={{
                        backgroundColor: `${project.color}08`,
                        borderColor: `${project.color}20`,
                        color: project.color,
                      }}
                    >
                      ⚡ {project.impact}
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-200"
                            style={{
                              backgroundColor: `${project.color}08`,
                              borderColor: `${project.color}20`,
                              color: project.color,
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  )
}
