'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Share2, Code2 } from 'lucide-react'
import { ContactForm } from './contact-form'

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })



  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'siddhantgupta0304@gmail.com',
      href: 'mailto:siddhantgupta0304@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-9589530325',
      href: 'tel:9589530325',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Indore, Madhya Pradesh',
      href: '#',
    },
  ]

  const socialLinks = [
    {
      icon: Share2,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/siddhant-gupta-b7730930a/',
    },
    {
      icon: Code2,
      label: 'GitHub',
      href: 'https://github.com',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8"
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
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Let&apos;s discuss your next project or opportunity
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    variants={itemVariants}
                    whileHover={{ x: 8 }}
                    className="glass-effect rounded-lg p-4 flex items-start gap-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="p-3 bg-primary/20 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{info.label}</h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className="p-4 glass-effect rounded-lg border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 glow-pulse"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
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
