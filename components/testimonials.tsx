'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, Star } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

const smoothEase = [0.23, 1, 0.32, 1] as const

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-heading">
            <span className="gradient-text">What Teams Notice</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Collaboration signals from mentor and team feedback
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12, ease: smoothEase }}
              whileHover={{ y: -6 }}
              className="glass-effect rounded-xl p-6 border border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-primary" />
                <div className="flex gap-1 text-secondary" aria-label="Five star rating">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px]">
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center text-sm font-bold">
                    {testimonial.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  )
}
