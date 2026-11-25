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

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="relative w-full overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
