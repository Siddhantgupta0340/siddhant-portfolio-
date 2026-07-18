'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Code2, Share2 } from 'lucide-react'
import { ContactForm } from './contact-form'
import { siteConfig } from '@/config/siteConfig'

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      color: 'primary',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`,
      color: 'secondary',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: siteConfig.location,
      href: '#',
      color: 'accent',
    },
  ]

  const socialLinks = [
    {
      icon: Code2,
      label: 'GitHub',
      href: siteConfig.social.github,
      color: 'hover:text-foreground hover:border-foreground/30',
    },
    {
      icon: Share2,
      label: 'LinkedIn',
      href: siteConfig.social.linkedin,
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/30',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
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
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let&apos;s discuss your next project or opportunity
          </p>

          {/* Availability badge */}
          <motion.div
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect text-sm font-medium"
            animate={{
              boxShadow: [
                '0 0 15px rgba(34,197,94,0.1)',
                '0 0 25px rgba(34,197,94,0.2)',
                '0 0 15px rgba(34,197,94,0.1)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400">Currently available for new opportunities</span>
          </motion.div>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h3 className="text-2xl font-bold mb-8 font-heading">Contact Information</h3>

            {/* Contact Details */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    variants={itemVariants}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="glass-effect rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-xl bg-${info.color}/15 group-hover:bg-${info.color}/25 transition-colors duration-300 flex-shrink-0`}>
                      <Icon className={`w-5 h-5 text-${info.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-0.5">
                        {info.label}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 font-heading">Connect With Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -4, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 glass-effect rounded-xl border border-white/10 text-muted-foreground transition-all duration-300 ${link.color}`}
                      aria-label={link.label}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Quick response note */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-4 rounded-xl glass-effect border border-primary/10"
            >
              <p className="text-sm text-muted-foreground">
                💬 <span className="text-primary font-medium">Quick Response</span> — I typically respond within 24 hours. Feel free to reach out!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
