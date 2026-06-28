'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink } from 'lucide-react'

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: 'Vendor Management System (VMS)',
      description: 'The Vendor Management System (VMS) is a production-ready enterprise web application developed for Acre India to digitalize and automate the complete vendor management process. Traditionally, vendor information, approvals, document verification, and procurement requests were managed manually through spreadsheets, emails, and paperwork, leading to delays, data inconsistencies, and security issues.',
      image: '/Gemini_Generated_Image_5gzxtt5gzxtt5gzx.png', // Placed inside your public folder
      features: [
        'Secure JWT Authentication with RBAC',
        'Vendor Registration & Profile Management',
        'Role-Based Access Control (Admin & Vendor)',
        'Vendor Approval Workflow',
        'Document Upload & Verification',
        'Forgot & Reset Password via Email',
        'Dashboard with Vendor Analytics',
        'Responsive User Interface',
        'Secure REST APIs',
        'PostgreSQL Database with Prisma ORM'
      ],
      tech: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'JWT'],
      type: 'Live Client Project',
      impact: 'Implemented for enterprise clients with 50+ vendors',
    },
    {
      title: 'AutoMarket Platform',
      description: 'The Marketing Campaign module provides a centralized system where administrators can create, schedule, manage, and analyze promotional campaigns. It helps businesses reach targeted customers, increase vehicle visibility, and monitor campaign performance through detailed analytics.',
      image: 'ChatGPT Image Jun 28, 2026, 11_48_36 PM.png  ', // Placeholder if no thumbnail is available yet
      features: [
        'Campaign Creation & Management',
        'Bulk customer import & segmentation',
        'Audience Targeting',
        'Automated campaign scheduling',
        'Promotional Banner Management',
        'High-performance campaign execution',
        'Campaign Status Tracking',
        'Search & Filter Campaigns',
        'Campaign History',
        'Responsive Dashboard'
      ],
      tech: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'JWT', 'REST APIs'],
      type: 'Live Client Project',
      impact: 'Processed 10K+ marketing campaigns monthly',
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-xl border border-primary/20 hover:border-secondary/50 transition-all duration-300 group overflow-hidden flex flex-col h-full"
            >
              {/* Thumbnail Header Image Container */}
              {project.image && (
                <div className="relative w-full aspect-video overflow-hidden border-b border-primary/10">
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Card Contents Wrapper */}
              <div className="p-8 relative z-10 flex flex-col flex-grow">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300 pointer-events-none" />

                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                    <ExternalLink className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                  </div>
                  <span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                    {project.type}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-primary mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Summary */}
                <div className="mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-primary font-medium">{project.impact}</p>
                </div>

                {/* Tech Tags Footer */}
                <div className="mt-auto">
                  <h4 className="text-sm font-semibold text-primary mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}