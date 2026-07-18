'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Clock } from 'lucide-react'
import { TiltCard } from '@/components/animations/TiltCard'
import { siteConfig } from '@/config/siteConfig'

const smoothEase = [0.23, 1, 0.32, 1] as const

export default function Articles() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-heading">
            <span className="gradient-text">Articles & Notes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Practical writing themes from the systems I build
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {siteConfig.articles.map((article) => (
            <motion.article
              key={article.title}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: smoothEase },
                },
              }}
            >
              <TiltCard tiltAmount={5} className="h-full">
                <div className="glass-effect rounded-xl p-6 h-full border border-white/5 hover:border-secondary/30 transition-colors group">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-secondary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {article.summary}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read more
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  )
}
