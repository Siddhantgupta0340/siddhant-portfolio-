'use client'

import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Experience from '@/components/experience'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Education from '@/components/education'
import Contact from '@/components/contact'
import { Footer } from '@/components/footer'
import { BackToTop, Backdrop, SmoothScroll, VelocityMarquee } from '@/components/effects'

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Backdrop />
      <Navbar />
      <main className="relative z-10 w-full overflow-x-clip">
        <Hero />
        <VelocityMarquee
          rows={[
            ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Node.js', 'PostgreSQL'],
            ['Redis', 'Docker', 'AWS', 'Prisma', 'Hono', 'Tailwind CSS'],
          ]}
        />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
